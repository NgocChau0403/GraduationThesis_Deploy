# AI Explanation Evaluation Calibration Fix

## Problem

The AI explanation evaluation should not accidentally reward the older
`baseline_first_20_rows` mode when the newer `task_aware_data_summarization`
mode has broader task-specific evidence.

The expected interpretation is:

- For task query results with `full_result_row_count <= 20`, `rows[:20]`
  already contains the complete query result. In this bucket, baseline and
  task-aware should usually be close unless one explanation has a concrete
  quality defect.
- For task query results with `full_result_row_count > 20`, task-aware
  summarization has a legitimate evidence-coverage advantage when it uses the
  broader task-relevant evidence correctly. Baseline should not receive
  full-result coverage credit for broad cohort/ranking/trend/relationship
  claims based only on the first 20 rows.

This does not mean task-aware must always win. A task-aware explanation can
still lose when it makes unsupported claims, omits required outputs, overstates
relationships, or explains the wrong action. However, the judge prompt and
rubric must not contain a hidden baseline preference for shorter or simpler
answers.

## Observed UCI V3 Pattern

The existing UCI V3 rerun mostly follows the expected pattern:

| Row bucket | Tasks | Avg task-aware minus baseline delta | Task-aware wins | Ties | Baseline wins |
|---|---:|---:|---:|---:|---:|
| `<=20` | 46 | +0.018 | 6 | 35 | 5 |
| `>20` | 6 | +1.325 | 2 | 3 | 1 |

This is broadly reasonable:

- `<=20` is almost neutral because both methods see all rows.
- `>20` favors task-aware on average because baseline loses evidence coverage.

The problematic cases are not mainly about row coverage; they expose task
requirement or claim-quality issues.

## Action-Synthesis Correction

For action-synthesis tasks such as `S-T13`, `A-S08`, and `A-G16`, the judge
must not require the explanation model to invent actions independently.

The correct evaluation target is:

```text
Explain the actions generated or supported by the backend/rule contract.
```

Therefore, the judge should check whether the explanation:

1. explains returned or triggered actions accurately;
2. cites triggering feature-engineered signals, thresholds, or rule IDs when
   available;
3. preserves priority, owner, time horizon, and claim limits when supplied;
4. avoids unsupported extra actions;
5. says "no supported action" only when rule evidence confirms that no action
   was triggered or returned.

The following files were updated to enforce this interpretation:

- `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md`
- `Docs/evaluation_v2/Rubric/JUDGE_SCORING_POLICY_V3.md`
- `Docs/evaluation_v2/Rubric/task_evaluation_requirements.json`
- `Docs/evaluation_v2/Rubric/scripts/materializeTaskEvaluationRequirements.mjs`

## Important S-T13 Finding

The existing `S-T13` task-aware record says:

```text
Currently, there are no supported actions generated for you.
```

But the evidence row contains signals such as:

```json
{
  "avg_score": 41.25,
  "pass_threshold": 40,
  "target_threshold": 70,
  "absence_rate": 1,
  "at_risk_score": 1,
  "at_risk_label": "low"
}
```

Depending on the action-rule contract, this may trigger actions such as:

- score is at/above pass but below target;
- absence rate is at least 25%.

If those rule-triggered actions are supported, then the explanation should be
penalized for contradicting action evidence. The penalty should not be framed
as "the model failed to invent an action plan"; it should be framed as:

```text
The explanation failed to explain supported action-rule outputs.
```

## Required Judge Input Improvement

To make action-synthesis evaluation robust, future judge inputs should include
an explicit deterministic action evidence block, for example:

```json
{
  "action_rule_evidence": {
    "rule_set_id": "S-T13.action_synthesis",
    "rule_version": "1.0.0",
    "triggered_rule_ids": ["S-T13-R02", "S-T13-R05"],
    "supported_actions": [
      {
        "action_id": "student_set_next_score_target",
        "triggering_evidence": ["avg_score", "pass_threshold", "target_threshold"],
        "priority": "medium",
        "owner": "student",
        "time_horizon_days": 7
      }
    ],
    "unsupported_actions": []
  }
}
```

Without this block, the judge may over-infer action requirements from natural
language prompt hints instead of checking the actual rule output.

## Re-run Requirement

Because prompt/rubric/requirement files are frozen and hash-checked in the
official evaluation manifests, these changes require a new calibration version
before official judging:

1. regenerate or re-freeze the affected contract manifest hashes;
2. regenerate judge inputs/prompt queue for affected records;
3. rerun at least the affected action-synthesis records;
4. ideally rerun the full paired evaluation for both datasets if these results
  will be reported as official.

The previous UCI V3 results remain useful as diagnostic evidence, but any final
claim using the corrected rubric should be based on a rerun.

