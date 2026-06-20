import argparse
import asyncio
import hashlib
import json
import sys
from datetime import datetime, timezone
from pathlib import Path

from dotenv import load_dotenv


PROJECT_ROOT = Path(__file__).resolve().parents[4]
AI_SERVICE_ROOT = PROJECT_ROOT / "AIService"
sys.path.insert(0, str(AI_SERVICE_ROOT))
load_dotenv(AI_SERVICE_ROOT / ".env")

from main import explain  # noqa: E402
from schemas import ExplainRequest  # noqa: E402


TASK_IDS = ("S-T13", "A-S08", "A-G16")
DEFAULT_RUN_ROOT = (
    PROJECT_ROOT
    / "Docs/evaluation_v2/Runs/full_208/phase11_v3_uci_action_evidence_rerun"
)


def old_artifact_root(dataset_id: str) -> Path:
    return (
        PROJECT_ROOT
        / "Docs/evaluation_v2/Runs/full_208/phase8_explanations/"
        f"task_aware_data_summarization/{dataset_id}/explanation_artifacts"
    )


def canonicalize(value):
    if isinstance(value, list):
        return [canonicalize(item) for item in value]
    if isinstance(value, dict):
        return {key: canonicalize(value[key]) for key in sorted(value)}
    return value


def sha256_json(value):
    payload = json.dumps(canonicalize(value), ensure_ascii=False, separators=(",", ":"))
    return hashlib.sha256(payload.encode("utf-8")).hexdigest()


def repo_path(path):
    return path.relative_to(PROJECT_ROOT).as_posix()


def explanation_raw_text(response):
    explanation = response.get("explanation") or {}
    lines = []
    summary = explanation.get("summary")
    if summary:
        lines.append(f"Summary: {summary}")
    for insight in explanation.get("insights") or []:
        title = insight.get("title") or "Insight"
        description = insight.get("description") or ""
        lines.append(f"{title}: {description}")
    return "\n".join(lines)


async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--run-root", type=Path, default=DEFAULT_RUN_ROOT)
    parser.add_argument("--dataset", default="SAMPLE_UCI_POR")
    args = parser.parse_args()
    args.run_root = args.run_root.resolve()

    output_dir = args.run_root / "regenerated_action_explanations"
    records_dir = args.run_root / "judge_inputs/records"
    manifest_path = args.run_root / "judge_inputs/judge_input_manifest.jsonl"
    output_dir.mkdir(parents=True, exist_ok=True)
    manifest = [
        json.loads(line)
        for line in manifest_path.read_text(encoding="utf-8").splitlines()
        if line.strip()
    ]
    manifest_by_record = {entry["record_id"]: entry for entry in manifest}

    for task_id in TASK_IDS:
        record_id = f"{args.dataset}__{task_id}__task_aware_data_summarization"
        old_path = old_artifact_root(args.dataset) / f"{record_id}.json"
        old_artifact = json.loads(old_path.read_text(encoding="utf-8"))
        request = ExplainRequest.model_validate(old_artifact["request_payload"])
        response_model = await explain(request)
        response = response_model.model_dump(mode="json")
        artifact = {
            **old_artifact,
            "generated_at": datetime.now(timezone.utc).isoformat(),
            "artifact_type": "llm_judge_v3_regenerated_action_explanation_v1",
            "response_metadata": {
                **(old_artifact.get("response_metadata") or {}),
                "regenerated_after_action_synthesis_small_result_fix": True,
                "degraded": response.get("degraded", False),
            },
            "response_body": response,
            "raw_text": explanation_raw_text(response),
        }
        artifact_path = output_dir / f"{record_id}.json"
        artifact_path.write_text(
            json.dumps(artifact, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
            newline="\n",
        )

        judge_input_path = records_dir / f"{record_id}.json"
        judge_input = json.loads(judge_input_path.read_text(encoding="utf-8"))
        judge_input["explanation"] = {
            "raw_text": artifact["raw_text"],
            "structured_payload": response,
            "generation_metadata": {
                **judge_input["explanation"]["generation_metadata"],
                "explanation_artifact_path": repo_path(artifact_path),
                "explanation_artifact_sha256": hashlib.sha256(
                    artifact_path.read_text(encoding="utf-8").replace("\r\n", "\n").encode("utf-8")
                ).hexdigest(),
                "observed_ai_summary_method": response.get("ai_summary_method"),
                "degraded": response.get("degraded", False),
                "model": (response.get("meta") or {}).get("model"),
                "token_usage": (response.get("meta") or {}).get("token_usage"),
                "latency_ms": (response.get("meta") or {}).get("latency_ms"),
                "attempts_used": 1,
            },
        }
        judge_input_path.write_text(
            json.dumps(judge_input, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
            newline="\n",
        )
        manifest_entry = manifest_by_record[record_id]
        manifest_entry["judge_input_sha256"] = sha256_json(judge_input)
        manifest_entry["regenerated_action_explanation"] = True
        print(
            json.dumps(
                {
                    "record_id": record_id,
                    "degraded": response.get("degraded"),
                    "summary": (response.get("explanation") or {}).get("summary"),
                    "artifact_path": repo_path(artifact_path),
                },
                ensure_ascii=False,
            ),
            flush=True,
        )

    manifest_path.write_text(
        "\n".join(json.dumps(entry, ensure_ascii=False) for entry in manifest) + "\n",
        encoding="utf-8",
        newline="\n",
    )


if __name__ == "__main__":
    asyncio.run(main())
