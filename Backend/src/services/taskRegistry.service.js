import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Construct absolute path to the taskRegistry.json file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REGISTRY_PATH = path.join(__dirname, "../config/taskRegistry.json");

/**
 * TaskRegistryService
 *
 * This service handles reading, filtering, and retrieving task definitions
 * from the taskRegistry.json seed file. It acts as the single source of truth
 * for Analytics-time tasks (Phase 2), providing SQL queries, AI prompts,
 * and visualization metadata for the frontend.
 */
class TaskRegistryService {
  constructor() {
    this.tasks = [];
    this.isLoaded = false;
    this.loadedMtimeMs = 0;
  }

  /**
   * Internal helper to load tasks from JSON if not already loaded.
   */
  _ensureLoaded() {
    try {
      const registryStat = fs.statSync(REGISTRY_PATH);
      if (this.isLoaded && this.loadedMtimeMs === registryStat.mtimeMs) return;

      const rawData = fs.readFileSync(REGISTRY_PATH, "utf-8");
      this.tasks = JSON.parse(rawData);
      // Pre-process all SQL templates to strip -- comments at load time
      // so that buildPositionalQuery never encounters :params inside comments
      this.tasks.forEach(task => this._preprocessSql(task));
      this.loadedMtimeMs = registryStat.mtimeMs;
      this.isLoaded = true;
    } catch (error) {
      console.error("Failed to load taskRegistry.json:", error);
      throw new Error("Task registry could not be loaded. Ensure the JSON file exists.");
    }
  }

  /**
   * Strips SQL line comments (-- ...) from sqlQuery and sqlQueries fields.
   *
   * Handles both multi-line SQL (with \n) and single-line SQL (no \n).
   * For single-line SQL like "-- comment textSELECT ...", it finds --
   * comment regions and removes them up to the next statement keyword.
   *
   * Also validates that no single sqlQuery contains multiple statements.
   * Multi-statement tasks MUST use sqlQueries[] — see Bug #2 post-mortem.
   *
   * This runs ONCE at load time so buildPositionalQuery only sees clean SQL.
   */
  _preprocessSql(task) {
    if (task.sqlQuery) {
      task.sqlQuery = this._stripSqlComments(task.sqlQuery);

      // ── Guard: detect multi-statement sqlQuery ──────────────────────────
      // A semicolon followed by a statement keyword means the task was
      // authored incorrectly. PostgreSQL will reject this with:
      //   "cannot insert multiple commands into a prepared statement"
      // Fix: split into sqlQueries[] in taskRegistry.json.
      if (/;\s*(SELECT|WITH|INSERT|UPDATE|DELETE)\b/i.test(task.sqlQuery)) {
        console.error(
          `[TaskRegistry] ⚠️  MULTI-STATEMENT sqlQuery detected in task "${task.taskId}". ` +
          `Split into sqlQueries[] in taskRegistry.json to fix this. ` +
          `This task will fail at runtime.`
        );
      }
    }
    if (Array.isArray(task.sqlQueries)) {
      task.sqlQueries = task.sqlQueries.map(q => this._stripSqlComments(q));
    }
  }

