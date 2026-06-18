from __future__ import annotations

import json
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[3]
AI_SERVICE = ROOT / "AIService"
REGISTRY_PATH = ROOT / "Backend" / "src" / "config" / "taskRegistry.json"
RUNS_ROOT = ROOT / "Docs" / "evaluation_v1" / "ai_explanation_full_matrix" / "runs"

sys.path.insert(0, str(AI_SERVICE))

from debug_ai_summary import build_ai_summary_config  # noqa: E402
from schemas import ExplainRequest  # noqa: E402
from strategies.base import BaseExplanationStrategy  # noqa: E402


MIGRATED_TASK_IDS = [
    "S-T02",
    "S-T05",
    "S-T06",
    "S-T10",
    "A-B04",
    "A-S02",
    "A-S03",
    "A-S05",
    "A-G01",
    "A-G03",
    "A-G04",
    "A-G06",
    "A-G07",
    "A-G09",
    "A-G13",
]

DATASET_IDS = ["SAMPLE_UCI_POR", "SAMPLE_OULAD"]
EXPECTED_SUMMARY_TYPES = {
    "S-T02": "ranking",
    "S-T05": "trend_series",
    "S-T06": "trend_series",
    "S-T10": "categorical_distribution",
    "A-B04": "categorical_distribution",
    "A-S02": "trend_series",
    "A-S03": "trend_series",
    "A-S05": "ranking",
    "A-G01": "ranking",
    "A-G03": "ranking",
    "A-G04": "ranking",
    "A-G06": "ranking",
    "A-G07": "ranking",
    "A-G09": "correlation_evidence",
    "A-G13": "correlation_evidence",
}

HARD_WARNING_MARKERS = (
    "config is incomplete",
    "required columns are missing",
    "required column",
    "primary dataset is empty",
    "primary dataset has no object rows",
    "no valid ",
)


def load_registry() -> dict[str, dict]:
    tasks = json.loads(REGISTRY_PATH.read_text(encoding="utf-8"))
    return {task["taskId"]: task for task in tasks}


def load_artifact(dataset_id: str, task_id: str) -> tuple[Path, dict]:
    path = (
        RUNS_ROOT
        / dataset_id
        / "task_aware_data_summarization"
        / "tasks"
        / f"{task_id}.json"
    )
    return path, json.loads(path.read_text(encoding="utf-8"))


def build_request(task: dict, datasets: dict[str, list[dict]]) -> ExplainRequest:
    return ExplainRequest(
        task_id=task["taskId"],
        execution_id=f"migration-validation-{task['taskId']}",
        task_name=task.get("taskName"),
        actionable_question=task.get("actionableQuestion"),
        ai_prompt_hint=task.get("aiPromptHint"),
        explanation_strategy=task.get("explanation_strategy") or "descriptive",
        target_audience=task.get("target_audience") or ["instructor"],
        datasets=datasets,
        query_labels=list(datasets.keys()),
        ai_summary_config=build_ai_summary_config(task),
    )


