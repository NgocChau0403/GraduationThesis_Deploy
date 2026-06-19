# Phase 9 UCI Pairwise Dry-Run Codex Session Master Prompt

You are running the LLM Judge V3 pairwise single-review dry run for `SAMPLE_UCI_POR`.

This is a dry-run calibration stage, not official thesis evidence. Your task is to process the prepared pairwise prompt queue and write one raw JSON judge response per prompt packet.

## Required Scope

Process exactly the 30 prompt packets listed in:

```text
C:\[Graduation_Thesis]Prototype\Docs\evaluation_v2\Runs\full_208\phase9_single_review_dry_run\pairwise_judge_queue\pairwise_prompt_queue_manifest__SAMPLE_UCI_POR.jsonl
```

Each manifest row contains:

- `pairwise_record_id`
- `task_id`
- `order_variant`
- `prompt_packet_path`
- `expected_raw_output_path`

For each row:

1. Read the entire file at `prompt_packet_path`.
2. Apply the pairwise judge prompt and response schema inside that prompt packet.
3. Compare candidate `A` and candidate `B` directly using the supplied task context, schema context, evidence access summary, deterministic derived-stat evidence, and candidate explanations.
4. Return only JSON that conforms to `pairwise_judge_v3_dry_run_schema_v1`.
5. Write that JSON to exactly the path in `expected_raw_output_path`.

Do not write the JSON responses into chat. Write them to files.

## Raw Output Folder

All raw outputs must be written under:

```text
C:\[Graduation_Thesis]Prototype\Docs\evaluation_v2\Runs\full_208\phase9_single_review_dry_run\pairwise_judge_invocation\raw_outputs
```

Do not choose another folder. Do not rename files. The filenames are defined by `expected_raw_output_path` in the manifest.

## Important Rules

- Do not modify prompt packets, manifests, schemas, evidence artifacts, or prior scoring outputs.
- Do not use previous absolute judge scores or previous pointwise rationales.
- Do not reveal hidden mode names in the JSON response.
- Judge only candidate `A` vs candidate `B`.
- Use `AB` and `BA` order variants exactly as provided.
- A tie is allowed, but it must be justified metric by metric.
- If deterministic derived-stat evidence supports a Pearson coefficient, do not mark that coefficient unsupported.
- If deterministic derived-stat evidence says zero variance or no valid pairs, do not invent a coefficient.
- Derived Pearson evidence is not causal or significance evidence.
- If a packet cannot be judged, still write a schema-shaped JSON response with `scoring_status = "invalid"`.

## Completion Report

After writing all files, respond in chat with a short summary only:

```text
records_expected: 30
records_processed: <number>
raw_output_files_written: <number>
failed_or_missing_records: [...]
raw_outputs_dir: C:\[Graduation_Thesis]Prototype\Docs\evaluation_v2\Runs\full_208\phase9_single_review_dry_run\pairwise_judge_invocation\raw_outputs
next_step: run the pairwise import/validate command in the main project session
```

Do not include the 30 JSON outputs in chat.
