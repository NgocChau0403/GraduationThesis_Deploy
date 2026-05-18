"""
Remaining 6 Strategy Stubs
===========================
These inherit from BaseExplanationStrategy and override build_system_prompt
and build_user_prompt. Detailed prompt engineering for each is Phase 3 Week 8.

For now, each stub returns a functional (but generic) prompt — the service
runs end-to-end and returns valid responses. Prompts will be refined per strategy.

Strategies:
  ComparisonStrategy   → "comparison"  (2-student, demographic group comparisons)
  DistributionStrategy → "distribution" (histogram, pie chart, score bands)
  CorrelationStrategy  → "correlation"  (scatter, heatmap, factor relationships)
  RiskStrategy         → "risk"         (at-risk flags, risk scoring tables)
  BehavioralStrategy   → "behavioral"   (engagement patterns, submission behavior)
  RankingStrategy      → "ranking"      (ranked tables, priority lists)
"""

from __future__ import annotations
from .base import BaseExplanationStrategy
from schemas import ExplainRequest

# ─────────────────────────────────────────────────────────────────────────────
# COMPARISON
# ─────────────────────────────────────────────────────────────────────────────

class ComparisonStrategy(BaseExplanationStrategy):
    strategy_name = "comparison"

    def build_system_prompt(self, req: ExplainRequest) -> str:
        tone = self.get_audience_tone(req.target_audience)
        return f"""You are a Learning Analytics expert specializing in student comparison analysis.
{tone}
Compare the provided datasets and identify meaningful differences and similarities.
Return ONLY a valid JSON object matching the ExplainResponse schema (summary, insights[], educational_implications[], recommendations[], warnings[]).
Each insight MUST include evidence[] with metric, value, comparison tag, and delta."""

    def build_user_prompt(self, req: ExplainRequest) -> str:
        data_summary = self.summarize_datasets(req)
        ac = req.analysis_context
        return f"""COMPARISON TASK: {req.task_name or req.task_id}
Context: {ac.aggregation_level if ac else 'comparison'} level, {ac.granularity if ac else 'semester'} granularity

DATASETS:
{data_summary}

Compare the groups/students in this data. Identify who is performing better, by how much, and what patterns explain the difference.
Return the JSON explanation structure."""


# ─────────────────────────────────────────────────────────────────────────────
# DISTRIBUTION
# ─────────────────────────────────────────────────────────────────────────────

class DistributionStrategy(BaseExplanationStrategy):
    strategy_name = "distribution"

    def build_system_prompt(self, req: ExplainRequest) -> str:
        tone = self.get_audience_tone(req.target_audience)

        # Proxy competency semantic note
        proxy_note = ""
        sc = req.semantic_context
        if sc and sc.competency_mode in ("proxy", "unknown", "mixed"):
            proxy_note = (
                "\n\nSEMANTIC CONTEXT — IMPORTANT: "
                "This analysis uses assessment names (e.g., G1, G2, G3) as "
                "competency area proxies because the current dataset does not provide "
                "a native competency ontology. When referring to 'competency areas' "
                "or 'skill domains', use the assessment names directly. "
                "Do NOT invent competency category names. "
                "You MAY note this is structural proxy data if relevant to confidence."
            )

        return f"""You are a Learning Analytics expert specializing in distribution and cohort analysis.
{tone}
Analyze the distribution of values and describe the shape, central tendency, and notable outliers.
Return ONLY a valid JSON object matching the ExplainResponse schema.{proxy_note}"""

    def build_user_prompt(self, req: ExplainRequest) -> str:
        # Filter competency_source column from display (internal metadata, not analytic value)
        import copy
        filtered_req = copy.copy(req)
        filtered_datasets = {}
        for label, rows in req.datasets.items():
            filtered_datasets[label] = [
                {k: v for k, v in row.items() if k != "competency_source"}
                for row in rows
            ]
        filtered_req.datasets = filtered_datasets

        data_summary = self.summarize_datasets(filtered_req)
        ac = req.analysis_context
        sc = req.semantic_context

        competency_hint = ""
        if sc and sc.competency_mode in ("proxy", "unknown"):
            competency_hint = (
                "\nNOTE: The 'competency_tag' column contains assessment names used "
                "as structural proxies (not from a formal competency ontology)."
            )

        return f"""DISTRIBUTION TASK: {req.task_name or req.task_id}
Context: {ac.aggregation_level if ac else 'cohort'} level{competency_hint}

DATASETS:
{data_summary}

Describe the distribution. Where do most students fall? What are the tails? Are there any notable clusters or gaps? If competency areas are shown, identify which areas need the most improvement.
Return the JSON explanation structure."""


# ─────────────────────────────────────────────────────────────────────────────
# CORRELATION
# ─────────────────────────────────────────────────────────────────────────────

