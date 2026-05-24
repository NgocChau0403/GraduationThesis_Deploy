# Debug Agent Usage Guide

## 1. Basic command format

```bash
node agents/run-debug-agent.mjs --task <TASK_ID> --batch <BATCH_ID> --class <CLASS_ID> [--student <STUDENT_ID>]
```

- `--task`: task id (e.g., `A-B03`, `S-T01`)
- `--batch`: dataset batch id
- `--class`: class id
- `--student`: only required for student-level tasks

---

## 2. Admin tasks (class-level)

- Used for analytics at class level
- Do NOT need `--student`

Example 1:

```bash
node agents/run-debug-agent.mjs --task A-B03 --batch SAMPLE_OULAD --class SAMPLE_OULAD_CLASS_AAA_2013J
```

Example 2:

```bash
node agents/run-debug-agent.mjs --task A-B04 --batch SAMPLE_OULAD --class SAMPLE_OULAD_CLASS_AAA_2013J
```

---

## 3. Student tasks (individual-level)

- Used for analytics per student
- MUST include `--student`

Example 1:

```bash
node agents/run-debug-agent.mjs --task S-T01 --batch SAMPLE_OULAD --class SAMPLE_OULAD_CLASS_AAA_2013J --student SAMPLE_OULAD_STU_11391
```

Example 2:

```bash
node agents/run-debug-agent.mjs --task S-T02 --batch SAMPLE_OULAD --class SAMPLE_OULAD_CLASS_AAA_2013J --student SAMPLE_OULAD_STU_11391
```

---

## 4. Custom output file

Use `--out` to choose report path.

Example:

```bash
node agents/run-debug-agent.mjs --task A-B03 --batch SAMPLE_OULAD --class SAMPLE_OULAD_CLASS_AAA_2013J --out agents/reports/my-custom-report.md
```

---

## 5. Quick checklist before running

- task id dúng chua?
- batch id dúng chua?
- class id dúng chua?
- n?u là student task -> dã có `--student` chua?

---

## 6. Common errors

Case 1: Missing `--student`
- Fix: add `--student <id>`

Case 2: Task not found
- Fix: check task id in `taskRegistry.json`

Case 3: DB connection error
- Fix: ensure `Backend/.env` is loaded and PostgreSQL is running

---

## 7. What you get after running

- Console summary (`PASS` / `FAIL` / warnings)
- Markdown report in `agents/reports/`
