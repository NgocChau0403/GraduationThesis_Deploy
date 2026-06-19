import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(SCRIPT_DIR, "../../../..");
const RUNS_ROOT = path.join(PROJECT_ROOT, "Docs/evaluation_v2/Runs");
const OUTPUT_DIR = path.join(RUNS_ROOT, "phase6_preflight");

const DEFAULT_CASE_MANIFEST_PATH = path.join(RUNS_ROOT, "pilot_case_run_manifest_v1.json");
const TASK_REGISTRY_PATH = path.join(PROJECT_ROOT, "Backend/src/config/taskRegistry.json");
const TASK_REQUIREMENTS_PATH = path.join(
  PROJECT_ROOT,
  "Docs/evaluation_v2/Rubric/task_evaluation_requirements.json",
);
const ROW_COUNT_RECORDS_PATH = path.join(
  PROJECT_ROOT,
  "Docs/evaluation_v2/Handle20rows/outputs/row_count_records.jsonl",
);

function parseArgs(argv) {
  const args = {
    caseManifestPath: DEFAULT_CASE_MANIFEST_PATH,
    outputDir: OUTPUT_DIR,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = argv[i + 1];
    if (arg === "--case-manifest") args.caseManifestPath = path.resolve(next), i += 1;
    else if (arg === "--output-dir") args.outputDir = path.resolve(next), i += 1;
    else throw new Error(`Unknown argument: ${arg}`);
  }

  return args;
}

function toRepoPath(filePath) {
  return path.relative(PROJECT_ROOT, filePath).replaceAll(path.sep, "/");
}

function repoPathToAbsolute(repoPath) {
  return path.join(PROJECT_ROOT, ...String(repoPath).split("/"));
}

async function readJson(filePath) {
  const text = await readFile(filePath, "utf8");
  return JSON.parse(text.replace(/^\uFEFF/, ""));
}