  /**
   * Strips -- line comments from a SQL string.
   * Works for both multi-line (\n separated) and single-line SQL.
   */
  _stripSqlComments(sql) {
    if (!sql) return sql;

    // If the SQL has real newlines, process line by line (reliable)
    if (sql.includes('\n')) {
      return sql.split('\n')
        .map(line => {
          const commentIdx = line.indexOf('--');
          return commentIdx >= 0 ? line.substring(0, commentIdx) : line;
        })
        .join('\n')
        .trim();
    }

    // ── Single-line SQL (JSON-encoded without real \n) ──────────────────────
    //
    // BUG in old regex /--.*?(?=KEYWORD)/gi:
    //   Non-greedy .*? stopped at the FIRST keyword inside comment text.
    //   e.g. "column removed from enrollment" contains FROM → regex stopped
    //   early, leaving "from enrollment)SELECT..." → PostgreSQL syntax error.
    //
    // FIX: Iteratively strip leading -- blocks. For each block, scan forward
    //   to find the next STATEMENT-STARTING keyword (SELECT/WITH/INSERT/
    //   UPDATE/DELETE). Clause keywords (FROM/JOIN/WHERE etc.) are excluded —
    //   they commonly appear in comment descriptions.
    //
    // Edge case handled: "-- Same as S-T02SELECT..." → \b fails because digits
    //   count as word chars. We use a char-level check instead: the char
    //   immediately before the keyword must NOT be [a-zA-Z] (letters only).
    //   Digits/symbols/spaces/start-of-string are all valid boundaries.
    //   This matches "02SELECT" (digit→letter = ok) and ")SELECT" (paren = ok)
    //   but rejects "xSELECT" (letter→letter = likely inside a word).
    //
    // Handles chained comments:
    //   "-- note1-- note2SELECT ..."  → "SELECT ..."
    //   "-- AI synthesis from S-B01-- note...WITH cte" → "WITH cte"
    //   "-- Same as S-T02SELECT ..."  → "SELECT ..."
    // ───────────────────────────────────────────────────────────────────────
    const STMT_KEYWORD_RE = /(SELECT|WITH|INSERT|UPDATE|DELETE)/gi;
    let result = sql;

    for (let iter = 0; iter < 30; iter++) {
      const trimmed = result.trimStart();
      if (!trimmed.startsWith('--')) break;   // no more leading comments

      // Find ALL statement-keyword occurrences starting after '--'
      STMT_KEYWORD_RE.lastIndex = 2;
      let match;
      let foundIdx = -1;

      while ((match = STMT_KEYWORD_RE.exec(trimmed)) !== null) {
        const pos = match.index;
        // The char immediately before the keyword must NOT be a letter
        // (prevents matching mid-word occurrences like "xSELECT")
        const charBefore = pos > 0 ? trimmed[pos - 1] : '';
        if (!/[a-zA-Z]/.test(charBefore)) {
          foundIdx = pos;
          break;  // take the first valid occurrence
        }
      }

      if (foundIdx === -1) {
        result = '';  // entire string is comment
        break;
      }

      result = trimmed.slice(foundIdx);
      // Loop again — result may still start with another -- block
    }

    return result.trim();
  }

  /**
   * Returns all available tasks in the registry.
   * @returns {Array<Object>} List of all tasks
   */
  getAllTasks() {
    this._ensureLoaded();
    return this.tasks;
  }

  /**
   * Retrieves a specific task by its exact Task ID.
   * @param {string} taskId - e.g., "S-B01"
   * @returns {Object|null} The task object or null if not found
   */
  getTaskById(taskId) {
    this._ensureLoaded();
    const task = this.tasks.find((t) => t.taskId === taskId);
    return task || null;
  }

  /**
   * Filters tasks by scope (e.g., "1 student", "Cohort").
   * Returns tasks that contain the given scope string (case-insensitive).
   * @param {string} scopeKeyword - e.g., "student" or "cohort"
   * @returns {Array<Object>} List of matching tasks
   */
  getTasksByScope(scopeKeyword) {
    this._ensureLoaded();
    if (!scopeKeyword) return this.getAllTasks();

    const lowerKeyword = scopeKeyword.toLowerCase();
    return this.tasks.filter((t) => 
      t.scope && t.scope.toLowerCase().includes(lowerKeyword)
    );
  }

  /**
   * Filters tasks by dataset compatibility.
   * "both" tasks are always included.
   * @param {string} dataset - e.g., "OULAD" or "UCI"
   * @returns {Array<Object>} List of compatible tasks
   */
  getTasksByCompatibility(dataset) {
    this._ensureLoaded();
    if (!dataset) return this.getAllTasks();

    const normalizedDataset = dataset.toLowerCase();
    
    return this.tasks.filter((t) => {
      if (!t.datasetCompatibility) return true; // Assume compatible if not specified
      
      const comp = t.datasetCompatibility.toLowerCase();
      // "both" is compatible with any dataset
      if (comp === "both") return true;
      // Exact match (e.g., "oulad_only" includes "oulad")
      if (comp.includes(normalizedDataset)) return true;
      
      return false;
    });
  }

  /**
   * Searches tasks by keyword in the task name or actionable question.
   * @param {string} keyword - The search term
   * @returns {Array<Object>} List of matching tasks
   */
  searchTasks(keyword) {
    this._ensureLoaded();
    if (!keyword) return this.getAllTasks();

    const lowerKeyword = keyword.toLowerCase();
    return this.tasks.filter((t) => {
      const matchName = t.taskName && t.taskName.toLowerCase().includes(lowerKeyword);
      const matchQuestion = t.actionableQuestion && t.actionableQuestion.toLowerCase().includes(lowerKeyword);
      return matchName || matchQuestion;
    });
  }
}

// Export a singleton instance
const taskRegistryService = new TaskRegistryService();
export default taskRegistryService;
