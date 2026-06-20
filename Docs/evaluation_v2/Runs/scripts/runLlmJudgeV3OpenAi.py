import argparse
import asyncio
import json
import os
import time
from pathlib import Path

from dotenv import load_dotenv
from openai import AsyncOpenAI


PROJECT_ROOT = Path(__file__).resolve().parents[4]
DEFAULT_RUN_ROOT = (
    PROJECT_ROOT
    / "Docs/evaluation_v2/Runs/full_208/phase11_v3_uci_action_evidence_rerun"
)
DEFAULT_PROMPT_PATH = PROJECT_ROOT / "Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V3.md"
DEFAULT_ENV_PATH = PROJECT_ROOT / "AIService/.env"
DEFAULT_RESPONSE_SCHEMA_PATH = (
    PROJECT_ROOT / "Docs/evaluation_v2/LLM_JUDGE_V2_JUDGE_RESPONSE_SCHEMA_V1.json"
)


def parse_args():
    parser = argparse.ArgumentParser(description="Run the UCI V3 pointwise LLM judge through OpenAI.")
    parser.add_argument("--run-root", type=Path, default=DEFAULT_RUN_ROOT)
    parser.add_argument("--prompt-path", type=Path, default=DEFAULT_PROMPT_PATH)
    parser.add_argument("--env-path", type=Path, default=DEFAULT_ENV_PATH)
    parser.add_argument("--response-schema-path", type=Path, default=DEFAULT_RESPONSE_SCHEMA_PATH)
    parser.add_argument("--expected-count", type=int, default=104)
    parser.add_argument("--concurrency", type=int, default=4)
    parser.add_argument("--max-tokens", type=int, default=4000)
    parser.add_argument("--max-attempts", type=int, default=3)
    parser.add_argument("--model", default=None)
    parser.add_argument("--limit", type=int, default=None)
    parser.add_argument("--record-id", action="append", default=[])
    parser.add_argument("--overwrite", action="store_true")
    parser.add_argument(
        "--use-prompt-queue-for-compact",
        action="store_true",
        help="Use preflight prompt packets for records whose queue_strategy is compact_retrieval_context.",
    )
    return parser.parse_args()


def read_jsonl(path):
    return [json.loads(line) for line in path.read_text(encoding="utf-8").splitlines() if line.strip()]


def validate_minimum_response(payload, record_id):
    required = {
        "schema_version",
        "record_id",
        "scoring_status",
        "subscores",
        "claim_checks",
        "errors",
        "holistic_rationale",
        "evidence_usage_notes",
    }
    missing = sorted(required - set(payload))
    if missing:
        raise ValueError(f"missing fields: {', '.join(missing)}")
    if payload.get("schema_version") != "judge_response_schema_v1":
        raise ValueError("invalid schema_version")
    if payload.get("record_id") != record_id:
        raise ValueError(f"record_id mismatch: {payload.get('record_id')}")
    if payload.get("scoring_status") not in {"scored", "invalid"}:
        raise ValueError("invalid scoring_status")
    if payload.get("scoring_status") == "invalid":
        if payload.get("subscores") is not None:
            raise ValueError("invalid response must use subscores=null")
        return

    metrics = {
        "faithfulness",
        "numerical_correctness",
        "completeness",
        "task_relevance",
        "actionability",
        "clarity",
        "safety_fairness",
    }
    subscores = payload.get("subscores")
    if not isinstance(subscores, dict) or set(subscores) != metrics:
        raise ValueError("scored response must contain exactly seven subscore objects")
    for metric, value in subscores.items():
        if not isinstance(value, dict):
            raise ValueError(f"subscores.{metric} must be an object")
        applicability = value.get("applicability")
        score = value.get("score")
        if applicability not in {"applicable", "not_applicable"}:
            raise ValueError(f"subscores.{metric}.applicability invalid")
        if applicability == "applicable" and not (isinstance(score, int) and 1 <= score <= 10):
            raise ValueError(f"subscores.{metric}.score must be integer 1-10")
        if applicability == "not_applicable" and score is not None:
            raise ValueError(f"subscores.{metric}.score must be null")
        if not isinstance(value.get("rationale"), str):
            raise ValueError(f"subscores.{metric}.rationale must be a string")

    valid_impacts = {
        "local_detail",
        "weakens_support",
        "changes_interpretation",
        "reverses_main_finding",
        "wrong_evaluation_target",
    }
    for index, claim in enumerate(payload.get("claim_checks", [])):
        if not isinstance(claim, dict):
            raise ValueError(f"claim_checks[{index}] must be an object")
        if claim.get("support_status") != "supported" and claim.get("impact_type") not in valid_impacts:
            raise ValueError(f"claim_checks[{index}].impact_type required for non-supported claim")
        if not isinstance(claim.get("evidence_refs"), list):
            raise ValueError(f"claim_checks[{index}].evidence_refs must be an array")


