# SAMPLE_UCI_POR Non-Tie Reasonableness Audit

Generated after reviewing the Phase 8 UCI scoring report.

## Conclusion

The current UCI scoring report is mechanically consistent with the saved LLM judge outputs, but it should not yet be treated as a fully defensible final conclusion that `baseline_first_20_rows` truly outperforms `task_aware_data_summarization` on every baseline-win task.

The suspicious cases are the `>20` row-count tasks where baseline wins:

- `A-G13`
- `S-T09`

Both have `full_result_row_count = 649`, use `deterministic_artifact_retrieval`, and task-aware was penalized because the judge marked the correlation coefficient `-0.1041` as unsupported. A deterministic recomputation from the full query artifacts gives:

```text
A-G13 Pearson(lifestyle_risk_score, avg_score), n=649: -0.10413814597596738
S-T09 Pearson(lifestyle_risk_score, avg_score), n=649: -0.10413814597596738
```

Therefore, the coefficient rounded to `-0.1041` appears to be mathematically supported by the full query rows. The issue is likely that the judge prompt/evidence packet did not expose this derived statistic as a deterministic evidence field, so the LLM judge treated the number as not found in the supplied evidence.

## Evidence Files

Scoring summary and non-tie counts:

```text
Docs/evaluation_v2/Runs/full_208/phase8_scoring/scoring_report__SAMPLE_UCI_POR.md
```

Task-aware judge outputs that triggered the suspicious baseline wins:

```text
Docs/evaluation_v2/Runs/full_208/phase8_judge_invocation/validated_outputs/SAMPLE_UCI_POR__A-G13__task_aware_data_summarization.json
Docs/evaluation_v2/Runs/full_208/phase8_judge_invocation/validated_outputs/SAMPLE_UCI_POR__S-T09__task_aware_data_summarization.json
```

Final scoring records showing major caps:

```text
Docs/evaluation_v2/Runs/full_208/phase8_scoring/final_scoring_records/SAMPLE_UCI_POR__A-G13__task_aware_data_summarization.json
Docs/evaluation_v2/Runs/full_208/phase8_scoring/final_scoring_records/SAMPLE_UCI_POR__S-T09__task_aware_data_summarization.json
```

Task-aware explanation artifacts where the coefficient appears:

```text
Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__A-G13__task_aware_data_summarization.json
Docs/evaluation_v2/Runs/full_208/phase8_explanations/task_aware_data_summarization/SAMPLE_UCI_POR/explanation_artifacts/SAMPLE_UCI_POR__S-T09__task_aware_data_summarization.json
```

Full query artifacts used for deterministic recomputation:

```text
Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__A-G13.json
Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_UCI_POR/full_query_artifacts/SAMPLE_UCI_POR__S-T09.json
```

Runtime code confirming the two methods and metadata fields:

```text
AIService/strategies/base.py
```

## Interpretation

For `<=20` row tasks, it is reasonable that either mode can win. In those cases, `rows[:20]` covers the entire SQL result, so differences are driven by the generated explanation quality rather than data truncation.

For `>20` row tasks, it is reasonable to expect task-aware to often do better, but it is not guaranteed. Task-aware can still lose if it introduces unsupported claims, misses core task requirements, or if the judge cannot verify derived statistics from the evidence packet.

For `A-G13` and `S-T09`, the baseline win should be marked as review-needed because the penalized task-aware coefficient appears to be correct when recomputed from the full rows.

## Recommended Fix Before Defense

Before using this result as final thesis evidence:

1. Add deterministic derived-stat evidence for correlation tasks into the judge input or retrieval evidence summary.
2. Include fields such as `pearson_r`, `n`, `x_column`, `y_column`, and source artifact hash.
3. Re-run judge invocation/scoring for at least affected correlation records, or rerun UCI scoring after deterministic checker adjustment.
4. In the thesis report, do not claim that baseline truly beats task-aware on `A-G13` and `S-T09` until the derived-stat evidence issue is resolved.

