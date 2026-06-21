# LLM Judge V2 Full 208 Official Scoring Report

- Generated at: 2026-06-21T11:08:45.380Z
- Status: PASS
- Dataset scope: SAMPLE_UCI_POR
- Evaluation run id: llm_judge_v2_full_208_scoring__SAMPLE_UCI_POR
- Scoring formula version: d3_pre_pilot_weighted_mean_v1_decimal_half_up
- Expected records: 48
- Valid source records: 48
- Attempt records: 48
- Final scoring records: 48
- Scored records: 48
- Invalid records: 0
- Errors: 0
- Warnings: 0

## Aggregate Summary

- Average raw weighted score: 7.58
- Average final score after caps: 7.09
- Verdict counts: {"good":6,"excellent":20,"acceptable":16,"poor":6}
- Highest error severity counts: {"major":24,"none":13,"minor":7,"critical":4}

## Paired Mode Comparison

- Pair count: 24
- Comparable pair count: 24
- Average delta task-aware minus baseline: 0.51
- Winner counts: {"task_aware_data_summarization":12,"tie":6,"baseline_first_20_rows":6}
- Comparable pairs by row-count bucket: {"<=20":19,">20":5}
- >20 row pairs: 5 total; 4 non-tie; 1 tie
- Non-tie pairs: 18
- Non-tie by row-count bucket: {"<=20":14,">20":4}
- Non-tie by winner and row-count bucket: {"task_aware_data_summarization__<=20":8,"task_aware_data_summarization__>20":4,"baseline_first_20_rows__<=20":6}

Non-tie outcomes are not determined only by whether full SQL results have <=20 rows. When <=20, rows[:20] already covers the full result; wins usually come from explanation completeness, actionability, unsupported claims, or severity caps. When >20, evidence coverage can matter, but the final winner is still determined by judge metric scores and caps.

| Task | Rows | Bucket | Winner | Delta | Main explanation |
| --- | ---: | --- | --- | ---: | --- |
| A-B01 | 10 | <=20 | task_aware_data_summarization | 2.35 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 7 because of major judge error(s). baseline rows[:20] issue(s): major missing_required_output. |
| A-B02 | 2 | <=20 | task_aware_data_summarization | 0.45 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, task_relevance +1. baseline rows[:20] issue(s): minor missing_required_output. |
| A-C01 | 6 | <=20 | task_aware_data_summarization | 0.9 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: faithfulness +1, numerical_correctness +1, completeness +1. baseline rows[:20] issue(s): minor imprecise_trajectory_interpretation. |
| A-C05 | 2 | <=20 | task_aware_data_summarization | 1.75 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 7 because of major judge error(s). baseline rows[:20] issue(s): major unsupported_causal_framing. |
| A-G13 | 649 | >20 | task_aware_data_summarization | 1.6 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 5 because of major judge error(s). baseline rows[:20] issue(s): major misleading_correlation_interpretation. |
| A-S04 | 4 | <=20 | baseline_first_20_rows | -1.9 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins mainly because task_aware_data_summarization was capped at 7 because of major judge error(s). task-aware issue(s): major missing_required_output. |
| A-S05 | 3 | <=20 | baseline_first_20_rows | -0.85 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: faithfulness -2, completeness -1, task_relevance -1. task-aware issue(s): minor scope_imprecision. |
| A-S07 | 1 | <=20 | baseline_first_20_rows | -0.5 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins mainly because task_aware_data_summarization was capped at 6 because of major judge error(s). task-aware issue(s): major unsupported_numerical_claim. |
| S-B01 | 1 | <=20 | task_aware_data_summarization | 0.5 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: faithfulness +1, completeness +1, actionability +1. |
| S-B02 | 1 | <=20 | task_aware_data_summarization | 2.65 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major contradicted_metric_interpretation. |
| S-T02 | 3 | <=20 | task_aware_data_summarization | 0.7 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: faithfulness +1, completeness +1, task_relevance +1. baseline rows[:20] issue(s): minor scope_imprecision. |
| S-T03 | 6 | <=20 | baseline_first_20_rows | -1.5 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins mainly because task_aware_data_summarization was capped at 7 because of major judge error(s). task-aware issue(s): major missing_required_output. |
| S-T04 | 5 | <=20 | task_aware_data_summarization | 3.85 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major missing_required_output. |
| S-T07 | 4 | <=20 | baseline_first_20_rows | -1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins mainly because task_aware_data_summarization was capped at 3 because of critical judge error(s). task-aware issue(s): critical wrong_evaluation_target. |
| S-T09 | 649 | >20 | task_aware_data_summarization | 1.2 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 5 because of major judge error(s). baseline rows[:20] issue(s): major misleading_correlation_interpretation. |
| S-T13 | 1 | <=20 | baseline_first_20_rows | -1.85 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins mainly because task_aware_data_summarization was capped at 4 because of critical judge error(s). task-aware issue(s): critical invented_action. |
| S-T14 | 649 | >20 | task_aware_data_summarization | 1 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 5 because of major judge error(s). baseline rows[:20] issue(s): major misleading_correlation_interpretation. |
| S-T15 | 649 | >20 | task_aware_data_summarization | 3 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 3 because of critical judge error(s). baseline rows[:20] issue(s): critical contradictory_core_numerical_claim. |

## Gate Decision

- Dataset scoring passed: true
- Full 208 finalization allowed: false
- Reason: All dataset-scoped validated judge outputs were finalized into scoring records.

## Outputs

- Final records dir: `Docs/evaluation_v2/Runs/full_208/phase13_taskaware_saufix_executable_only/scoring/SAMPLE_UCI_POR/final_scoring_records`
- Scoring manifest: `Docs/evaluation_v2/Runs/full_208/phase13_taskaware_saufix_executable_only/scoring/SAMPLE_UCI_POR/scoring_manifest__SAMPLE_UCI_POR.jsonl`
- JSON report: `Docs/evaluation_v2/Runs/full_208/phase13_taskaware_saufix_executable_only/scoring/SAMPLE_UCI_POR/scoring_report__SAMPLE_UCI_POR.json`
- Markdown report: `Docs/evaluation_v2/Runs/full_208/phase13_taskaware_saufix_executable_only/scoring/SAMPLE_UCI_POR/scoring_report__SAMPLE_UCI_POR.md`

## Issues

No issues found.

