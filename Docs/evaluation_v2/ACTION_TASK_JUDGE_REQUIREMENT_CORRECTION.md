# Action-Task Judge Requirement Correction

## Purpose

This note records a correction to the AI Explanation Evaluation requirements for tasks whose backend result already contains action, recommendation, or risk-flag guidance.

The LLM judge must not evaluate these tasks as if the explanation model is responsible for inventing new recommendations from scratch. For these tasks, the explanation model should explain the returned action/risk/action-rule evidence.

## Affected tasks

| Task ID | Task name | Correct judge interpretation |
|---|---|---|
| `S-T13` | Action plan generation | Explain supported actions already generated or exposed by the `action_synthesis` rule contract. |
| `A-S08` | Student intervention recommendation | Explain supported admin actions already generated or exposed by the `action_synthesis` rule contract. |
| `A-S04` | Student risk flag breakdown | Explain returned risk flags and existing `recommended_action` fields; do not require new recommendations. |
| `A-G16` | Admin action recommendation | Explain supported cohort-level admin actions already generated or exposed by the `action_synthesis` rule contract. |

## Correct scoring rule

For these tasks, judge completeness and actionability by checking whether the explanation:

1. explains the actions, recommendations, flags, or rule-triggered outputs that are already present in the returned evidence;
2. references the triggering feature-engineered signal, threshold, rule, priority, owner, or time horizon when those fields are supplied;
3. avoids inventing unsupported actions, urgency, risk context, or priorities;
4. correctly states that no supported action is available only when deterministic action evidence confirms that no action was returned or triggered.

The judge should penalize an explanation that says "no supported actions" only when the supplied evidence or deterministic action checker shows that at least one supported action exists.

## Why this correction matters

The previous interpretation could incorrectly penalize an AI explanation for not generating new recommendations, even though the task already provides action/risk guidance. That would measure recommendation generation rather than explanation quality.

For example, `S-T13` is an `action_synthesis` task. The proper evaluation target is whether the explanation accurately explains supported action evidence, not whether it independently creates a new action plan.

## Updated source of truth

The source generator has been updated:

```text
Docs/evaluation_v2/Rubric/scripts/materializeTaskEvaluationRequirements.mjs
```

The generated requirements have been refreshed:

```text
Docs/evaluation_v2/Rubric/task_evaluation_requirements.json
```

Any judge outputs produced before this correction for the affected tasks should be treated as stale for final comparison unless they are regenerated with the corrected requirements.
