# UCI Baseline Wins Root Cause Analysis

## Scope

This note explains why `baseline_first_20_rows` still wins over `task_aware_data_summarization` for 7 UCI tasks in the Phase 13 Task-Aware Summary V3 scoring run.

Primary artifacts:

- Scoring report: `Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/scoring/scoring_report__SAMPLE_UCI_POR.json`
- Paired comparison: `Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/scoring/aggregates/paired_mode_comparison__SAMPLE_UCI_POR.json`
- Judge inputs: `Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/judge_inputs/judge_inputs`
- Evidence artifacts: `Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts`

## Summary

Task-Aware Summary V3 improves UCI overall: `task_aware_data_summarization` wins 24 tasks, ties 21, and loses 7 against `baseline_first_20_rows`. The average paired delta is `+0.23` in favor of Task-Aware V3.

The remaining 7 baseline wins are not caused by a scoring bug. The scorer applies the frozen Judge V2 rubric correctly: it computes the weighted mean and applies caps when judge-detected errors exist. The root cause is that Task-Aware V3 still produces weaker explanations for a small set of task types, mainly because task-critical evidence is omitted, compressed too aggressively, or not rendered in the structure expected by the task rubric.

An important pattern: 6 of the 7 losing tasks have `row_count <= 20`. For these tasks, the baseline already sees the complete result set. Task-Aware V3 therefore has little or no evidence-coverage advantage, and any missing required output, weaker numeric phrasing, or cap-triggering omission can make baseline win.

## Baseline Wins

| Task | Baseline final | Task-aware final | Main cause |
| --- | ---: | ---: | --- |
| `A-C03` | 7.00 | 6.00 | Task-aware receives `major missing_required_output`; it does not explain the explicit `flag_*` differences clearly enough. |
| `A-C05` | 8.30 | 8.20 | Task-aware has weaker numerical correctness, including a likely direction error around `family_stability_score`. |
| `A-G03` | 6.85 | 6.45 | Task-aware is too generic for a ranking task and does not preserve enough per-student ranking/action evidence. |
| `A-G11` | 8.15 | 8.05 | Task-aware handles the empty engagement result slightly less precisely than baseline. |
| `S-T03` | 8.30 | 7.00 | Task-aware is weaker on required standing/top-percentile and above/below benchmark explanation. |
| `S-T04` | 7.75 | 6.00 | Task-aware misses checklist-style risk flag requirements and is capped for `major missing_required_output`. |
| `S-T13` | 7.00 | 6.00 | Task-aware action synthesis omits required supported action evidence; Judge V2 may also over-penalize `recommendations=[]`. |

## Is This Caused By The Scoring Formula?

Partly, but not as an error. The scoring formula is doing what the rubric says.

The Judge V2 scoring weights are:

- `faithfulness`: 25%
- `numerical_correctness`: 20%
- `completeness`: 15%
- `task_relevance`: 15%
- `actionability`: 10%
- `clarity`: 10%
- `safety_fairness`: 5%

The cap mechanism matters. When the judge detects `missing_required_output`, a `minor` issue often caps the final score near 7, and a `major` issue caps the final score at 6. Therefore, if Task-Aware V3 misses a required task output, it can lose even if it has generally fluent wording or better surrounding context.

So the root cause is not that scoring is unfair. The root cause is that some Task-Aware V3 outputs trigger the rubric's completeness/actionability/numerical penalties.

## Task-Level Findings

### `A-C03` - Compare Risk Profile

Requirement: compare the two returned student rows using `at_risk_score`, `at_risk_label`, and explicit `flag_*` columns; if score evidence is missing, state that instead of guessing.

Observed:

- Baseline final score: `7.00`
- Task-aware final score: `6.00`
- Task-aware error: `major missing_required_output`
- Main metric delta: `completeness -4`

Task-Aware V3 says student 1 is high risk and student 2 is medium risk, and it mentions average score differences. However, it does not explain the explicit `flag_*` differences strongly enough. The evidence contains details such as `flag_low_score`, `flag_low_engagement`, `flag_low_punctuality`, and `flag_neg_trend`, but the explanation collapses them into a broad risk summary.

Root cause: for `multi_metric_comparison`, V3 omitted useful comparison details such as `pairwise_gaps`, `metric_extrema`, and `selected_entity_evidence`, leaving the LLM with a less task-specific comparison frame.

