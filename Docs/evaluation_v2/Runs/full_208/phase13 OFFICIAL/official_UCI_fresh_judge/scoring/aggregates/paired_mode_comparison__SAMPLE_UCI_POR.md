# Paired Mode Comparison

- Dataset scope: SAMPLE_UCI_POR
- Pair count: 24
- Comparable pair count: 24
- Non-comparable pair count: 0
- Average delta task-aware minus baseline: 2.06
- Winner counts: {"task_aware_data_summarization":20,"tie":4}
- Comparable pairs by row-count bucket: {"<=20":19,">20":5}
- >20 row pairs: 5 total; 5 non-tie; 0 tie
- Non-tie pairs: 20
- Non-tie by row-count bucket: {"<=20":15,">20":5}
- Non-tie by winner and row-count bucket: {"task_aware_data_summarization__<=20":15,"task_aware_data_summarization__>20":5}

| Task | Baseline | Task-aware | Delta | Winner |
| --- | ---: | ---: | ---: | --- |
| A-B01 | 7.4 | 9.5 | 2.1 | task_aware_data_summarization |
| A-B02 | 8.8 | 9.75 | 0.95 | task_aware_data_summarization |
| A-C01 | 7.6 | 9.75 | 2.15 | task_aware_data_summarization |
| A-C04 | 6.95 | 6.95 | 0 | tie |
| A-C05 | 8.2 | 8.2 | 0 | tie |
| A-G03 | 7.1 | 9.15 | 2.05 | task_aware_data_summarization |
| A-G04 | 9.35 | 9.75 | 0.4 | task_aware_data_summarization |
| A-G12 | 7.3 | 7.3 | 0 | tie |
| A-G13 | 5.6 | 7.9 | 2.3 | task_aware_data_summarization |
| A-S02 | 7.7 | 8.25 | 0.55 | task_aware_data_summarization |
| A-S04 | 9.2 | 9.65 | 0.45 | task_aware_data_summarization |
| A-S05 | 8.55 | 9.75 | 1.2 | task_aware_data_summarization |
| A-S07 | 5.85 | 8.55 | 2.7 | task_aware_data_summarization |
| S-B01 | 9.15 | 9.75 | 0.6 | task_aware_data_summarization |
| S-B02 | 5 | 8.9 | 3.9 | task_aware_data_summarization |
| S-T01 | 9.35 | 9.35 | 0 | tie |
| S-T02 | 5 | 9.75 | 4.75 | task_aware_data_summarization |
| S-T03 | 8.65 | 8.75 | 0.1 | task_aware_data_summarization |
| S-T04 | 7.9 | 9.6 | 1.7 | task_aware_data_summarization |
| S-T07 | 3 | 9.75 | 6.75 | task_aware_data_summarization |
| S-T09 | 4.95 | 7.25 | 2.3 | task_aware_data_summarization |
| S-T13 | 3 | 9.85 | 6.85 | task_aware_data_summarization |
| S-T14 | 5 | 7.4 | 2.4 | task_aware_data_summarization |
| S-T15 | 2 | 7.25 | 5.25 | task_aware_data_summarization |

## Non-Tie Explanation

Non-tie outcomes are not determined only by whether full SQL results have <=20 rows. When <=20, rows[:20] already covers the full result; wins usually come from explanation completeness, actionability, unsupported claims, or severity caps. When >20, evidence coverage can matter, but the final winner is still determined by judge metric scores and caps.