async def main():
    args = parse_args()
    args.run_root = args.run_root.resolve()
    args.prompt_path = args.prompt_path.resolve()
    args.env_path = args.env_path.resolve()
    args.response_schema_path = args.response_schema_path.resolve()
    load_dotenv(args.env_path)
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError(f"OPENAI_API_KEY is missing from {args.env_path}")
    model = args.model or os.getenv("OPENAI_MODEL", "gpt-4o-mini").strip('"')

    context_manifest_path = args.run_root / "judge_contexts/judge_context_manifest.jsonl"
    output_dir = args.run_root / "judge_invocation/raw_outputs"
    invalid_output_dir = args.run_root / "judge_invocation/invalid_raw_outputs"
    log_path = args.run_root / "judge_invocation/openai_judge_run_log.jsonl"
    summary_path = args.run_root / "judge_invocation/openai_judge_run_summary.json"
    output_dir.mkdir(parents=True, exist_ok=True)
    invalid_output_dir.mkdir(parents=True, exist_ok=True)

    entries = read_jsonl(context_manifest_path)
    queue_by_record = {}
    if args.use_prompt_queue_for_compact:
        queue_manifest_path = args.run_root / "judge_invocation/judge_prompt_queue_manifest.jsonl"
        queue_by_record = {entry["record_id"]: entry for entry in read_jsonl(queue_manifest_path)}
    ready = [entry for entry in entries if entry.get("status") == "judge_context_ready"]
    if len(ready) != args.expected_count:
        raise RuntimeError(f"Expected {args.expected_count} ready contexts, found {len(ready)}")
    if args.record_id:
        selected = set(args.record_id)
        ready = [entry for entry in ready if entry.get("record_id") in selected]
        missing_selected = sorted(selected - {entry.get("record_id") for entry in ready})
        if missing_selected:
            raise RuntimeError(f"Selected record(s) not found: {', '.join(missing_selected)}")
    if args.limit is not None:
        ready = ready[: args.limit]

    prompt = args.prompt_path.read_text(encoding="utf-8").replace("\r\n", "\n")
    response_schema = args.response_schema_path.read_text(encoding="utf-8").replace("\r\n", "\n")
    client = AsyncOpenAI(api_key=api_key)
    semaphore = asyncio.Semaphore(args.concurrency)
    log_lock = asyncio.Lock()
    started = time.perf_counter()
    results = []

    async def append_log(record):
        async with log_lock:
            with log_path.open("a", encoding="utf-8", newline="\n") as handle:
                handle.write(json.dumps(record, ensure_ascii=False) + "\n")

    async def judge(entry):
        record_id = entry["record_id"]
        output_path = output_dir / f"{record_id}.json"
        if output_path.exists() and not args.overwrite:
            result = {"record_id": record_id, "status": "skipped_existing"}
            await append_log(result)
            return result

        queue_entry = queue_by_record.get(record_id)
        use_prompt_packet = (
            args.use_prompt_queue_for_compact
            and queue_entry is not None
            and queue_entry.get("queue_strategy") == "compact_retrieval_context"
        )
        if use_prompt_packet:
            evidence_path = PROJECT_ROOT / Path(queue_entry["prompt_packet_path"])
            evidence_text = evidence_path.read_text(encoding="utf-8").replace("\r\n", "\n")
            evidence_label = "COMPACT PREFLIGHT JUDGE PACKET"
        else:
            evidence_path = PROJECT_ROOT / Path(entry["final_context_path"])
            evidence_text = evidence_path.read_text(encoding="utf-8").replace("\r\n", "\n")
            evidence_label = "COMPLETE JUDGE CONTEXT"
        user_prompt = (
            "Evaluate exactly one record using the judge evidence packet below. "
            "All embedded query rows, deterministic statistics, deterministic action evidence, "
            "task requirements, schema context and the AI explanation are evidence for this record. "
            "When the packet is compact, it is the preflight-approved token-budget representation "
            "for an oversized full context; use all included retrieval references and summaries. "
            "Return only one JSON object conforming exactly to the JSON Schema supplied below. "
            "Use scoring_status='scored' or 'invalid' only. Each applicable subscore must be an "
            "object containing applicability, integer score, and rationale; never return a bare "
            "number for a subscore. Claim checks and errors must contain every field required by "
            "the schema. CRITICAL: every claim whose support_status is not 'supported' must include "
            "impact_type with one of the schema's five allowed values; never omit it. Do not repair "
            "or simplify the schema.\n\n"
            "RESPONSE JSON SCHEMA:\n"
            + response_schema
            + f"\n\n{evidence_label}:\n"
            + evidence_text
        )

        async with semaphore:
            for attempt in range(1, args.max_attempts + 1):
                attempt_started = time.perf_counter()
                candidate_payload = None
                try:
                    response = await client.chat.completions.create(
                        model=model,
                        messages=[
                            {"role": "system", "content": prompt},
                            {"role": "user", "content": user_prompt},
                        ],
                        temperature=0,
                        max_tokens=args.max_tokens,
                        response_format={"type": "json_object"},
                    )
                    content = response.choices[0].message.content or ""
                    payload = json.loads(content)
                    candidate_payload = payload
                    validate_minimum_response(payload, record_id)
                    output_path.write_text(
                        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
                        encoding="utf-8",
                        newline="\n",
                    )
                    usage = response.usage
                    result = {
                        "record_id": record_id,
                        "task_id": entry.get("task_id"),
                        "explanation_mode": entry.get("explanation_mode"),
                        "status": "valid_raw_output",
                        "attempt": attempt,
                        "model": response.model,
                        "latency_ms": round((time.perf_counter() - attempt_started) * 1000, 3),
                        "prompt_tokens": getattr(usage, "prompt_tokens", None),
                        "completion_tokens": getattr(usage, "completion_tokens", None),
                        "total_tokens": getattr(usage, "total_tokens", None),
                        "full_context_path": entry["final_context_path"],
                        "evidence_packet_path": str(evidence_path.relative_to(PROJECT_ROOT)).replace("\\", "/"),
                        "queue_strategy": queue_entry.get("queue_strategy") if queue_entry else "full_context",
                        "raw_output_path": str(output_path.relative_to(PROJECT_ROOT)).replace("\\", "/"),
                    }
                    await append_log(result)
                    print(f"[judge] {record_id} valid attempt={attempt} tokens={result['total_tokens']}", flush=True)
                    return result
                except Exception as error:
                    if candidate_payload is not None:
                        invalid_path = invalid_output_dir / f"{record_id}__attempt_{attempt}.json"
                        invalid_path.write_text(
                            json.dumps(candidate_payload, ensure_ascii=False, indent=2) + "\n",
                            encoding="utf-8",
                            newline="\n",
                        )
                    failure = {
                        "record_id": record_id,
                        "status": "attempt_failed",
                        "attempt": attempt,
                        "error_type": type(error).__name__,
                        "error": str(error),
                        "latency_ms": round((time.perf_counter() - attempt_started) * 1000, 3),
                    }
                    await append_log(failure)
                    if attempt == args.max_attempts:
                        print(f"[judge] {record_id} FAILED: {error}", flush=True)
                        return failure
                    await asyncio.sleep(min(2 ** attempt, 10))

    results.extend(await asyncio.gather(*(judge(entry) for entry in ready)))
    valid = [item for item in results if item.get("status") in {"valid_raw_output", "skipped_existing"}]
    failed = [item for item in results if item.get("status") == "attempt_failed"]
    summary = {
        "run_version": "openai_pointwise_judge_v3_action_evidence_v1",
        "model": model,
        "expected_records": args.expected_count,
        "selected_records": len(ready),
        "valid_or_existing_records": len(valid),
        "failed_records": len(failed),
        "elapsed_ms": round((time.perf_counter() - started) * 1000, 3),
        "new_prompt_tokens": sum(item.get("prompt_tokens") or 0 for item in results),
        "new_completion_tokens": sum(item.get("completion_tokens") or 0 for item in results),
        "new_total_tokens": sum(item.get("total_tokens") or 0 for item in results),
        "concurrency": args.concurrency,
        "full_context_used_for_every_record": not args.use_prompt_queue_for_compact,
        "use_prompt_queue_for_compact": args.use_prompt_queue_for_compact,
        "log_path": str(log_path.relative_to(PROJECT_ROOT)).replace("\\", "/"),
    }
    summary_path.write_text(
        json.dumps(summary, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
        newline="\n",
    )
    print(json.dumps(summary, ensure_ascii=False), flush=True)
    if failed:
        raise SystemExit(1)


if __name__ == "__main__":
    asyncio.run(main())