### `A-C05` - Compare Academic Background

Requirement: identify background-driven performance differences while avoiding causal claims.

Observed:

- Baseline final score: `8.30`
- Task-aware final score: `8.20`
- No cap or explicit error.
- Main metric delta: `numerical_correctness -2`; Task-aware gains `+1` completeness and `+1` task relevance.

The difference is small. Task-Aware V3 is mostly complete but appears weaker numerically. The evidence shows:

- Student 1 `family_stability_score = 0.575`
- Student 2 `family_stability_score = 0.85`

Task-aware says student 1 has higher family stability than student 2, which reverses the numeric direction. Baseline avoids that specific numeric direction problem.

Root cause: numeric interpretation for comparative metrics is not sufficiently constrained. V3 should make pairwise metric direction explicit and avoid using positive/negative semantic labels unless the field definition is clear.

### `A-G03` - Identify At-Risk Cohort

Requirement: rank at-risk students by `at_risk_score`; for each high-risk student, explain `triggered_flags_summary` and recommend `recommended_admin_action`; do not invent reasons outside `triggered_flags`.

Observed:

- Baseline final score: `6.85`
- Task-aware final score: `6.45`
- Both have minor `missing_required_output`.
- Main metric delta: `numerical_correctness -2`
- Row count: `50`, so this is the only baseline win where Task-Aware should have had a meaningful coverage advantage.

Task-Aware V3 includes 15 raw rows and derived ranking evidence, but the generated explanation is still too generic. It names several students and broad risk factors, but it does not reliably preserve the required per-student pattern: rank, triggered flags summary, and recommended admin action.

Root cause: for `ranking`, V3 omitted `exceptions.flag_evidence`, and the prompt did not force the LLM to produce per-ranked-student action evidence. This is a real V3 prompt/evidence issue rather than a row-count issue.

### `A-G11` - Weekly Engagement Drop Detection

Requirement: identify critical weeks where cohort-level engagement declined and recommend admin action timing. If the dataset cannot support it, explain the missing engagement/temporal evidence.

Observed:

- Baseline final score: `8.15`
- Task-aware final score: `8.05`
- No cap or explicit error.
- Main metric delta: `numerical_correctness -2`; Task-aware gains `+1` completeness and `+1` task relevance.
- Row count: `0`

The evidence is terminally empty for UCI because engagement/temporal activity is missing. Baseline states the limitation more concretely: data quality is LOW and there are `0 engagement rows`. Task-aware also says no engagement activity exists, but its warning is less specific: "Primary dataset is empty."

Root cause: for empty/terminal-invalid evidence, Task-Aware V3 should preserve backend error codes and data-quality warnings verbatim enough for the explanation to mention the real missing capability.

### `S-T03` - Peer Comparison

Requirement: show the student's standing, including top/percentile framing, and explain which metrics are above or below average.

Observed:

- Baseline final score: `8.30`
- Task-aware final score: `7.00`
- Task-aware error: `minor missing_required_output`
- Metric deltas: `numerical_correctness -1`, `completeness -2`, `task_relevance -3`, `actionability -1`

The evidence contains:

- Average score: student `41.25`, cohort `58.31`
- Score percentile: student `8.8`, cohort `50`
- Engagement percentile: student `0`, cohort `50`

Task-aware states these values, but the judge still sees weaker fulfillment of the "standing/top X%" requirement and weaker above/below framing. Baseline's wording more directly says the student is in the `8.8th percentile` and that most peers score higher.

Root cause: the V3 comparison summary is numerically present but less aligned with the exact task phrasing. The prompt should force explicit "standing" language for peer comparison tasks.

### `S-T04` - At-Risk Self-Check

Requirement: treat the result as a checklist; list triggered flags first; explain each triggered flag using `flag_value`, `threshold`, `severity`, `flag_description`, and `recommended_action`; keep non-triggered flags brief.

Observed:

- Baseline final score: `7.75`
- Task-aware final score: `6.00`
- Task-aware error: `major missing_required_output`
- Metric deltas: `numerical_correctness -1`, `completeness -4`, `task_relevance -2`, `actionability -1`

The evidence has five flags. Only `flag_low_engagement` is triggered:

- `flag_value = 0`
- `threshold = 0.15`
- `severity = medium`
- description: engagement score is below low-engagement threshold
- recommended action: set a weekly study routine and interact with course resources before assessment deadlines

