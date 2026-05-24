"""
Pydantic Schemas  AI Explanation Service
=========================================
CONTRACT 4 from phase3_contracts.md  all models defined here.

These schemas serve 3 purposes:
  1. Input validation: FastAPI validates incoming requests automatically
  2. Output validation: ExplainResponse.model_validate(llm_json) catches LLM hallucination
  3. Documentation: FastAPI auto-generates OpenAPI docs from these models
"""

from __future__ import annotations
from pydantic import BaseModel, Field
from typing import Literal


# 
# REQUEST SCHEMAS (Node  Python)
# 

class SemanticRoles(BaseModel):
    """
    Axis semantic meaning  used by strategies to frame AI language.
    x="time" + granularity="weekly"  "week-over-week decline"
    x="category"  "the highest performing group..."
    """
    x: str | None = None   # "time"|"category"|"cohort"|"student"|"ranking"|"assessment"
    y: str | None = None   # "performance_metric"|"engagement_metric"|"risk_metric"|...
    color: str | None = None


class VisualizationConfig(BaseModel):
    """
    Chart rendering config from taskRegistry  passed to Python for
    axis-aware prompt construction (e.g. "over time" vs "by category").
    """
    x_field:        str | None = None
    y_field:        str | None = None
    series_field:   str | None = None
    color_field:    str | None = None
    orientation:    str | None = "horizontal"
    variant:        str = "default"
    x_label:        str | None = None
    y_label:        str | None = None
    semantic_roles: SemanticRoles | None = None


class AnalysisContext(BaseModel):
    """
    Temporal and aggregation context  drives AI language choices.
    granularity="weekly"  "sudden decline", "week-over-week"
    granularity="semester"  "long-term trend", "sustained improvement"
    """
    granularity:       str   # "weekly"|"per_assessment"|"semester"|"cohort_aggregate"
    aggregation_level: str   # "student"|"cohort"|"comparison"|"instructor"


class SemanticContext(BaseModel):
    """
    Semantic enrichment for tasks that use competency proxies.
    Injected by Node ai.controller when competency_source in data rows.

    competency_mode:
      "native"   dataset has real competency_tag ontology
      "proxy"    assessment_name used as fallback (G1, G2, G3 / TMA01, CMA01)
      "mixed"    some rows native, some proxy
      "unknown"  neither field available

    competency_proxy_note:
      Human-readable explanation (from task.semanticNote in registry).
    """
    competency_mode:       str | None = None
    competency_proxy_note: str | None = None


class ConfidenceInput(BaseModel):
    """
    Data quality signal from Node (from capabilityValidator output).
    Python uses this to frame explanation caveats but does NOT echo it raw 
    Python derives its own confidence.based_on[] list from this + dataset stats.
    """
    level:  str           # "HIGH" | "MEDIUM" | "LOW"
    reason: str


class ExplainRequest(BaseModel):
    """
    Full enriched request payload from Node.js proxy.
    Node reads taskRegistry and injects explanation_strategy, target_audience,
    visualization_config, analysis_context before forwarding here.
    """
    task_id:              str
    execution_id:         str
    task_name:            str | None = None
    actionable_question:  str | None = None
    ai_prompt_hint:       str | None = None
    explanation_strategy: str                    # "trend"|"comparison"|"risk"|...
    target_audience:      list[str]              # ["student"]|["instructor","academic_advisor"]
    visualization_config: VisualizationConfig | None = None
    analysis_context:     AnalysisContext | None = None

    # datasets: named dict from normalizeAnalyticsResult() in Node
    # { "score_over_time": [{week_due:2, avg_score:74.5}, ...] }
    datasets: dict[str, list[dict]] = Field(default_factory=dict)

    # confidence from capabilityValidator (data quality signal)
    confidence: ConfidenceInput | None = None

    # optional: used by strategies to personalize explanation
    student_context: dict | None = None

    # query_labels echoed from meta (same as datasets keys, ordered)
    query_labels: list[str] = Field(default_factory=list)

    # semantic context: proxy vs native competency detection (injected by Node)
    semantic_context: SemanticContext | None = None


# 
# RESPONSE SCHEMAS (Python  Node  Frontend)
# 

class EvidenceItem(BaseModel):
    """
    Structured evidence  NOT free-text.
    LLM is instructed to fill these fields explicitly.
    """
    metric:     str           # "avg_score", "click_count", "submission_delay"
    value:      float | int | str
    comparison: Literal[
        "baseline",
        "up_from_previous",
        "down_from_previous",
        "peak",
        "trough",
        "stable"
    ]
    delta:   float | None = None   # signed delta from previous; null for baseline
    context: str | None = None     # "week_due=7", "assessment_type=TMA"


class Insight(BaseModel):
    """
    One insight block  title + description + structured evidence.
    LLM generates 24 insights per response.
    """
    title:       str
    description: str
    severity:    Literal["low", "medium", "high"]
    evidence:    list[EvidenceItem] = Field(default_factory=list)


class Recommendation(BaseModel):
    """
    Actionable recommendation with priority + rationale.
    """
    priority:  Literal["low", "medium", "high"]
    action:    str
    rationale: str


class ConfidenceInfo(BaseModel):
    """
    AI-assessed confidence in the explanation.
    based_on[] is derived by Python logic  NOT by LLM (prevents hallucination).
    """
    level:    str | None                 # "HIGH"|"MEDIUM"|"LOW"|None (if degraded)
    reason:   str | None
    based_on: list[str] = Field(default_factory=list)
    # based_on enum:
    # "sufficient_data"          HIGH confidence, no issues
    # "sparse_data"              below MEDIUM threshold
    # "limited_temporal_range"   < 4 distinct time points
    # "single_student"           only 1 enrollment
    # "missing_fe_fields"        Feature Engineering fields not populated
    # "dataset_mismatch"         task not fully compatible with loaded dataset


class TokenUsage(BaseModel):
    prompt_tokens:     int
    completion_tokens: int
    total_tokens:      int


class AIMeta(BaseModel):
    """
    Execution metadata  returned in response for logging by Node proxy.
    Node reads these values to write to ai_explanation_log table.
    """
    model:       str | None = None    # "gpt-4o-mini-2024-07-18"
    latency_ms:  int
    token_usage: TokenUsage | None = None
    strategy:    str | None = None
    granularity: str | None = None
    cost_usd:    float | None = None  # estimated: tokens  per-token rate


class ExplanationBody(BaseModel):
    """
    The actual explanation content  validated against this schema
    after LLM returns JSON. If LLM output doesn't match  DEGRADED.
    """
    summary:                  str
    insights:                 list[Insight] = Field(default_factory=list)
    educational_implications: list[str] = Field(default_factory=list)
    recommendations:          list[Recommendation] = Field(default_factory=list)
    warnings:                 list[str] = Field(default_factory=list)


class ExplainResponse(BaseModel):
    """
    Complete response from Python  Node  Frontend.
    degraded=True means LLM was unavailable  Frontend renders AIDegradedBanner.
    """
    task_id:              str
    execution_id:         str
    explanation:          ExplanationBody
    confidence:           ConfidenceInfo
    explanation_strategy: str
    explanation_type:     str | None = None
    safety_flags:         list[str] = Field(default_factory=list)
    degraded:             bool = False
    meta:                 AIMeta
