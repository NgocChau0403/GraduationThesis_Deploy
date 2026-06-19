# SAMPLE_UCI_POR Scoring Reliability and Calibration Review

Status: REVIEW REQUIRED BEFORE THESIS-LEVEL CONCLUSION

This note reviews the current SAMPLE_UCI_POR Phase 8 scoring output after the first official LLM Judge V2 run.

## Executive Decision

The current UCI scoring artifacts are mechanically valid, but they should not be used as final thesis evidence yet.

Reason: the results show strong score clustering, many paired outcomes are decided by caps, and the current pointwise judge is not sensitive enough to distinguish baseline vs task-aware explanations when both are broadly acceptable.

## Verified Current Facts

Source artifacts:

```text
Docs/evaluation_v2/Runs/full_208/phase8_scoring/scoring_manifest__SAMPLE_UCI_POR.jsonl
Docs/evaluation_v2/Runs/full_208/phase8_scoring/scoring_report__SAMPLE_UCI_POR.md
Docs/evaluation_v2/Runs/full_208/phase8_scoring/aggregates/paired_mode_comparison__SAMPLE_UCI_POR.json
Docs/evaluation_v2/Runs/full_208/phase8_scoring/final_scoring_records/*.json
```

Verified counts:

```text
Records: 104
Comparable task pairs: 52
Tied pairs: 38
Non-tie pairs: 14
UCI tasks with row_count <= 20: 46
UCI tasks with row_count > 20: 6
```

Score clustering:

```text
final_score_after_caps = 8.15 appears in 58/104 records
final_score_after_caps = 7.65 appears in 26/104 records
38/52 task pairs are ties
```

Metric clustering:

```text
clarity: 104/104 records scored 8
safety_fairness: 99/104 records scored 8
faithfulness: 98/104 records scored 8
numerical_correctness: 102/104 records scored 8
task_relevance: 91/104 records scored 8
```

Cap/error sensitivity:

```text
8/14 non-tie pairs have an effective cap difference between modes.
9/14 non-tie pairs have at least one judge error in one of the two modes.
```

The distinction matters:

- `8/14` = the final winner is directly affected by an effective cap.
- `9/14` = includes one minor/no-cap case where an error exists but does not apply an effective cap.

## Interpretation

The high tie rate and repeated score pattern indicate score clustering. The current pointwise judge often maps acceptable explanations to the same score vector:

```text
faithfulness = 8
numerical_correctness = 8
completeness = 9
task_relevance = 8
actionability = 8
clarity = 8
safety_fairness = 8
weighted score = 8.15
```

This is expected from the current design because the official prompt explicitly evaluates one explanation independently and says not to compare explanation modes.

Therefore, the current pipeline is valid for pointwise quality checks, but weak for mode-comparison conclusions.

## Correction to Prior Wording

The metric anchor artifact exists and is frozen:

```text
Docs/evaluation_v2/Rubric/LLM_JUDGE_V2_METRIC_ANCHOR_SPEC.md
```

The issue is not that anchors are absent. The issue is that the anchors and caps are still project-specific/pre-pilot policies and have not been calibrated by human reviewers on representative full_208 cases.

## Why Task-Aware Can Tie or Lose

For `row_count <= 20`, both modes can legitimately tie or either mode can win because `rows[:20]` already covers the full result. Differences are explanation-quality differences, not evidence-coverage differences.

For `row_count > 20`, task-aware should usually have a potential evidence-coverage advantage, but it can still tie or lose if:

- the pointwise judge is not sensitive enough;
- task-aware introduces an unsupported or unverifiable derived statistic;
- deterministic derived evidence is not included in the judge input;
- the judge applies a major/critical cap;
- both explanations are broad enough that the rubric maps both to the same anchor band.

The suspicious UCI cases are:

```text
A-G13
S-T09
```

In both cases, task-aware cited correlation coefficient `-0.1041`, and the judge treated it as unsupported. Deterministic recomputation from the full 649 rows gives Pearson r approximately `-0.10413814597596738`, so the coefficient appears mathematically supported. The likely issue is missing derived-stat provenance in the judge input, not necessarily a task-aware explanation failure.

See:

```text
Docs/evaluation_v2/Runs/full_208/phase8_scoring/audits/non_tie_reasonableness_audit__SAMPLE_UCI_POR.md
```

## Required Fix Before Reusing This Result

Before using UCI scoring as final thesis evidence:

1. Add deterministic derived-stat evidence for correlation tasks:
   - `pearson_r`
   - `n`
   - `x_column`
   - `y_column`
   - source artifact path/hash
2. Update judge input/prompt so the judge can verify derived statistics directly.
3. Add a pairwise comparison stage after pointwise scoring:
   - compare baseline vs task-aware for the same task;
   - require metric-by-metric comparison;
   - require explicit tie justification;
   - require evidence-coverage discussion for `row_count > 20`.
4. Run human calibration pilot:
   - 10-15 representative paired cases;
   - include ties, cap-driven pairs, `<=20`, `>20`, and correlation tasks;
   - use at least 2 human reviewers;
   - adjudicate disagreements before re-freezing prompt/caps.
5. Re-freeze:
   - prompt version;
   - metric anchors if wording changes;
   - cap policy;
   - pairwise judge schema/prompt;
   - official manifest.
6. Re-run affected UCI records before drawing conclusions.

## Recommendation for OULAD

Do not proceed with OULAD as if the current UCI scoring policy is final.

Before OULAD judge/scoring, apply the derived-stat and pairwise comparison fixes. OULAD has more `row_count > 20` tasks, so it will otherwise reproduce the same weakness at larger scale.