def validate_case(task: dict, dataset_id: str) -> dict:
    artifact_path, artifact = load_artifact(dataset_id, task["taskId"])
    status = artifact.get("status")
    analytics = artifact.get("analytics_request_response_if_called") or {}
    response = analytics.get("response") or {}
    datasets = response.get("datasets") or {}

    result = {
        "task_id": task["taskId"],
        "dataset_id": dataset_id,
        "artifact_path": str(artifact_path.relative_to(ROOT)).replace("\\", "/"),
        "artifact_status": status,
        "expected_summary_type": EXPECTED_SUMMARY_TYPES[task["taskId"]],
        "dataset_row_counts": {
            label: len(rows) if isinstance(rows, list) else None
            for label, rows in datasets.items()
        },
    }

    if status != "evaluated":
        result.update(
            validation_status="not_applicable",
            reason=f"Artifact status is {status!r}; no successful analytics dataset to validate.",
        )
        return result

    if not datasets:
        result.update(
            validation_status="failed",
            reason="Evaluated artifact has no analytics response datasets.",
        )
        return result

    try:
        request = build_request(task, datasets)
        summary, summary_text = BaseExplanationStrategy.summarize_task_aware_data_summarization(request)
    except Exception as exc:  # pragma: no cover - emitted as validation evidence
        result.update(
            validation_status="failed",
            reason=f"{type(exc).__name__}: {exc}",
        )
        return result

    observed_type = summary.get("summary_type")
    warnings = list(summary.get("summarization_warnings") or [])
    hard_warnings = [
        warning
        for warning in warnings
        if any(marker in warning.lower() for marker in HARD_WARNING_MARKERS)
    ]
    optional_column_warnings = [
        warning for warning in warnings if "configured optional column" in warning.lower()
    ]
    used_generic_diagnostic = "generic_diagnostic_sample" in summary
    passed = (
        observed_type == result["expected_summary_type"]
        and observed_type != "generic_fallback"
        and not used_generic_diagnostic
        and not hard_warnings
        and not optional_column_warnings
    )

    result.update(
        validation_status="passed" if passed else "failed",
        observed_input_summary_type=observed_type,
        generic_fallback=observed_type == "generic_fallback",
        generic_diagnostic_fallback=used_generic_diagnostic,
        summary_dataset_name=summary.get("dataset_name"),
        summary_row_count=summary.get("row_count"),
        summary_text_length=len(summary_text),
        warnings=warnings,
        hard_warnings=hard_warnings,
        optional_column_warnings=optional_column_warnings,
    )
    return result


def main() -> int:
    registry = load_registry()
    cases = []
    registry_errors = []

    for task_id in MIGRATED_TASK_IDS:
        task = registry.get(task_id)
        if not task:
            registry_errors.append(f"{task_id}: task missing from registry")
            continue
        if task.get("aiSummaryType") != EXPECTED_SUMMARY_TYPES[task_id]:
            registry_errors.append(
                f"{task_id}: expected aiSummaryType={EXPECTED_SUMMARY_TYPES[task_id]!r}, "
                f"found {task.get('aiSummaryType')!r}"
            )
        if build_ai_summary_config(task) is None:
            registry_errors.append(f"{task_id}: AISummaryConfig could not be built")
        for dataset_id in DATASET_IDS:
            cases.append(validate_case(task, dataset_id))

    applicable = [case for case in cases if case["validation_status"] != "not_applicable"]
    passed = [case for case in applicable if case["validation_status"] == "passed"]
    failed = [case for case in applicable if case["validation_status"] == "failed"]
    task_results = {}
    for task_id in MIGRATED_TASK_IDS:
        task_cases = [case for case in cases if case["task_id"] == task_id]
        applicable_cases = [
            case for case in task_cases if case["validation_status"] != "not_applicable"
        ]
        task_results[task_id] = {
            "expected_summary_type": EXPECTED_SUMMARY_TYPES[task_id],
            "applicable_case_count": len(applicable_cases),
            "passed_case_count": sum(
                case["validation_status"] == "passed" for case in applicable_cases
            ),
            "failed_case_count": sum(
                case["validation_status"] == "failed" for case in applicable_cases
            ),
            "status": (
                "passed"
                if applicable_cases
                and all(case["validation_status"] == "passed" for case in applicable_cases)
                else "failed"
            ),
        }

    output = {
        "validation_scope": {
            "migrated_task_count": len(MIGRATED_TASK_IDS),
            "dataset_ids": DATASET_IDS,
            "source": "Saved full analytics response.datasets from V1 task-aware runtime artifacts",
        },
        "registry_errors": registry_errors,
        "summary": {
            "total_cases": len(cases),
            "applicable_cases": len(applicable),
            "passed_cases": len(passed),
            "failed_cases": len(failed),
            "not_applicable_cases": len(cases) - len(applicable),
            "passed_tasks": sum(item["status"] == "passed" for item in task_results.values()),
            "failed_tasks": sum(item["status"] == "failed" for item in task_results.values()),
        },
        "task_results": task_results,
        "cases": cases,
    }
    print(json.dumps(output, indent=2, ensure_ascii=False))
    return 1 if registry_errors or failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
