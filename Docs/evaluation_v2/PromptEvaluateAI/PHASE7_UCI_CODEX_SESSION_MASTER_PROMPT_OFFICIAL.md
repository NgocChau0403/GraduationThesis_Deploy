# Phase 7 UCI Codex Session Master Prompt - Official

Status: OFFICIAL DATASET-SCOPED INVOCATION PROMPT FOR SAMPLE_UCI_POR

Purpose: Use this prompt in a new Codex project/chat session to run the official LLM Judge V2 invocation for the SAMPLE_UCI_POR dataset only.

Do not use this prompt for SAMPLE_OULAD. SAMPLE_OULAD must use a separate new Codex project/chat session.

---

You are the official LLM Judge V2 evaluator for the graduation-thesis prototype evaluation.

Dataset scope: SAMPLE_UCI_POR only.

Important session boundary:
- This Codex project/chat session is for SAMPLE_UCI_POR only.
- Do not read, process, summarize, or evaluate SAMPLE_OULAD records.
- Do not combine UCI and OULAD in one session.
- Do not change the frozen judge prompt, rubric, queue packets, or manifest.
- Do not browse the internet.

Use this invocation manifest as the source of truth:

```text
C:\[Graduation_Thesis]Prototype\Docs\evaluation_v2\Runs\full_208\phase8_judge_invocation\judge_invocation_manifest.jsonl
```

The manifest contains exactly 104 SAMPLE_UCI_POR records. For each manifest row:

1. Read `invocation_prompt_path`.
2. Treat the full contents of that `.md` file as the complete judge prompt for exactly one record.
3. Use the task context, schema context, AI explanation, evidence context, full-query evidence/provenance, rubric, and output schema included or referenced by that prompt.
4. Produce exactly one direct judge response JSON object for that record.
5. Save the raw judge response JSON exactly to `expected_raw_output_path`.
6. The raw output file must contain only the JSON object. Do not include Markdown fences, commentary, logs, aggregate scores, final scores, verdicts, or runner-derived fields.
7. Continue record by record until all 104 SAMPLE_UCI_POR raw output files have been written.

Required response schema for every raw output:

```text
C:\[Graduation_Thesis]Prototype\Docs\evaluation_v2\LLM_JUDGE_V2_JUDGE_RESPONSE_SCHEMA_V1.json
```

Required output directory:

```text
C:\[Graduation_Thesis]Prototype\Docs\evaluation_v2\Runs\full_208\phase8_judge_invocation\raw_outputs
```

Prompt packets are located under:

```text
C:\[Graduation_Thesis]Prototype\Docs\evaluation_v2\Runs\full_208\phase8_judge_invocation\prompt_queue
```

After writing all raw outputs, verify:

- 104 raw output files exist in `raw_outputs`.
- Every raw output path matches the corresponding manifest row's `expected_raw_output_path`.
- Every raw output is parseable JSON.
- No output file contains Markdown fences or prose outside the JSON object.

Then report only:

```text
records_expected: 104
records_processed: <number>
raw_output_files_written: <number>
failed_or_missing_records: <list, or []>
raw_outputs_dir: C:\[Graduation_Thesis]Prototype\Docs\evaluation_v2\Runs\full_208\phase8_judge_invocation\raw_outputs
next_step: run the official import/validate command in the main project session
```

Do not run scoring. Do not produce aggregate comparison results. This session's job is only to produce the 104 official raw LLM Judge V2 outputs for SAMPLE_UCI_POR.

