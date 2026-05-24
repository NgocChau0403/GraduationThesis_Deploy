const FAILURE_TYPES = {
  SQL_ERROR: "SQL_ERROR",
  EMPTY_DATA: "EMPTY_DATA",
  CONTRACT_MISMATCH: "CONTRACT_MISMATCH",
  MISSING_CAPABILITY: "MISSING_CAPABILITY",
  MISSING_CHART_FIELD: "MISSING_CHART_FIELD",
  PLOT_ADAPTER_ERROR: "PLOT_ADAPTER_ERROR",
  UNKNOWN: "UNKNOWN",
};

function makeFailure(category, rootCause, moduleFile) {
  return {
    success: false,
    failure_type: category,
    root_cause_summary: rootCause,
    likely_module_file: moduleFile,
  };
}

export function classifyTaskOutcome({
  execution,
  availability,
  contract,
  visualization,
  contextResolver,
}) {
  if (execution?.error) {
    return makeFailure(
      FAILURE_TYPES.SQL_ERROR,
      execution.error.message || "SQL execution failed.",
      "/Backend/src/services/sqlExecution.service.js"
    );
  }

  if (contextResolver?.unresolvedParams?.length > 0 && !execution?.success) {
    return makeFailure(
      FAILURE_TYPES.UNKNOWN,
      `Missing runtime params: ${contextResolver.unresolvedParams.join(", ")}`,
      "/Backend/src/debug/phase1_task_debug_runner.mjs"
    );
  }

  if (availability?.denied && availability?.denyReasons?.length > 0) {
    return makeFailure(
      FAILURE_TYPES.MISSING_CAPABILITY,
      availability.denyReasons.join(" | "),
      "/Backend/src/services/capabilityValidator.service.js"
    );
  }

  if (execution?.success && execution?.rowCount === 0) {
    return makeFailure(
      FAILURE_TYPES.EMPTY_DATA,
      "Query executed but returned 0 rows.",
      "/Backend/src/services/sqlExecution.service.js"
    );
  }

  if (contract && contract.ok === false) {
    return makeFailure(
      FAILURE_TYPES.CONTRACT_MISMATCH,
      `Missing required output fields: ${contract.missing?.join(", ") || "unknown"}`,
      "/Backend/src/services/outputSchema.service.js"
    );
  }

  if (visualization?.adapterError) {
    return makeFailure(
      FAILURE_TYPES.PLOT_ADAPTER_ERROR,
      visualization.adapterError.message || "Chart adapter threw an exception.",
      visualization.adapterModulePath || "/Frontend/src/chartAdapters"
    );
  }

  if (visualization?.chartRequiredFields?.missing?.length > 0) {
    return makeFailure(
      FAILURE_TYPES.MISSING_CHART_FIELD,
      `Chart-required fields missing in rows: ${visualization.chartRequiredFields.missing.join(", ")}`,
      "/Frontend/src/components/ChartRenderer.jsx"
    );
  }

  if (!execution?.success) {
    return makeFailure(
      FAILURE_TYPES.UNKNOWN,
      "Task did not succeed and no explicit classifier matched.",
      "/Backend/src/debug/failure_classifier.mjs"
    );
  }

  return {
    success: true,
    failure_type: null,
    root_cause_summary: null,
    likely_module_file: null,
  };
}

export { FAILURE_TYPES };
