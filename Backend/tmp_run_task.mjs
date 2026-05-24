import taskRegistryService from "./src/services/taskRegistry.service.js";
import { executeSqlTask } from "./src/services/sqlExecution.service.js";

const task = taskRegistryService.getTaskById("A-B04");
const params = {
  batch_id: "Import_2026-05-24",
  class_id: "1db1eb07ed19d00ebc2d6ba6",
  student_id: "UCI_POR_STUDENT_0001"
};
const t0 = Date.now();
try {
  const out = await executeSqlTask({ task, params });
  console.log(JSON.stringify({ ok:true, ms: Date.now()-t0, execMs: out.meta.executionTimeMs, rowCount: out.data?.length ?? null }, null, 2));
} catch (e) {
  console.log(JSON.stringify({ ok:false, ms: Date.now()-t0, name:e?.name, code:e?.code, message: e?.message, meta:e?.meta, stack:e?.stack }, null, 2));
}
process.exit(0);
