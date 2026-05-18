"""
Base Explanation Strategy
=========================
Abstract base class that all 7 strategy classes inherit from.

Each strategy handles ONE explanation_strategy value from taskRegistry:
  TrendStrategy       → "trend"
  ComparisonStrategy  → "comparison"
  DistributionStrategy→ "distribution"
  CorrelationStrategy → "correlation"
  RiskStrategy        → "risk"
  BehavioralStrategy  → "behavioral"
  RankingStrategy     → "ranking"

The base class provides:
  - Common LLM call logic (call_llm)
  - JSON response parsing + Pydantic validation
  - confidence.based_on[] derivation (Python logic, not LLM)
  - build_response() assembler
  - Abstract methods that each strategy must override:
      build_system_prompt(req)
      build_user_prompt(req)
"""

from __future__ import annotations
from abc import ABC, abstractmethod
import json
import time
import os
import logging

from openai import AsyncOpenAI
from pydantic import ValidationError

from schemas import (
    ExplainRequest, ExplainResponse,
    ExplanationBody, ConfidenceInfo, AIMeta, TokenUsage
)

logger = logging.getLogger("ai_service.strategy")

# ── OpenAI client (singleton) ─────────────────────────────────────────────────
_client = AsyncOpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

MODEL         = os.environ.get("OPENAI_MODEL", "gpt-4o-mini")
MAX_TOKENS    = int(os.environ.get("AI_MAX_TOKENS", "800"))
TEMPERATURE   = float(os.environ.get("AI_TEMPERATURE", "0.3"))


