# LLM Judge V3 UCI Rerun Freeze Manifest

## Freeze Scope

```text
FREEZE ID: llm_judge_v3_uci_rerun_freeze_2026-06-19
STATUS: FROZEN FOR UCI CALIBRATION RERUN
DATASET: SAMPLE_UCI_POR
EXPECTED RECORDS: 104
SESSION POLICY: one new Codex project and chat session for the UCI run
```

This freeze is the official single-review calibration contract for rerunning
UCI. It is not approved for OULAD until the post-UCI acceptance gate passes.

## Frozen Artifacts

| Artifact | SHA-256 |
|---|---|
| `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md` | `ce82959702c6d15d972b2d7610b202f2c4d95c77b1aba184930d0991895647f9` |
| `Docs/evaluation_v2/Rubric/JUDGE_SCORING_POLICY_V3.md` | `64d5fff45009fca7eb71f5b001b6e8582ea618bf7d44a9c65ff31b212d0b8cc4` |
| `Docs/evaluation_v2/Input_AI/judge_input_schema_v3.json` | `556a75bf16323c919dd48d4eee64238f78a0b7a5bca84477b46ea4d853b6aa24` |
| `Docs/evaluation_v2/Rubric/JUDGE_RUBRIC_1_TO_10.md` | `ac141e7148141de0244bf4443ba32aa8e47a08313fdaa1a7bc697a6b9faafcc1` |
| `Docs/evaluation_v2/Rubric/LLM_JUDGE_V2_METRIC_ANCHOR_SPEC.md` | `a45a3d6b7e0a95f6f804a1739ea3685ec532c132b455ac802fe823cbe400d8fe` |
| `Docs/evaluation_v2/LLM_JUDGE_V2_JUDGE_RESPONSE_SCHEMA_V1.json` | `b41dcfec162c965b2de222d82294a1cc1dcce367a6d529f99170572e4120d57c` |

## Materialized Run Inputs

- Judge input manifest:
  `Docs/evaluation_v2/Runs/full_208/phase10_v3_uci_rerun/judge_inputs/judge_input_manifest.jsonl`
- Judge input validation:
  `Docs/evaluation_v2/Runs/full_208/phase10_v3_uci_rerun/judge_inputs/validation_report.json`
- Final context manifest:
  `Docs/evaluation_v2/Runs/full_208/phase10_v3_uci_rerun/judge_contexts/judge_context_manifest.jsonl`
- Prompt queue manifest:
  `Docs/evaluation_v2/Runs/full_208/phase10_v3_uci_rerun/judge_invocation/judge_prompt_queue_manifest.jsonl`
- Prompt queue:
  `Docs/evaluation_v2/Runs/full_208/phase10_v3_uci_rerun/judge_invocation/prompt_queue`

## Acceptance Gate

Before OULAD:

1. V3 pointwise outcomes align with at least 12 of the 15 pairwise dry-run
   winners;
2. no critical derived-stat contradiction is missed;
3. `clarity = 8` is no longer assigned to all records;
4. cap applications are reviewed under the frozen UCI calibration policy;
5. UCI reports are regenerated from validated V3 raw outputs and scoring.

Any edit to a frozen artifact invalidates this manifest and requires new
hashes, rebuilt contexts and a rebuilt prompt queue.
