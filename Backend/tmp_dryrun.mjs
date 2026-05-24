import taskRegistryService from "./src/services/taskRegistry.service.js";
import { dryRunSqlTask } from "./src/services/sqlExecution.service.js";

const task = taskRegistryService.getTaskById("A-B04");
const out = dryRunSqlTask({
  task,
  params: {
    batch_id: "Import_2026-05-24",
    class_id: "1db1eb07ed19d00ebc2d6ba6",
    student_id: "UCI_POR_STUDENT_0001"
  }
});
console.log(out.sql);
console.log('VALUES', JSON.stringify(out.values));