async function readJsonl(filePath) {
  const text = await readFile(filePath, "utf8");
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

async function sha256File(filePath) {
  const bytes = await readFile(filePath);
  return createHash("sha256").update(bytes).digest("hex");
}

function countBy(items, keyFn) {
  const counts = {};
  for (const item of items) {
    const key = keyFn(item);
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
}

function unique(values) {
  return [...new Set(values)];
}

function arraysEqual(a, b) {
  return Array.isArray(a)
    && Array.isArray(b)
    && a.length === b.length
    && a.every((value, index) => value === b[index]);
}

function pushIssue(collection, severity, code, message, details = {}) {
  collection.push({ severity, code, message, details });
}

function findTask(registry, taskId) {
  return registry.find((task) => task.taskId === taskId) ?? null;
}

function findRequirement(requirements, taskId) {
  return (requirements.tasks ?? []).find((task) => task.task_id === taskId) ?? null;
}

function findRowCountRecord(records, { datasetId, taskId, mode }) {
  return records.find((record) => (
    record.dataset_id === datasetId
    && record.task_id === taskId
    && record.mode === mode
  )) ?? null;
}

function expectedAccessForBucket(bucket) {
  if (bucket === "<=20") return "direct_embedding";
  if (bucket === ">20") return "deterministic_artifact_retrieval";
  return null;
}

function makeRecordId({ datasetId, taskId, mode }) {
  return `${datasetId}__${taskId}__${mode}`;
}

function buildPlannedRecord({ caseItem, mode, requirementTask, registryTask, rowCountRecord }) {
  return {
    record_id: makeRecordId({
      datasetId: caseItem.dataset_id,
      taskId: caseItem.task_id,
      mode,
    }),
    case_id: caseItem.case_id,
    dataset_id: caseItem.dataset_id,
    class_id: caseItem.class_id,
    student_id: caseItem.student_id,
    role: caseItem.role,
    task_id: caseItem.task_id,
    task_name: caseItem.task_name,
    target_audience: registryTask?.target_audience ?? null,
    scope: registryTask?.scope ?? null,
    explanation_mode: mode,
    row_count: caseItem.row_count,
    row_count_bucket: caseItem.row_count_bucket,
    expected_evidence_access_path: caseItem.expected_evidence_access_path,
    coverage_tags: caseItem.coverage_tags,
    pilot_focus: caseItem.pilot_focus,
    row_count_source: {
      path: "Docs/evaluation_v2/Handle20rows/outputs/row_count_records.jsonl",
      matched_mode: rowCountRecord?.mode ?? null,
      status: rowCountRecord?.status ?? null,
      source_generated_at: rowCountRecord?.source?.generated_at ?? null,
    },
    materialized_requirement_summary: {
      task_requirements_status: requirementTask?.review_status ?? null,
      required_core_output_count: requirementTask?.required_core_outputs?.length ?? 0,
      required_supporting_output_count: requirementTask?.required_supporting_outputs?.length ?? 0,
      evaluation_constraint_count: requirementTask?.evaluation_constraints?.length ?? 0,
      safety_fairness_applicability: requirementTask?.safety_fairness_applicability ?? null,
      has_safety_fairness_note: Boolean(requirementTask?.safety_fairness_note),
    },
    phase6_next_step: "build_full_evidence_and_judge_input",
  };
}

async function verifyContractManifest({ caseManifest, issues }) {
  const linked = caseManifest.linked_contract_manifest;
  if (!linked?.path || !linked?.sha256) {
    pushIssue(issues, "error", "missing_linked_contract_manifest", "Case manifest does not define a linked contract manifest with path and sha256.");
    return null;
  }

  const contractManifestPath = repoPathToAbsolute(linked.path);
  let actualLinkedHash = null;
  let contractManifest = null;

  try {
    actualLinkedHash = await sha256File(contractManifestPath);
    contractManifest = await readJson(contractManifestPath);
  } catch (error) {
    pushIssue(issues, "error", "cannot_read_contract_manifest", `Cannot read linked contract manifest: ${linked.path}`, { error: error.message });
    return null;
  }

  if (actualLinkedHash !== linked.sha256) {
    pushIssue(issues, "error", "linked_contract_manifest_hash_mismatch", "Linked contract manifest hash does not match case manifest.", {
      path: linked.path,
      expected: linked.sha256,
      actual: actualLinkedHash,
    });
  }

  if (contractManifest.status !== linked.required_status) {
    pushIssue(issues, "error", "contract_manifest_status_mismatch", "Linked contract manifest status does not match required_status.", {
      expected: linked.required_status,
      actual: contractManifest.status,
    });
  }

  const hashedArtifacts = [
    ...(contractManifest.contract_artifacts ?? []),
    ...(contractManifest.provenance_artifacts ?? []),
  ];

  for (const artifact of hashedArtifacts) {
    try {
      const actual = await sha256File(repoPathToAbsolute(artifact.path));
      if (actual !== artifact.sha256) {
        pushIssue(issues, "error", "contract_artifact_hash_mismatch", "A contract/provenance artifact hash differs from the frozen manifest.", {
          artifact_id: artifact.artifact_id,
          path: artifact.path,
          expected: artifact.sha256,
          actual,
        });
      }
    } catch (error) {
      pushIssue(issues, "error", "contract_artifact_unreadable", "A contract/provenance artifact cannot be read.", {
        artifact_id: artifact.artifact_id,
        path: artifact.path,
        error: error.message,
      });
    }
  }

  return {
    manifest: contractManifest,
    path: linked.path,
    sha256: actualLinkedHash,
    artifact_count: hashedArtifacts.length,
  };
}

function validateCaseManifest({ caseManifest, issues }) {
  const cases = caseManifest.primary_cases ?? [];
  const modes = caseManifest.selection_policy?.modes_per_case ?? [];
  const expectedCaseCount = caseManifest.selection_policy?.primary_case_count;
  const expectedRecordCount = caseManifest.selection_policy?.expected_judge_records;

  if (caseManifest.status !== "READY_FOR_PHASE6_PREFLIGHT") {
    pushIssue(issues, "error", "case_manifest_status_not_ready", "Pilot case manifest status must be READY_FOR_PHASE6_PREFLIGHT.", {
      actual: caseManifest.status,
    });
  }

  if (cases.length !== expectedCaseCount) {
    pushIssue(issues, "error", "primary_case_count_mismatch", "Primary case count does not match selection_policy.primary_case_count.", {
      expected: expectedCaseCount,
      actual: cases.length,
    });
  }

  if (cases.length * modes.length !== expectedRecordCount) {
    pushIssue(issues, "error", "expected_judge_record_count_mismatch", "Expected judge record count does not equal primary cases multiplied by modes.", {
      expected: expectedRecordCount,
      actual: cases.length * modes.length,
    });
  }

  const caseIds = cases.map((item) => item.case_id);
  const duplicateCaseIds = unique(caseIds.filter((caseId, index) => caseIds.indexOf(caseId) !== index));
  if (duplicateCaseIds.length > 0) {
    pushIssue(issues, "error", "duplicate_case_ids", "Case manifest contains duplicate case_id values.", {
      duplicate_case_ids: duplicateCaseIds,
    });
  }

  for (const caseItem of cases) {
    if (!arraysEqual(caseItem.expected_modes, modes)) {
      pushIssue(issues, "error", "case_modes_mismatch", "Case expected_modes must match selection_policy.modes_per_case.", {
        case_id: caseItem.case_id,
        expected: modes,
        actual: caseItem.expected_modes,
      });
    }

    const expectedAccess = expectedAccessForBucket(caseItem.row_count_bucket);
    if (expectedAccess && caseItem.expected_evidence_access_path !== expectedAccess) {
      pushIssue(issues, "error", "evidence_access_bucket_mismatch", "Case expected evidence access path does not match row-count bucket policy.", {
        case_id: caseItem.case_id,
        bucket: caseItem.row_count_bucket,
        expected: expectedAccess,
        actual: caseItem.expected_evidence_access_path,
      });
    }
  }
}

function validateCasesAgainstSources({ caseManifest, registry, requirements, rowCountRecords, issues }) {
  const modes = caseManifest.selection_policy?.modes_per_case ?? [];
  const plannedRecords = [];

  for (const caseItem of caseManifest.primary_cases ?? []) {
    const registryTask = findTask(registry, caseItem.task_id);
    const requirementTask = findRequirement(requirements, caseItem.task_id);

    if (!registryTask) {
      pushIssue(issues, "error", "task_missing_from_registry", "Pilot case task_id is missing from taskRegistry.json.", {
        case_id: caseItem.case_id,
        task_id: caseItem.task_id,
      });
    } else {
      if (registryTask.taskName !== caseItem.task_name) {
        pushIssue(issues, "warning", "task_name_differs_from_registry", "Pilot case task_name differs from taskRegistry.json.", {
          case_id: caseItem.case_id,
          task_id: caseItem.task_id,
          manifest_task_name: caseItem.task_name,
          registry_task_name: registryTask.taskName,
        });
      }
    }

    if (!requirementTask) {
      pushIssue(issues, "error", "task_missing_from_requirements", "Pilot case task_id is missing from task_evaluation_requirements.json.", {
        case_id: caseItem.case_id,
        task_id: caseItem.task_id,
      });
    } else {
      if ((requirementTask.required_core_outputs ?? []).length === 0) {
        pushIssue(issues, "error", "task_has_zero_core_requirements", "Pilot case task has zero required_core_outputs.", {
          case_id: caseItem.case_id,
          task_id: caseItem.task_id,
        });
      }
      if (requirementTask.review_status !== "approved_for_pilot") {
        pushIssue(issues, "error", "task_requirements_not_approved", "Pilot case task requirements are not approved_for_pilot.", {
          case_id: caseItem.case_id,
          task_id: caseItem.task_id,
          review_status: requirementTask.review_status,
        });
      }
    }

    for (const mode of modes) {
      const rowCountRecord = findRowCountRecord(rowCountRecords, {
        datasetId: caseItem.dataset_id,
        taskId: caseItem.task_id,
        mode,
      });

      if (!rowCountRecord) {
        pushIssue(issues, "error", "row_count_record_missing", "Pilot case has no matching Phase 3 row-count record for this mode.", {
          case_id: caseItem.case_id,
          dataset_id: caseItem.dataset_id,
          task_id: caseItem.task_id,
          mode,
        });
        continue;
      }

      if (rowCountRecord.status !== "scoreable") {
        pushIssue(issues, "error", "row_count_record_not_scoreable", "Pilot case row-count record is not scoreable.", {
          case_id: caseItem.case_id,
          dataset_id: caseItem.dataset_id,
          task_id: caseItem.task_id,
          mode,
          status: rowCountRecord.status,
        });
      }

      if (rowCountRecord.row_count !== caseItem.row_count) {
        pushIssue(issues, "error", "row_count_mismatch", "Pilot case row_count differs from Phase 3 row-count artifact.", {
          case_id: caseItem.case_id,
          mode,
          expected: caseItem.row_count,
          actual: rowCountRecord.row_count,
        });
      }

      if (rowCountRecord.row_count_bucket !== caseItem.row_count_bucket) {
        pushIssue(issues, "error", "row_count_bucket_mismatch", "Pilot case row_count_bucket differs from Phase 3 row-count artifact.", {
          case_id: caseItem.case_id,
          mode,
          expected: caseItem.row_count_bucket,
          actual: rowCountRecord.row_count_bucket,
        });
      }

      if (rowCountRecord.role !== caseItem.role) {
        pushIssue(issues, "error", "role_mismatch", "Pilot case role differs from Phase 3 row-count artifact.", {
          case_id: caseItem.case_id,
          mode,
          expected: caseItem.role,
          actual: rowCountRecord.role,
        });
      }

      if (rowCountRecord.class_id !== caseItem.class_id) {
        pushIssue(issues, "error", "class_id_mismatch", "Pilot case class_id differs from Phase 3 row-count artifact.", {
          case_id: caseItem.case_id,
          mode,
          expected: caseItem.class_id,
          actual: rowCountRecord.class_id,
        });
      }

      if (caseItem.role === "student" && rowCountRecord.student_id !== caseItem.student_id) {
        pushIssue(issues, "error", "student_id_mismatch", "Student-facing pilot case student_id differs from Phase 3 row-count artifact.", {
          case_id: caseItem.case_id,
          mode,
          expected: caseItem.student_id,
          actual: rowCountRecord.student_id,
        });
      }

      if (registryTask && requirementTask) {
        plannedRecords.push(buildPlannedRecord({
          caseItem,
          mode,
          requirementTask,
          registryTask,
          rowCountRecord,
        }));
      }
    }
  }

  const recordIds = plannedRecords.map((record) => record.record_id);
  const duplicateRecordIds = unique(recordIds.filter((recordId, index) => recordIds.indexOf(recordId) !== index));
  if (duplicateRecordIds.length > 0) {
    pushIssue(issues, "error", "duplicate_planned_record_ids", "Expanded planned records contain duplicate record_id values.", {
      duplicate_record_ids: duplicateRecordIds,
    });
  }

  return plannedRecords;
}

function summarize({ caseManifest, contractSummary, plannedRecords, issues, outputPaths }) {
  const errors = issues.filter((issue) => issue.severity === "error");
  const warnings = issues.filter((issue) => issue.severity === "warning");
  const cases = caseManifest.primary_cases ?? [];
  const coverageTags = unique(cases.flatMap((item) => item.coverage_tags ?? [])).sort();

  return {
    report_version: "llm_judge_v2_phase6_1_6_2_preflight_report_v1",
    generated_at: new Date().toISOString(),
    status: errors.length === 0 ? "PASS" : "FAIL",
    phase_scope: [
      "6.1 contract preflight",
      "6.2 pilot case expansion",
    ],
    inputs: {
      case_manifest_path: "Docs/evaluation_v2/Runs/pilot_case_run_manifest_v1.json",
      linked_contract_manifest_path: contractSummary?.path ?? null,
      task_registry_path: "Backend/src/config/taskRegistry.json",
      task_requirements_path: "Docs/evaluation_v2/Rubric/task_evaluation_requirements.json",
      row_count_records_path: "Docs/evaluation_v2/Handle20rows/outputs/row_count_records.jsonl",
    },
    contract_summary: contractSummary,
    counts: {
      primary_cases: cases.length,
      expanded_planned_records: plannedRecords.length,
      expected_judge_records: caseManifest.selection_policy?.expected_judge_records ?? null,
      errors: errors.length,
      warnings: warnings.length,
    },
    coverage_summary: {
      datasets: countBy(cases, (item) => item.dataset_id),
      row_count_buckets: countBy(cases, (item) => item.row_count_bucket),
      expected_evidence_access_paths: countBy(cases, (item) => item.expected_evidence_access_path),
      roles: countBy(cases, (item) => item.role),
      explanation_modes: countBy(plannedRecords, (item) => item.explanation_mode),
      coverage_tags: coverageTags,
    },
    outputs: {
      planned_records_jsonl: toRepoPath(outputPaths.plannedRecordsPath),
      report_json: toRepoPath(outputPaths.reportJsonPath),
      report_md: toRepoPath(outputPaths.reportMdPath),
    },
    gate_decision: {
      phase6_3_evidence_builder_allowed: errors.length === 0,
      judge_invocation_allowed: false,
      official_full_evaluation_allowed: false,
      reason: errors.length === 0
        ? "Preflight passed for contract verification and pilot case expansion. Evidence builder may run next, but judge invocation remains disabled."
        : "Preflight failed. Fix errors before evidence building.",
    },
    issues,
  };
}

function renderMarkdown(report) {
  const lines = [
    "# LLM Judge V2 Phase 6.1-6.2 Preflight Report",
    "",
    `- Generated at: ${report.generated_at}`,
    `- Status: ${report.status}`,
    `- Primary cases: ${report.counts.primary_cases}`,
    `- Expanded planned records: ${report.counts.expanded_planned_records}`,
    `- Expected judge records: ${report.counts.expected_judge_records}`,
    `- Errors: ${report.counts.errors}`,
    `- Warnings: ${report.counts.warnings}`,
    "",
    "## Gate Decision",
    "",
    `- Phase 6.3 evidence builder allowed: ${report.gate_decision.phase6_3_evidence_builder_allowed}`,
    `- Judge invocation allowed: ${report.gate_decision.judge_invocation_allowed}`,
    `- Official full evaluation allowed: ${report.gate_decision.official_full_evaluation_allowed}`,
    `- Reason: ${report.gate_decision.reason}`,
    "",
    "## Coverage",
    "",
    "| Dimension | Counts |",
    "| --- | --- |",
    `| Datasets | ${JSON.stringify(report.coverage_summary.datasets)} |`,
    `| Row-count buckets | ${JSON.stringify(report.coverage_summary.row_count_buckets)} |`,
    `| Evidence access paths | ${JSON.stringify(report.coverage_summary.expected_evidence_access_paths)} |`,
    `| Roles | ${JSON.stringify(report.coverage_summary.roles)} |`,
    `| Explanation modes | ${JSON.stringify(report.coverage_summary.explanation_modes)} |`,
    "",
    "## Outputs",
    "",
    `- Planned records: \`${report.outputs.planned_records_jsonl}\``,
    `- JSON report: \`${report.outputs.report_json}\``,
    `- Markdown report: \`${report.outputs.report_md}\``,
    "",
  ];

  if (report.issues.length > 0) {
    lines.push("## Issues", "", "| Severity | Code | Message |", "| --- | --- | --- |");
    for (const issue of report.issues) {
      lines.push(`| ${issue.severity} | ${issue.code} | ${issue.message} |`);
    }
    lines.push("");
  } else {
    lines.push("## Issues", "", "No issues found.", "");
  }

  return `${lines.join("\n")}\n`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const issues = [];
  const outputPaths = {
    plannedRecordsPath: path.join(args.outputDir, "planned_records.jsonl"),
    reportJsonPath: path.join(args.outputDir, "phase6_preflight_report.json"),
    reportMdPath: path.join(args.outputDir, "phase6_preflight_report.md"),
  };

  const caseManifest = await readJson(args.caseManifestPath);
  const registry = await readJson(TASK_REGISTRY_PATH);
  const requirements = await readJson(TASK_REQUIREMENTS_PATH);
  const rowCountRecords = await readJsonl(ROW_COUNT_RECORDS_PATH);

  validateCaseManifest({ caseManifest, issues });

  if (!Array.isArray(registry)) {
    pushIssue(issues, "error", "task_registry_not_array", "taskRegistry.json must parse to an array.");
  }

  if (requirements.status !== "APPROVED_FOR_PILOT") {
    pushIssue(issues, "error", "task_requirements_status_not_approved", "task_evaluation_requirements.json status must be APPROVED_FOR_PILOT.", {
      actual: requirements.status,
    });
  }

  if (requirements.task_count !== 52 || (requirements.tasks ?? []).length !== 52) {
    pushIssue(issues, "error", "task_requirements_count_mismatch", "task_evaluation_requirements.json must contain 52 tasks.", {
      declared: requirements.task_count,
      actual: (requirements.tasks ?? []).length,
    });
  }

  const contractSummary = await verifyContractManifest({ caseManifest, issues });
  const plannedRecords = Array.isArray(registry)
    ? validateCasesAgainstSources({ caseManifest, registry, requirements, rowCountRecords, issues })
    : [];

  const report = summarize({ caseManifest, contractSummary, plannedRecords, issues, outputPaths });

  await mkdir(args.outputDir, { recursive: true });
  await writeFile(outputPaths.plannedRecordsPath, `${plannedRecords.map((record) => JSON.stringify(record)).join("\n")}\n`, "utf8");
  await writeFile(outputPaths.reportJsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(outputPaths.reportMdPath, renderMarkdown(report), "utf8");

  console.log(JSON.stringify({
    ok: report.status === "PASS",
    status: report.status,
    primary_cases: report.counts.primary_cases,
    expanded_planned_records: report.counts.expanded_planned_records,
    errors: report.counts.errors,
    warnings: report.counts.warnings,
    planned_records_jsonl: report.outputs.planned_records_jsonl,
    report_json: report.outputs.report_json,
    report_md: report.outputs.report_md,
    phase6_3_evidence_builder_allowed: report.gate_decision.phase6_3_evidence_builder_allowed,
    judge_invocation_allowed: report.gate_decision.judge_invocation_allowed,
  }, null, 2));

  if (report.status !== "PASS") {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