class CorrelationStrategy(BaseExplanationStrategy):
    strategy_name = "correlation"

    def build_system_prompt(self, req: ExplainRequest) -> str:
        tone = self.get_audience_tone(req.target_audience)
        vc = req.visualization_config
        x_label = vc.x_label if vc else "Variable X"
        y_label = vc.y_label if vc else "Variable Y"
        return f"""You are a Learning Analytics expert specializing in correlation analysis.
{tone}
Analyze the relationship between {x_label} and {y_label}.
Describe direction (positive/negative), strength (strong/moderate/weak), and educational meaning.
IMPORTANT: Do NOT claim causation — only describe correlation patterns.
Return ONLY a valid JSON object matching the ExplainResponse schema."""

    def build_user_prompt(self, req: ExplainRequest) -> str:
        data_summary = self.summarize_datasets(req)
        vc = req.visualization_config
        return f"""CORRELATION TASK: {req.task_name or req.task_id}
X: {vc.x_label if vc else 'Variable X'} | Y: {vc.y_label if vc else 'Variable Y'}

DATASETS:
{data_summary}

Analyze the relationship between these variables. Is there a pattern? How strong? What does it mean for student learning?
Return the JSON explanation structure."""


# ─────────────────────────────────────────────────────────────────────────────
# RISK
# ─────────────────────────────────────────────────────────────────────────────

class RiskStrategy(BaseExplanationStrategy):
    strategy_name = "risk"

    def build_system_prompt(self, req: ExplainRequest) -> str:
        tone = self.get_audience_tone(req.target_audience)
        return f"""You are a Learning Analytics expert specializing in at-risk student identification.
{tone}
Analyze the risk indicators in the data. Describe which students or groups are at risk, the severity, and why.
Be careful NOT to label students harshly — focus on patterns and actionable interventions.
Return ONLY a valid JSON object matching the ExplainResponse schema.
Use severity="high" only for students showing multiple simultaneous risk signals."""

    def build_user_prompt(self, req: ExplainRequest) -> str:
        data_summary = self.summarize_datasets(req)
        return f"""RISK ANALYSIS TASK: {req.task_name or req.task_id}

DATASETS:
{data_summary}

Identify risk patterns: who is at risk, what signals indicate risk, and what early interventions are appropriate.
Return the JSON explanation structure."""


# ─────────────────────────────────────────────────────────────────────────────
# BEHAVIORAL
# ─────────────────────────────────────────────────────────────────────────────

class BehavioralStrategy(BaseExplanationStrategy):
    strategy_name = "behavioral"

    def build_system_prompt(self, req: ExplainRequest) -> str:
        tone = self.get_audience_tone(req.target_audience)
        ac = req.analysis_context
        temporal_note = ""
        if ac and ac.granularity == "weekly":
            temporal_note = "Pay attention to week-by-week patterns and sudden behavioral shifts."
        return f"""You are a Learning Analytics expert specializing in student behavioral analysis.
{tone}
Analyze engagement patterns, submission behavior, platform activity, and behavioral trends.
{temporal_note}
Return ONLY a valid JSON object matching the ExplainResponse schema."""

    def build_user_prompt(self, req: ExplainRequest) -> str:
        data_summary = self.summarize_datasets(req)
        ac = req.analysis_context
        return f"""BEHAVIORAL ANALYSIS TASK: {req.task_name or req.task_id}
Context: {ac.granularity if ac else 'semester'} granularity, {ac.aggregation_level if ac else 'student'} level

DATASETS:
{data_summary}

Describe the behavioral patterns. Are they consistent? Are there concerning drops in activity? What do these behaviors suggest about the student's engagement with the course?
Return the JSON explanation structure."""


# ─────────────────────────────────────────────────────────────────────────────
# RANKING
# ─────────────────────────────────────────────────────────────────────────────

class RankingStrategy(BaseExplanationStrategy):
    strategy_name = "ranking"

    def build_system_prompt(self, req: ExplainRequest) -> str:
        tone = self.get_audience_tone(req.target_audience)
        return f"""You are a Learning Analytics expert specializing in student ranking and prioritization.
{tone}
Analyze the ranked data and explain what the ordering reveals about student performance or risk priority.
Focus on the top and bottom of the ranking and what separates them.
Return ONLY a valid JSON object matching the ExplainResponse schema."""

    def build_user_prompt(self, req: ExplainRequest) -> str:
        data_summary = self.summarize_datasets(req)
        return f"""RANKING TASK: {req.task_name or req.task_id}

DATASETS:
{data_summary}

Analyze this ranked list. Who is at the top/bottom? What metrics drive the ranking? Which students should receive priority attention?
Return the JSON explanation structure."""