| Task | Rows | Bucket | Evidence | Winner | Delta | Main explanation |
| --- | ---: | --- | --- | --- | ---: | --- |
| A-B01 | 10 | <=20 | direct_embedding | task_aware_data_summarization | 2.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +5, faithfulness +2, task_relevance +2. baseline rows[:20] issue(s): major required_output_omission; minor distribution_overstatement. |
| A-B02 | 2 | <=20 | direct_embedding | task_aware_data_summarization | 0.95 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +3, faithfulness +1, task_relevance +1. baseline rows[:20] issue(s): minor required_output_omission. |
| A-C01 | 6 | <=20 | direct_embedding | task_aware_data_summarization | 2.15 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: faithfulness +4, actionability +3, safety_fairness +3. baseline rows[:20] issue(s): major unsupported_psychological_inference; minor partial_core_answer. |
| A-G03 | 50 | >20 | deterministic_artifact_retrieval | task_aware_data_summarization | 2.05 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins on metric differences: completeness +5, task_relevance +4, actionability +3. baseline rows[:20] issue(s): major ranking_omission; major per_student_action_omission. |
| A-G04 | 3 | <=20 | direct_embedding | task_aware_data_summarization | 0.4 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: faithfulness +1, completeness +1. |
| A-G13 | 649 | >20 | deterministic_artifact_retrieval | task_aware_data_summarization | 2.3 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins on metric differences: faithfulness +4, numerical_correctness +3, clarity +2. baseline rows[:20] issue(s): major ranking_omission; major association_overstatement. |
| A-S02 | 3 | <=20 | direct_embedding | task_aware_data_summarization | 0.55 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: faithfulness +1, numerical_correctness +1, actionability +1. baseline rows[:20] issue(s): major required_slope_omission. |
| A-S04 | 4 | <=20 | direct_embedding | task_aware_data_summarization | 0.45 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, faithfulness +1. baseline rows[:20] issue(s): minor flag_metadata_partial_omission. |
| A-S05 | 3 | <=20 | direct_embedding | task_aware_data_summarization | 1.2 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: faithfulness +3, task_relevance +2, clarity +1. baseline rows[:20] issue(s): major selected_student_scope_error. |
| A-S07 | 1 | <=20 | direct_embedding | task_aware_data_summarization | 2.7 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: faithfulness +4, completeness +3, actionability +3. baseline rows[:20] issue(s): major existing_support_omission; major unsupported_sensitive_inference. |
| S-B01 | 1 | <=20 | direct_embedding | task_aware_data_summarization | 0.6 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: actionability +2, faithfulness +1, completeness +1. baseline rows[:20] issue(s): minor generic_action. |
| S-B02 | 1 | <=20 | direct_embedding | task_aware_data_summarization | 3.9 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 5 because of major judge error(s). baseline rows[:20] issue(s): major availability_and_direction_misread. |
| S-T02 | 3 | <=20 | direct_embedding | task_aware_data_summarization | 4.75 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 5 because of major judge error(s). baseline rows[:20] issue(s): major selected_student_scope_error. |
| S-T03 | 6 | <=20 | direct_embedding | task_aware_data_summarization | 0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: actionability +1. baseline rows[:20] issue(s): major top_percent_omission. |
| S-T04 | 5 | <=20 | direct_embedding | task_aware_data_summarization | 1.7 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +4, numerical_correctness +3, faithfulness +1. baseline rows[:20] issue(s): major trigger_metadata_omission. |
| S-T07 | 4 | <=20 | direct_embedding | task_aware_data_summarization | 6.75 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 3 because of critical judge error(s). baseline rows[:20] issue(s): critical fabricated_association; minor proportion_format_partial. |
| S-T09 | 649 | >20 | deterministic_artifact_retrieval | task_aware_data_summarization | 2.3 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 5 because of major judge error(s). baseline rows[:20] issue(s): major selected_student_position_omission; major association_overstatement. |
| S-T13 | 1 | <=20 | direct_embedding | task_aware_data_summarization | 6.85 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 3 because of critical judge error(s). baseline rows[:20] issue(s): critical supported_actions_omission; major unavailable_evidence_used. |
| S-T14 | 649 | >20 | deterministic_artifact_retrieval | task_aware_data_summarization | 2.4 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 5 because of major judge error(s). baseline rows[:20] issue(s): major selected_student_position_omission; major negligible_association_overstatement. |
| S-T15 | 649 | >20 | deterministic_artifact_retrieval | task_aware_data_summarization | 5.25 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 2 because of critical judge error(s). baseline rows[:20] issue(s): critical correlation_direction_reversal; major selected_student_position_omission. |

