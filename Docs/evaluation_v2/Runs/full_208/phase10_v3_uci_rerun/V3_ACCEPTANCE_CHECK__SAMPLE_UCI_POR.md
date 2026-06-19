# V3 Acceptance Check - SAMPLE_UCI_POR

- Generated after Phase 10 UCI V3 judge import/scoring.
- Source pairwise dry run: `Docs/evaluation_v2/Runs/full_208/phase9_single_review_dry_run/pairwise_aggregate/pairwise_dry_run_aggregate__SAMPLE_UCI_POR.json`
- Source pointwise scoring: `Docs/evaluation_v2/Runs/full_208/phase10_v3_uci_rerun/scoring/final_scoring_records`

## Decision

**Do not proceed to OULAD yet.**

The V3 pointwise rerun does not satisfy the pre-declared pairwise alignment acceptance criterion:

- Required alignment: at least `12 / 15`
- Observed alignment: `5 / 15`
- Result: **FAIL**

This means V3 fixed some deterministic evidence problems, but pointwise scoring is still not sensitive enough to reproduce the 15-case pairwise dry-run judgments.

## Gate Summary

| Gate | Result | Evidence |
| --- | --- | --- |
| UCI import/validation | PASS | 104 raw outputs, 104 valid, 0 missing, 0 errors |
| UCI scoring | PASS | 104 / 104 scored |
| Pairwise alignment | FAIL | 5 / 15, below required 12 / 15 |
| Critical derived-stat contradiction unresolved | PASS | S-T15 baseline wrong direction was capped as critical |
| Clarity clustering | IMPROVED, NOT FINAL | clarity score split: 7 = 63 records, 8 = 41 records |
| Cap policy review | REVIEW NEEDED | 7 records have judge errors; 3 records have caps |

## Pairwise vs V3 Pointwise Alignment

| Task | Rows | Pairwise Winner | V3 Pointwise Winner | Baseline | Task-aware | Delta | Align |
| --- | ---: | --- | --- | ---: | ---: | ---: | --- |
| A-B01 | 10 | task_aware_data_summarization | tie | 7.9 | 7.9 | 0 | no |
| A-C02 | 6 | baseline_first_20_rows | tie | 7.8 | 7.8 | 0 | no |
| A-G02 | 649 | task_aware_data_summarization | task_aware_data_summarization | 5 | 7.75 | 2.75 | yes |
| A-G03 | 50 | baseline_first_20_rows | tie | 5.9 | 5.9 | 0 | no |
| A-G11 | 0 | baseline_first_20_rows | tie | 7.8 | 7.8 | 0 | no |
| A-G13 | 649 | task_aware_data_summarization | tie | 7.75 | 7.75 | 0 | no |
| A-G14 | 0 | tie | tie | 7.8 | 7.8 | 0 | yes |
| A-S04 | 4 | baseline_first_20_rows | baseline_first_20_rows | 7.9 | 7.8 | -0.1 | yes |
| A-S08 | 1 | baseline_first_20_rows | tie | 7.8 | 7.8 | 0 | no |
| S-T01 | 3 | task_aware_data_summarization | tie | 7.9 | 7.9 | 0 | no |
| S-T09 | 649 | task_aware_data_summarization | tie | 7.65 | 7.65 | 0 | no |
| S-T12 | 4 | baseline_first_20_rows | tie | 7.9 | 7.9 | 0 | no |
| S-T13 | 1 | baseline_first_20_rows | baseline_first_20_rows | 7.8 | 5.8 | -2 | yes |
| S-T14 | 649 | task_aware_data_summarization | baseline_first_20_rows | 7.65 | 7.2 | -0.45 | no |
| S-T15 | 649 | task_aware_data_summarization | task_aware_data_summarization | 2 | 7.65 | 5.65 | yes |

## Derived-Stat Check

The critical derived-stat gate passed:

- `S-T15 baseline_first_20_rows` was correctly flagged as `critical: contradictory_core_numerical_claim` and capped at `2`.
- `A-G02 baseline_first_20_rows` was correctly flagged as `major: unsupported_numerical_claim` because derived-stat evidence was skipped due to zero variance.

However, derived-stat sensitivity is still insufficient:

- `A-G13` pairwise winner was task-aware, but V3 pointwise scored tie.
- `S-T09` pairwise winner was task-aware, but V3 pointwise scored tie.
- `S-T14` pairwise winner was task-aware, but V3 pointwise selected baseline, while task-aware received `minor: overstated_association`.

## Interpretation

The main remaining issue is not import, validation, or basic scoring mechanics. Those passed. The issue is that the pointwise judge still collapses many cases into ties, while pairwise judging can distinguish explanation quality on the same evidence.

This is especially visible in the dry-run calibration set:

- 10 / 15 cases fail alignment.
- 8 / 10 failed cases became pointwise ties.
- 1 / 10 failed cases reversed the pairwise winner (`S-T14`).

## Recommendation

Do not run OULAD yet as official V3 evidence.

Before OULAD, choose one of these paths:

1. Add an official pairwise scoring stage for final mode comparison, using pointwise scoring only for absolute quality.
2. Strengthen pointwise V3 prompt/rubric again so it must apply pairwise-calibrated sensitivity when both mode outputs are known to be from the same task.
3. Rerun only the 15 calibration cases after the prompt/policy patch and require alignment to reach at least `12 / 15` before running OULAD.

