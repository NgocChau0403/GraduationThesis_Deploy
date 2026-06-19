# LLM Judge V2 Full 208 - Phase F1 Preflight Report

- Status: **PASS**
- Generated at: `2026-06-19T05:25:47.575Z`
- Primary cases: **104**
- Planned records: **208**

## Acceptance checks

| Check | Status | Evidence |
|---|---:|---|
| phase_f0_gate | PASS | F0 report is PASS and allows Phase F1 |
| primary_case_count | PASS | 104/104 dataset-task primary cases |
| planned_record_count | PASS | 208/208 mode-level planned records |
| task_coverage | PASS | Each dataset has 52 tasks and 104 mode-level records |
| no_duplicate_record_id | PASS | 208/208 record_id values are unique |
| record_id_format | PASS | Every record_id equals dataset_id__task_id__explanation_mode |
| phase3_metadata_consistency | PASS | Both modes agree on Phase 3 metadata; row_count_bucket matches row_count |
| evidence_access_rule | PASS | row_count <= 20 uses direct_embedding; row_count > 20 uses deterministic_artifact_retrieval |
| slice_counts | PASS | 2 all-mode slices contain 104 records each; 4 dataset-mode slices contain 52 records each |

## Slice outputs

| Slice | Records | SHA-256 |
|---|---:|---|
| `Docs/evaluation_v2/Runs/full_208/slices/planned_records__SAMPLE_UCI_POR__all_modes.jsonl` | 104 | `abdc000d76cd81a9ba2ef4ba47c3a1c7d5639e83e3da27c8bd45ef379ac589bd` |
| `Docs/evaluation_v2/Runs/full_208/slices/planned_records__SAMPLE_UCI_POR__baseline_first_20_rows.jsonl` | 52 | `cbe7a0917a9320819f8fd69142e9e877929a048a6cf7906b08541032857e9b68` |
| `Docs/evaluation_v2/Runs/full_208/slices/planned_records__SAMPLE_UCI_POR__task_aware_data_summarization.jsonl` | 52 | `c9991173f63c58b898a12e38b638558ce9af5db21a36963838df597efbe319aa` |
| `Docs/evaluation_v2/Runs/full_208/slices/planned_records__SAMPLE_OULAD__all_modes.jsonl` | 104 | `60df7efae5772dbe0d7d5ed00fdff88aea07e9401fc0c16fab1841811c38d030` |
| `Docs/evaluation_v2/Runs/full_208/slices/planned_records__SAMPLE_OULAD__baseline_first_20_rows.jsonl` | 52 | `0f3f2f930741221e405bd3150cf6fd7afa6ea7eb95c4ca3b5d299988e0cb45e7` |
| `Docs/evaluation_v2/Runs/full_208/slices/planned_records__SAMPLE_OULAD__task_aware_data_summarization.jsonl` | 52 | `18df604ddbf263b40b76cbeca76068f88a34722dd2f7cdce9ceeb6079b92b405` |

## Gate decision

- `phase_f2_allowed = true`
- `full_judge_invocation_allowed = false`
- `official_full_evaluation_allowed = false`

F1 only freezes the full case list and deterministic slices. Runtime evidence collection remains a separate Phase F2 action.
