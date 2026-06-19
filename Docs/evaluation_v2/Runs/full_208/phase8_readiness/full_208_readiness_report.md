# LLM Judge V2 Full 208 - Phase F0 Readiness Report

- Status: **PASS**
- Generated at: `2026-06-19T05:19:48.135Z`
- Full run execution authorized by this report: **no** (Phase F0 readiness only)

## Acceptance checks

| Check | Status | Evidence |
|---|---:|---|
| contract_manifest_hashes | PASS | 17/17 frozen artifact hashes match |
| task_requirements_52_approved | PASS | 52/52 tasks have review_status=approved_for_pilot |
| schema_and_prompt_present | PASS | judge input schema parses with 13 top-level required fields; prompt is non-empty and hash-pinned |
| row_count_distribution_208 | PASS | expected_records=208, actual_records=208, totals.total_records=208 |
| full_scope_52x2x2 | PASS | UCI=52 tasks/104 records; OULAD=52 tasks/104 records; total=208 unique mode-level records |
| smoke_not_full_calibration_pilot | PASS | 2/24 records scored; smoke pass only; full pilot/calibration incomplete |

## Full scope reconstructed from row_count_records.jsonl

| Dataset | Unique tasks | Baseline | Task-aware | Total mode-level records |
|---|---:|---:|---:|---:|
| SAMPLE_UCI_POR | 52 | 52 | 52 | 104 |
| SAMPLE_OULAD | 52 | 52 | 52 | 104 |
| **Total** | **104** | **104** | **104** | **208** |

## Smoke versus calibration-pilot classification

The validation currently completed is a **scoring smoke validation only**: 2/24 pilot records have validated scoring outputs. It proves that the invocation import/validation/finalization path can process available outputs; it does not establish full pilot coverage, judge calibration, final calibration thresholds, or readiness to claim an official full evaluation.

- Scoring smoke status: `SMOKE_PASS`
- Full pilot scoring passed: `false`
- Actual pilot judge invocation completed: `false`
- Full calibration pilot completed: `false`
- Official full evaluation allowed by existing pilot artifacts: `false`

## Gate decision

`phase_f1_allowed = true`

This PASS means the frozen contract and 208-record planning inputs are internally consistent enough to start Phase F1. It does not itself authorize judge invocation or the official full run.
