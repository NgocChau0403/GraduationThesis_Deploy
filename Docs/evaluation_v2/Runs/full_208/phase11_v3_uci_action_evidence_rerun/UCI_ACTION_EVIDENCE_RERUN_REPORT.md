# UCI AI Explanation Evaluation Rerun — Action Evidence Calibration

## Evaluation scope

- Dataset: `SAMPLE_UCI_POR`
- Compared explanation modes:
  - `baseline_first_20_rows`
  - `task_aware_data_summarization`
- Judge model: `gpt-4o-mini-2024-07-18`
- Judge records: 104 records = 52 tasks × 2 explanation modes
- Judge input design: the judge sees task metadata, schema/context, evidence, full query results, deterministic action evidence, and the generated explanation.

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

## Final scoring result

| Mode | Records | Scored records | Invalid records | Average final score |
|---|---:|---:|---:|---:|
| Baseline first 20 rows | 52 | 51 | 1 | 7.96 |
| Task-aware data summarization | 52 | 52 | 0 | 8.02 |

Paired comparison:

| Metric | Value |
|---|---:|
| Total pairs | 52 |
| Comparable pairs | 51 |
| Average delta, task-aware minus baseline | +0.09 |
| Task-aware wins | 25 |
| Baseline wins | 16 |
| Ties | 10 |

By row-count bucket:

| Bucket | Comparable pairs | Average delta | Task-aware wins | Baseline wins | Ties |
|---|---:|---:|---:|---:|---:|
| `<=20` rows | 45 | +0.019 | 23 | 14 | 8 |
| `>20` rows | 6 | +0.638 | 2 | 2 | 2 |

Interpretation: for small results (`<=20` rows), the two modes are expected to be close because both can see the full result. For large results (`>20` rows), task-aware summarization shows a stronger average advantage because it is not limited to the first 20 rows.

## Action-task check

| Task | Rows | Baseline | Task-aware | Delta | Winner | Task-aware judge errors |
|---|---:|---:|---:|---:|---|---|
| `S-T13` | 1 | 7.50 | 8.20 | +0.70 | Task-aware | None |
| `A-S08` | 1 | 7.75 | 8.10 | +0.35 | Task-aware | None |
| `A-S04` | 4 | 8.30 | 8.75 | +0.45 | Task-aware | None |
| `A-G16` | 1 | 8.10 | 7.65 | -0.45 | Baseline | None |

The previous incorrect penalty for `S-T13` is no longer present. The remaining lower score for `A-G16` is not caused by a wrong missing-action penalty; the judge output has no task-aware error for that record.

## Judge/API usage

Usage is counted from the latest valid raw output for each of the 104 official records.

| Metric | Value |
|---|---:|
| Official valid records | 104 |
| Prompt tokens | 1,662,303 |
| Completion tokens | 89,676 |
| Total tokens | 1,751,979 |
| Average latency per official valid record | 13,972.8 ms |
| Model | `gpt-4o-mini-2024-07-18` |

The run log also contains retry and failed-attempt entries because invalid judge responses were retried until a valid structured output was obtained.

## Main artifacts

- Judge inputs: `Docs/evaluation_v2/Runs/full_208/phase11_v3_uci_action_evidence_rerun/judge_inputs`
- Final judge contexts: `Docs/evaluation_v2/Runs/full_208/phase11_v3_uci_action_evidence_rerun/judge_contexts/final_contexts`
- Raw judge outputs: `Docs/evaluation_v2/Runs/full_208/phase11_v3_uci_action_evidence_rerun/judge_invocation/raw_outputs`
- Judge run log: `Docs/evaluation_v2/Runs/full_208/phase11_v3_uci_action_evidence_rerun/judge_invocation/openai_judge_run_log.jsonl`
- Scoring aggregates: `Docs/evaluation_v2/Runs/full_208/phase11_v3_uci_action_evidence_rerun/scoring/aggregates`

