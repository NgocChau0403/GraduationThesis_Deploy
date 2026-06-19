# LLM Judge V2 Judge Input Contract

## Status

```text
PILOT CONTRACT - NOT APPROVED FOR OFFICIAL RUN
```

Machine-readable schema:

```text
judge_input_schema.json
```

Example:

```text
judge_input_example.json
```

## Record identity and grain

Each absolute judge input represents:

```text
dataset_id + task_id + explanation_mode
```

The input must include `record_id` and `evaluation_run_id`. UCI and OULAD use
independent run IDs.

## Required context

- frozen prompt and rubric versions;
- dataset, task and explanation mode;
- task metadata and target audience;
- schema context;
- raw and structured explanation;
- generation metadata;
- task-level core/supporting requirements;
- task-level evaluation constraints;
- safety/fairness applicability.

## Evidence-access contract

The `evidence_access` object implements D2 and separates:

1. availability: full artifacts, hashes, row counts and readability;
2. delivery: direct embedding or deterministic retrieval, row ranges, chunks and
   retrieval log;
3. verification: deterministic scan scope, checked/unchecked claim types and
   evidence citations.

A path alone is not evidence access. Hash/count mismatch, unreadable artifacts,
truncated direct embedding or missing required retrieval logs must fail closed
with `scoring_status = invalid`.

Partial retrieval can remain scoreable only when D2 conditions are met: full
artifact access exists, deterministic full-result checks cover supported claim
types, and retrieved semantic evidence is sufficient for the judgment.

## Materialization rule

Task requirements must be resolved from
`../Rubric/task_evaluation_requirements.json` and copied into the frozen judge
input. The official record must not depend on mutable runtime registry lookup.
Each core/supporting requirement must preserve its stable `requirement_id`.
Each constraint must preserve its stable `constraint_id`; safety applicability
and its review note must also be materialized.

The task-requirements source artifact may contain provenance-only fields such as
`source_field`. The runner must copy only the fields accepted by
`judge_input_schema.json`:

```text
requirement records: requirement_id, description
constraint records: constraint_id, description
```

It must strip `source_field`, `review_status`, `review_note` and other
requirements-package metadata from the frozen judge input unless the input
schema explicitly adds those fields in a later version.

## Validation boundary

JSON Schema validates shape and basic conditional constraints. The runner must
also enforce:

- record ID uniqueness and manifest membership;
- artifact hash/count consistency;
- sum of per-dataset row counts;
- direct-embedding completeness;
- retrieval-manifest gap checks;
- task scope membership;
- exactly one of the two external explanation modes;
- prompt/rubric/schema version agreement with run metadata.
