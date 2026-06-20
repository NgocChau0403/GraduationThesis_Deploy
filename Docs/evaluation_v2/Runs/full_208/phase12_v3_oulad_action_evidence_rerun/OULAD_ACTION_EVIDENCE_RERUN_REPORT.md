# OULAD AI Explanation Evaluation Rerun — Action Evidence Calibration

## Evaluation scope

- Dataset: `SAMPLE_OULAD`
- Compared explanation modes:
  - `baseline_first_20_rows`
  - `task_aware_data_summarization`
- Judge model: `gpt-4o-mini-2024-07-18`
- Judge records: 104 records = 52 tasks × 2 explanation modes
- Judge input design: the judge sees task metadata, schema/context, evidence, full query results when they fit the model context, deterministic action evidence, and the generated explanation.

## Why this rerun was needed

The earlier judge setup could incorrectly penalize action-oriented tasks for not inventing new recommendations. For the following tasks, actions are already produced by deterministic backend logic or returned query fields:

- `S-T13` — student action plan generation
- `A-S08` — student intervention recommendation
- `A-S04` — student risk flag breakdown with returned `recommended_action`
- `A-G16` — cohort/admin action synthesis

For these tasks, the AI explanation should explain the existing supported actions, triggers, owners, priorities, and time horizons when available. It should not be judged as defective merely because it does not create additional recommendations.

## Calibration changes applied

1. The judge prompt now explicitly distinguishes action-synthesis tasks from normal recommendation tasks.
2. Deterministic action evidence is included in judge inputs.
3. The scoring policy states that missing-action defects are valid only when a supported/returned action is omitted, not when the explanation avoids inventing extra actions.
4. For query results with `full_result_row_count <= 20`, the evaluation treats full-row inclusion as expected because `rows[:20]` already covers the full result.
5. For query results with `full_result_row_count > 20`, the judge can reward task-aware summarization for broader coverage beyond the first 20 rows.
6. When the complete evidence packet exceeded the model context limit, the judge used deterministic compact retrieval context. This occurred for 8 of 104 records; the other 96 records used full context.

## Final scoring result

| Mode | Records | Scored records | Invalid records | Average final score |
|---|---:|---:|---:|---:|
| Baseline first 20 rows | 52 | 52 | 0 | 7.88 |
| Task-aware data summarization | 52 | 52 | 0 | 7.97 |

Paired comparison:

| Metric | Value |
|---|---:|
| Total pairs | 52 |
| Comparable pairs | 52 |
| Average delta, task-aware minus baseline | +0.09 |
| Task-aware wins | 18 |
| Baseline wins | 14 |
| Ties | 20 |

By row-count bucket:

| Bucket | Comparable pairs | Average delta | Task-aware wins | Baseline wins | Ties |
|---|---:|---:|---:|---:|---:|
| `<=20` rows | 39 | +0.06 | 15 | 10 | 14 |
| `>20` rows | 13 | +0.20 | 3 | 4 | 6 |

Interpretation: for small results (`<=20` rows), the two modes are expected to be close because both can see the full result. For large results (`>20` rows), task-aware summarization has a larger average advantage because it is not limited to the first 20 rows. It does not win every large-result task; the positive average is driven by stronger improvements on tasks such as `A-G02` and `S-T11`.

## Action-task check

| Task | Rows | Baseline | Task-aware | Delta | Winner | Task-aware judge errors |
|---|---:|---:|---:|---:|---|---|
| `S-T13` | 1 | 8.10 | 8.10 | 0.00 | Tie | None |
| `A-S08` | 1 | 7.90 | 8.10 | +0.20 | Task-aware | None |
| `A-S04` | 4 | 8.20 | 8.10 | -0.10 | Baseline | None |
| `A-G16` | 1 | 8.10 | 8.30 | +0.20 | Task-aware | None |

The previous incorrect missing-recommendation penalty is no longer present. The lower task-aware score for `A-S04` is not caused by a wrong missing-action penalty; the judge output has no task-aware error for that record.

## Judge/API usage

Usage could be recovered reliably for 63 valid calls recorded after the runner path fix. The earlier 40 API-successful calls were written to raw output files but their usage metadata was lost when post-response path handling failed. One remaining record was completed through a deterministic schema repair after repeated internally inconsistent structured responses.

| Metric | Recorded value |
|---|---:|
| Official valid records | 104 |
| Valid calls with recoverable usage | 63 |
| Prompt tokens | 718,385 |
| Completion tokens | 58,592 |
| Total tokens | 776,977 |
| Average latency per recorded valid call | 11,256.9 ms |
| Model | `gpt-4o-mini-2024-07-18` |

The token counts above are partial recorded usage and must not be interpreted as the total usage of all 104 records. The final judge import itself passed with 104 raw outputs, 104 valid outputs, 0 missing records, and 0 validation errors.

## Main artifacts

- Judge inputs: `Docs/evaluation_v2/Runs/full_208/phase12_v3_oulad_action_evidence_rerun/judge_inputs`
- Final judge contexts: `Docs/evaluation_v2/Runs/full_208/phase12_v3_oulad_action_evidence_rerun/judge_contexts/final_contexts`
- Raw judge outputs: `Docs/evaluation_v2/Runs/full_208/phase12_v3_oulad_action_evidence_rerun/judge_invocation/raw_outputs`
- Judge run log: `Docs/evaluation_v2/Runs/full_208/phase12_v3_oulad_action_evidence_rerun/judge_invocation/openai_judge_run_log.jsonl`
- Scoring aggregates: `Docs/evaluation_v2/Runs/full_208/phase12_v3_oulad_action_evidence_rerun/scoring/aggregates`

