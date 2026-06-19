# Phase 6.5 Raw Judge Output Instructions

This folder is intentionally empty until actual Codex/LLM judge responses are produced.

For each prompt packet in:

```text
Docs/evaluation_v2/Runs/phase6_judge_invocation/prompt_queue/
```

run the judge and save the raw JSON response to:

```text
Docs/evaluation_v2/Runs/phase6_judge_invocation/raw_outputs/{record_id}.json
```

The expected path for every record is listed in:

```text
Docs/evaluation_v2/Runs/phase6_judge_invocation/pilot_judge_invocation_manifest.jsonl
```

After raw outputs are saved, run:

```powershell
node Docs/evaluation_v2/Runs/scripts/runLlmJudgeV2PilotJudgeInvocation.mjs --mode import
```

The importer will:

- extract JSON from each raw output;
- validate against `LLM_JUDGE_V2_JUDGE_RESPONSE_SCHEMA_V1.json`;
- reject forbidden runner-derived fields;
- verify `record_id`;
- create execution attempt wrappers;
- create record execution statuses;
- update the Phase 6.5 report.

Phase 6.6 scoring is allowed only after the Phase 6.5 report has:

```text
pilot_output_validation_passed = true
phase6_6_scoring_allowed = true
```
