# LLM Judge V3 Scoring Policy

## Status

```text
SCORING POLICY VERSION: scoring_policy_v3_uci_rerun
STATUS: FROZEN UCI RERUN CALIBRATION CANDIDATE
EXTENDS: d3_pre_pilot_v1
```

This policy is a single-review dry-run calibration candidate for the UCI V3
rerun. It is not a final two-reviewer human-calibrated policy and must not be
used for OULAD until the post-UCI acceptance gate passes.

All D3 decisions remain in effect unless explicitly overridden below.

## Cap Overrides

| Error condition | V3 candidate cap |
|---|---:|
| Critical contradictory core numerical claim, including correlation direction reversal | 2.0 |
| Major unsupported or contradicted numerical claim | 5.0 |
| Major core-output omission | 6.5 |

Minor defects do not receive caps. Other D3 cap conditions remain unchanged.

The runner, not the judge, validates `cap_candidate`, calculates the effective
cap and creates the final score and verdict.

## Derived-Stat Rules

### DS-1: Deterministic Stat Available

When a matching `derived_stat_evidence` entry has `status = pass`:

- treat its `pearson_r`, `n`, `direction` and `strength_label` as authoritative
  deterministic provenance for that column pair;
- a stated coefficient matching `pearson_r` within `0.001` must not be marked
  unsupported;
- cite its `stat_id` in `evidence_refs`;
- a correct direction with a more conservative strength description is
  acceptable;
- derived Pearson evidence does not prove causality or significance.

### DS-2: Deterministic Stat Contradicts the Explanation

When a `pass` entry contradicts the explanation:

- wrong coefficient beyond tolerance: major unsupported numerical claim,
  candidate cap `5.0`;
- correct direction but strength overstated by one tier: minor, no cap;
- correct direction but strength overstated by two or more tiers: major
  overstated association, candidate cap `5.0`;
- wrong direction for a central relationship: critical contradictory core
  numerical claim, candidate cap `2.0`.

### DS-3: Deterministic Stat Unavailable

When a matching entry has `status = skipped` because of `zero_variance`,
`zero_rows` or `insufficient_pairs`:

- the explanation must not state a coefficient, direction or strength for that
  pair;
- doing so is a major unsupported numerical claim with candidate cap `5.0`;
- correctly stating that the relationship cannot be assessed is supported.

When the reason is `column_not_found` or `artifact_unavailable`, treat it as an
evidence gap. Do not fabricate a result and do not penalize an explanation only
for omitting a statistic that could not be verified.

### DS-4: Canonical Strength Mapping

| Strength | Absolute Pearson r |
|---|---:|
| negligible | `< 0.10` |
| weak | `0.10` to `< 0.30` |
| moderate | `0.30` to `< 0.50` |
| strong | `0.50` to `< 0.80` |
| very_strong | `>= 0.80` |

## Small-Result Rule

When `evidence_access.full_result_row_count <= 20`, `rows[:20]` covers the
complete query result. Do not give task-aware summarization an automatic
evidence-coverage advantage. Compare actual correctness, completeness,
specificity, actionability, clarity and safety.

In the `<=20` bucket, baseline and task-aware records should normally be close
when they make the same supported claims from the same full evidence. A large
paired delta in either direction requires a concrete defect explanation. Do not
reward baseline merely for being shorter, and do not penalize task-aware merely
for using a more structured explanation format.

When `evidence_access.full_result_row_count > 20`, baseline-first-20 should not
receive full-result coverage credit for broad claims unless the claim is backed
by deterministic checks or explicitly limited to the first 20 rows. Task-aware
summarization should receive evidence-coverage credit only when it correctly
uses broader task-relevant evidence and does not introduce unsupported claims.

## Action-Synthesis Rule

For tasks with `ai_summary_type = action_synthesis`, the evaluation target is
the explanation of the backend/rule-supported action set. The judge must not
require the explanation model to invent actions outside the supplied rule or
action contract.

Score these tasks by checking whether the explanation:

- explains returned or triggered actions accurately;
- cites the triggering feature-engineered signals, thresholds or rule IDs when
  available;
- preserves priority, owner, time horizon and claim limits when supplied;
- avoids unsupported actions or sensitive-trigger misuse;
- states that no supported action exists only when the action-rule evidence
  confirms zero supported actions.

If the judge input lacks explicit triggered-action evidence, treat unsupported
or missing action judgments cautiously. Do not create a major
`missing_action_plan` error solely from the natural-language prompt hint when
the system architecture delegates action selection to a backend rule contract.

When `action_evidence` is present, it is authoritative. A missing-action defect
is valid only for actions listed in `supported_actions`. Rules marked
`not_triggered` or `unknown` do not create required actions. For
`returned_recommended_action_fields`, score how accurately the explanation
interprets the returned actions; do not require newly invented recommendations.

## Scoring Formula

The seven metrics and weights remain unchanged:

| Metric | Weight |
|---|---:|
| faithfulness | 25% |
| numerical_correctness | 20% |
| completeness | 15% |
| task_relevance | 15% |
| actionability | 10% |
| clarity | 10% |
| safety_fairness | 5% |

The runner-computed weighted mean, non-additive cap logic, verdict thresholds,
rounding and D3 semantic invariants remain unchanged.

Final scoring records produced under this policy must use:

```text
scoring_formula_version = scoring_policy_v3_uci_rerun
```

## Clarity Calibration

V2 assigned clarity `8` to all 104 UCI records. V3 must apply the full existing
anchor range and must not default to `8`.

- `10`: exceptionally precise, concise and optimally structured;
- `8-9`: clearly written with only minor issues;
- `6-7`: understandable but with noticeable ambiguity, structure or audience
  mismatch;
- `4-5`: multiple clarity problems requiring rereading;
- `1-3`: confusing or materially misleading presentation.

## Acceptance Gate Before OULAD

Proceed to OULAD only when:

- UCI V3 pointwise winners align with pairwise dry-run winners on at least
  `12/15` calibration tasks;
- no critical derived-stat contradiction remains unresolved;
- clarity is not scored `8` for 100% of records.

If the gate fails, review the prompt, cap policy and affected records before
running OULAD.
