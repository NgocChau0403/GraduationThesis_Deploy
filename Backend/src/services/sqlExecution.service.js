import prisma from "../lib/prisma.js";
import { createHash } from "crypto";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const ALLOWED_PARAMS = new Set([
  "batch_id",
  "student_id",
  "class_id",
  "enrollment_id",
  "s1",
  "s2",
]);

/**
 * Hard cap on query execution time at the PostgreSQL level.
 * Applied via `SET LOCAL statement_timeout` inside a transaction.
 * Protects the DB connection pool from runaway analytics queries.
 * Especially important if AI-generated SQL is introduced in Phase 3.
 */
const QUERY_TIMEOUT_MS = 30_000;

/**
 * Safety LIMIT injected when a query has no LIMIT clause.
 * Prevents accidental full-table scans returning millions of rows.
 * Tasks that legitimately need all rows already include explicit LIMITs.
 */
const MAX_ROWS_GUARDRAIL = 10_000;

// ─────────────────────────────────────────────────────────────────────────────
// SERIALIZATION
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Converts Prisma result rows to JSON-serializable plain objects.
 *
 * Handles:
 *   BigInt  → Number (default) or String (bigintMode: 'string')
 *   Decimal → Number  (via .toNumber())
 *
 * KNOWN LIMITATION — BigInt precision:
 *   Number(999999999999999999n) loses precision beyond Number.MAX_SAFE_INTEGER
 *   (2^53 - 1 = 9_007_199_254_740_991). For analytical row counts in this
 *   system (max ~hundreds of thousands), Number is safe. If future use cases
 *   require exact large integers (e.g., IDs > 2^53), switch bigintMode to
 *   'string' and handle on the frontend.
 *
 * @param {Object[]} rows
 * @param {'number'|'string'} bigintMode
 */
