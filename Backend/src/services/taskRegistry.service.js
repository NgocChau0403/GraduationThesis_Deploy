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
  }

  /**
   * Internal helper to load tasks from JSON if not already loaded.
   */
  _ensureLoaded() {
    if (this.isLoaded) return;

    try {
      const rawData = fs.readFileSync(REGISTRY_PATH, "utf-8");
      this.tasks = JSON.parse(rawData);
      // Pre-process all SQL templates to strip -- comments at load time
      // so that buildPositionalQuery never encounters :params inside comments
      this.tasks.forEach(task => this._preprocessSql(task));
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
   * For single-line SQL like "-- comment text-- more commentsWITH cte AS (...)",
   * it finds -- comment regions and removes them up to the next SQL keyword.
   *
   * This runs ONCE at load time so buildPositionalQuery only sees clean SQL.
   */
  _preprocessSql(task) {
    if (task.sqlQuery) {
      task.sqlQuery = this._stripSqlComments(task.sqlQuery);
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

    // If the SQL has real newlines, process line by line
    if (sql.includes('\n')) {
      return sql.split('\n')
        .map(line => {
          const commentIdx = line.indexOf('--');
          return commentIdx >= 0 ? line.substring(0, commentIdx) : line;
        })
        .join('\n')
        .trim();
    }

    // Single-line SQL: remove -- comment regions up to the next SQL keyword
    // Pattern: -- ... followed by a SQL keyword (WITH/SELECT/FROM/JOIN etc.)
    // The SQL keyword itself is NOT removed.
    return sql.replace(
      /--.*?(?=(?:WITH|SELECT|INSERT|UPDATE|DELETE|FROM|JOIN|WHERE|GROUP|ORDER|HAVING|LIMIT|UNION)\b)/gi,
      ''
    ).trim();
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
