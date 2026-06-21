# LLM Judge V2 Full 208 Official Scoring Report

- Generated at: 2026-06-20T17:59:31.816Z
- Status: PASS
- Dataset scope: SAMPLE_UCI_POR
- Evaluation run id: llm_judge_v2_full_208_scoring__SAMPLE_UCI_POR
- Scoring formula version: d3_pre_pilot_weighted_mean_v1_decimal_half_up
- Expected records: 104
- Valid source records: 104
- Attempt records: 104
- Final scoring records: 104
- Scored records: 104
- Invalid records: 0
- Errors: 0
- Warnings: 0

## Aggregate Summary

- Average raw weighted score: 7.41
- Average final score after caps: 7.16
- Verdict counts: {"good":39,"excellent":33,"acceptable":32}
- Highest error severity counts: {"minor":38,"none":36,"major":30}

## Paired Mode Comparison

- Pair count: 52
- Comparable pair count: 52
- Average delta task-aware minus baseline: 0.23
- Winner counts: {"task_aware_data_summarization":24,"tie":21,"baseline_first_20_rows":7}
- Comparable pairs by row-count bucket: {"<=20":46,">20":6}
- >20 row pairs: 6 total; 2 non-tie; 4 tie
- Non-tie pairs: 31
- Non-tie by row-count bucket: {"<=20":29,">20":2}
- Non-tie by winner and row-count bucket: {"task_aware_data_summarization__<=20":23,"baseline_first_20_rows__<=20":6,"baseline_first_20_rows__>20":1,"task_aware_data_summarization__>20":1}

Non-tie outcomes are not determined only by whether full SQL results have <=20 rows. When <=20, rows[:20] already covers the full result; wins usually come from explanation completeness, actionability, unsupported claims, or severity caps. When >20, evidence coverage can matter, but the final winner is still determined by judge metric scores and caps.

| Task | Rows | Bucket | Winner | Delta | Main explanation |
| --- | ---: | --- | --- | ---: | --- |
| A-B01 | 10 | <=20 | task_aware_data_summarization | 1.6 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 7 because of minor judge error(s). baseline rows[:20] issue(s): minor missing_required_output. |
| A-B02 | 2 | <=20 | task_aware_data_summarization | 1.6 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 7 because of minor judge error(s). baseline rows[:20] issue(s): minor missing_required_output. |
| A-B04 | 3 | <=20 | task_aware_data_summarization | 0.3 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +1, task_relevance +1. |
| A-C03 | 2 | <=20 | baseline_first_20_rows | -1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins mainly because task_aware_data_summarization was capped at 6 because of major judge error(s). task-aware issue(s): major missing_required_output. |
| A-C04 | 10 | <=20 | task_aware_data_summarization | 0.15 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major missing_required_output. |
| A-C05 | 2 | <=20 | baseline_first_20_rows | -0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: numerical_correctness -2. |
| A-G03 | 50 | >20 | baseline_first_20_rows | -0.4 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. baseline rows[:20] wins mainly because task_aware_data_summarization was capped at 7 because of minor judge error(s). task-aware issue(s): minor missing_required_output. |
| A-G04 | 3 | <=20 | task_aware_data_summarization | 0.3 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +1, task_relevance +1. |
| A-G05 | 4 | <=20 | task_aware_data_summarization | 0.3 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +1, task_relevance +1. |
| A-G06 | 0 | <=20 | task_aware_data_summarization | 1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major missing_required_output. |
| A-G08 | 1 | <=20 | task_aware_data_summarization | 0.3 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +1, task_relevance +1. |
| A-G09 | 0 | <=20 | task_aware_data_summarization | 0.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major missing_required_output. |
| A-G11 | 0 | <=20 | baseline_first_20_rows | -0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: numerical_correctness -2. |
| A-G12 | 4 | <=20 | task_aware_data_summarization | 0.3 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +1, task_relevance +1. |
| A-G14 | 0 | <=20 | task_aware_data_summarization | 1.2 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 7 because of minor judge error(s). baseline rows[:20] issue(s): minor missing_required_output. |
| A-G16 | 1 | <=20 | task_aware_data_summarization | 0.9 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 7 because of minor judge error(s). baseline rows[:20] issue(s): minor missing_required_output. |
| A-S01 | 1 | <=20 | task_aware_data_summarization | 0.45 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: task_relevance +2, completeness +1. |
| A-S04 | 4 | <=20 | task_aware_data_summarization | 1.3 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 7 because of minor judge error(s). baseline rows[:20] issue(s): minor missing_required_output. |
| A-S05 | 3 | <=20 | task_aware_data_summarization | 0.3 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +1, task_relevance +1. |
| A-S06 | 3 | <=20 | task_aware_data_summarization | 0.3 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +1, task_relevance +1. |
| A-S07 | 1 | <=20 | task_aware_data_summarization | 0.45 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: task_relevance +2, completeness +1. |
| S-T01 | 3 | <=20 | task_aware_data_summarization | 2.6 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major missing_required_output. |
| S-T02 | 3 | <=20 | task_aware_data_summarization | 0.45 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: task_relevance +2, completeness +1. |
| S-T03 | 6 | <=20 | baseline_first_20_rows | -1.3 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins mainly because task_aware_data_summarization was capped at 7 because of minor judge error(s). task-aware issue(s): minor missing_required_output. |
| S-T04 | 5 | <=20 | baseline_first_20_rows | -1.75 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins mainly because task_aware_data_summarization was capped at 6 because of major judge error(s). task-aware issue(s): major missing_required_output. |
| S-T05 | 0 | <=20 | task_aware_data_summarization | 0.85 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major missing_required_output. |
| S-T06 | 0 | <=20 | task_aware_data_summarization | 0.3 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +1, task_relevance +1. |
| S-T10 | 0 | <=20 | task_aware_data_summarization | 0.3 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +1, task_relevance +1. |
| S-T11 | 0 | <=20 | task_aware_data_summarization | 1.35 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 7 because of minor judge error(s). baseline rows[:20] issue(s): minor missing_required_output. |
| S-T13 | 1 | <=20 | baseline_first_20_rows | -1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins mainly because task_aware_data_summarization was capped at 6 because of major judge error(s). task-aware issue(s): major missing_required_output. |
| S-T14 | 649 | >20 | task_aware_data_summarization | 0.8 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 7 because of minor judge error(s). baseline rows[:20] issue(s): minor missing_required_output. |

## Reasonableness Review Note

There are `>20` row-count tasks where `baseline_first_20_rows` wins. These should be reviewed before thesis-level conclusions, because task-aware is expected to have better evidence coverage on large result sets. A baseline win can still be valid if task-aware introduces unsupported claims or misses core requirements, but derived statistics such as correlation coefficients must be checked against deterministic provenance before accepting the loss as final.

For SAMPLE_UCI_POR, see `Docs/evaluation_v2/Runs/full_208/phase8_scoring/audits/non_tie_reasonableness_audit__SAMPLE_UCI_POR.md`.

## Gate Decision

- Dataset scoring passed: true
- Full 208 finalization allowed: false
- Reason: All dataset-scoped validated judge outputs were finalized into scoring records.

## Outputs

- Final records dir: `Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/scoring/final_scoring_records`
- Scoring manifest: `Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/scoring/scoring_manifest__SAMPLE_UCI_POR.jsonl`
- JSON report: `Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/scoring/scoring_report__SAMPLE_UCI_POR.json`
- Markdown report: `Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/scoring/scoring_report__SAMPLE_UCI_POR.md`

## Issues

No issues found.