function serializeRows(rows, bigintMode = "number") {
  return rows.map((row) => {
    const out = {};
    for (const [k, v] of Object.entries(row)) {
      if (typeof v === "bigint") {
        out[k] = bigintMode === "string" ? v.toString() : Number(v);
      } else if (
        v !== null &&
        typeof v === "object" &&
        v.constructor?.name === "Decimal"
      ) {
        out[k] = v.toNumber();
      } else {
        out[k] = v;
      }
    }
    return out;
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// PARAM INJECTION
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Converts :paramName placeholders → PostgreSQL positional params ($1, $2, ...).
 *
 * ── Regex design: /(?<!:):([a-zA-Z_][a-zA-Z0-9_]*)/g ──────────────────────
 *
 * Negative lookbehind `(?<!:)` handles PostgreSQL `::` type cast operator:
 *   absences::float → ignored  (the : after : is excluded)
 *   :student_id     → matched
 *
 * ── ⚠️ TECHNICAL DEBT — KNOWN LIMITATION ───────────────────────────────────
 * This regex is NOT a full SQL tokenizer. It will incorrectly process
 * :param patterns appearing inside:
 *
 *   SQL string literals:   SELECT ':student_id'   ← would misdetect
 *   SQL line comments:     -- :student_id note    ← would misdetect
 *   Dollar-quoted strings: $$ :class_id $$        ← would misdetect
 *
 * This is an INTENTIONALLY ACCEPTED TRADEOFF for Phase 2 MVP:
 *   ✅ All SQL comes from taskRegistry.json — server-controlled, not user input
 *   ✅ Registry has been audited — no :params appear inside literals/comments
 *   ✅ A full parser (e.g., node-sql-parser) adds unjustified complexity for MVP
 *
 * Action required if: SQL templates become user-editable or AI-generated
 *   → Replace this regex with a proper SQL tokenizer
 * ────────────────────────────────────────────────────────────────────────────
 *
 * @param {string} sqlTemplate
 * @param {Object} params
 * @returns {{ sql: string, values: any[] }}
 */
function buildPositionalQuery(sqlTemplate, params) {
  // Validate all provided param keys
  for (const key of Object.keys(params)) {
    if (!ALLOWED_PARAMS.has(key)) {
      throw new Error(`[SqlExecution] Unauthorized param key: "${key}"`);
    }
  }

  const paramIndexMap = new Map();
  const values = [];

  // SQL comments are already stripped at load time by TaskRegistryService.
  // This function only handles clean SQL with :param placeholders.
  const sql = sqlTemplate.replace(
    /(?<!:):([a-zA-Z_][a-zA-Z0-9_]*)/g,
    (match, name) => {
      if (!ALLOWED_PARAMS.has(name)) {
        throw new Error(`[SqlExecution] Unauthorized param in SQL: ":${name}"`);
      }
      if (!(name in params)) {
        throw new Error(`[SqlExecution] Required param missing: ":${name}"`);
      }

      if (!paramIndexMap.has(name)) {
        values.push(params[name]);
        paramIndexMap.set(name, values.length);
      }

      return `$${paramIndexMap.get(name)}`;
    }
  );

  return { sql, values };
}

/**
 * Applies a LIMIT guardrail to queries without an explicit top-level LIMIT.
 * Prevents accidental full-table scans returning millions of rows.
 *
 * ── Bug #6 note ─────────────────────────────────────────────────────────────
 * This function is called per-query by executeOne().
 * Since Bug #2 fix, multi-statement tasks use sqlQueries[] (each entry is a
 * single clean statement). applyLimitGuardrail never receives a semicolon-
 * separated multi-statement string. The guard below is a safety net.
 *
 * ── Trailing semicolon ───────────────────────────────────────────────────────
 * Strip only a single trailing semicolon (after trimming whitespace).
 * A semicolon in the middle of the string means multi-statement — we log a
 * warning and return the SQL unchanged so PostgreSQL will reject it clearly.
 * ────────────────────────────────────────────────────────────────────────────
 */
function applyLimitGuardrail(sql) {
  let cleanSql = sql.trim();

  // ── Guard: detect multi-statement (semicolon NOT at the very end) ─────────
  // After Bug #2, this should never fire. If it does, log clearly and bail.
  const innerSemicolon = cleanSql.replace(/;$/, '');   // strip trailing ; first
  if (/;\s*(SELECT|WITH|INSERT|UPDATE|DELETE)\b/i.test(innerSemicolon)) {
    console.error(
      '[SqlExecution] ⚠️  applyLimitGuardrail received a multi-statement SQL. ' +
      'This task should use sqlQueries[] not sqlQuery. Skipping LIMIT injection.'
    );
    return cleanSql;  // return as-is; PostgreSQL will reject it with a clear error
  }

  // Strip single trailing semicolon
  if (cleanSql.endsWith(';')) {
    cleanSql = cleanSql.slice(0, -1).trimEnd();
  }

  // Detect top-level LIMIT: only inject guardrail when no LIMIT exists at all.
  // Note: LIMIT inside a subquery still counts — we don't want to add an outer
  // LIMIT if the query already caps results via an inner LIMIT.
  const hasLimit = /\bLIMIT\s+\d+/i.test(cleanSql);
  if (!hasLimit) {
    return `${cleanSql}\nLIMIT ${MAX_ROWS_GUARDRAIL}`;
  }
  return cleanSql;
}


/**
 * PostgreSQL does not support ROUND(double precision, integer).
 * Must cast the first argument to numeric: ROUND(expr::numeric, N).
 *
 * This rewrites patterns like:
 *   ROUND(AVG(x), 2)  → ROUND((AVG(x))::numeric, 2)
 *   ROUND(x * 100, 1) → ROUND((x * 100)::numeric, 1)
 *
 * Only triggers when a second argument (precision) is present.
 * ROUND(x) with a single arg works fine on double precision.
 */
function fixRoundCast(sql) {
  // Find each ROUND( and manually parse balanced parentheses to find
  // the top-level comma that separates expr from precision.
  // Regex can't handle nested parens reliably.
  const result = [];
  let i = 0;

  while (i < sql.length) {
    const roundIdx = sql.toUpperCase().indexOf('ROUND(', i);
    if (roundIdx === -1) {
      result.push(sql.substring(i));
      break;
    }

    // Push everything before ROUND(
    result.push(sql.substring(i, roundIdx));

    // Find matching closing paren with depth tracking
    const openParen = roundIdx + 5; // index of '(' after ROUND
    let depth = 1;
    let j = openParen + 1;
    let topLevelCommaIdx = -1;

    while (j < sql.length && depth > 0) {
      const ch = sql[j];
      if (ch === '(') depth++;
      else if (ch === ')') depth--;
      else if (ch === ',' && depth === 1) {
        // This is the top-level comma inside ROUND(expr, precision)
        topLevelCommaIdx = j;
      }
      if (depth > 0) j++;
    }

    if (depth === 0 && topLevelCommaIdx !== -1) {
      // We found ROUND(expr, precision)
      const expr = sql.substring(openParen + 1, topLevelCommaIdx).trim();
      const precision = sql.substring(topLevelCommaIdx + 1, j).trim();
      // Only apply ::numeric cast if precision is a single digit
      if (/^\d+$/.test(precision)) {
        result.push(`ROUND((${expr})::numeric, ${precision})`);
      } else {
        // Not a simple precision — keep original
        result.push(sql.substring(roundIdx, j + 1));
      }
    } else {
      // No comma found or unbalanced — single-arg ROUND(x), keep as-is
      result.push(sql.substring(roundIdx, j + 1));
    }

    i = j + 1;
  }

  return result.join('');
}

// ─────────────────────────────────────────────────────────────────────────────
// OBSERVABILITY
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Generates a short hash for query fingerprinting.
 * Used for replay, benchmarking, and AI evaluation correlation.
 *
 * Hash input = taskId + sorted param keys + values (order-independent).
 * 8 hex chars → 1 in 4 billion collision probability (sufficient for logging).
 */
function buildQueryHash(taskId, params) {
  const sortedParams = Object.entries(params)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join("&");
  return createHash("md5")
    .update(`${taskId}:${sortedParams}`)
    .digest("hex")
    .substring(0, 8);
}

// ─────────────────────────────────────────────────────────────────────────────
// CORE EXECUTION
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Executes a single SQL template with timeout protection.
 *
 * Timeout strategy: `SET LOCAL statement_timeout` inside a Prisma transaction.
 *   - `SET LOCAL` scopes the timeout to this transaction only
 *   - PostgreSQL cancels the query automatically if exceeded
 *   - Value is a server-side constant — safe to interpolate into SQL string
 *
 * @param {string} sqlTemplate
 * @param {Object} params
 * @param {Object} options
 * @returns {{ data: Object[], rowCount: number, executionTimeMs: number }}
 */
async function executeOne(sqlTemplate, params, options = {}) {
  const { bigintMode = "number", limitGuardrail = true } = options;

  const { sql: rawSql, values } = buildPositionalQuery(sqlTemplate, params);
  const guardedSql = limitGuardrail ? applyLimitGuardrail(rawSql) : rawSql;
  const sql = fixRoundCast(guardedSql);

  const startTime = Date.now();

  // Execute inside transaction to scope statement_timeout
  const raw = await prisma.$transaction(async (tx) => {
    // SET LOCAL: affects only this transaction, not the connection globally
    await tx.$executeRawUnsafe(
      `SET LOCAL statement_timeout = ${QUERY_TIMEOUT_MS}`
    );
    return tx.$queryRawUnsafe(sql, ...values);
  });

  const executionTimeMs = Date.now() - startTime;
  const data = serializeRows(raw, bigintMode);

  return { data, rowCount: data.length, executionTimeMs };
}

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Executes all SQL queries for a given task.
 *
 * @param {{ task, params, options }} args
 *   options.bigintMode    'number' | 'string'  (default: 'number')
 *   options.limitGuardrail  boolean            (default: true)
 *
 * @returns {Object} { data, meta }
 */
export async function executeSqlTask({ task, params = {}, options = {} }) {
  const queryHash = buildQueryHash(task.taskId, params);

  // ── Pattern B: Multi-query ──────────────────────────────────────────────
  if (task.sqlQueries && Array.isArray(task.sqlQueries)) {
    const resultSets = [];
    let totalTimeMs = 0;

    for (let i = 0; i < task.sqlQueries.length; i++) {
      const queryTemplate = task.sqlQueries[i];
      if (typeof queryTemplate !== "string") {
        throw new Error(
          `[SqlExecution] task ${task.taskId} sqlQueries[${i}] must be a string`
        );
      }

      const { data, rowCount, executionTimeMs } = await executeOne(
        queryTemplate,
        params,
        options
      );

      resultSets.push({ index: i, data, rowCount });
      totalTimeMs += executionTimeMs;
    }

    return {
      data: resultSets,
      meta: {
        taskId:         task.taskId,
        isMultiQuery:   true,
        queryCount:     task.sqlQueries.length,
        executionTimeMs: totalTimeMs,
        queryHash,
        cacheHit:       false,   // reserved for future caching layer
        retryCount:     0,       // reserved for future retry logic
      },
    };
  }

  // ── Pattern A: Single query ─────────────────────────────────────────────
  if (!task.sqlQuery) {
    throw new Error(
      `[SqlExecution] task ${task.taskId} has no sqlQuery or sqlQueries`
    );
  }

  const { data, rowCount, executionTimeMs } = await executeOne(
    task.sqlQuery,
    params,
    options
  );

  return {
    data,
    meta: {
      taskId:         task.taskId,
      isMultiQuery:   false,
      rowCount,
      executionTimeMs,
      queryHash,
      cacheHit:       false,
      retryCount:     0,
    },
  };
}

/**
 * Dry-run: validates param injection without hitting the database.
 * Returns the transformed SQL and resolved param values.
 */
export function dryRunSqlTask({ task, params = {}, options = {} }) {
  const template = task.sqlQuery ?? task.sqlQueries?.[0] ?? "";
  const { limitGuardrail = true } = options;

  const { sql: rawSql, values } = buildPositionalQuery(template, params);
  const sql = limitGuardrail ? applyLimitGuardrail(rawSql) : rawSql;

  const paramMap = {};
  values.forEach((v, i) => {
    paramMap[`$${i + 1}`] = JSON.stringify(v);
  });

  return {
    sql,
    values,
    paramMap,
    queryHash: buildQueryHash(task.taskId, params),
  };
}
