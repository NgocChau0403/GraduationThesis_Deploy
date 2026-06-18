# LLM Judge V2 Phase 3 Row-Count Distribution

- Generated at: 2026-06-18T13:11:58.111Z
- Backend URL: http://localhost:4000
- Primary analysis grain: dataset_id + task_id
- Stored raw record grain: dataset_id + task_id + mode
- Task count per dataset: 52
- Datasets: SAMPLE_UCI_POR, SAMPLE_OULAD
- Modes stored for later comparison: baseline_first_20_rows, task_aware_data_summarization
- Expected dataset-task query results: 104
- Stored raw records: 208

## Row-Count Definition

`row_count` is measured from the SQL/analytics result returned by:

```text
/api/analytics/run
```

If `/api/analytics/run` returns one dataset array, `row_count` is that array length. If it returns multiple dataset arrays, `row_count` is the sum of their row counts, while the per-dataset breakdown is preserved in `dataset_breakdown`.

Important: `row_count` belongs to one dataset-task query result. It does not depend on the AI summary mode.

The raw JSONL stores one row for each dataset-task-mode pair so that later comparison work can join directly with:

```text
baseline_first_20_rows
task_aware_data_summarization
```

For Phase 3 interpretation, however, the meaningful count is the unique dataset-task count, not the duplicated mode-level record count.

## Dataset Summary

| Dataset | Task query results | Scoreable task results | Tasks with row_count <= 20 | Tasks with row_count > 20 | Not scoreable tasks | Mode-level raw records |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| SAMPLE_UCI_POR | 52 | 52 | 46 | 6 | 0 | 104 |
| SAMPLE_OULAD | 52 | 52 | 39 | 13 | 0 | 104 |
| Total | 104 | 104 | 85 | 19 | 0 | 208 |

## Why Raw Records Are Double

Each dataset has 52 tasks, so Phase 3 needs only 52 SQL/analytics results per dataset to answer whether each task has `row_count <= 20` or `row_count > 20`.

The file `row_count_records.jsonl` stores 2 records per task because the later LLM Judge V2 comparison has 2 modes. This duplication is only for easier joining with later mode-comparison artifacts. It does not mean the SQL query is different between modes.

For `SAMPLE_UCI_POR`:

```text
46 tasks with row_count <= 20
6 tasks with row_count > 20

Stored as raw mode-level records:
46 tasks x 2 modes = 92 raw records
6 tasks x 2 modes = 12 raw records
```

For `SAMPLE_OULAD`:

```text
39 tasks with row_count <= 20
13 tasks with row_count > 20

Stored as raw mode-level records:
39 tasks x 2 modes = 78 raw records
13 tasks x 2 modes = 26 raw records
```

## Interpretation Note

For tasks in the `row_count <= 20` bucket, `baseline_first_20_rows` already has full row coverage. If a task has 12 rows, baseline `rows[:20]` still sees all 12 rows. Any later task-aware improvement in this bucket should be interpreted as better task framing, evidence organization, or wording rather than better raw row coverage.

For tasks in the `row_count > 20` bucket, `baseline_first_20_rows` may lose evidence due to truncation. If a task has 52 rows, baseline sees only the first 20 rows. This is the group where task-aware summarization has a direct evidence-selection advantage.

The key Phase 3 conclusion is:

```text
SAMPLE_UCI_POR: 46/52 tasks are <= 20 rows; 6/52 tasks are > 20 rows.
SAMPLE_OULAD: 39/52 tasks are <= 20 rows; 13/52 tasks are > 20 rows.
Overall: 85/104 dataset-task query results are <= 20 rows; 19/104 are > 20 rows.
```