Task-aware mentions low engagement and gives the recommendation, but it does not present a checklist, does not clearly state `0 vs 0.15`, and does not explicitly separate triggered from non-triggered flags. V3 also omitted `action_evidence.recommended_actions`.

Root cause: for `risk_flags`, V3 allowed `recommended_actions` to be trimmed even though this is task-critical. This is one of the clearest implementation-level causes.

### `S-T13` - Action Plan Generation

Requirement: explain supported actions already generated or exposed by the action_synthesis rule contract; for each supported action, explain the triggering FE feature, threshold, or rule evidence when available.

Observed:

- Baseline final score: `7.00`
- Task-aware final score: `6.00`
- Task-aware error: `major missing_required_output`
- Metric deltas: `completeness -2`, `task_relevance +1`

Task-aware produces two action-like insights: attendance planning and score target setting. The structured `recommendations` array is empty by design for `action_synthesis`, because chart/backend rule outputs already own the recommendations and the AI explanation should avoid duplicating them. However, V3 omitted important action-synthesis sections:

- `prioritized_actions`
- `action_evidence_links`
- `rule_evaluations`
- `unsupported_actions`

Because the task is explicitly action synthesis, Judge V2 may treat this as missing core output even though the prose contains some useful rationale and `recommendations=[]` is intentional.

Root cause: for `action_synthesis`, V3 should never trim rule evaluations, prioritized actions, or action evidence links. The judge prompt also needs the V2.1 correction: evaluate whether existing actions are explained in summary/insights, and do not penalize empty recommendations by itself.

## Cross-Cutting Root Causes

1. Task-Aware V3 is strongest when row count is large, but most baseline wins are small-result tasks where baseline already sees all rows.

2. V3 currently preserves top raw rows but may trim task-critical derived evidence. This affects `risk_flags`, `action_synthesis`, `ranking`, and `multi_metric_comparison`.

3. The scoring formula heavily penalizes required-output omissions through caps. This is expected behavior, not a scoring bug.

4. Some V3 explanations are semantically correct but not shaped to the task contract. Examples include missing checklist structure, missing explicit top-percentile standing, or weakly explaining existing action evidence.

5. Numeric direction needs stronger guardrails for comparative fields. `A-C05` is the clearest example.

## Recommended Fixes For Next V3 Iteration

Prioritize these changes before another judge run:

1. Mark task-critical sections as non-removable.

   Do not trim these fields:

   - `risk_flags.recommended_actions`
   - `action_synthesis.prioritized_actions`
   - `action_synthesis.action_evidence_links`
   - `action_synthesis.rule_evaluations`
   - `ranking.flag_evidence`
   - `multi_metric_comparison.pairwise_gaps`
   - `multi_metric_comparison.selected_entity_evidence`

2. Add task-type output contracts to the prompt.

   Examples:

   - `risk_flags`: output must be checklist-style, triggered flags first, include value vs threshold.
   - `action_synthesis`: existing supported actions may be explained in `summary`/`insights`; do not require duplicate `recommendations`.
   - `ranking`: include top ranked entities, score, flags, and action per entity.
   - `peer_comparison`: explicitly state standing/top percentile and above/below benchmark metrics.

3. For `row_count <= 20`, avoid excessive derived evidence trimming logic.

   Since full rows are already included, the task-aware evidence should be a compact task contract and critical field map, not a long generic summary that risks confusing the LLM.

4. Preserve backend data-quality warnings for empty-result tasks.

   For terminal-empty cases like `A-G11`, include exact concepts such as `0 engagement rows`, missing `engagement_tracking`, and missing `temporal_activity`.

5. Add numeric direction checks for pairwise comparison.

   For each pairwise metric, include a derived field such as:

   - `higher_entity`
   - `lower_entity`
   - `difference`
   - `direction_note`

   This should reduce errors like the `family_stability_score` direction issue in `A-C05`.

## Conclusion

The 7 baseline wins are mostly caused by Task-Aware V3 not yet preserving or emphasizing the exact evidence required by the task rubric. The scoring formula is behaving as designed: it rewards complete, task-aligned, numerically correct explanations and caps explanations that miss required outputs.

The highest-impact fix is to make V3's evidence trimming task-aware in a stricter way: raw rows can still be limited, but task-critical evidence for each `ai_summary_type` must be non-removable and must be reflected in the final explanation structure.
