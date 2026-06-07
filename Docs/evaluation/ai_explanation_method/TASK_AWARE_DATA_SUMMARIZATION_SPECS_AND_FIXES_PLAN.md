# Task-Aware Data Summarization Specs And Fixes Plan

## Summary
This plan organizes AI prompt data summarization work as vertical slices per internal summarizer type while keeping the external comparison model simple.

There are only two top-level summary methods:

- `baseline_first_20_rows`: the historical method before fixing the `rows[:20]` methodology bug.
- `task_aware_data_summarization`: the improved method after fixing the `rows[:20]` methodology bug.

Internal summary types such as `trend_comparison`, `categorical_distribution`, `risk_flags`, `trend_series`, `ranking`, `numeric_distribution`, `group_comparison`, `correlation_evidence`, and `generic_fallback` are strategies inside `task_aware_data_summarization`. They are not separate top-level modes.

## Baseline Rule
Do not add top-level modes such as `ranking_old`, `ranking_new`, or `group_comparison_old`.

The thesis-level comparison remains:

```text
baseline_first_20_rows
vs
task_aware_data_summarization
```

For future summarizer fixes, the spec must still describe the previous internal behavior, usually `generic_fallback`, but only to explain how `task_aware_data_summarization` improved internally.

Each new internal summarizer spec must describe:

- previous internal behavior;
- why that behavior is insufficient for the task type;
- the new internal summarizer contract;
- how the new summarizer improves `task_aware_data_summarization`;
- why the external comparison still remains two-mode only.

## Group A: Documentation Close-Out For Implemented Summarizers
Group A is documentation-only close-out. These specs describe implemented behavior and must not broaden behavior or migrate new tasks.

Spec order:

1. `TREND_COMPARISON_SUMMARIZER_SPEC.md`
   - Scope: `A-G14`
   - Internal strategy: `trend_comparison`

2. `CATEGORICAL_DISTRIBUTION_SUMMARIZER_SPEC.md`
   - Scope: `A-B02`, `A-B03`, `A-G10`
   - Internal strategy: `categorical_distribution`

3. `RISK_FLAGS_SUMMARIZER_SPEC.md`
   - Scope: `S-T04`, `A-S04`
   - Internal strategy: `risk_flags`

4. `TREND_SERIES_SUMMARIZER_SPEC.md`
   - Scope: `S-T01`, `A-G18`, `A-G11`
   - Internal strategy: `trend_series`

Each Group A spec must include:

- old baseline applied;
- internal strategy;
- current implementation status;
- code location;
- registry examples;
- debug command;
- known limitations;
- acceptance criteria.

If Group A review reveals missing metadata, missing self-test, or behavior mismatch, do not silently fix it inside the documentation close-out task. Create a follow-up implementation task unless the change is purely documentation or a test-command reference.

## Group B: Future Internal Summarizer Slices
Future internal summarizers should be implemented one type at a time.

Recommended order:

1. `ranking`
2. `numeric_distribution`
3. `group_comparison`
4. `correlation_evidence`

Each new internal summarizer should be split into:

1. identify previous internal behavior, usually `generic_fallback`;
2. write the new method spec;
3. implement registry metadata and internal summarizer inside `task_aware_data_summarization`;
4. add self-test coverage;
5. generate comparison evidence using the two top-level modes where useful.

Do not expose a new top-level environment mode for each summarizer.

Group B slice work must remain narrow. A spec-only phase may update only the relevant spec file and this roadmap. It must not include code, registry metadata, SQL, frontend, or evaluation-log changes in the same execution.

## Safety Constraints For Group B
Do not add sensitive demographic columns to AI summaries unless the task explicitly requires them and the spec includes fairness guardrails.

For ranking intervention tasks, do not use `gender`, `age_group`, or `region` as explanatory label columns in the first migration. If those columns are needed later for fairness audit, model them separately as context or sensitive columns and prohibit their use as causal explanations or intervention rationale.

Group comparison summaries must be descriptive only. They must not imply that background attributes cause performance differences, and they must not recommend individual action based only on group membership.

Correlation summaries must never allow causal claims. Strength or significance claims require explicit coefficient, sample size, and significance evidence.

Do not compute p-values unless the statistical method is explicitly specified and tested.

## Registry Migration Rule
A task may receive a new `aiSummaryType` in `taskRegistry.json` only after:

- previous internal behavior has been described;
- the summarizer type spec exists;
- required task metadata is complete;
- summarizer self-test passes;
- a debug log for at least one migrated task has been generated when useful;
- no unrelated task behavior changes.

## Commit Rule
Spec-only changes should be committed separately from implementation changes.

For Group A, each spec may be one documentation commit.

For Group B, each new internal summarizer should be split into at least:

1. spec commit;
2. implementation plus self-test commit;
3. comparison log or evaluation artifact commit if logs are committed.

## Definition Of Done
Each summarizer type is complete when:

- spec file exists;
- historical baseline failure mode is described;
- previous internal behavior is described if this is a new summarizer;
- new internal method contract is described;
- registry metadata contract is defined;
- output `DATA SUMMARY` shape is documented;
- at least one self-test exists or current self-test is referenced;
- at least one migrated task is verified;
- no new top-level summary mode is introduced;
- no unrelated summarizer behavior changed.

For Group A, comparison logs are recommended when already available or cheap to generate, especially for `A-G14`. Missing comparison logs should not block documentation close-out if existing self-test or debug commands verify the summarizer contract.

## Out Of Scope
- Do not add `AI_SUMMARY_METHOD` values beyond `baseline_first_20_rows` and `task_aware_data_summarization`.
- Do not change final AI prompt instructions unless needed by a separate implementation task.
- Do not change SQL analytics queries.
- Do not change chart rendering.
- Do not run rubric scoring for AI responses during Group A documentation close-out.
- Do not migrate all tasks at once.
- Do not mix spec commits with implementation commits for new summarizers.
- Do not mix Group B spec-only documentation with code, registry metadata, SQL, frontend, or evaluation-log artifacts.

## Test Plan
Group A uses existing debug/self-test commands:

```powershell
python AIService/debug_ai_summary.py --self-test
python AIService/debug_ai_summary.py --self-test-categorical
python AIService/debug_ai_summary.py --self-test-risk-flags
python AIService/debug_ai_summary.py --self-test-trend-series
```

Group B should add a dedicated self-test for each new internal summarizer.

Comparison evidence should use the existing two top-level methods:

```powershell
python AIService/debug_ai_summary.py --task A-G14 --method baseline_first_20_rows
python AIService/debug_ai_summary.py --task A-G14 --method task_aware_data_summarization
python AIService/debug_ai_summary.py --task A-G14 --compare-methods --write-log
```

## Assumptions
- `BASELINE_FIRST_20_ROWS_SPEC.md` is the shared historical old-method spec.
- `generic_fallback` is an internal fallback in `task_aware_data_summarization`, not a top-level mode.
- For Group A, the shared `baseline_first_20_rows` baseline is sufficient.
- For Group B, previous behavior should be documented as internal behavior, while thesis comparison remains two-mode.
