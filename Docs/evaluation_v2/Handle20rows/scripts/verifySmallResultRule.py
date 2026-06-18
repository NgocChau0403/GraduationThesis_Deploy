from __future__ import annotations

import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[4]
AI_SERVICE_DIR = PROJECT_ROOT / "AIService"
OUTPUT_DIR = PROJECT_ROOT / "Docs" / "evaluation_v2" / "LLMJudgeV2" / "outputs"
JSON_OUTPUT = OUTPUT_DIR / "small_result_rule_verification.json"
MD_OUTPUT = OUTPUT_DIR / "small_result_rule_verification.md"

sys.path.insert(0, str(AI_SERVICE_DIR))
os.environ["AI_SUMMARY_METHOD"] = "task_aware_data_summarization"
os.environ.setdefault("OPENAI_API_KEY", "debug-no-llm-call")

from debug_ai_summary import build_request  # noqa: E402
from schemas import AISummaryConfig  # noqa: E402
from strategies.base import BaseExplanationStrategy  # noqa: E402


def make_rows(count: int, start: int = 0) -> list[dict]:
    return [
        {
            "student_id": f"S{start + index:03d}",
            "risk_score": start + index,
            "rank_value": count - index,
        }
        for index in range(count)
    ]


def verify_case(case_id: str, datasets: dict[str, list[dict]], expected_applied: bool) -> dict:
    req = build_request("A-G15", datasets)
    req.ai_summary_config = AISummaryConfig(
        summary_type="ranking",
        entity_column="student_id",
        metric_column="risk_score",
        sort_direction="desc",
        top_k=5,
        bottom_k=2,
    )

    result = BaseExplanationStrategy.build_summary_result(
        req,
        include_debug_payload=True,
    )
    payload = result["metadata"]["summary_debug_payload"]
    full_result_row_count = payload.get("full_result_row_count")
    included_row_count = payload.get("included_row_count")
    applied = payload.get("small_result_full_rows_applied")
    summary_type = payload.get("summary_type")

    pass_conditions = [
        applied is expected_applied,
        full_result_row_count == sum(len(rows) for rows in datasets.values()),
    ]
    if expected_applied:
        included_payload_rows = sum(
            len(item.get("rows") or [])
            for item in payload.get("datasets", [])
        )
        pass_conditions.extend([
            summary_type == "full_rows_due_to_small_result",
            included_row_count == full_result_row_count,
            included_payload_rows == full_result_row_count,
            all(
                item.get("included_row_count") == item.get("row_count")
                for item in payload.get("dataset_row_breakdown", [])
            ),
        ])
    else:
        included_payload_rows = None
        pass_conditions.extend([
            summary_type == "ranking",
            included_row_count is None,
        ])

    return {
        "case_id": case_id,
        "dataset_row_counts": {
            label: len(rows)
            for label, rows in datasets.items()
        },
        "expected_small_result_full_rows_applied": expected_applied,
        "observed": {
            "summary_type": summary_type,
            "input_summary_type": result["metadata"].get("input_summary_type"),
            "full_result_row_count": full_result_row_count,
            "included_row_count": included_row_count,
            "included_payload_row_count": included_payload_rows,
            "small_result_threshold": payload.get("small_result_threshold"),
            "small_result_full_rows_applied": applied,
            "metadata_small_result_full_rows_applied": result["metadata"].get(
                "small_result_full_rows_applied"
            ),
            "dataset_row_breakdown": payload.get("dataset_row_breakdown"),
        },
        "pass": all(pass_conditions),
    }


def render_markdown(report: dict) -> str:
    lines = [
        "# Phase 4c Small-Result Rule Verification",
        "",
        f"- Generated at: {report['generated_at']}",
        "- Scope: boundary/self-test verification only; no backend or LLM call.",
        "- Mode: task_aware_data_summarization",
        "- Rule: total full_result_row_count <= 20 must include all rows.",
        f"- Overall result: {'PASS' if report['pass'] else 'FAIL'}",
        "",
        "## Cases",
        "",
        "| Case | Dataset row counts | Total rows | Expected applied | Observed summary_type | Observed applied | Included rows | Pass |",
        "| --- | --- | ---: | --- | --- | --- | ---: | --- |",
    ]

    for case in report["cases"]:
        observed = case["observed"]
        counts = ", ".join(
            f"{label}={count}"
            for label, count in case["dataset_row_counts"].items()
        )
        lines.append(
            "| {case_id} | {counts} | {total} | {expected} | {summary_type} | {applied} | {included} | {passed} |".format(
                case_id=case["case_id"],
                counts=counts,
                total=observed["full_result_row_count"],
                expected=str(case["expected_small_result_full_rows_applied"]).lower(),
                summary_type=observed["summary_type"],
                applied=str(observed["small_result_full_rows_applied"]).lower(),
                included="" if observed["included_row_count"] is None else observed["included_row_count"],
                passed="PASS" if case["pass"] else "FAIL",
            )
        )

    lines.extend([
        "",
        "## Interpretation",
        "",
        "The 10-row, 20-row, 3+4 multi-dataset, and 10+10 multi-dataset cases all use `full_rows_due_to_small_result` and preserve all rows.",
        "",
        "The 21-row and 10+11 multi-dataset cases keep the existing `ranking` task-aware summarizer and mark `small_result_full_rows_applied=false`.",
        "",
        "This verifies the Phase 4 boundary behavior before runtime verification with real backend task outputs.",
        "",
    ])
    return "\n".join(lines)


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    cases = [
        verify_case("single_dataset_10_rows", {"primary": make_rows(10)}, True),
        verify_case("single_dataset_20_rows", {"primary": make_rows(20)}, True),
        verify_case("single_dataset_21_rows", {"primary": make_rows(21)}, False),
        verify_case(
            "multi_dataset_3_plus_4_rows",
            {
                "summary": make_rows(3),
                "details": make_rows(4, start=100),
            },
            True,
        ),
        verify_case(
            "multi_dataset_10_plus_10_rows",
            {
                "summary": make_rows(10),
                "details": make_rows(10, start=100),
            },
            True,
        ),
        verify_case(
            "multi_dataset_10_plus_11_rows",
            {
                "summary": make_rows(10),
                "details": make_rows(11, start=100),
            },
            False,
        ),
    ]
    report = {
        "artifact_type": "llm_judge_v2_phase4c_small_result_rule_verification",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "mode": "task_aware_data_summarization",
        "rule": "Use full rows when total full_result_row_count <= 20; otherwise use existing task-aware summarizer.",
        "pass": all(case["pass"] for case in cases),
        "cases": cases,
    }

    JSON_OUTPUT.write_text(json.dumps(report, indent=2), encoding="utf-8")
    MD_OUTPUT.write_text(render_markdown(report), encoding="utf-8")
    print(json.dumps({
        "pass": report["pass"],
        "json_output": str(JSON_OUTPUT.relative_to(PROJECT_ROOT)).replace("\\", "/"),
        "md_output": str(MD_OUTPUT.relative_to(PROJECT_ROOT)).replace("\\", "/"),
    }, indent=2))

    if not report["pass"]:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
