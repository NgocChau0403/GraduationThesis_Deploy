"""
Base Explanation Strategy
=========================
Abstract base class that all 7 strategy classes inherit from.

Each strategy handles ONE explanation_strategy value from taskRegistry:
  TrendStrategy        "trend"
  ComparisonStrategy   "comparison"
  DistributionStrategy "distribution"
  CorrelationStrategy  "correlation"
  RiskStrategy         "risk"
  BehavioralStrategy   "behavioral"
  RankingStrategy      "ranking"

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
import re

from pydantic import ValidationError

try:
    from openai import AsyncOpenAI
except ModuleNotFoundError:
    AsyncOpenAI = None

from schemas import (
    ExplainRequest, ExplainResponse,
    ExplanationBody, Insight, ConfidenceInfo, AIMeta, TokenUsage
)

logger = logging.getLogger("ai_service.strategy")

#  OpenAI client (singleton)
_client = AsyncOpenAI(api_key=os.environ.get("OPENAI_API_KEY")) if AsyncOpenAI else None

MODEL         = os.environ.get("OPENAI_MODEL", "gpt-4o-mini")
MAX_TOKENS    = int(os.environ.get("AI_MAX_TOKENS", "1200"))
TEMPERATURE   = float(os.environ.get("AI_TEMPERATURE", "0"))
SEED          = int(os.environ.get("AI_SEED", "42"))

TASK_AWARE_SUMMARY_METHOD = "task_aware_data_summarization"
BASELINE_SUMMARY_METHOD = "baseline_first_20_rows"
VALID_AI_SUMMARY_METHODS = {TASK_AWARE_SUMMARY_METHOD, BASELINE_SUMMARY_METHOD}


class BaseExplanationStrategy(ABC):
    """
    Base class for all explanation strategies.
    Subclasses override build_system_prompt and build_user_prompt only.
    All LLM call + response parsing logic lives here  not duplicated.
    """

    strategy_name: str = "base"

    #  Abstract interface 

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

    #  Shared: LLM Call 

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
          json.JSONDecodeError     if LLM returns non-JSON (shouldn't with JSON mode)
          openai.APIError          if API is down or rate-limited
          Any other Exception      caught by main.py  DEGRADED response
        """
        if _client is None:
            raise RuntimeError("openai package is not installed; cannot call LLM.")
        
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
- Generate 1 to 3 insights maximum
- Keep each insight and recommendation concise
- evidence[] must use exact field names from the dataset
- Do NOT invent data points  only reference values present in the dataset
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
            seed             = SEED,
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

    #  Shared: Response Builder 

    def build_response(
        self,
        request:      ExplainRequest,
        raw:          dict,
        safety_flags: list[str],
        latency_ms:   int,
    ) -> ExplainResponse:
        """
        Assembles ExplainResponse from raw LLM dict.
        Uses Pydantic model_validate  if LLM output doesn't match schema,
        ValidationError is raised  caller (main.py) returns DEGRADED.

        Also derives confidence.based_on[] via Python logic (not from LLM).
        """
        token_usage = raw.pop("_token_usage", None)
        model       = raw.pop("_model", MODEL)

        # Validate LLM-generated explanation body
        explanation = ExplanationBody.model_validate(raw.get("explanation", raw))
        if self._should_suppress_recommendations(request):
            explanation.recommendations = []
        if self._should_suppress_educational_implications(request):
            explanation.educational_implications = []
        self._normalize_task_aware_action_rationale(request, explanation)

        # Derive confidence.based_on[] (Python logic  LLM doesn't decide this)
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
            **self.get_summary_response_metadata(request),
        )

    #  Shared: Confidence Source Derivation 

    @staticmethod
    def _should_suppress_recommendations(req: ExplainRequest) -> bool:
        """
        Some task-aware dashboard cards already render concrete actions in the
        primary visualization. Keep the AI text explanatory so the UI does not
        show duplicated "Recommended action" and "Recommendations" sections.
        """
        if req.task_id == "A-G16":
            return True

        method, _warning = BaseExplanationStrategy._resolve_ai_summary_method()
        return (
            method == TASK_AWARE_SUMMARY_METHOD
            and req.task_id in {"S-T13", "A-S04", "A-S08"}
        )

    @staticmethod
    def _should_suppress_educational_implications(req: ExplainRequest) -> bool:
        """
        Some admin action cards already render concrete action guidance.
        Educational implications often become action wording, so keep the AI
        output to summary + evidence insights.
        """
        if req.task_id == "A-G16":
            return True

        method, _warning = BaseExplanationStrategy._resolve_ai_summary_method()
        return method == TASK_AWARE_SUMMARY_METHOD and req.task_id in {"A-S04", "A-S08"}

    @staticmethod
    def _normalize_task_aware_action_rationale(req: ExplainRequest, explanation: ExplanationBody) -> None:
        """
        Task-aware action cards already render the actual action text. The AI
        panel should therefore explain why each visible card item exists. LLMs
        sometimes drift back to generic titles such as "Low Engagement Score";
        normalize those into the task-specific "Why ..." titles used by the UI.
        """
        method, _warning = BaseExplanationStrategy._resolve_ai_summary_method()
        if method != TASK_AWARE_SUMMARY_METHOD:
            return

        if req.task_id == "A-S08":
            BaseExplanationStrategy._normalize_a_s08_rationale(req, explanation)
        elif req.task_id == "A-S04":
            BaseExplanationStrategy._normalize_a_s04_rationale(req, explanation)

    @staticmethod
    def _normalize_a_s08_rationale(req: ExplainRequest, explanation: ExplanationBody) -> None:
        step_titles = {
            "step1": "Why advisor check-in is Step 1",
            "step2": "Why engagement is Step 2",
            "step3": "Why time management is Step 3",
            "step4": "Why academic support is Step 4",
        }

        for insight in explanation.insights:
            normalized_title = BaseExplanationStrategy._a_s08_rationale_title(insight)
            if normalized_title:
                insight.title = normalized_title
            if insight.title.startswith("Why "):
                insight.description = BaseExplanationStrategy._append_rationale_sentence(
                    insight.description,
                    "This explains why that visible step is included on the 7-day card."
                )

        present = {insight.title for insight in explanation.insights}
        rows = BaseExplanationStrategy._flatten_dataset_rows(req)
        risk_score = BaseExplanationStrategy._first_numeric(rows, ["at_risk_score", "risk_score"])
        risk_label = BaseExplanationStrategy._first_text(rows, ["at_risk_label", "risk_label"])
        engagement = BaseExplanationStrategy._first_numeric(rows, ["engagement_score"])
        punctuality = BaseExplanationStrategy._first_numeric(rows, ["punctuality_rate", "submission_punctuality"])
        avg_score = BaseExplanationStrategy._first_numeric(rows, ["avg_score", "average_score"])

        if step_titles["step1"] not in present and (risk_score is not None or risk_label):
            value_text = BaseExplanationStrategy._format_metric_pair("risk score", risk_score, "risk label", risk_label)
            explanation.insights.insert(0, Insight(
                title=step_titles["step1"],
                description=f"The card starts with an advisor check-in rationale because {value_text} classifies this as an active risk case rather than passive monitoring.",
                severity="medium",
            ))

        if step_titles["step2"] not in {insight.title for insight in explanation.insights} and engagement is not None:
            explanation.insights.append(Insight(
                title=step_titles["step2"],
                description=f"Engagement score is {engagement:.2f}, below the 0.15 low-engagement threshold, so the card includes an engagement-focused rationale.",
                severity="high" if engagement < 0.15 else "medium",
            ))

        if step_titles["step3"] not in {insight.title for insight in explanation.insights} and punctuality is not None:
            explanation.insights.append(Insight(
                title=step_titles["step3"],
                description=f"Punctuality rate is {punctuality:.2f}, below the 0.70 expected threshold, so the card includes a time-management rationale.",
                severity="medium",
            ))

        if step_titles["step4"] not in {insight.title for insight in explanation.insights} and avg_score is not None:
            explanation.insights.append(Insight(
                title=step_titles["step4"],
                description=f"Average score is {avg_score:.2f}; this score context explains why academic performance remains visible in the 7-day plan.",
                severity="medium",
            ))

    @staticmethod
    def _a_s08_rationale_title(insight: Insight) -> str | None:
        title_text = insight.title.lower()
        evidence_text = " ".join(
            f"{item.metric} {item.value} {item.delta} {item.context}"
            for item in insight.evidence
        ).lower()
        primary_text = f"{title_text} {evidence_text}"
        description_text = insight.description.lower()

        if any(marker in primary_text for marker in ["advisor", "at_risk", "risk score", "risk label"]):
            return "Why advisor check-in is Step 1"
        if any(marker in primary_text for marker in ["punctuality", "submission", "deadline", "time management"]):
            return "Why time management is Step 3"
        if any(marker in primary_text for marker in ["engagement", "activity", "participation"]):
            return "Why engagement is Step 2"
        if any(marker in primary_text for marker in ["avg_score", "average score", "score", "academic"]):
            return "Why academic support is Step 4"

        if any(marker in description_text for marker in ["punctuality", "submission", "deadline", "time management"]):
            return "Why time management is Step 3"
        if any(marker in description_text for marker in ["engagement score", "active participation"]):
            return "Why engagement is Step 2"
        if any(marker in description_text for marker in ["average score", "academic performance"]):
            return "Why academic support is Step 4"
        if "risk" in description_text:
            return "Why advisor check-in is Step 1"

        return None

    @staticmethod
    def _normalize_a_s04_rationale(req: ExplainRequest, explanation: ExplanationBody) -> None:
        explanation.summary = BaseExplanationStrategy._clean_a_s04_summary(explanation.summary)
        for insight in explanation.insights:
            text = f"{insight.title} {insight.description}".lower()
            if "low score" in text or "average score" in text or "flag_low_score" in text:
                insight.title = "Why Low Score is High"
            elif "punctuality" in text or "flag_low_punctuality" in text:
                insight.title = "Why Low Punctuality is Active"
            elif "absence" in text or "flag_high_absence" in text:
                insight.title = "Why High Absence is Active"
            elif "trend" in text or "flag_neg_trend" in text:
                insight.title = "Why Negative Trend is Active"

            if insight.title.startswith("Why "):
                insight.description = BaseExplanationStrategy._clean_a_s04_description(insight.description)
                insight.description = BaseExplanationStrategy._append_rationale_sentence(
                    insight.description,
                    "This explains why that visible checklist flag is surfaced in the card."
                )

    @staticmethod
    def _clean_a_s04_summary(summary: str) -> str:
        replacements = {
            "flag_low_score": "Low Score",
            "flag_low_punctuality": "Low Punctuality",
            "flag_high_absence": "High Absence",
            "flag_neg_trend": "Negative Trend",
            "significant academic and time management challenges": "active score and punctuality risk signals",
            "academic and time management challenges": "score and punctuality risk signals",
        }
        cleaned = summary
        for old, new in replacements.items():
            cleaned = re.sub(re.escape(old), new, cleaned, flags=re.IGNORECASE)
        return cleaned

    @staticmethod
    def _clean_a_s04_description(description: str) -> str:
        replacements = {
            r",?\s*warranting attention\.?": ".",
            r"\bThis indicates a substantial gap in academic performance,?\s*": "This is the metric reason for the High severity label. ",
            r"\bThis reflects a critical issue in time management that could impact overall performance\.?": "This is the metric reason the punctuality flag is active.",
            r"\bcritical issue\b": "active risk signal",
            r"\bneeds?\b": "has",
            r"\brequires?\b": "has",
            r"\bshould\b": "can",
        }
        cleaned = description
        for pattern, replacement in replacements.items():
            cleaned = re.sub(pattern, replacement, cleaned, flags=re.IGNORECASE)
        cleaned = re.sub(r"\s+\.", ".", cleaned)
        cleaned = re.sub(r"\.{2,}", ".", cleaned)
        cleaned = re.sub(r"\s+", " ", cleaned).strip()
        return cleaned

    @staticmethod
    def _append_rationale_sentence(description: str, sentence: str) -> str:
        if sentence.lower() in description.lower():
            return description
        return f"{description.rstrip()} {sentence}"

    @staticmethod
    def _flatten_dataset_rows(req: ExplainRequest) -> list[dict]:
        return [
            row
            for rows in req.datasets.values()
            for row in rows
            if isinstance(row, dict)
        ]

    @staticmethod
    def _first_numeric(rows: list[dict], keys: list[str]) -> float | None:
        for row in rows:
            for key in keys:
                value = row.get(key)
                try:
                    numeric = float(value)
                except (TypeError, ValueError):
                    continue
                if numeric == numeric:
                    return numeric
        return None

    @staticmethod
    def _first_text(rows: list[dict], keys: list[str]) -> str | None:
        for row in rows:
            for key in keys:
                value = row.get(key)
                if value is None:
                    continue
                text = str(value).strip()
                if text:
                    return text
        return None

    @staticmethod
    def _format_metric_pair(label_a: str, value_a: float | None, label_b: str, value_b: str | None) -> str:
        parts = []
        if value_a is not None:
            parts.append(f"{label_a}={value_a:g}")
        if value_b:
            parts.append(f"{label_b}={value_b}")
        return " and ".join(parts) if parts else "the returned risk fields"

    def _derive_confidence_sources(self, level: str, req: ExplainRequest) -> list[str]:
        """
        Python-derived  NOT LLM-derived.
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

    #  Shared: Cost Estimation 

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

    #  Shared: Data Summarizer (for user prompts) 

    @staticmethod
    def summarize_datasets(req: ExplainRequest, max_rows: int = 20) -> str:
        """
        Entrypoint used by strategies to build prompt data summaries.
        AI_SUMMARY_METHOD chooses between the historical baseline and the
        task-aware summarizer without changing strategy call sites.
        """
        result = BaseExplanationStrategy.build_summary_result(req, max_rows=max_rows)
        BaseExplanationStrategy._attach_summary_metadata(req, result["metadata"])
        return result["summary_text"]

    @staticmethod
    def build_summary_result(
        req: ExplainRequest,
        max_rows: int = 20,
        method_override: str | None = None,
        include_debug_payload: bool = False,
    ) -> dict:
        method, warning = BaseExplanationStrategy._resolve_ai_summary_method(method_override)

        if method == BASELINE_SUMMARY_METHOD:
            summary_text, debug_payload = BaseExplanationStrategy.summarize_baseline_first_20_rows(
                req,
                max_rows=max_rows,
            )
            input_summary_type = "raw_first_20_rows"
            version = "baseline"
        else:
            summary, summary_text = BaseExplanationStrategy.summarize_task_aware_data_summarization(req)
            debug_payload = summary
            input_summary_type = summary.get("summary_type") or "task_aware_summary"
            version = "v1"

        metadata = {
            "ai_summary_method": method,
            "ai_summary_version": version,
            "baseline_available": True,
            "input_summary_type": input_summary_type,
        }
        if warning:
            metadata["ai_summary_method_warning"] = warning
        if include_debug_payload:
            metadata["summary_debug_payload"] = debug_payload

        return {
            "summary_text": summary_text,
            "metadata": metadata,
        }

    @staticmethod
    def summarize_task_aware_data_summarization(req: ExplainRequest) -> tuple[dict, str]:
        summary = BaseExplanationStrategy._build_task_aware_summary(req)
        return summary, BaseExplanationStrategy._dump_summary(summary)

    @staticmethod
    def summarize_baseline_first_20_rows(req: ExplainRequest, max_rows: int = 20) -> tuple[str, dict]:
        """
        Historical baseline prompt format: plain text dataset blocks containing
        rows[:max_rows]. Structured debug payload is separate from prompt text.
        """
        parts = []
        debug_datasets = []
        for label, rows in (req.datasets or {}).items():
            safe_rows = rows if isinstance(rows, list) else []
            truncated = safe_rows[:max_rows]
            truncated_count = max(len(safe_rows) - max_rows, 0)
            suffix = (
                f"  [... {truncated_count} more rows truncated]"
                if truncated_count > 0 else ""
            )
            parts.append(
                f"Dataset: {label} ({len(safe_rows)} rows)\n"
                f"{json.dumps(truncated, indent=2, ensure_ascii=False, default=str)}{suffix}"
            )
            debug_datasets.append({
                "dataset_name": label,
                "row_count": len(safe_rows),
                "included_row_count": len(truncated),
                "truncated_row_count": truncated_count,
                "rows": truncated,
            })

        debug_payload = {
            "summary_type": "baseline_first_20_rows",
            "input_summary_type": "raw_first_20_rows",
            "datasets": debug_datasets,
        }
        return "\n\n".join(parts), debug_payload

    @staticmethod
    def _build_task_aware_summary(req: ExplainRequest) -> dict:
        cfg = getattr(req, "ai_summary_config", None)
        if cfg and cfg.summary_type == "trend_comparison":
            return BaseExplanationStrategy._summarize_trend_comparison(req)
        elif cfg and cfg.summary_type == "categorical_distribution":
            return BaseExplanationStrategy._summarize_categorical_distribution(req)
        elif cfg and cfg.summary_type == "risk_flags":
            return BaseExplanationStrategy._summarize_risk_flags(req)
        elif cfg and cfg.summary_type == "trend_series":
            return BaseExplanationStrategy._summarize_trend_series(req)
        elif cfg and cfg.summary_type == "ranking":
            return BaseExplanationStrategy._summarize_ranking(req)
        elif cfg and cfg.summary_type == "numeric_distribution":
            return BaseExplanationStrategy._summarize_numeric_distribution(req)
        elif cfg and cfg.summary_type == "group_comparison":
            return BaseExplanationStrategy._summarize_group_comparison(req)
        elif cfg and cfg.summary_type == "correlation_evidence":
            return BaseExplanationStrategy._summarize_correlation_evidence(req)
        return BaseExplanationStrategy._summarize_generic(req)

    @staticmethod
    def _resolve_ai_summary_method(method_override: str | None = None) -> tuple[str, str | None]:
        raw_method = method_override if method_override is not None else os.environ.get("AI_SUMMARY_METHOD")
        method = (raw_method or TASK_AWARE_SUMMARY_METHOD).strip()
        if method in VALID_AI_SUMMARY_METHODS:
            return method, None

        warning = (
            f"Invalid AI_SUMMARY_METHOD={method}; "
            f"fallback to {TASK_AWARE_SUMMARY_METHOD}"
        )
        logger.warning(warning)
        return TASK_AWARE_SUMMARY_METHOD, warning

    @staticmethod
    def _attach_summary_metadata(req: ExplainRequest, metadata: dict) -> None:
        object.__setattr__(req, "_ai_summary_metadata", metadata)

    @staticmethod
    def get_summary_response_metadata(req: ExplainRequest) -> dict:
        metadata = getattr(req, "_ai_summary_metadata", None)
        if metadata:
            return {k: v for k, v in metadata.items() if k != "summary_debug_payload"}

        method, warning = BaseExplanationStrategy._resolve_ai_summary_method()
        if method == BASELINE_SUMMARY_METHOD:
            result = {
                "ai_summary_method": BASELINE_SUMMARY_METHOD,
                "ai_summary_version": "baseline",
                "baseline_available": True,
                "input_summary_type": "raw_first_20_rows",
            }
        else:
            result = {
                "ai_summary_method": TASK_AWARE_SUMMARY_METHOD,
                "ai_summary_version": "v1",
                "baseline_available": True,
                "input_summary_type": "task_aware_summary",
            }
        if warning:
            result["ai_summary_method_warning"] = warning
        return result

    @staticmethod
    def _dump_summary(summary: dict, char_limit: int = 10000) -> str:
        text = json.dumps(summary, indent=2, ensure_ascii=False, default=str)
        if len(text) <= char_limit:
            return text

        trimmed = dict(summary)
        warnings = list(trimmed.get("summarization_warnings") or [])
        warnings.append(f"DATA SUMMARY truncated to {char_limit} characters.")
        trimmed["summarization_warnings"] = warnings

        for key in ("generic_diagnostic_sample", "categorical_group_samples", "first_rows", "last_rows"):
            if key in trimmed:
                trimmed.pop(key, None)

        text = json.dumps(trimmed, indent=2, ensure_ascii=False, default=str)
        if len(text) <= char_limit:
            return text

        minimal = {
            "summary_type": summary.get("summary_type", "unknown"),
            "summary_truncated": True,
            "summarization_warnings": warnings,
        }
        for key in (
            "dataset_name",
            "row_count",
            "target_group",
            "comparison_groups",
            "entity_column",
            "metric_column",
            "sort_direction",
            "top_items",
            "bottom_items",
            "median_item",
            "metric_stats",
            "tie_warnings",
            "flag_evidence",
            "group_metrics",
            "gaps",
            "dominant_group",
            "weakest_group",
            "low_count_warnings",
            "fairness_warnings",
            "x_column",
            "y_column",
            "coefficient",
            "coefficient_method",
            "coefficient_source",
            "sample_size",
            "p_value",
            "outliers",
            "direction",
            "strength",
            "strength_claim_allowed",
            "significance_claim_allowed",
            "parse_warnings",
            "statistical_warnings",
            "causal_claim_allowed",
        ):
            if key in summary:
                minimal[key] = summary[key]
        return json.dumps(minimal, indent=2, ensure_ascii=False, default=str)

    @staticmethod
    def _select_primary_dataset(req: ExplainRequest) -> tuple[str | None, list[dict]]:
        datasets = req.datasets or {}
        for label in req.query_labels or []:
            rows = datasets.get(label)
            if isinstance(rows, list):
                return label, rows
        for label, rows in datasets.items():
            if isinstance(rows, list):
                return label, rows
        return None, []

    @staticmethod
    def _parse_number(value) -> float | None:
        if value is None or isinstance(value, bool):
            return None
        if isinstance(value, (int, float)):
            return float(value)
        if isinstance(value, str):
            stripped = value.strip()
            if not stripped:
                return None
            try:
                return float(stripped)
            except ValueError:
                return None
        return None

    @staticmethod
    def _clean_number(value):
        parsed = BaseExplanationStrategy._parse_number(value)
        if parsed is None:
            return value
        return round(parsed, 4)

    @staticmethod
    def _compact_row(row: dict, max_fields: int = 12) -> dict:
        if not isinstance(row, dict):
            return {}
        compact = {}
        for key in list(row.keys())[:max_fields]:
            value = row.get(key)
            if isinstance(value, str) and len(value) > 120:
                value = value[:117] + "..."
            compact[key] = value
        return compact

    @staticmethod
    def _summarize_trend_comparison(req: ExplainRequest) -> dict:
        cfg = req.ai_summary_config
        dataset_name, rows = BaseExplanationStrategy._select_primary_dataset(req)

        summary = {
            "summary_type": "trend_comparison",
            "dataset_name": dataset_name,
            "row_count": len(rows),
            "target_group": cfg.target_group if cfg else None,
            "comparison_groups": cfg.comparison_groups if cfg else [],
            "target_trend": None,
            "comparison_trends": {},
            "reliability_warnings": [],
            "summarization_warnings": [],
        }

        if not rows:
            summary["summarization_warnings"].append("Primary dataset is empty.")
            return summary

        required = [
            cfg.group_column if cfg else None,
            cfg.time_column if cfg else None,
            cfg.metric_column if cfg else None,
            cfg.target_group if cfg else None,
        ]
        if any(not item for item in required):
            summary["summarization_warnings"].append(
                "trend_comparison config is incomplete; generic diagnostic sample included."
            )
            summary["generic_diagnostic_sample"] = BaseExplanationStrategy._summarize_generic(req, max_datasets=1)
            return summary

        group_col = cfg.group_column
        time_col = cfg.time_column
        metric_col = cfg.metric_column
        rel_col = cfg.reliability_column
        min_reliable = cfg.minimum_reliable_count

        groups: dict[str, list[dict]] = {}
        invalid_metric_rows = 0
        invalid_time_rows = 0

        for row in rows:
            if not isinstance(row, dict):
                continue
            group_value = row.get(group_col)
            time_value = BaseExplanationStrategy._parse_number(row.get(time_col))
            metric_value = BaseExplanationStrategy._parse_number(row.get(metric_col))
            if time_value is None:
                invalid_time_rows += 1
                continue
            if metric_value is None:
                invalid_metric_rows += 1
                continue

            normalized = dict(row)
            normalized["_ai_time_value"] = time_value
            normalized["_ai_metric_value"] = metric_value
            normalized["_ai_reliability_value"] = (
                BaseExplanationStrategy._parse_number(row.get(rel_col)) if rel_col else None
            )
            groups.setdefault(str(group_value), []).append(normalized)

        available_groups = sorted(groups.keys())
        summary["available_groups"] = available_groups
        if invalid_time_rows:
            summary["summarization_warnings"].append(
                f"Skipped {invalid_time_rows} rows with invalid {time_col}."
            )
        if invalid_metric_rows:
            summary["summarization_warnings"].append(
                f"Skipped {invalid_metric_rows} rows with invalid {metric_col}."
            )

        target_rows = groups.get(str(cfg.target_group), [])
        if not target_rows:
            summary["target_group_missing"] = True
            summary["summarization_warnings"].append(
                f"Target group '{cfg.target_group}' is missing from {group_col}; do not infer target trend."
            )
            summary["generic_diagnostic_sample"] = BaseExplanationStrategy._summarize_generic(req, max_datasets=1)
            return summary

        target_rows.sort(key=lambda row: row["_ai_time_value"])
        target_trend = BaseExplanationStrategy._summarize_one_trend_group(
            rows=target_rows,
            group_name=str(cfg.target_group),
            time_col=time_col,
            metric_col=metric_col,
            rel_col=rel_col,
            min_reliable=min_reliable,
        )
        summary["target_trend"] = target_trend
        summary["reliability_warnings"].extend(target_trend.get("reliability_warnings") or [])

        for group in cfg.comparison_groups or []:
            group_rows = groups.get(str(group), [])
            if not group_rows:
                summary["comparison_trends"][str(group)] = {
                    "group": str(group),
                    "missing": True,
                }
                summary["summarization_warnings"].append(
                    f"Comparison group '{group}' is missing from {group_col}."
                )
                continue
            group_rows.sort(key=lambda row: row["_ai_time_value"])
            comparison = BaseExplanationStrategy._summarize_one_trend_group(
                rows=group_rows,
                group_name=str(group),
                time_col=time_col,
                metric_col=metric_col,
                rel_col=rel_col,
                min_reliable=min_reliable,
                include_reliability_warnings=False,
            )
            comparison.pop("reliability_warnings", None)
            summary["comparison_trends"][str(group)] = comparison

        return summary

    @staticmethod
    def _summarize_one_trend_group(
        rows: list[dict],
        group_name: str,
        time_col: str,
        metric_col: str,
        rel_col: str | None,
        min_reliable: int | float | None,
        include_reliability_warnings: bool = True,
    ) -> dict:
        def point(row: dict) -> dict:
            result = {
                time_col: BaseExplanationStrategy._clean_number(row.get(time_col)),
                metric_col: round(row["_ai_metric_value"], 4),
            }
            if rel_col:
                result[rel_col] = BaseExplanationStrategy._clean_number(row.get(rel_col))
            return result

        def change(prev: dict, curr: dict) -> dict:
            delta = curr["_ai_metric_value"] - prev["_ai_metric_value"]
            return {
                "from": point(prev),
                "to": point(curr),
                "delta": round(delta, 4),
            }

        changes = [change(rows[i - 1], rows[i]) for i in range(1, len(rows))]
        drops = [item for item in changes if item["delta"] < 0]
        rises = [item for item in changes if item["delta"] > 0]
        peak = max(rows, key=lambda row: row["_ai_metric_value"])
        trough = min(rows, key=lambda row: row["_ai_metric_value"])

        reliable_drops = []
        if rel_col and min_reliable is not None:
            for i in range(1, len(rows)):
                prev = rows[i - 1]
                curr = rows[i]
                prev_rel = prev.get("_ai_reliability_value")
                curr_rel = curr.get("_ai_reliability_value")
                if (
                    prev_rel is not None
                    and curr_rel is not None
                    and prev_rel >= min_reliable
                    and curr_rel >= min_reliable
                    and curr["_ai_metric_value"] < prev["_ai_metric_value"]
                ):
                    reliable_drops.append(change(prev, curr))

        reliability_warnings = []
        if include_reliability_warnings and rel_col and min_reliable is not None:
            low_count_points = [
                point(row)
                for row in rows
                if row.get("_ai_reliability_value") is not None
                and row["_ai_reliability_value"] < min_reliable
            ]
            if low_count_points:
                reliability_warnings.append({
                    "warning": f"{len(low_count_points)} {group_name} points have {rel_col} below {min_reliable}; avoid over-weighting these weeks.",
                    "low_count_points": low_count_points[:10],
                })

        return {
            "group": group_name,
            "point_count": len(rows),
            "first_point": point(rows[0]),
            "last_point": point(rows[-1]),
            "peak": point(peak),
            "trough": point(trough),
            "largest_adjacent_drop": min(drops, key=lambda item: item["delta"]) if drops else None,
            "largest_adjacent_rise": max(rises, key=lambda item: item["delta"]) if rises else None,
            "largest_reliable_adjacent_drop": min(reliable_drops, key=lambda item: item["delta"]) if reliable_drops else None,
            "reliability_warnings": reliability_warnings,
        }

    @staticmethod
    def _summarize_categorical_distribution(req: ExplainRequest) -> dict:
        cfg = req.ai_summary_config
        dataset_name, rows = BaseExplanationStrategy._select_primary_dataset(req)

        category_col = cfg.category_column if cfg else None
        count_col = cfg.count_column if cfg else None
        percent_col = cfg.percent_column if cfg else None
        metric_cols = list(cfg.metric_columns or []) if cfg else []
        focus_categories = list(cfg.focus_categories or []) if cfg else []
        expected_categories = list(cfg.expected_categories or []) if cfg else []

        summary = {
            "summary_type": "categorical_distribution",
            "dataset_name": dataset_name,
            "row_count": len(rows),
            "category_column": category_col,
            "count_column": count_col,
            "percent_column": percent_col,
            "total_count": 0,
            "category_distribution": [],
            "largest_category": None,
            "focus_categories": focus_categories,
            "focus_total": {
                "categories": focus_categories,
                "present_categories": [],
                "missing_categories": [],
                "count": 0,
                "percent": None,
            },
            "missing_expected_categories": [],
            "missing_focus_categories": [],
            "metric_columns": metric_cols,
            "metric_evidence_by_category": {},
            "summarization_warnings": [],
        }

        if not rows:
            summary["summarization_warnings"].append("Primary dataset is empty.")
            return summary

        dict_rows = [row for row in rows if isinstance(row, dict)]
        if not dict_rows:
            summary["summarization_warnings"].append("Primary dataset has no object rows.")
            return summary

        missing_required = []
        if not category_col:
            missing_required.append("category_column")
        if not count_col:
            missing_required.append("count_column")

        available_columns = set()
        for row in dict_rows:
            available_columns.update(row.keys())

        for column in (category_col, count_col):
            if column and column not in available_columns:
                missing_required.append(column)

        if missing_required:
            summary["summarization_warnings"].append(
                "categorical_distribution config is incomplete or required columns are missing: "
                + ", ".join(missing_required)
            )
            summary["generic_diagnostic_sample"] = BaseExplanationStrategy._summarize_generic(req, max_datasets=1)
            return summary

        for column in [percent_col, *metric_cols]:
            if column and column not in available_columns:
                summary["summarization_warnings"].append(
                    f"Configured optional column '{column}' is missing from dataset."
                )

        entries = []
        invalid_count_rows = 0
        invalid_percent_rows = 0
        invalid_metric_counts = {column: 0 for column in metric_cols}

        for index, row in enumerate(dict_rows):
            category_raw = row.get(category_col)
            category = "Unknown" if category_raw is None else str(category_raw)
            count = BaseExplanationStrategy._parse_number(row.get(count_col))
            if count is None:
                invalid_count_rows += 1
                continue

            percent = None
            if percent_col:
                percent = BaseExplanationStrategy._parse_number(row.get(percent_col))
                if row.get(percent_col) is not None and percent is None:
                    invalid_percent_rows += 1

            metrics = {}
            for column in metric_cols:
                metric_value = BaseExplanationStrategy._parse_number(row.get(column))
                if row.get(column) is not None and metric_value is None:
                    invalid_metric_counts[column] += 1
                elif metric_value is not None:
                    metrics[column] = round(metric_value, 4)

            entries.append({
                "category": category,
                "count": round(count, 4),
                "percent": round(percent, 4) if percent is not None else None,
                "metrics": metrics,
                "_row_index": index,
            })

        if invalid_count_rows:
            summary["summarization_warnings"].append(
                f"Skipped {invalid_count_rows} rows with invalid {count_col}."
            )
        if invalid_percent_rows and percent_col:
            summary["summarization_warnings"].append(
                f"Found {invalid_percent_rows} rows with invalid {percent_col}; percent evidence is partial."
            )
        for column, invalid_count in invalid_metric_counts.items():
            if invalid_count:
                summary["summarization_warnings"].append(
                    f"Found {invalid_count} rows with invalid {column}; metric evidence is partial."
                )

        if not entries:
            summary["summarization_warnings"].append("No valid category rows remained after parsing counts.")
            return summary

        order = list(cfg.category_order or []) if cfg else []
        if order:
            order_index = {str(category): index for index, category in enumerate(order)}
            entries.sort(key=lambda item: (order_index.get(item["category"], len(order)), item["_row_index"]))
        elif cfg and cfg.sort_by:
            sort_by = cfg.sort_by
            reverse = str(cfg.sort_direction or "").lower() == "desc"

            def sort_value(item: dict):
                if sort_by == category_col:
                    return item["category"]
                if sort_by == count_col:
                    return item["count"]
                if percent_col and sort_by == percent_col:
                    return item["percent"] if item["percent"] is not None else float("-inf")
                return item["metrics"].get(sort_by, float("-inf"))

            entries.sort(key=sort_value, reverse=reverse)

        present_categories = {item["category"] for item in entries}
        summary["missing_expected_categories"] = [
            category for category in expected_categories
            if str(category) not in present_categories
        ]
        summary["missing_focus_categories"] = [
            category for category in focus_categories
            if str(category) not in present_categories
        ]

        if summary["missing_expected_categories"]:
            summary["summarization_warnings"].append(
                "Expected categories missing from dataset: "
                + ", ".join(map(str, summary["missing_expected_categories"]))
            )
        if summary["missing_focus_categories"]:
            summary["summarization_warnings"].append(
                "Focus categories missing from dataset: "
                + ", ".join(map(str, summary["missing_focus_categories"]))
            )

        total_count = sum(item["count"] for item in entries)
        summary["total_count"] = round(total_count, 4)
        largest = max(entries, key=lambda item: item["count"])
        summary["largest_category"] = {
            "category": largest["category"],
            "count": largest["count"],
            "percent": largest["percent"],
        }

        percent_values = [item["percent"] for item in entries if item["percent"] is not None]
        if percent_col and percent_values:
            percent_total = round(sum(percent_values), 4)
            summary["percent_total"] = percent_total
            if percent_total < 99 or percent_total > 101:
                summary["summarization_warnings"].append(
                    f"Percent total for {percent_col} is {percent_total}, outside expected 99-101 range."
                )

        focus_set = {str(category) for category in focus_categories}
        focus_entries = [item for item in entries if item["category"] in focus_set]
        focus_percent_values = [item["percent"] for item in focus_entries if item["percent"] is not None]
        summary["focus_total"] = {
            "categories": focus_categories,
            "present_categories": [item["category"] for item in focus_entries],
            "missing_categories": summary["missing_focus_categories"],
            "count": round(sum(item["count"] for item in focus_entries), 4),
            "percent": round(sum(focus_percent_values), 4) if focus_percent_values else None,
        }

        distribution = []
        metric_evidence = {}
        for item in entries:
            public_item = {
                "category": item["category"],
                "count": item["count"],
                "percent": item["percent"],
            }
            if item["metrics"]:
                public_item["metrics"] = item["metrics"]
                metric_evidence[item["category"]] = item["metrics"]
            distribution.append(public_item)

        summary["category_distribution"] = distribution[:40]
        if len(distribution) > 40:
            summary["summarization_warnings"].append(
                f"Category distribution capped at 40 of {len(distribution)} categories."
            )
        summary["metric_evidence_by_category"] = metric_evidence

        return summary

    @staticmethod
    def _parse_triggered(value) -> tuple[bool | None, bool]:
        if isinstance(value, bool):
            return value, True
        if isinstance(value, int) and not isinstance(value, bool):
            if value == 1:
                return True, True
            if value == 0:
                return False, True
        if isinstance(value, str):
            normalized = value.strip().lower()
            if normalized in {"true", "1"}:
                return True, True
            if normalized in {"false", "0"}:
                return False, True
        return None, False

    @staticmethod
    def _risk_value(raw_value):
        parsed = BaseExplanationStrategy._parse_number(raw_value)
        return round(parsed, 4) if parsed is not None else raw_value

    @staticmethod
    def _summarize_risk_flags(req: ExplainRequest) -> dict:
        cfg = req.ai_summary_config
        dataset_name, rows = BaseExplanationStrategy._select_primary_dataset(req)

        flag_name_col = cfg.flag_name_column if cfg else None
        flag_value_col = cfg.flag_value_column if cfg else None
        threshold_col = cfg.threshold_column if cfg else None
        triggered_col = cfg.triggered_column if cfg else None
        severity_col = cfg.severity_column if cfg else None
        description_col = cfg.description_column if cfg else None
        action_col = cfg.recommended_action_column if cfg else None
        support_col = cfg.support_category_column if cfg else None
        severity_order = [str(item) for item in (cfg.severity_order or [])] if cfg else []
        flag_order = [str(item) for item in (cfg.flag_order or [])] if cfg else []
        max_flags = cfg.max_flags if cfg and cfg.max_flags else 20

        summary = {
            "summary_type": "risk_flags",
            "dataset_name": dataset_name,
            "row_count": len(rows),
            "total_flags": 0,
            "triggered_count": 0,
            "non_triggered_count": 0,
            "unknown_triggered_count": 0,
            "severity_available": False,
            "severity_counts": {},
            "triggered_flags": [],
            "non_triggered_flags": [],
            "highest_severity_triggered": None,
            "threshold_evidence": [],
            "recommended_actions": [],
            "summarization_warnings": [],
        }

        if not rows:
            summary["summarization_warnings"].append("Primary dataset is empty.")
            return summary

        dict_rows = [row for row in rows if isinstance(row, dict)]
        if not dict_rows:
            summary["summarization_warnings"].append("Primary dataset has no object rows.")
            return summary

        required = {
            "flag_name_column": flag_name_col,
            "flag_value_column": flag_value_col,
            "threshold_column": threshold_col,
            "triggered_column": triggered_col,
        }
        missing_required = [name for name, column in required.items() if not column]

        available_columns = set()
        for row in dict_rows:
            available_columns.update(row.keys())

        for column in [flag_name_col, flag_value_col, threshold_col, triggered_col]:
            if column and column not in available_columns:
                missing_required.append(column)

        if missing_required:
            summary["summarization_warnings"].append(
                "risk_flags config is incomplete or required columns are missing: "
                + ", ".join(missing_required)
            )
            summary["generic_diagnostic_sample"] = BaseExplanationStrategy._summarize_generic(req, max_datasets=1)
            return summary

        for column in [severity_col, description_col, action_col, support_col]:
            if column and column not in available_columns:
                summary["summarization_warnings"].append(
                    f"Configured optional column '{column}' is missing from dataset."
                )

        severity_available = bool(severity_col and severity_col in available_columns)
        summary["severity_available"] = severity_available

        severity_rank = {severity: index for index, severity in enumerate(severity_order)}
        flag_rank = {flag_name: index for index, flag_name in enumerate(flag_order)}
        entries = []

        for index, row in enumerate(dict_rows):
            flag_name = str(row.get(flag_name_col))
            raw_triggered = row.get(triggered_col)
            triggered, recognized = BaseExplanationStrategy._parse_triggered(raw_triggered)
            if not recognized:
                summary["unknown_triggered_count"] += 1
                summary["summarization_warnings"].append(
                    f"Unrecognized triggered value for {flag_name}: {raw_triggered!r}; value was not guessed."
                )

            raw_flag_value = row.get(flag_value_col)
            raw_threshold = row.get(threshold_col)
            entry = {
                "flag_name": flag_name,
                "triggered": triggered,
                "triggered_raw": raw_triggered,
                "flag_value": BaseExplanationStrategy._risk_value(raw_flag_value),
                "flag_value_raw": raw_flag_value,
                "threshold": BaseExplanationStrategy._risk_value(raw_threshold),
                "threshold_raw": raw_threshold,
                "_row_index": index,
            }

            if severity_available:
                severity = row.get(severity_col)
                if severity is not None:
                    entry["severity"] = str(severity)
                    summary["severity_counts"][entry["severity"]] = (
                        summary["severity_counts"].get(entry["severity"], 0) + 1
                    )
            if description_col and description_col in row and row.get(description_col) is not None:
                entry["flag_description"] = row.get(description_col)
            if action_col and action_col in row and row.get(action_col) is not None:
                entry["recommended_action"] = row.get(action_col)
            if support_col and support_col in row and row.get(support_col) is not None:
                entry["support_category"] = row.get(support_col)

            entries.append(entry)

        summary["total_flags"] = len(entries)
        summary["triggered_count"] = sum(1 for entry in entries if entry["triggered"] is True)
        summary["non_triggered_count"] = sum(1 for entry in entries if entry["triggered"] is False)

        def sort_key(entry: dict) -> tuple:
            severity = entry.get("severity")
            severity_index = severity_rank.get(str(severity), len(severity_rank))
            flag_index = flag_rank.get(entry["flag_name"], len(flag_rank))
            return (severity_index, flag_index, entry["_row_index"])

        triggered_entries = sorted(
            [entry for entry in entries if entry["triggered"] is True],
            key=sort_key,
        )
        other_entries = sorted(
            [entry for entry in entries if entry["triggered"] is not True],
            key=lambda entry: (
                0 if entry["triggered"] is False else 1,
                flag_rank.get(entry["flag_name"], len(flag_rank)),
                entry["_row_index"],
            ),
        )

        emitted = triggered_entries[:max_flags]
        remaining_slots = max_flags - len(emitted)
        if remaining_slots > 0:
            emitted.extend(other_entries[:remaining_slots])

        if len(entries) > max_flags:
            summary["summarization_warnings"].append(
                f"Risk flags capped at {max_flags} of {len(entries)} rows after prioritizing triggered flags."
            )

        def public_flag(entry: dict) -> dict:
            result = {
                "flag_name": entry["flag_name"],
                "triggered": entry["triggered"],
            }
            if entry["triggered"] is None:
                result["triggered_raw"] = entry["triggered_raw"]
            for key in ("severity", "flag_description", "recommended_action", "support_category"):
                if key in entry:
                    result[key] = entry[key]
            return result

        def threshold_item(entry: dict) -> dict:
            return {
                "flag_name": entry["flag_name"],
                "flag_value": entry["flag_value"],
                "flag_value_raw": entry["flag_value_raw"],
                "threshold": entry["threshold"],
                "threshold_raw": entry["threshold_raw"],
                "triggered": entry["triggered"],
                "triggered_raw": entry["triggered_raw"],
            }

        summary["triggered_flags"] = [
            public_flag(entry) for entry in emitted if entry["triggered"] is True
        ]
        summary["non_triggered_flags"] = [
            public_flag(entry) for entry in emitted if entry["triggered"] is not True
        ]
        summary["threshold_evidence"] = [threshold_item(entry) for entry in emitted]
        summary["recommended_actions"] = [
            {
                "flag_name": entry["flag_name"],
                "recommended_action": entry["recommended_action"],
            }
            for entry in emitted
            if entry["triggered"] is True and entry.get("recommended_action") is not None
        ]

        if triggered_entries and severity_available:
            first = triggered_entries[0]
            summary["highest_severity_triggered"] = first.get("severity")

        return summary

    @staticmethod
    def _summarize_trend_series(req: ExplainRequest) -> dict:
        cfg = req.ai_summary_config
        dataset_name, rows = BaseExplanationStrategy._select_primary_dataset(req)

        time_col = cfg.time_column if cfg else None
        metric_col = cfg.metric_column if cfg else None
        secondary_cols = list(cfg.secondary_metric_columns or []) if cfg else []
        flag_cols = list(cfg.flag_columns or []) if cfg else []
        action_cols = list(cfg.action_columns or []) if cfg else []
        label_cols = list(cfg.label_columns or []) if cfg else []
        max_points = cfg.max_points if cfg and cfg.max_points else 30
        sort_desc = str(cfg.sort_direction or "asc").lower() == "desc" if cfg else False

        summary = {
            "summary_type": "trend_series",
            "dataset_name": dataset_name,
            "row_count": len(rows),
            "time_column": time_col,
            "metric_column": metric_col,
            "point_count": 0,
            "first_point": None,
            "last_point": None,
            "peak": None,
            "trough": None,
            "overall_change": None,
            "largest_adjacent_drop": None,
            "largest_adjacent_rise": None,
            "flagged_points": [],
            "secondary_metric_evidence": {},
            "action_evidence": [],
            "summarization_warnings": [],
        }

        if not rows:
            summary["summarization_warnings"].append("Primary dataset is empty.")
            return summary

        dict_rows = [row for row in rows if isinstance(row, dict)]
        if not dict_rows:
            summary["summarization_warnings"].append("Primary dataset has no object rows.")
            return summary

        missing_required = []
        if not time_col:
            missing_required.append("time_column")
        if not metric_col:
            missing_required.append("metric_column")

        available_columns = set()
        for row in dict_rows:
            available_columns.update(row.keys())
        for column in (time_col, metric_col):
            if column and column not in available_columns:
                missing_required.append(column)

        if missing_required:
            summary["summarization_warnings"].append(
                "trend_series config is incomplete or required columns are missing: "
                + ", ".join(missing_required)
            )
            summary["generic_diagnostic_sample"] = BaseExplanationStrategy._summarize_generic(req, max_datasets=1)
            return summary

        for column in [*secondary_cols, *flag_cols, *action_cols, *label_cols]:
            if column and column not in available_columns:
                summary["summarization_warnings"].append(
                    f"Configured optional column '{column}' is missing from dataset."
                )

        invalid_time_rows = 0
        invalid_metric_rows = 0
        invalid_flag_values = 0
        points = []

        for index, row in enumerate(dict_rows):
            time_value = BaseExplanationStrategy._parse_number(row.get(time_col))
            metric_value = BaseExplanationStrategy._parse_number(row.get(metric_col))
            if time_value is None:
                invalid_time_rows += 1
                continue
            if metric_value is None:
                invalid_metric_rows += 1
                continue

            labels = {
                column: row.get(column)
                for column in label_cols
                if column in row and row.get(column) is not None
            }
            secondary = {
                column: BaseExplanationStrategy._risk_value(row.get(column))
                for column in secondary_cols
                if column in row and row.get(column) is not None
            }
            actions = {
                column: row.get(column)
                for column in action_cols
                if column in row and row.get(column) is not None
            }
            flags = {}
            raw_flags = {}
            for column in flag_cols:
                if column not in row:
                    continue
                parsed_flag, recognized = BaseExplanationStrategy._parse_triggered(row.get(column))
                raw_flags[column] = row.get(column)
                if recognized:
                    flags[column] = parsed_flag
                elif row.get(column) is not None:
                    invalid_flag_values += 1
                    flags[column] = None
                    summary["summarization_warnings"].append(
                        f"Unrecognized flag value for {column} at {time_col}={row.get(time_col)!r}: {row.get(column)!r}; value was not guessed."
                    )

            points.append({
                time_col: BaseExplanationStrategy._risk_value(row.get(time_col)),
                metric_col: round(metric_value, 4),
                "labels": labels,
                "secondary_metrics": secondary,
                "flags": flags,
                "flag_raw_values": raw_flags,
                "actions": actions,
                "_time_value": time_value,
                "_metric_value": metric_value,
                "_row_index": index,
            })

        if invalid_time_rows:
            summary["summarization_warnings"].append(
                f"Skipped {invalid_time_rows} rows with invalid {time_col}."
            )
        if invalid_metric_rows:
            summary["summarization_warnings"].append(
                f"Skipped {invalid_metric_rows} rows with invalid {metric_col}."
            )
        if invalid_flag_values:
            summary["summarization_warnings"].append(
                f"Found {invalid_flag_values} unrecognized configured flag values; flagged_points only use recognized true values."
            )

        if not points:
            summary["summarization_warnings"].append("No valid trend points remained after parsing time and metric values.")
            return summary

        points.sort(key=lambda point: point["_time_value"], reverse=sort_desc)
        summary["point_count"] = len(points)

        def public_point(point: dict, include_flags: bool = False) -> dict:
            result = {
                time_col: point[time_col],
                metric_col: point[metric_col],
            }
            if point["labels"]:
                result["labels"] = point["labels"]
            if point["secondary_metrics"]:
                result["secondary_metrics"] = point["secondary_metrics"]
            if include_flags and point["flags"]:
                result["flags"] = point["flags"]
                result["flag_raw_values"] = point["flag_raw_values"]
            return result

        def change(prev: dict, curr: dict) -> dict:
            delta = curr["_metric_value"] - prev["_metric_value"]
            return {
                "from": public_point(prev),
                "to": public_point(curr),
                "delta": round(delta, 4),
            }

        first = points[0]
        last = points[-1]
        peak = max(points, key=lambda point: point["_metric_value"])
        trough = min(points, key=lambda point: point["_metric_value"])
        changes = [change(points[i - 1], points[i]) for i in range(1, len(points))]
        drops = [item for item in changes if item["delta"] < 0]
        rises = [item for item in changes if item["delta"] > 0]
        delta = last["_metric_value"] - first["_metric_value"]
        percent_change = None
        if first["_metric_value"] != 0:
            percent_change = round((delta / first["_metric_value"]) * 100, 4)

        summary["first_point"] = public_point(first)
        summary["last_point"] = public_point(last)
        summary["peak"] = public_point(peak)
        summary["trough"] = public_point(trough)
        summary["overall_change"] = {
            "from": public_point(first),
            "to": public_point(last),
            "delta": round(delta, 4),
            "percent_change": percent_change,
        }
        summary["largest_adjacent_drop"] = min(drops, key=lambda item: item["delta"]) if drops else None
        summary["largest_adjacent_rise"] = max(rises, key=lambda item: item["delta"]) if rises else None

        emitted_points = points[:max_points]
        if len(points) > max_points:
            summary["summarization_warnings"].append(
                f"Trend points capped at {max_points} of {len(points)} rows."
            )

        flagged = [
            public_point(point, include_flags=True)
            for point in emitted_points
            if any(value is True for value in point["flags"].values())
        ]
        summary["flagged_points"] = flagged[:max_points]

        secondary_evidence = {}
        for column in secondary_cols:
            values = [
                BaseExplanationStrategy._parse_number(point["secondary_metrics"].get(column))
                for point in points
                if column in point["secondary_metrics"]
            ]
            values = [value for value in values if value is not None]
            if values:
                secondary_evidence[column] = {
                    "count": len(values),
                    "min": round(min(values), 4),
                    "max": round(max(values), 4),
                    "first": points[0]["secondary_metrics"].get(column),
                    "last": points[-1]["secondary_metrics"].get(column),
                }
            else:
                categorical_values = [
                    point["secondary_metrics"].get(column)
                    for point in points
                    if column in point["secondary_metrics"]
                ]
                if categorical_values:
                    secondary_evidence[column] = {
                        "first": categorical_values[0],
                        "last": categorical_values[-1],
                        "distinct_values": sorted({str(value) for value in categorical_values})[:10],
                    }
        summary["secondary_metric_evidence"] = secondary_evidence

        action_evidence = []
        seen_actions = set()
        for point in [
            point for point in points if any(value is True for value in point["flags"].values())
        ] + [points[-1]]:
            for column, action in point["actions"].items():
                key = (column, str(action))
                if key in seen_actions:
                    continue
                seen_actions.add(key)
                action_evidence.append({
                    time_col: point[time_col],
                    "action_column": column,
                    "action": action,
                })
                if len(action_evidence) >= max_points:
                    break
            if len(action_evidence) >= max_points:
                break
        summary["action_evidence"] = action_evidence

        return summary

    @staticmethod
    def _parse_numeric_bin_range(label) -> tuple[float | None, float | None]:
        if label is None:
            return None, None
        text = str(label).strip()
        if not text:
            return None, None
        match = re.match(
            r"^\s*(-?\d+(?:\.\d+)?)\s*(?:-|–|—|to)\s*(-?\d+(?:\.\d+)?)\s*$",
            text,
            flags=re.IGNORECASE,
        )
        if match:
            return float(match.group(1)), float(match.group(2))
        return None, None

    @staticmethod
    def _summarize_correlation_evidence(req: ExplainRequest) -> dict:
        cfg = req.ai_summary_config
        dataset_name, rows = BaseExplanationStrategy._select_primary_dataset(req)

        x_col = cfg.x_column if cfg else None
        y_col = cfg.y_column if cfg else None
        entity_col = cfg.entity_column if cfg else None
        color_col = cfg.color_column if cfg else None
        coefficient_col = cfg.coefficient_column if cfg else None
        coefficient_method = str((cfg.coefficient_method if cfg else None) or "pearson").lower()
        sample_size_col = cfg.sample_size_column if cfg else None
        p_value_col = cfg.p_value_column if cfg else None
        outlier_policy = str((cfg.outlier_policy if cfg else None) or "").lower()
        min_sample_value = BaseExplanationStrategy._parse_number(
            cfg.minimum_sample_size if cfg and cfg.minimum_sample_size is not None else 30
        )
        if min_sample_value is None:
            min_sample_value = 30.0
        top_k = cfg.top_k if cfg and cfg.top_k is not None else 10
        top_k = max(0, min(int(top_k), 50))

        summary = {
            "summary_type": "correlation_evidence",
            "dataset_name": dataset_name,
            "row_count": len(rows),
            "x_column": x_col,
            "y_column": y_col,
            "entity_column": entity_col,
            "coefficient": None,
            "coefficient_method": coefficient_method,
            "coefficient_source": "unavailable",
            "sample_size": 0,
            "p_value": None,
            "outliers": [],
            "direction": "unknown",
            "strength": None,
            "strength_claim_allowed": False,
            "significance_claim_allowed": False,
            "causal_claim_allowed": False,
            "parse_warnings": [],
            "statistical_warnings": [],
            "summarization_warnings": [],
        }

        def add_parse_warning(message: str) -> None:
            summary["parse_warnings"].append(message)
            summary["summarization_warnings"].append(message)

        def add_statistical_warning(message: str) -> None:
            summary["statistical_warnings"].append(message)
            summary["summarization_warnings"].append(message)

        if not rows:
            summary["summarization_warnings"].append("Primary dataset is empty.")
            return summary

        dict_rows = [row for row in rows if isinstance(row, dict)]
        if not dict_rows:
            summary["summarization_warnings"].append("Primary dataset has no object rows.")
            return summary

        available_columns = set()
        for row in dict_rows:
            available_columns.update(row.keys())

        missing_required = []
        if not x_col:
            missing_required.append("x_column")
        if not y_col:
            missing_required.append("y_column")
        for column in (x_col, y_col):
            if column and column not in available_columns:
                missing_required.append(column)

        if missing_required:
            summary["summarization_warnings"].append(
                "correlation_evidence config is incomplete or required columns are missing: "
                + ", ".join(missing_required)
            )
            summary["generic_diagnostic_sample"] = BaseExplanationStrategy._summarize_generic(req, max_datasets=1)
            return summary

        for column, label in [
            (entity_col, "entity_column"),
            (color_col, "color_column"),
            (coefficient_col, "coefficient_column"),
            (sample_size_col, "sample_size_column"),
            (p_value_col, "p_value_column"),
        ]:
            if column and column not in available_columns:
                summary["summarization_warnings"].append(
                    f"Configured optional {label} '{column}' is missing from dataset."
                )

        valid_pairs = []
        invalid_x = 0
        invalid_y = 0
        for index, row in enumerate(dict_rows):
            x_value = BaseExplanationStrategy._parse_number(row.get(x_col))
            y_value = BaseExplanationStrategy._parse_number(row.get(y_col))
            if x_value is None:
                invalid_x += 1
                continue
            if y_value is None:
                invalid_y += 1
                continue
            valid_pairs.append({
                "x": x_value,
                "y": y_value,
                "row": row,
                "row_index": index,
            })

        if invalid_x:
            add_parse_warning(f"Skipped {invalid_x} rows with invalid {x_col}.")
        if invalid_y:
            add_parse_warning(f"Skipped {invalid_y} rows with invalid {y_col}.")

        summary["sample_size"] = len(valid_pairs)
        if not valid_pairs:
            add_statistical_warning("No valid paired numeric observations remained after parsing x/y values.")
            return summary

        explicit_sample_sizes = []
        invalid_sample_size_values = 0
        if sample_size_col and sample_size_col in available_columns:
            for row in dict_rows:
                if row.get(sample_size_col) is None:
                    continue
                parsed = BaseExplanationStrategy._parse_number(row.get(sample_size_col))
                if parsed is None:
                    invalid_sample_size_values += 1
                else:
                    explicit_sample_sizes.append(parsed)
            if explicit_sample_sizes:
                first_sample_size = explicit_sample_sizes[0]
                summary["sample_size"] = round(first_sample_size, 4)
                if any(value != first_sample_size for value in explicit_sample_sizes[1:]):
                    add_statistical_warning(
                        f"Configured sample size column '{sample_size_col}' has multiple values; using the first valid value."
                    )
            if invalid_sample_size_values:
                add_parse_warning(
                    f"Found {invalid_sample_size_values} invalid {sample_size_col} values; sample size evidence is partial."
                )

        effective_sample_size = BaseExplanationStrategy._parse_number(summary["sample_size"]) or 0.0
        reliable_sample_size = effective_sample_size >= min_sample_value
        if not reliable_sample_size:
            add_statistical_warning(
                f"Valid paired sample size {round(effective_sample_size, 4)} is below minimum_sample_size {round(min_sample_value, 4)}; coefficient strength is not reliable."
            )

        explicit_coefficients = []
        invalid_coefficient_values = 0
        if coefficient_col and coefficient_col in available_columns:
            for row in dict_rows:
                if row.get(coefficient_col) is None:
                    continue
                parsed = BaseExplanationStrategy._parse_number(row.get(coefficient_col))
                if parsed is None:
                    invalid_coefficient_values += 1
                else:
                    explicit_coefficients.append(parsed)
            if explicit_coefficients:
                first_coefficient = explicit_coefficients[0]
                summary["coefficient"] = round(first_coefficient, 4)
                summary["coefficient_source"] = "explicit_column"
                if any(value != first_coefficient for value in explicit_coefficients[1:]):
                    add_statistical_warning(
                        f"Configured coefficient column '{coefficient_col}' has multiple values; using the first valid value."
                    )
            if invalid_coefficient_values:
                add_parse_warning(
                    f"Found {invalid_coefficient_values} invalid {coefficient_col} values; coefficient evidence is partial."
                )

        def variance(values: list[float]) -> float:
            mean = sum(values) / len(values)
            return sum((value - mean) ** 2 for value in values)

        if summary["coefficient"] is None:
            if coefficient_method != "pearson":
                add_statistical_warning(
                    f"Coefficient method '{coefficient_method}' is not implemented for derivation; coefficient unavailable."
                )
            elif not reliable_sample_size:
                summary["coefficient_source"] = "unavailable"
            else:
                x_values = [item["x"] for item in valid_pairs]
                y_values = [item["y"] for item in valid_pairs]
                x_variance = variance(x_values)
                y_variance = variance(y_values)
                if x_variance == 0 or y_variance == 0:
                    add_statistical_warning(
                        f"Cannot derive Pearson coefficient because {x_col} or {y_col} has zero variance."
                    )
                else:
                    x_mean = sum(x_values) / len(x_values)
                    y_mean = sum(y_values) / len(y_values)
                    covariance = sum((item["x"] - x_mean) * (item["y"] - y_mean) for item in valid_pairs)
                    coefficient = covariance / ((x_variance * y_variance) ** 0.5)
                    summary["coefficient"] = round(coefficient, 4)
                    summary["coefficient_source"] = "derived_from_pairs"

        p_values = []
        invalid_p_values = 0
        if p_value_col and p_value_col in available_columns:
            for row in dict_rows:
                if row.get(p_value_col) is None:
                    continue
                parsed = BaseExplanationStrategy._parse_number(row.get(p_value_col))
                if parsed is None:
                    invalid_p_values += 1
                else:
                    p_values.append(parsed)
            if p_values:
                first_p_value = p_values[0]
                summary["p_value"] = round(first_p_value, 6)
                if any(value != first_p_value for value in p_values[1:]):
                    add_statistical_warning(
                        f"Configured p-value column '{p_value_col}' has multiple values; using the first valid value."
                    )
            if invalid_p_values:
                add_parse_warning(
                    f"Found {invalid_p_values} invalid {p_value_col} values; p-value evidence is partial."
                )
        elif p_value_col:
            add_statistical_warning(
                f"Configured p-value column '{p_value_col}' is unavailable; significance claims are not allowed."
            )

        coefficient = BaseExplanationStrategy._parse_number(summary["coefficient"])
        if coefficient is not None:
            if coefficient > 0:
                summary["direction"] = "positive"
            elif coefficient < 0:
                summary["direction"] = "negative"
            else:
                summary["direction"] = "none"
            if reliable_sample_size:
                abs_coefficient = abs(coefficient)
                if abs_coefficient < 0.3:
                    summary["strength"] = "weak"
                elif abs_coefficient < 0.7:
                    summary["strength"] = "moderate"
                else:
                    summary["strength"] = "strong"
                summary["strength_claim_allowed"] = True
        else:
            add_statistical_warning("Coefficient evidence is unavailable; strength claims are not allowed.")

        if summary["p_value"] is not None:
            summary["significance_claim_allowed"] = True
        else:
            add_statistical_warning("No p-value evidence is available; statistical significance claims are not allowed.")

        def quantile(values: list[float], q: float) -> float:
            ordered = sorted(values)
            if len(ordered) == 1:
                return ordered[0]
            position = (len(ordered) - 1) * q
            lower = int(position)
            upper = min(lower + 1, len(ordered) - 1)
            fraction = position - lower
            return ordered[lower] + (ordered[upper] - ordered[lower]) * fraction

        if outlier_policy:
            if outlier_policy == "high_x_low_y":
                x_q3 = quantile([item["x"] for item in valid_pairs], 0.75)
                y_q1 = quantile([item["y"] for item in valid_pairs], 0.25)
                outlier_candidates = [
                    item for item in valid_pairs
                    if item["x"] >= x_q3 and item["y"] <= y_q1
                ]
                outlier_candidates.sort(key=lambda item: (-item["x"], item["y"], item["row_index"]))
                outliers = []
                for item in outlier_candidates[:top_k]:
                    row = item["row"]
                    outlier = {
                        x_col: round(item["x"], 4),
                        y_col: round(item["y"], 4),
                        "policy": outlier_policy,
                    }
                    if entity_col and entity_col in row:
                        outlier[entity_col] = row.get(entity_col)
                    if color_col and color_col in row:
                        outlier[color_col] = row.get(color_col)
                    outliers.append(outlier)
                summary["outliers"] = outliers
            else:
                add_statistical_warning(f"Unknown outlier policy '{outlier_policy}'; no outliers emitted.")

        return summary

    @staticmethod
    def _summarize_group_comparison(req: ExplainRequest) -> dict:
        cfg = req.ai_summary_config
        dataset_name, rows = BaseExplanationStrategy._select_primary_dataset(req)

        group_col = cfg.group_column if cfg else None
        metric_col = cfg.metric_column if cfg else None
        count_col = cfg.count_column if cfg else None
        gap_col = cfg.gap_column if cfg else None
        metric_cols = list(cfg.metric_columns or []) if cfg else []
        expected_groups = [str(item) for item in (cfg.expected_groups or [])] if cfg else []
        target_group = str(cfg.target_group) if cfg and cfg.target_group is not None else None
        comparison_groups = [str(item) for item in (cfg.comparison_groups or [])] if cfg else []
        min_reliable = cfg.minimum_reliable_count if cfg else None
        sort_by = cfg.sort_by if cfg else None
        sort_direction = str(cfg.sort_direction or "asc").lower() if cfg else "asc"
        sort_desc = sort_direction == "desc"
        top_k = cfg.top_k if cfg and cfg.top_k is not None else 10
        bottom_k = cfg.bottom_k if cfg and cfg.bottom_k is not None else 5
        top_k = max(0, min(int(top_k), 50))
        bottom_k = max(0, min(int(bottom_k), 50))

        summary = {
            "summary_type": "group_comparison",
            "dataset_name": dataset_name,
            "row_count": len(rows),
            "group_column": group_col,
            "metric_column": metric_col,
            "count_column": count_col,
            "gap_column": gap_col,
            "group_metrics": [],
            "gaps": [],
            "dominant_group": None,
            "weakest_group": None,
            "missing_groups": [],
            "low_count_warnings": [],
            "fairness_warnings": [
                "Group comparison is descriptive only; do not infer that group membership causes performance differences."
            ],
            "causal_claim_allowed": False,
            "summarization_warnings": [],
        }

        if not rows:
            summary["summarization_warnings"].append("Primary dataset is empty.")
            return summary

        dict_rows = [row for row in rows if isinstance(row, dict)]
        if not dict_rows:
            summary["summarization_warnings"].append("Primary dataset has no object rows.")
            return summary

        available_columns = set()
        for row in dict_rows:
            available_columns.update(row.keys())

        missing_required = []
        if not group_col:
            missing_required.append("group_column")
        if not metric_col:
            missing_required.append("metric_column")
        if not count_col:
            missing_required.append("count_column")
        for column in (group_col, metric_col, count_col):
            if column and column not in available_columns:
                missing_required.append(column)

        if missing_required:
            summary["summarization_warnings"].append(
                "group_comparison config is incomplete or required columns are missing: "
                + ", ".join(missing_required)
            )
            summary["generic_diagnostic_sample"] = BaseExplanationStrategy._summarize_generic(req, max_datasets=1)
            return summary

        for column in [gap_col, *metric_cols]:
            if column and column not in available_columns:
                summary["summarization_warnings"].append(
                    f"Configured optional column '{column}' is missing from dataset."
                )

        invalid_count_rows = 0
        invalid_metric_rows = 0
        invalid_gap_values = 0
        invalid_secondary_counts = {column: 0 for column in metric_cols}
        entries = []

        for index, row in enumerate(dict_rows):
            group_value = row.get(group_col)
            group_key = str(group_value)
            count_value = BaseExplanationStrategy._parse_number(row.get(count_col))
            metric_value = BaseExplanationStrategy._parse_number(row.get(metric_col))
            if count_value is None:
                invalid_count_rows += 1
                continue
            if metric_value is None:
                invalid_metric_rows += 1
                continue

            gap_value = None
            if gap_col and gap_col in row and row.get(gap_col) is not None:
                gap_value = BaseExplanationStrategy._parse_number(row.get(gap_col))
                if gap_value is None:
                    invalid_gap_values += 1

            secondary_metrics = {}
            for column in metric_cols:
                if column not in row or row.get(column) is None:
                    continue
                parsed_secondary = BaseExplanationStrategy._parse_number(row.get(column))
                if parsed_secondary is None:
                    invalid_secondary_counts[column] += 1
                    secondary_metrics[column] = row.get(column)
                else:
                    secondary_metrics[column] = round(parsed_secondary, 4)

            entries.append({
                "group": group_value,
                "group_key": group_key,
                "count": round(count_value, 4),
                "metric": round(metric_value, 4),
                "secondary_metrics": secondary_metrics,
                "gap": round(gap_value, 4) if gap_value is not None else None,
                "gap_basis": "explicit_gap_column" if gap_value is not None else None,
                "_count_value": count_value,
                "_metric_value": metric_value,
                "_gap_value": gap_value,
                "_row_index": index,
            })

        if invalid_count_rows:
            summary["summarization_warnings"].append(
                f"Skipped {invalid_count_rows} rows with invalid {count_col}."
            )
        if invalid_metric_rows:
            summary["summarization_warnings"].append(
                f"Skipped {invalid_metric_rows} rows with invalid {metric_col}."
            )
        if invalid_gap_values:
            summary["summarization_warnings"].append(
                f"Found {invalid_gap_values} invalid {gap_col} values; those gaps were omitted."
            )
        for column, invalid_count in invalid_secondary_counts.items():
            if invalid_count:
                summary["summarization_warnings"].append(
                    f"Found {invalid_count} invalid {column} values; secondary metric evidence is partial."
                )

        if not entries:
            summary["summarization_warnings"].append("No valid group comparison rows remained after parsing required values.")
            return summary

        has_explicit_gap = any(entry["_gap_value"] is not None for entry in entries)
        if not has_explicit_gap:
            total_weight = sum(entry["_count_value"] for entry in entries)
            if total_weight > 0:
                cohort_mean = sum(entry["_metric_value"] * entry["_count_value"] for entry in entries) / total_weight
                for entry in entries:
                    gap = entry["_metric_value"] - cohort_mean
                    entry["gap"] = round(gap, 4)
                    entry["gap_basis"] = "derived_from_weighted_cohort_mean"
                    entry["_gap_value"] = gap
                summary["gap_column"] = None
                summary["summarization_warnings"].append(
                    f"No explicit gap column configured; gaps derived from {metric_col} relative to weighted cohort mean."
                )
            else:
                summary["summarization_warnings"].append("Could not derive gaps because total group count is zero.")

        if min_reliable is not None:
            min_reliable_value = BaseExplanationStrategy._parse_number(min_reliable)
            if min_reliable_value is not None:
                for entry in entries:
                    if entry["_count_value"] < min_reliable_value:
                        warning = {
                            "group": entry["group"],
                            "count": entry["count"],
                            "minimum_reliable_count": round(min_reliable_value, 4),
                            "warning": f"Group '{entry['group_key']}' has {count_col} below {round(min_reliable_value, 4)}; avoid over-weighting this comparison.",
                        }
                        summary["low_count_warnings"].append(warning)

        present_groups = {entry["group_key"] for entry in entries}
        missing_groups = []
        for kind, configured in [
            ("target_group", [target_group] if target_group is not None else []),
            ("comparison_group", comparison_groups),
            ("expected_group", expected_groups),
        ]:
            for group in configured:
                if str(group) not in present_groups:
                    missing_groups.append({
                        "group": group,
                        "kind": kind,
                    })
        summary["missing_groups"] = missing_groups
        if missing_groups:
            summary["summarization_warnings"].append(
                "Configured groups missing from dataset: "
                + ", ".join(f"{item['kind']}={item['group']}" for item in missing_groups)
            )

        def public_group_metric(entry: dict) -> dict:
            item = {
                "group": entry["group"],
                count_col: entry["count"],
                metric_col: entry["metric"],
            }
            if entry["gap"] is not None:
                item["gap"] = entry["gap"]
                item["gap_basis"] = entry["gap_basis"]
                if gap_col and entry["gap_basis"] == "explicit_gap_column":
                    item[gap_col] = entry["gap"]
            if entry["secondary_metrics"]:
                item["secondary_metrics"] = entry["secondary_metrics"]
            return item

        group_metrics = [public_group_metric(entry) for entry in entries]
        summary["group_metrics"] = group_metrics[:40]
        if len(group_metrics) > 40:
            summary["summarization_warnings"].append(
                f"Group metrics capped at 40 of {len(group_metrics)} groups."
            )

        dominant = max(entries, key=lambda entry: (entry["_count_value"], -entry["_row_index"]))
        summary["dominant_group"] = {
            "group": dominant["group"],
            count_col: dominant["count"],
            "basis": "largest_count",
        }

        gap_entries = [entry for entry in entries if entry["_gap_value"] is not None]
        weakest_basis = "most_negative_gap" if gap_entries else "lowest_metric"
        weakest_source = gap_entries if gap_entries else entries
        weakest = min(
            weakest_source,
            key=lambda entry: (
                entry["_gap_value"] if gap_entries else entry["_metric_value"],
                entry["_row_index"],
            ),
        )
        summary["weakest_group"] = {
            "group": weakest["group"],
            metric_col: weakest["metric"],
            "basis": weakest_basis,
        }
        if weakest["gap"] is not None:
            summary["weakest_group"]["gap"] = weakest["gap"]
            summary["weakest_group"]["gap_basis"] = weakest["gap_basis"]

        def sort_value(entry: dict) -> float:
            if sort_by == count_col:
                return entry["_count_value"]
            if sort_by == metric_col:
                return entry["_metric_value"]
            if sort_by == gap_col or sort_by == "gap" or (not sort_by and entry["_gap_value"] is not None):
                return entry["_gap_value"] if entry["_gap_value"] is not None else float("inf")
            if sort_by in metric_cols:
                parsed = BaseExplanationStrategy._parse_number(entry["secondary_metrics"].get(sort_by))
                return parsed if parsed is not None else float("inf")
            return entry["_gap_value"] if entry["_gap_value"] is not None else entry["_metric_value"]

        sorted_for_gaps = sorted(
            entries,
            key=lambda entry: (sort_value(entry), entry["_row_index"]),
            reverse=sort_desc,
        )
        top_entries = sorted_for_gaps[:top_k] if top_k else []
        bottom_entries = sorted_for_gaps[-bottom_k:] if bottom_k else []
        selected = []
        seen = set()
        for entry in [*top_entries, *bottom_entries]:
            key = (entry["group_key"], entry["_row_index"])
            if key in seen:
                continue
            seen.add(key)
            selected.append(entry)
        summary["gaps"] = [
            {
                "group": entry["group"],
                "gap": entry["gap"],
                "gap_basis": entry["gap_basis"],
                metric_col: entry["metric"],
                count_col: entry["count"],
            }
            for entry in selected
            if entry["gap"] is not None
        ]

        if summary["fairness_warnings"]:
            summary["summarization_warnings"].append(summary["fairness_warnings"][0])

        return summary

    @staticmethod
    def _summarize_numeric_distribution(req: ExplainRequest) -> dict:
        cfg = req.ai_summary_config
        dataset_name, rows = BaseExplanationStrategy._select_primary_dataset(req)

        bin_col = cfg.bin_column if cfg else None
        count_col = cfg.count_column if cfg else None
        percent_col = cfg.percent_column if cfg else None
        metric_cols = list(cfg.metric_columns or []) if cfg else []
        bin_order = [str(item) for item in (cfg.bin_order or [])] if cfg else []
        expected_bins = [str(item) for item in (cfg.expected_bins or [])] if cfg else []
        focus_bins = [str(item) for item in (cfg.focus_bins or [])] if cfg else []
        threshold = cfg.numeric_threshold if cfg else None
        threshold_direction = str(cfg.threshold_direction or "").lower() if cfg else ""

        summary = {
            "summary_type": "numeric_distribution",
            "dataset_name": dataset_name,
            "row_count": len(rows),
            "bin_column": bin_col,
            "count_column": count_col,
            "percent_column": percent_col,
            "bin_distribution": [],
            "total_count": 0,
            "dominant_bin": None,
            "focus_bins": focus_bins,
            "focus_total": {
                "bins": focus_bins,
                "present_bins": [],
                "missing_bins": [],
                "count": 0,
                "percent": None,
            },
            "threshold_summary": None,
            "missing_expected_bins": [],
            "metric_evidence_by_bin": {},
            "summarization_warnings": [],
        }

        if not rows:
            summary["summarization_warnings"].append("Primary dataset is empty.")
            return summary

        dict_rows = [row for row in rows if isinstance(row, dict)]
        if not dict_rows:
            summary["summarization_warnings"].append("Primary dataset has no object rows.")
            return summary

        available_columns = set()
        for row in dict_rows:
            available_columns.update(row.keys())

        missing_required = []
        if not bin_col:
            missing_required.append("bin_column")
        if not count_col:
            missing_required.append("count_column")
        for column in (bin_col, count_col):
            if column and column not in available_columns:
                missing_required.append(column)

        if missing_required:
            summary["summarization_warnings"].append(
                "numeric_distribution config is incomplete or required columns are missing: "
                + ", ".join(missing_required)
            )
            summary["generic_diagnostic_sample"] = BaseExplanationStrategy._summarize_generic(req, max_datasets=1)
            return summary

        for column in [percent_col, *metric_cols]:
            if column and column not in available_columns:
                summary["summarization_warnings"].append(
                    f"Configured optional column '{column}' is missing from dataset."
                )

        invalid_count_rows = 0
        invalid_percent_values = 0
        entries = []
        order_rank = {value: index for index, value in enumerate(bin_order)}

        for index, row in enumerate(dict_rows):
            bin_value = row.get(bin_col)
            bin_key = str(bin_value)
            count_value = BaseExplanationStrategy._parse_number(row.get(count_col))
            if count_value is None:
                invalid_count_rows += 1
                continue

            percent_value = None
            if percent_col and row.get(percent_col) is not None:
                percent_value = BaseExplanationStrategy._parse_number(row.get(percent_col))
                if percent_value is None:
                    invalid_percent_values += 1

            metrics = {
                column: BaseExplanationStrategy._risk_value(row.get(column))
                for column in metric_cols
                if column in row and row.get(column) is not None
            }
            lower, upper = BaseExplanationStrategy._parse_numeric_bin_range(bin_value)
            explicit_order = order_rank.get(bin_key)
            is_special_no_score = bin_key.strip().lower() == "no score"

            entries.append({
                "bin": bin_value,
                "count": round(count_value, 4),
                "percent": round(percent_value, 4) if percent_value is not None else None,
                "metrics": metrics,
                "_bin_key": bin_key,
                "_lower": lower,
                "_upper": upper,
                "_explicit_order": explicit_order,
                "_is_special_no_score": is_special_no_score,
                "_row_index": index,
            })

        if invalid_count_rows:
            summary["summarization_warnings"].append(
                f"Skipped {invalid_count_rows} rows with invalid {count_col}."
            )
        if invalid_percent_values:
            summary["summarization_warnings"].append(
                f"Found {invalid_percent_values} invalid {percent_col} values; those percents were omitted."
            )

        if not entries:
            summary["summarization_warnings"].append("No valid numeric distribution bins remained after parsing counts.")
            return summary

        def sort_key(entry: dict):
            if entry["_explicit_order"] is not None:
                return (0, entry["_explicit_order"], entry["_row_index"])
            if entry["_lower"] is not None and entry["_upper"] is not None:
                return (1, entry["_lower"], entry["_upper"], entry["_row_index"])
            if entry["_is_special_no_score"]:
                return (3, entry["_row_index"])
            return (2, entry["_bin_key"], entry["_row_index"])

        entries.sort(key=sort_key)

        total_count = round(sum(entry["count"] for entry in entries), 4)
        summary["total_count"] = total_count

        distribution = []
        metric_evidence = {}
        for entry in entries:
            item = {
                "bin": entry["bin"],
                "count": entry["count"],
                "percent": entry["percent"],
            }
            if entry["metrics"]:
                item["metrics"] = entry["metrics"]
                metric_evidence[entry["_bin_key"]] = entry["metrics"]
            distribution.append(item)

        summary["bin_distribution"] = distribution[:40]
        if len(distribution) > 40:
            summary["summarization_warnings"].append(
                f"Bin distribution capped at 40 of {len(distribution)} bins."
            )
        summary["metric_evidence_by_bin"] = metric_evidence

        dominant = max(entries, key=lambda entry: (entry["count"], -entry["_row_index"]))
        summary["dominant_bin"] = {
            "bin": dominant["bin"],
            "count": dominant["count"],
            "percent": dominant["percent"],
        }
        if dominant["metrics"]:
            summary["dominant_bin"]["metrics"] = dominant["metrics"]

        present_keys = {entry["_bin_key"] for entry in entries}
        if expected_bins:
            summary["missing_expected_bins"] = [
                bin_value for bin_value in expected_bins
                if bin_value not in present_keys
            ]

        focus_entries = [
            entry for entry in entries
            if entry["_bin_key"] in set(focus_bins)
        ]
        focus_percent_values = [
            entry["percent"] for entry in focus_entries
            if entry["percent"] is not None
        ]
        summary["focus_total"] = {
            "bins": focus_bins,
            "present_bins": [entry["_bin_key"] for entry in focus_entries],
            "missing_bins": [
                bin_value for bin_value in focus_bins
                if bin_value not in present_keys
            ],
            "count": round(sum(entry["count"] for entry in focus_entries), 4),
            "percent": round(sum(focus_percent_values), 4) if focus_percent_values else None,
        }

        threshold_entries = []
        parsed_threshold = BaseExplanationStrategy._parse_number(threshold)
        if parsed_threshold is not None and threshold_direction:
            for entry in entries:
                lower = entry["_lower"]
                upper = entry["_upper"]
                if lower is None or upper is None:
                    continue
                include = False
                if threshold_direction in {"below", "under"}:
                    include = upper <= parsed_threshold
                elif threshold_direction in {"at_or_below", "below_or_equal", "lte"}:
                    include = upper <= parsed_threshold
                elif threshold_direction in {"above", "over"}:
                    include = lower >= parsed_threshold
                elif threshold_direction in {"at_or_above", "above_or_equal", "gte"}:
                    include = lower >= parsed_threshold
                else:
                    summary["summarization_warnings"].append(
                        f"Unsupported threshold_direction '{threshold_direction}'."
                    )
                    break
                if include:
                    threshold_entries.append(entry)

            threshold_percent_values = [
                entry["percent"] for entry in threshold_entries
                if entry["percent"] is not None
            ]
            summary["threshold_summary"] = {
                "threshold": round(parsed_threshold, 4),
                "direction": threshold_direction,
                "bins": [entry["_bin_key"] for entry in threshold_entries],
                "count": round(sum(entry["count"] for entry in threshold_entries), 4),
                "percent": round(sum(threshold_percent_values), 4) if threshold_percent_values else None,
            }

            focus_set = set(summary["focus_total"]["present_bins"])
            threshold_set = set(summary["threshold_summary"]["bins"])
            if focus_bins and focus_set != threshold_set:
                summary["summarization_warnings"].append(
                    "Configured focus bins and threshold-derived bins disagree."
                )

        percent_values = [
            entry["percent"] for entry in entries
            if entry["percent"] is not None
        ]
        if percent_values:
            percent_total = round(sum(percent_values), 4)
            if percent_total < 99 or percent_total > 101:
                summary["summarization_warnings"].append(
                    f"Percent total is {percent_total}, outside expected 100% tolerance."
                )

        return summary

    @staticmethod
    def _summarize_ranking(req: ExplainRequest) -> dict:
        cfg = req.ai_summary_config
        dataset_name, rows = BaseExplanationStrategy._select_primary_dataset(req)

        entity_col = cfg.entity_column if cfg else None
        metric_col = cfg.metric_column if cfg else None
        sort_direction = str(cfg.sort_direction or "desc").lower() if cfg else "desc"
        sort_desc = sort_direction != "asc"
        secondary_cols = list(cfg.secondary_metric_columns or []) if cfg else []
        label_cols = list(cfg.label_columns or []) if cfg else []
        flag_cols = list(cfg.flag_columns or []) if cfg else []
        top_k = cfg.top_k if cfg and cfg.top_k else 10
        bottom_k = cfg.bottom_k if cfg and cfg.bottom_k else 5
        top_k = max(0, min(int(top_k), 50))
        bottom_k = max(0, min(int(bottom_k), 50))

        summary = {
            "summary_type": "ranking",
            "dataset_name": dataset_name,
            "row_count": len(rows),
            "entity_column": entity_col,
            "metric_column": metric_col,
            "sort_direction": "desc" if sort_desc else "asc",
            "top_items": [],
            "bottom_items": [],
            "median_item": None,
            "metric_stats": {},
            "tie_warnings": [],
            "flag_evidence": [],
            "summarization_warnings": [],
        }

        if not rows:
            summary["summarization_warnings"].append("Primary dataset is empty.")
            return summary

        dict_rows = [row for row in rows if isinstance(row, dict)]
        if not dict_rows:
            summary["summarization_warnings"].append("Primary dataset has no object rows.")
            return summary

        available_columns = set()
        for row in dict_rows:
            available_columns.update(row.keys())

        missing_required = []
        if not entity_col:
            missing_required.append("entity_column")
        if not metric_col:
            missing_required.append("metric_column")
        for column in (entity_col, metric_col):
            if column and column not in available_columns:
                missing_required.append(column)

        if missing_required:
            summary["summarization_warnings"].append(
                "ranking config is incomplete or required columns are missing: "
                + ", ".join(missing_required)
            )
            summary["generic_diagnostic_sample"] = BaseExplanationStrategy._summarize_generic(req, max_datasets=1)
            return summary

        for column in [*secondary_cols, *label_cols, *flag_cols]:
            if column and column not in available_columns:
                summary["summarization_warnings"].append(
                    f"Configured optional column '{column}' is missing from dataset."
                )

        invalid_metric_rows = 0
        invalid_flag_values = 0
        entries = []

        for index, row in enumerate(dict_rows):
            metric_value = BaseExplanationStrategy._parse_number(row.get(metric_col))
            if metric_value is None:
                invalid_metric_rows += 1
                continue

            labels = {
                column: row.get(column)
                for column in label_cols
                if column in row and row.get(column) is not None
            }
            secondary = {
                column: BaseExplanationStrategy._risk_value(row.get(column))
                for column in secondary_cols
                if column in row and row.get(column) is not None
            }
            flags = {}
            raw_flags = {}
            for column in flag_cols:
                if column not in row:
                    continue
                parsed_flag, recognized = BaseExplanationStrategy._parse_triggered(row.get(column))
                raw_flags[column] = row.get(column)
                if recognized:
                    flags[column] = parsed_flag
                elif row.get(column) is not None:
                    invalid_flag_values += 1
                    flags[column] = None

            entries.append({
                entity_col: row.get(entity_col),
                metric_col: round(metric_value, 4),
                "labels": labels,
                "secondary_metrics": secondary,
                "flags": flags,
                "flag_raw_values": raw_flags,
                "_metric_value": metric_value,
                "_row_index": index,
            })

        if invalid_metric_rows:
            summary["summarization_warnings"].append(
                f"Skipped {invalid_metric_rows} rows with invalid {metric_col}."
            )
        if invalid_flag_values:
            summary["summarization_warnings"].append(
                f"Found {invalid_flag_values} unrecognized configured flag values; flags only use recognized true/false values."
            )

        if not entries:
            summary["summarization_warnings"].append("No valid ranking rows remained after parsing metric values.")
            return summary

        entries.sort(
            key=lambda entry: (entry["_metric_value"], -entry["_row_index"] if sort_desc else entry["_row_index"]),
            reverse=sort_desc,
        )
        values_for_stats = sorted(entry["_metric_value"] for entry in entries)

        def median_value(values: list[float]) -> float:
            midpoint = len(values) // 2
            if len(values) % 2:
                return values[midpoint]
            return (values[midpoint - 1] + values[midpoint]) / 2

        def public_item(entry: dict, rank: int | None = None) -> dict:
            item = {
                entity_col: entry.get(entity_col),
                metric_col: entry.get(metric_col),
            }
            if rank is not None:
                item["rank"] = rank
            if entry["labels"]:
                item["labels"] = entry["labels"]
            if entry["secondary_metrics"]:
                item["secondary_metrics"] = entry["secondary_metrics"]
            if entry["flags"]:
                item["flags"] = entry["flags"]
                item["flag_raw_values"] = entry["flag_raw_values"]
            return item

        def boundary_tie_warning(selection_name: str, selected: list[dict], cutoff_entry: dict | None) -> str | None:
            if not selected or cutoff_entry is None:
                return None
            cutoff = cutoff_entry["_metric_value"]
            matching_total = sum(1 for entry in entries if entry["_metric_value"] == cutoff)
            matching_selected = sum(1 for entry in selected if entry["_metric_value"] == cutoff)
            if matching_total > matching_selected:
                return (
                    f"{selection_name} boundary has {matching_total} tied items at "
                    f"{metric_col}={round(cutoff, 4)}; only {matching_selected} are included."
                )
            return None

        top_entries = entries[:top_k] if top_k else []
        bottom_entries = entries[-bottom_k:] if bottom_k else []
        median_entry = entries[len(entries) // 2]

        summary["top_items"] = [
            public_item(entry, rank=index + 1)
            for index, entry in enumerate(top_entries)
        ]
        summary["bottom_items"] = [
            public_item(entry, rank=len(entries) - len(bottom_entries) + index + 1)
            for index, entry in enumerate(bottom_entries)
        ]
        summary["median_item"] = public_item(median_entry, rank=entries.index(median_entry) + 1)
        summary["metric_stats"] = {
            "count": len(values_for_stats),
            "min": round(values_for_stats[0], 4),
            "max": round(values_for_stats[-1], 4),
            "mean": round(sum(values_for_stats) / len(values_for_stats), 4),
            "median": round(median_value(values_for_stats), 4),
        }

        top_warning = boundary_tie_warning("top_items", top_entries, top_entries[-1] if top_entries else None)
        bottom_warning = boundary_tie_warning("bottom_items", bottom_entries, bottom_entries[0] if bottom_entries else None)
        if top_warning:
            summary["tie_warnings"].append(top_warning)
        if bottom_warning:
            summary["tie_warnings"].append(bottom_warning)

        flag_evidence = []
        seen_entities = set()
        for entry in [*top_entries, *bottom_entries]:
            entity = entry.get(entity_col)
            if entity in seen_entities:
                continue
            seen_entities.add(entity)
            true_flags = [
                column
                for column, value in entry["flags"].items()
                if value is True
            ]
            if not true_flags and not entry["flags"]:
                continue
            flag_evidence.append({
                entity_col: entity,
                "true_flags": true_flags,
                "flags": entry["flags"],
                "flag_raw_values": entry["flag_raw_values"],
            })
        summary["flag_evidence"] = flag_evidence

        return summary

    @staticmethod
    def _summarize_generic(req: ExplainRequest, max_datasets: int = 3) -> dict:
        datasets = req.datasets or {}
        summary = {
            "summary_type": "generic_fallback",
            "datasets": [],
            "summarization_warnings": [],
        }

        items = list(datasets.items())
        if not items:
            summary["summarization_warnings"].append("No datasets were provided.")
            return summary

        if len(items) > max_datasets:
            summary["summarization_warnings"].append(
                f"Only summarized first {max_datasets} of {len(items)} datasets."
            )

        for dataset_name, rows in items[:max_datasets]:
            if not isinstance(rows, list):
                summary["datasets"].append({
                    "dataset_name": dataset_name,
                    "row_count": 0,
                    "summarization_warnings": ["Dataset rows are not an array."],
                })
                continue
            summary["datasets"].append(
                BaseExplanationStrategy._summarize_generic_dataset(dataset_name, rows)
            )

        return summary

    @staticmethod
    def _summarize_generic_dataset(dataset_name: str, rows: list[dict]) -> dict:
        row_count = len(rows)
        dict_rows = [row for row in rows if isinstance(row, dict)]
        columns = []
        seen = set()
        for row in dict_rows:
            for key in row.keys():
                if key not in seen:
                    seen.add(key)
                    columns.append(key)

        result = {
            "dataset_name": dataset_name,
            "row_count": row_count,
            "columns": columns[:40],
            "first_rows": [BaseExplanationStrategy._compact_row(row) for row in dict_rows[:5]],
            "last_rows": [BaseExplanationStrategy._compact_row(row) for row in dict_rows[-5:]] if row_count > 5 else [],
            "numeric_stats": {},
            "categorical_group_samples": {},
            "summarization_warnings": [],
        }

        if row_count == 0:
            result["summarization_warnings"].append("Dataset is empty.")
            return result

        if len(columns) > 40:
            result["summarization_warnings"].append(
                f"Column list capped at 40 of {len(columns)} columns."
            )

        if row_count > 10:
            result["summarization_warnings"].append(
                "Generic fallback includes first 5 and last 5 rows plus column summaries; raw rows are not exhaustive."
            )

        numeric_columns = []
        categorical_columns = []
        for column in columns:
            values = [row.get(column) for row in dict_rows if row.get(column) is not None]
            if not values:
                continue
            numeric_count = sum(
                1 for value in values
                if BaseExplanationStrategy._parse_number(value) is not None
            )
            if numeric_count > 0:
                numeric_columns.append(column)
            else:
                categorical_columns.append(column)

        for column in numeric_columns[:8]:
            numbers = [
                BaseExplanationStrategy._parse_number(row.get(column))
                for row in dict_rows
            ]
            numbers = [value for value in numbers if value is not None]
            if not numbers:
                continue
            result["numeric_stats"][column] = {
                "count": len(numbers),
                "min": round(min(numbers), 4),
                "max": round(max(numbers), 4),
                "avg": round(sum(numbers) / len(numbers), 4),
            }

        if len(numeric_columns) > 8:
            result["summarization_warnings"].append(
                f"Numeric stats capped at 8 of {len(numeric_columns)} numeric columns."
            )

        for column in categorical_columns[:4]:
            counts = {}
            samples = {}
            for row in dict_rows:
                value = row.get(column)
                if value is None:
                    continue
                key = str(value)
                counts[key] = counts.get(key, 0) + 1
                samples.setdefault(key, BaseExplanationStrategy._compact_row(row))
            top_groups = sorted(counts.items(), key=lambda item: (-item[1], item[0]))[:5]
            result["categorical_group_samples"][column] = [
                {
                    "value": value,
                    "count": count,
                    "sample_row": samples[value],
                }
                for value, count in top_groups
            ]

        if len(categorical_columns) > 4:
            result["summarization_warnings"].append(
                f"Categorical samples capped at 4 of {len(categorical_columns)} categorical columns."
            )

        return result

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
