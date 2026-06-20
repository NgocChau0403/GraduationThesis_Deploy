# LLM Judge V3 UCI Rerun Official Judge Invocation Report

- Generated at: 2026-06-20T02:58:02.812Z
- Mode: import
- Status: PASS
- Dataset scope: SAMPLE_UCI_POR
- Evaluation run id: llm_judge_v3_uci_action_evidence_rerun__SAMPLE_UCI_POR
- Session segment id: phase11_v3_uci_action_evidence_rerun__SAMPLE_UCI_POR__segment_001
- Expected records: 104
- Invocation manifest records: 104
- Raw received records: 104
- Valid records: 104
- Retryable invalid records: 0
- Missing records: 0
- Errors: 0
- Warnings: 0

## Gate Decision

- Prompt queue ready: true
- Actual judge invocation completed: true
- Judge output validation passed: true
- Phase 10 V3 scoring allowed for dataset: true
- Full 208 finalization allowed: false
- Reason: All dataset-scoped raw judge outputs imported and schema-validated.

## Coverage

| Dimension | Counts |
| --- | --- |
| Datasets | {"SAMPLE_UCI_POR":104} |
| Explanation modes | {"baseline_first_20_rows":52,"task_aware_data_summarization":52} |
| Evidence access modes | {"direct_embedding":92,"deterministic_artifact_retrieval":12} |
| Queue strategies | {"full_context":94,"compact_retrieval_context":10} |
| Record statuses | {"valid":104} |

## Outputs

- Prompt queue dir: `Docs/evaluation_v2/Runs/full_208/phase11_v3_uci_action_evidence_rerun/judge_invocation/prompt_queue`
- Raw outputs dir: `Docs/evaluation_v2/Runs/full_208/phase11_v3_uci_action_evidence_rerun/judge_invocation/raw_outputs`
- Extracted outputs dir: `Docs/evaluation_v2/Runs/full_208/phase11_v3_uci_action_evidence_rerun/judge_invocation/extracted_outputs`
- Validated outputs dir: `Docs/evaluation_v2/Runs/full_208/phase11_v3_uci_action_evidence_rerun/judge_invocation/validated_outputs`
- Attempt wrappers dir: `Docs/evaluation_v2/Runs/full_208/phase11_v3_uci_action_evidence_rerun/judge_invocation/attempt_wrappers`
- Record status dir: `Docs/evaluation_v2/Runs/full_208/phase11_v3_uci_action_evidence_rerun/judge_invocation/record_status`
- Invocation manifest: `Docs/evaluation_v2/Runs/full_208/phase11_v3_uci_action_evidence_rerun/judge_invocation/judge_invocation_manifest.jsonl`
- Attempt manifest: `Docs/evaluation_v2/Runs/full_208/phase11_v3_uci_action_evidence_rerun/judge_invocation/judge_attempt_manifest.jsonl`
- Status manifest: `Docs/evaluation_v2/Runs/full_208/phase11_v3_uci_action_evidence_rerun/judge_invocation/record_execution_status_manifest.jsonl`
- JSON report: `Docs/evaluation_v2/Runs/full_208/phase11_v3_uci_action_evidence_rerun/judge_invocation/judge_invocation_report.json`
- Markdown report: `Docs/evaluation_v2/Runs/full_208/phase11_v3_uci_action_evidence_rerun/judge_invocation/judge_invocation_report.md`

## Issues

No issues found.

