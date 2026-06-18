# Trend Comparison Dynamic Groups Specification

- Batch: 1
- Task: `A-C01`
- Internal summary type: `trend_comparison`
- External method: `task_aware_data_summarization`
- Historical comparison method: `baseline_first_20_rows`
- Status: implementation contract

## 1. Purpose

Extend the existing `trend_comparison` summarizer so it can compare group
values selected at request time. `A-C01` compares two student trajectories;
therefore student IDs must be discovered from actual runtime rows and must not
be copied into registry metadata.

This is an extension of `trend_comparison`, not a new summary type.

## 2. Registry contract

`A-C01` must define:

```text
aiSummaryType = trend_comparison
aiDynamicComparisonGroups = true
aiGroupColumn = student_id
aiTimeColumn = assessment_order
aiMetricColumn = score_normalized
aiComparisonAlignmentColumns = [assessment_order, assessment_type]
aiDivergenceThreshold = 5
aiMinimumEntityCount = 2
aiMaxPoints = 50
```

`aiTargetGroup` and fixed `aiComparisonGroups` are not used for this task.

## 3. Runtime normalization

- Parse `time_column` and `metric_column` as numeric values.
- Preserve raw group values.
- Sort each group deterministically by:
  1. `time_column`;
  2. configured alignment columns;
  3. original row index.
- Do not replace missing metrics with zero.
- Reject no runtime request solely because one group is absent. Return
  `evidence_status=insufficient_evidence` with explicit missing-group evidence.

## 4. Pairwise alignment

Pairwise evidence is calculated only at alignment keys present in both groups.

For `A-C01`, the alignment key is:

```text
assessment_order + assessment_type
```

If duplicate rows exist for one group and one alignment key, use the arithmetic
mean for pairwise comparison and preserve:

- source row indexes;
- source metric values;
- duplicate count.

Rows without a counterpart remain in each group trajectory but are excluded
from pairwise gap calculations.

## 5. Output contract

The dynamic branch must return:

```text
summary_type
dataset_name
row_count
dynamic_comparison_groups
group_column
time_column
metric_column
alignment_columns
divergence_threshold
available_groups
evidence_status
group_trends
pairwise_comparison
missing_group_evidence
summarization_warnings
```

Each `group_trends[group]` contains:

```text
group
point_count
series_points
first_point
last_point
net_change
peak
trough
largest_adjacent_drop
largest_adjacent_rise
```

`pairwise_comparison` contains:

```text
groups
shared_point_count
unmatched_point_count_by_group
gap_series
first_shared_point
last_shared_point
first_divergence
largest_absolute_gap
net_change_by_group
faster_improving_group
comparison_warnings
```

## 6. Divergence semantics

- Gap is `group_1 metric - group_2 metric`.
- `first_divergence` is the first shared point whose absolute gap is at least
  `aiDivergenceThreshold`.
- If the first shared point already exceeds the threshold, report that the
  trajectories are already separated at the first comparable assessment.
- `largest_absolute_gap` is selected by absolute gap, then alignment order.
- `faster_improving_group` is based on net change between the first and last
  shared aligned points.
- If both net changes are equal, return `tie`.
- If fewer than two shared aligned points exist, do not determine which group
  is improving faster.

## 7. Guardrails

- Never hard-code student IDs.
- Never compare non-aligned assessments as if they were the same event.
- Never infer causality.
- Never infer statistical significance.
- Do not hide unmatched trajectory points.
- Do not call a student globally better or worse; describe only the observed
  trajectory and aligned score differences.
- Keep `baseline_first_20_rows` unchanged.

## 8. Acceptance gates

1. Existing `A-G14` static target-group behavior remains unchanged.
2. UCI actual data discovers exactly two groups and six rows.
3. OULAD actual validation uses a pair with evidence for both students.
4. Dynamic output is deterministic.
5. Pairwise evidence uses only shared alignment keys.
6. Missing second group returns `insufficient_evidence`.
7. Compact output retains group trajectories and pairwise divergence evidence.
8. Registry migration occurs only after self-test and pre-migration actual-data
   validation pass.
