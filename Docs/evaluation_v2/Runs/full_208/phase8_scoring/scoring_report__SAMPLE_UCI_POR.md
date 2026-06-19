# LLM Judge V2 Full 208 Official Scoring Report

- Generated at: 2026-06-19T09:38:10.547Z
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

- Average raw weighted score: 7.9
- Average final score after caps: 7.7
- Verdict counts: {"excellent":60,"acceptable":13,"good":30,"poor":1}
- Highest error severity counts: {"none":89,"major":13,"minor":1,"critical":1}

## Paired Mode Comparison

- Pair count: 52
- Comparable pair count: 52
- Average delta task-aware minus baseline: -0.06
- Winner counts: {"tie":38,"task_aware_data_summarization":8,"baseline_first_20_rows":6}
- Comparable pairs by row-count bucket: {"<=20":46,">20":6}
- >20 row pairs: 6 total; 3 non-tie; 3 tie
- Non-tie pairs: 14
- Non-tie by row-count bucket: {"<=20":11,">20":3}
- Non-tie by winner and row-count bucket: {"task_aware_data_summarization__<=20":7,"task_aware_data_summarization__>20":1,"baseline_first_20_rows__>20":2,"baseline_first_20_rows__<=20":4}

Non-tie outcomes are not determined only by whether full SQL results have <=20 rows. When <=20, rows[:20] already covers the full result; wins usually come from explanation completeness, actionability, unsupported claims, or severity caps. When >20, evidence coverage can matter, but the final winner is still determined by judge metric scores and caps.

| Task | Rows | Bucket | Winner | Delta | Main explanation |
| --- | ---: | --- | --- | ---: | --- |
| A-C02 | 6 | <=20 | task_aware_data_summarization | 0.5 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: completeness +2, actionability +2. |
| A-G02 | 649 | >20 | task_aware_data_summarization | 2.15 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major unsupported_or_contradicted_claim. |
| A-G09 | 0 | <=20 | task_aware_data_summarization | 0.1 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: actionability +1. |
| A-G11 | 0 | <=20 | task_aware_data_summarization | 1.65 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major missing_core_output; major missing_core_output. |
| A-G13 | 649 | >20 | baseline_first_20_rows | -2.15 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. baseline rows[:20] wins mainly because task_aware_data_summarization was capped at 6 because of major judge error(s). task-aware issue(s): major unsupported_or_contradicted_claim; major unsupported_or_contradicted_claim. |
| A-G14 | 0 | <=20 | task_aware_data_summarization | 1.65 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major missing_core_output; major missing_core_output. |
| A-G16 | 1 | <=20 | baseline_first_20_rows | -0.5 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: completeness -2, actionability -2. |
| A-S04 | 4 | <=20 | baseline_first_20_rows | -2.15 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins mainly because task_aware_data_summarization was capped at 6 because of major judge error(s). task-aware issue(s): major missing_core_output; minor overstrong_causal_framing. |
| A-S08 | 1 | <=20 | task_aware_data_summarization | 1.65 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins mainly because baseline_first_20_rows was capped at 6 because of major judge error(s). baseline rows[:20] issue(s): major missing_core_output. |
| S-T05 | 0 | <=20 | task_aware_data_summarization | 0.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: safety_fairness +1. |
| S-T09 | 649 | >20 | baseline_first_20_rows | -2.15 | Full SQL result has >20 rows; rows[:20] may omit part of the result set, so evidence coverage can matter. baseline rows[:20] wins mainly because task_aware_data_summarization was capped at 6 because of major judge error(s). task-aware issue(s): major unsupported_or_contradicted_claim. |
| S-T10 | 0 | <=20 | baseline_first_20_rows | -0.05 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins on metric differences: safety_fairness -1. |
| S-T12 | 4 | <=20 | task_aware_data_summarization | 0.25 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. task-aware wins on metric differences: faithfulness +1. baseline rows[:20] issue(s): minor overstrong_causal_framing. |
| S-T13 | 1 | <=20 | baseline_first_20_rows | -4.15 | Full SQL result has <=20 rows, so rows[:20] already covers the complete result set; the difference is not caused by baseline missing rows. baseline rows[:20] wins mainly because task_aware_data_summarization was capped at 4 because of critical judge error(s). task-aware issue(s): critical unsupported_or_contradicted_claim. |

## Reasonableness Review Note

There are `>20` row-count tasks where `baseline_first_20_rows` wins. These should be reviewed before thesis-level conclusions, because task-aware is expected to have better evidence coverage on large result sets. A baseline win can still be valid if task-aware introduces unsupported claims or misses core requirements, but derived statistics such as correlation coefficients must be checked against deterministic provenance before accepting the loss as final.

For SAMPLE_UCI_POR, see `Docs/evaluation_v2/Runs/full_208/phase8_scoring/audits/non_tie_reasonableness_audit__SAMPLE_UCI_POR.md`.

## Gate Decision

- Dataset scoring passed: true
- Full 208 finalization allowed: false
- Reason: All dataset-scoped validated judge outputs were finalized into scoring records.

## Outputs

- Final records dir: `Docs/evaluation_v2/Runs/full_208/phase8_scoring/final_scoring_records`
- Scoring manifest: `Docs/evaluation_v2/Runs/full_208/phase8_scoring/scoring_manifest__SAMPLE_UCI_POR.jsonl`
- JSON report: `Docs/evaluation_v2/Runs/full_208/phase8_scoring/scoring_report__SAMPLE_UCI_POR.json`
- Markdown report: `Docs/evaluation_v2/Runs/full_208/phase8_scoring/scoring_report__SAMPLE_UCI_POR.md`

## Issues

No issues found.

