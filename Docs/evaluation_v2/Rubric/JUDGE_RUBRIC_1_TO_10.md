# LLM Judge V2 Rubric 1-10

## Status

```text
OFFICIAL FULL_208 RUBRIC - FROZEN FOR JUDGE INVOCATION
```

This rubric is frozen for the `full_208` LLM Judge V2 run. It remains a
project-specific scoring policy, not an industry standard or empirically
validated universal benchmark.

## Canonical dependencies

- Scoring policy:
  `../LLM_JUDGE_V2_D3_RUBRIC_SCORING_DECISIONS.md`
- Direct judge response:
  `../LLM_JUDGE_V2_JUDGE_RESPONSE_SCHEMA_V1.json`
- Final scoring record:
  `../LLM_JUDGE_V2_D3_OUTPUT_SCHEMA_V1.json`
- Metric anchors:
  `LLM_JUDGE_V2_METRIC_ANCHOR_SPEC.md`
- Task requirements:
  `task_evaluation_requirements.json`

## Metrics and weights

| Metric | Weight |
|---|---:|
| `faithfulness` | 25% |
| `numerical_correctness` | 20% |
| `completeness` | 15% |
| `task_relevance` | 15% |
| `actionability` | 10% |
| `clarity` | 10% |
| `safety_fairness` | 5% |

The judge assigns integer metric scores from 1 to 10 and records claim checks
and errors. The judge does not calculate the weighted score, final score, cap or
verdict.

## Core rules

1. Evaluate only against the supplied task context, schema and verifiably
   accessible evidence.
2. Treat unsupported causal language as a faithfulness defect.
3. Treat incorrect values, directions, rankings, denominators and thresholds as
   numerical-correctness defects.
4. Evaluate omissions against the task-specific core and supporting
   requirements.
5. Assign each defect one primary metric; do not punish the same defect twice.
6. Mark `safety_fairness` not applicable only when the task requirements permit
   it.
7. Use `invalid` for technical/evidence/schema failure and `not_scored` only for
   a frozen design exclusion.

## Frozen full_208 thresholds

Caps and verdict thresholds are those in scoring formula
`d3_pre_pilot_v1`, frozen as the scoring policy for this `full_208` run. They
must not be described as final, universal or empirically validated beyond this
evaluation protocol.
