# Debug Agent Runner

## Purpose
`agents/run-debug-agent.mjs` is a test/report agent for end-to-end debug validation:
- load env + verify Prisma connection
- load task metadata
- run availability validation
- run analytics execution (same backend path as `/api/analytics/run`)
- compute dataset quality summary
- run frontend adapter validation
- generate a markdown debug report

It is **not** an auto-fix agent and does not modify business logic.

## Prerequisites
- Node.js available
- `Backend/.env` contains valid `DATABASE_URL`
- Database service is running and reachable
- Dependencies already installed for Backend/Frontend in this repo

## Command Examples
Basic:

```bash
node agents/run-debug-agent.mjs --task <TASK_ID> --batch <BATCH_ID> --class <CLASS_ID>
```

With explicit report path:

```bash
node agents/run-debug-agent.mjs --task <TASK_ID> --batch <BATCH_ID> --class <CLASS_ID> --out agents/reports/manual-run.md
```

With sample size:

```bash
node agents/run-debug-agent.mjs --task <TASK_ID> --batch <BATCH_ID> --class <CLASS_ID> --limit-sample 3
```

## A-B03 Example

```bash
node agents/run-debug-agent.mjs --task A-B03 --batch SAMPLE_OULAD --class SAMPLE_OULAD_CLASS_AAA_2013J --out agents/reports/manual-run-A-B03.md
```

## A-G14 Example

```bash
node agents/run-debug-agent.mjs --task A-G14 --batch SAMPLE_OULAD --class SAMPLE_OULAD_CLASS_AAA_2013J --limit-sample 3
```

## S-T01 Example (with --student)

```bash
node agents/run-debug-agent.mjs --task S-T01 --batch SAMPLE_OULAD --class SAMPLE_OULAD_CLASS_AAA_2013J --student SAMPLE_OULAD_STU_11391 --limit-sample 3
```

## Notes
- If `--out` is omitted, report is auto-written to:
  - `agents/reports/run-<task>-<batch>-<class>-<timestamp>.md`
- Runner prints console summary:
  - report path
  - verdict
  - issue counts by severity
  - analytics status
  - adapter renderable yes/no
- This agent is for validation and reporting, not auto-remediation.
