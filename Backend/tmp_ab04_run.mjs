import dotenv from "dotenv";
dotenv.config({ path: "C:/[Graduation_Thesis]Prototype/Backend/.env" });
const taskRegistryService = (await import("./src/services/taskRegistry.service.js")).default;
const { executeSqlTask } = await import("./src/services/sqlExecution.service.js");

const task = taskRegistryService.getTaskById("A-B04");
const params = { batch_id:"Import_2026-05-24", class_id:"1db1eb07ed19d00ebc2d6ba6", student_id:"UCI_POR_STUDENT_0001" };
const t0 = Date.now();
const out = await executeSqlTask({ task, params });
console.log(JSON.stringify({ taskId: out.meta.taskId, executionTimeMs: out.meta.executionTimeMs, elapsedMs: Date.now()-t0, rows: out.meta.rowCount ?? out.data?.length }, null, 2));
