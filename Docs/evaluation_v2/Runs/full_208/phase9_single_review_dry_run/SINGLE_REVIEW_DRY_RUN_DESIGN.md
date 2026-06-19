# LLM Judge V3 Single-Review Dry Run Design

Status: design and calibration dry run, not official thesis evidence.

This phase exists because the UCI V2 scoring is mechanically valid but not
reliable enough for final conclusions: score clustering is high, many pairs tie,
and correlation coefficients were sometimes treated as unsupported because the
judge prompt did not receive deterministic derived-stat provenance.

## Scope

Use one human reviewer to calibrate the next judge protocol before freezing a
new official run. Because this is single-review, the result can tune artifacts
and identify rerun-needed records, but it must not be reported as official human
calibration.

Dataset for first dry run:

```text
SAMPLE_UCI_POR
```

Only after UCI improves should the same protocol be applied to OULAD.

## Artifacts Added

Deterministic derived-stat builder:

```text
Docs/evaluation_v2/Runs/scripts/buildLlmJudgeV3DerivedStatEvidence.mjs
```

Pairwise prompt candidate:

```text
Docs/evaluation_v2/PromptEvaluateAI/PAIRWISE_JUDGE_PROMPT_V3_DRY_RUN.md
```

Pairwise response schema candidate:

```text
Docs/evaluation_v2/LLM_JUDGE_V3_PAIRWISE_RESPONSE_SCHEMA_DRY_RUN.json
```

Derived-stat dry-run output:

```text
Docs/evaluation_v2/Runs/full_208/phase9_single_review_dry_run/derived_stat_evidence
```

## Derived-Stat Evidence Rule

For correlation tasks, the dry-run judge must see deterministic derived-stat
evidence computed from the full query result. This evidence is independent from
AIService explanation generation.

Command:

```bash
node Docs/evaluation_v2/Runs/scripts/buildLlmJudgeV3DerivedStatEvidence.mjs --dataset SAMPLE_UCI_POR
```

Current UCI output:

```text
Tasks processed: 7
Pass: 4
Skipped: 3
```

Passed derived Pearson evidence:

| Task | Rows | Pearson r | Direction | Strength |
|---|---:|---:|---|---|
| A-G13 | 649 | -0.1041 | negative | weak |
| S-T09 | 649 | -0.1041 | negative | weak |
| S-T14 | 649 | 0.0144 | positive | negligible |
| S-T15 | 649 | 0.1442 | positive | weak |

Skipped evidence:

| Task | Reason |
|---|---|
| A-G02 | `engagement_score` has zero variance on UCI, so Pearson coefficient is unavailable. |
| A-G09 | UCI result has zero rows. |
| S-T11 | UCI result has zero rows. |

Implication: if an explanation claims `-0.1041` for A-G13 or S-T09, the claim is
supported by deterministic evidence. If an explanation invents a coefficient for
A-G02, A-G09, or S-T11, that should be penalized.

## Pairwise Judge Stage

Pairwise is a secondary confirmatory stage. It does not replace absolute
scoring. It answers:

```text
Given the same task, schema, evidence, derived checks, and two explanations,
which explanation is better and why?
```

Rules:

1. Hide method names as `A` and `B`.
2. Build pairwise input from original evidence, not from absolute judge outputs.
3. Include deterministic derived-stat evidence for correlation tasks.
4. Run both `AB` and `BA` order variants during dry run for position-bias check.
5. Let the pairwise judge flag records that require absolute rerun.
6. Keep pairwise output separate from pointwise scores.

## Single-Reviewer Calibration Form

For each selected task pair, the reviewer records:

```text
task_id:
row_count_bucket:
order_variant:
human_winner: baseline | task_aware | tie
human_difference: none | small | moderate | large
metric_winners:
  faithfulness:
  numerical_correctness:
  completeness:
  task_relevance:
  actionability:
  clarity:
  safety_fairness:
cap_policy_note:
derived_stat_note:
should_absolute_rerun: yes | no
reason:
```

## Recommended UCI Dry-Run Cases

Minimum calibration set:

| Task | Why included |
|---|---|
| A-G02 | Correlation task with zero variance; tests coefficient-unavailable handling. |
| A-G13 | Current task-aware loss caused by unsupported coefficient judgment; derived-stat should fix this. |
| S-T09 | Current task-aware loss caused by unsupported coefficient judgment; derived-stat should fix this. |
| S-T14 | Current tie on large result; tests whether pairwise detects specificity differences. |
| S-T15 | Current tie on large result; tests whether pairwise detects specificity differences. |
| A-G03 | Large result tie; non-correlation control. |
| A-C02 | Non-tie small-result case; tests `<=20 rows` fairness. |
| A-G11 | Non-tie small-result case; tests cap sensitivity. |
| A-G14 | Non-tie small-result case; tests task specificity. |
| A-S04 | Non-tie small-result case; tests actionability. |
| A-S08 | Non-tie small-result case; tests completeness. |
| S-T12 | Non-tie small-result case; tests selected-student interpretation. |
| S-T13 | Non-tie small-result case; tests selected-student interpretation. |
| A-B01 | Normal small-result tie control. |
| S-T01 | Normal small-result tie control. |

With `AB` and `BA`, this creates 30 pairwise dry-run prompts.

## Cap Policy Review During Dry Run

The reviewer should mark whether current pre-pilot caps are too strong, too
weak, or appropriate:

| Cap family | Candidate values to compare |
|---|---|
| Critical factual error | 1 / 2 / 3 |
| Major factual or unsupported numerical claim | 4 / 5 |
| Core-output omission | 6 / 6.5 / 7 |

Special rule for correlation tasks:

- If derived-stat evidence supports the coefficient, do not apply
  `unsupported_claim`.
- If derived-stat evidence says coefficient unavailable, coefficient claims
  should be treated as unsupported.
- Correlation direction/strength is not causal evidence.

## Rerun Decision

After the dry run:

1. If prompt/rubric/cap rules change globally, rerun all 104 UCI pointwise
   records under a new frozen version.
2. If only derived-stat evidence is added for correlation tasks and prompt
   wording changes only there, rerun at least affected UCI records:
   `A-G02`, `A-G13`, `S-T09`, `S-T14`, `S-T15`, plus any pairwise-flagged cases.
3. Keep V2 results as historical mechanically valid output, not final thesis
   evidence.

## Completion Criteria Before OULAD

Proceed to OULAD only when:

1. derived-stat artifacts are present and referenced by prompts;
2. pairwise dry-run outputs validate against schema;
3. single reviewer notes are stored;
4. cap policy decision is recorded;
5. UCI rerun shows reduced clustering or a clear review-needed explanation for
   remaining ties.