class BaseExplanationStrategy(ABC):
    """
    Base class for all explanation strategies.
    Subclasses override build_system_prompt and build_user_prompt only.
    All LLM call + response parsing logic lives here — not duplicated.
    """

    strategy_name: str = "base"

    # ── Abstract interface ────────────────────────────────────────────────────

    @abstractmethod
    def build_system_prompt(self, req: ExplainRequest) -> str:
        """
        Returns the SYSTEM prompt string.
        Must define:
          - Role of the AI (learning analytics expert)
          - Target audience tone (student/instructor/advisor/admin)
          - Strategy-specific lens (trend analysis, risk assessment, etc.)
          - Output format requirement (JSON only)
        """
        ...

    @abstractmethod
    def build_user_prompt(self, req: ExplainRequest) -> str:
        """
        Returns the USER prompt string.
        Must include:
          - Task context (task_name, analysis_context)
          - Data summary (datasets in readable form)
          - Specific analytical question to answer
          - JSON schema the LLM must produce
        """
        ...

    # ── Shared: LLM Call ──────────────────────────────────────────────────────

    async def call_llm(
        self,
        system_prompt: str,
        user_prompt: str,
        req: ExplainRequest,
    ) -> dict:
        """
        Calls OpenAI API and returns the parsed JSON dict.
        Uses JSON mode (response_format=json_object) to prevent free-text responses.

        Raises:
          json.JSONDecodeError    — if LLM returns non-JSON (shouldn't with JSON mode)
          openai.APIError         — if API is down or rate-limited
          Any other Exception     — caught by main.py → DEGRADED response
        """
        
        json_format_instruction = """
OUTPUT FORMAT: You MUST return a valid JSON object with this exact structure:
{
  "explanation": {
    "summary": "<2-3 sentence overall narrative>",
    "insights": [
      {
        "title": "<short title>",
        "description": "<detailed observation>",
        "severity": "low|medium|high",
        "evidence": [
          {
            "metric": "<field name>",
            "value": <number or string>,
            "comparison": "baseline|up_from_previous|down_from_previous|peak|trough|stable",
            "delta": <signed number or null>,
            "context": "<optional context string>"
          }
        ]
      }
    ],
    "educational_implications": ["<string>"],
    "recommendations": [
      {
        "priority": "low|medium|high",
        "action": "<specific action>",
        "rationale": "<why this action>"
      }
    ],
    "warnings": []
  },
  "confidence": {
    "level": "HIGH|MEDIUM|LOW",
    "reason": "<brief data quality note>"
  }
}

CRITICAL RULES:
- Generate 2–4 insights maximum
- evidence[] must use exact field names from the dataset
- Do NOT invent data points — only reference values present in the dataset
- Do NOT include markdown, code fences, or any text outside the JSON object
"""
        
        system_prompt = system_prompt.strip() + "\n\n" + json_format_instruction

        response = await _client.chat.completions.create(
            model  = MODEL,
            messages = [
                {"role": "system", "content": system_prompt},
                {"role": "user",   "content": user_prompt},
            ],
            max_tokens       = MAX_TOKENS,
            temperature      = TEMPERATURE,
            response_format  = {"type": "json_object"},
        )

        content = response.choices[0].message.content
        parsed  = json.loads(content)

        # Attach token usage to parsed dict for build_response
        parsed["_token_usage"] = {
            "prompt_tokens":     response.usage.prompt_tokens,
            "completion_tokens": response.usage.completion_tokens,
            "total_tokens":      response.usage.total_tokens,
        }
        parsed["_model"] = response.model

        return parsed

    # ── Shared: Response Builder ──────────────────────────────────────────────

    def build_response(
        self,
        request:      ExplainRequest,
        raw:          dict,
        safety_flags: list[str],
        latency_ms:   int,
    ) -> ExplainResponse:
        """
        Assembles ExplainResponse from raw LLM dict.
        Uses Pydantic model_validate — if LLM output doesn't match schema,
        ValidationError is raised → caller (main.py) returns DEGRADED.

        Also derives confidence.based_on[] via Python logic (not from LLM).
        """
        token_usage = raw.pop("_token_usage", None)
        model       = raw.pop("_model", MODEL)

        # Validate LLM-generated explanation body
        explanation = ExplanationBody.model_validate(raw.get("explanation", raw))

        # Derive confidence.based_on[] (Python logic — LLM doesn't decide this)
        confidence_level  = raw.get("confidence", {}).get("level") or \
                            (request.confidence.level if request.confidence else "MEDIUM")
        confidence_reason = raw.get("confidence", {}).get("reason") or \
                            (request.confidence.reason if request.confidence else "")
        based_on = self._derive_confidence_sources(confidence_level, request)

        confidence = ConfidenceInfo(
            level    = confidence_level,
            reason   = confidence_reason,
            based_on = based_on,
        )

        # Token usage + cost estimation
        tu = TokenUsage(**token_usage) if token_usage else None
        cost = self._estimate_cost(tu, model) if tu else None

        meta = AIMeta(
            model       = model,
            latency_ms  = latency_ms,
            token_usage = tu,
            strategy    = self.strategy_name,
            granularity = request.analysis_context.granularity if request.analysis_context else None,
            cost_usd    = cost,
        )

        return ExplainResponse(
            task_id              = request.task_id,
            execution_id         = request.execution_id,
            explanation          = explanation,
            confidence           = confidence,
            explanation_strategy = self.strategy_name,
            explanation_type     = self.strategy_name,
            safety_flags         = safety_flags,
            degraded             = False,
            meta                 = meta,
        )

    # ── Shared: Confidence Source Derivation ──────────────────────────────────

    def _derive_confidence_sources(self, level: str, req: ExplainRequest) -> list[str]:
        """
        Python-derived — NOT LLM-derived.
        Determines WHY confidence is at a given level from data signals.
        """
        if level == "HIGH":
            return ["sufficient_data"]

        sources = []
        if level == "LOW":
            sources.append("sparse_data")

        primary_rows = list(req.datasets.values())[0] if req.datasets else []
        vc = req.visualization_config
        ac = req.analysis_context

        # Temporal range check
        if ac and ac.granularity == "weekly" and vc and vc.x_field:
            weeks = len({row.get(vc.x_field) for row in primary_rows if row})
            if weeks < 4:
                sources.append("limited_temporal_range")

        # Single-student check
        if ac and ac.aggregation_level == "student" and len(primary_rows) < 3:
            sources.append("single_student")

        return sources or ["sparse_data"]

    # ── Shared: Cost Estimation ───────────────────────────────────────────────

    @staticmethod
    def _estimate_cost(tu: TokenUsage, model: str) -> float | None:
        """
        Rough cost estimate in USD based on OpenAI pricing.
        Updated rates for gpt-4o-mini (as of 2024).
        """
        rates = {
            "gpt-4o-mini":              (0.000150, 0.000600),   # input, output per 1K tokens
            "gpt-4o-mini-2024-07-18":   (0.000150, 0.000600),
            "gpt-4o":                   (0.005000, 0.015000),
            "gpt-3.5-turbo":            (0.000500, 0.001500),
        }
        model_key = next((k for k in rates if model.startswith(k)), None)
        if not model_key:
            return None
        in_rate, out_rate = rates[model_key]
        return round(
            (tu.prompt_tokens / 1000 * in_rate) +
            (tu.completion_tokens / 1000 * out_rate),
            6
        )

    # ── Shared: Data Summarizer (for user prompts) ────────────────────────────

    @staticmethod
    def summarize_datasets(req: ExplainRequest, max_rows: int = 20) -> str:
        """
        Converts datasets dict to a readable string for the user prompt.
        Truncates to max_rows to prevent token overflow.

        Example output:
          Dataset: score_over_time (12 rows)
          [{"week_due": 2, "avg_score": 74.5}, ...]
        """
        parts = []
        for label, rows in req.datasets.items():
            truncated = rows[:max_rows]
            suffix    = f"  [... {len(rows) - max_rows} more rows truncated]" \
                        if len(rows) > max_rows else ""
            parts.append(
                f"Dataset: {label} ({len(rows)} rows)\n"
                f"{json.dumps(truncated, indent=2)}{suffix}"
            )
        return "\n\n".join(parts)

    @staticmethod
    def get_audience_tone(target_audience: list[str]) -> str:
        """
        Returns tone instruction for the system prompt based on target audience.
        Priority: student > instructor > academic_advisor > admin
        """
        if "student" in target_audience:
            return (
                "Use an encouraging, supportive tone. Write in second person ('you', 'your'). "
                "Avoid academic jargon. Focus on what the student can improve."
            )
        if "instructor" in target_audience:
            return (
                "Use a professional, pedagogical tone. Write in third person. "
                "Focus on actionable teaching interventions and class-wide patterns."
            )
        if "academic_advisor" in target_audience:
            return (
                "Use an analytical, evidence-based tone. Be neutral and precise. "
                "Reference specific data points and confidence levels."
            )
        return (
            "Use a concise, system-level tone. Focus on aggregated patterns and "
            "administrative actions."
        )
