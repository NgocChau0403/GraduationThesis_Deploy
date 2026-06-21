# LLM Judge V2 Full 208 Official Scoring Report

- Generated at: 2026-06-21T21:15:11.527Z
- Status: PASS
- Dataset scope: SAMPLE_OULAD
- Evaluation run id: llm_judge_v2_full_208_scoring__SAMPLE_OULAD
- Scoring formula version: d3_pre_pilot_weighted_mean_v1_decimal_half_up
- Expected records: 88
- Valid source records: 88
- Attempt records: 88
- Final scoring records: 88
- Scored records: 88
- Invalid records: 0
- Errors: 0
- Warnings: 0

## Aggregate Summary

- Average raw weighted score: 7.91
- Average final score after caps: 7.73
- Verdict counts: {"acceptable":15,"excellent":40,"good":31,"poor":2}
- Highest error severity counts: {"major":15,"minor":9,"none":62,"critical":2}

## Paired Mode Comparison

- Pair count: 44
- Comparable pair count: 44
- Average delta task-aware minus baseline: 1.54
- Winner counts: {"task_aware_data_summarization":42,"tie":2}
- Comparable pairs by row-count bucket: {"<=20":31,">20":13}
- >20 row pairs: 13 total; 11 non-tie; 2 tie
- Non-tie pairs: 42
- Non-tie by row-count bucket: {"<=20":31,">20":11}
- Non-tie by winner and row-count bucket: {"task_aware_data_summarization__<=20":31,"task_aware_data_summarization__>20":11}

Non-tie outcomes are not determined only by whether full SQL results have <=20 rows. When <=20, rows[:20] already covers the full result; wins usually come from explanation completeness, actionability, unsupported claims, or severity caps. When >20, evidence coverage can matter, but the final winner is still determined by judge metric scores and caps.

| Task | Rows | Bucket | Winner | Delta | Main explanation |
| --- | ---: | --- | --- | ---: | --- |
| A-B01 | 11 | <=20 | task_aware_data_summarization | 2 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major core_requirement_omission. |
| A-B02 | 4 | <=20 | task_aware_data_summarization | 1.25 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 8 because of minor judge error(s). baseline rows[:20] issue(s): minor partial_count_reporting. |
| A-B03 | 4 | <=20 | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| A-B04 | 3 | <=20 | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| A-C01 | 17 | <=20 | task_aware_data_summarization | 4.75 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 4 because of critical judge error(s). baseline rows[:20] issue(s): critical wrong_evaluation_target. |
| A-C02 | 6 | <=20 | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| A-C03 | 2 | <=20 | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| A-C05 | 2 | <=20 | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| A-C06 | 10 | <=20 | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| A-G01 | 1544 | >20 | task_aware_data_summarization | 3 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 5 because of major judge error(s). baseline rows[:20] issue(s): major unsupported_threshold_claim. |
| A-G02 | 1998 | >20 | task_aware_data_summarization | 2.75 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major numerical_mischaracterization. |
| A-G03 | 50 | >20 | task_aware_data_summarization | 1.05 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| A-G04 | 112 | >20 | task_aware_data_summarization | 1.05 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| A-G05 | 11 | <=20 | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| A-G06 | 9 | <=20 | task_aware_data_summarization | 0.9 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 8 because of minor judge error(s). baseline rows[:20] issue(s): minor unsupported_association_framing. |
| A-G07 | 4 | <=20 | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| A-G08 | 11 | <=20 | task_aware_data_summarization | 2.75 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major core_requirement_omission. |
| A-G09 | 1998 | >20 | task_aware_data_summarization | 0.2 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major core_requirement_omission. |
| A-G10 | 3 | <=20 | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| A-G11 | 42 | >20 | task_aware_data_summarization | 1.65 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 8 because of minor judge error(s). baseline rows[:20] issue(s): minor partial_coverage. |
| A-G12 | 53 | >20 | task_aware_data_summarization | 1.05 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| A-G15 | 50 | >20 | task_aware_data_summarization | 1.65 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 8 because of minor judge error(s). baseline rows[:20] issue(s): minor partial_rank_reporting. |
| A-G16 | 1 | <=20 | task_aware_data_summarization | 2.75 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major missing_action_provenance. |
| A-S01 | 1 | <=20 | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| A-S02 | 5 | <=20 | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| A-S03 | 32 | >20 | task_aware_data_summarization | 1.05 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| A-S05 | 5 | <=20 | task_aware_data_summarization | 3.75 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 5 because of major judge error(s). baseline rows[:20] issue(s): major wrong_evaluation_target. |
| A-S06 | 5 | <=20 | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| A-S08 | 1 | <=20 | task_aware_data_summarization | 2.75 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major missing_action_provenance. |
| S-B01 | 1 | <=20 | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| S-B02 | 1 | <=20 | task_aware_data_summarization | 1.2 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 8 because of minor judge error(s). baseline rows[:20] issue(s): minor unsupported_outcome_claim. |
| S-B03 | 1 | <=20 | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| S-T01 | 5 | <=20 | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| S-T02 | 5 | <=20 | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| S-T03 | 6 | <=20 | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| S-T04 | 5 | <=20 | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| S-T05 | 32 | >20 | task_aware_data_summarization | 1.15 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 8 because of minor judge error(s). baseline rows[:20] issue(s): minor unsupported_causal_language. |
| S-T08 | 5 | <=20 | task_aware_data_summarization | 2.75 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major unsupported_association_strength. |
| S-T10 | 9 | <=20 | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| S-T11 | 1988 | >20 | task_aware_data_summarization | 4.75 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 4 because of critical judge error(s). baseline rows[:20] issue(s): critical contradicted_correlation_direction. |
| S-T12 | 6 | <=20 | task_aware_data_summarization | 1.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1, numerical_correctness +1. |
| S-T13 | 1 | <=20 | task_aware_data_summarization | 2.75 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major missing_action_provenance. |

## Gate Decision

- Dataset scoring passed: true
- Full 208 finalization allowed: false
- Reason: All dataset-scoped validated judge outputs were finalized into scoring records.

## Outputs

- Final records dir: `Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/scoring/final_scoring_records`
- Scoring manifest: `Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/scoring/scoring_manifest__SAMPLE_OULAD.jsonl`
- JSON report: `Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/scoring/scoring_report__SAMPLE_OULAD.json`
- Markdown report: `Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/scoring/scoring_report__SAMPLE_OULAD.md`

## Issues

No issues found.

