import dotenv from "dotenv";
dotenv.config({ path: "C:/[Graduation_Thesis]Prototype/Backend/.env" });
const prismaMod = await import("./src/lib/prisma.js");
const taskRegistryMod = await import("./src/services/taskRegistry.service.js");
const sqlExecMod = await import("./src/services/sqlExecution.service.js");

const prisma = prismaMod.default;
const taskRegistryService = taskRegistryMod.default;
const { dryRunSqlTask } = sqlExecMod;

const params = {
  batch_id: "Import_2026-05-24",
  class_id: "1db1eb07ed19d00ebc2d6ba6",
  student_id: "UCI_POR_STUDENT_0001"
};

const task = taskRegistryService.getTaskById("A-B04");
const dry = dryRunSqlTask({ task, params });

console.log("=== SQL_AFTER_INJECTION ===");
console.log(dry.sql);
console.log("=== SQL_VALUES ===");
console.log(JSON.stringify(dry.values));

const explainSql = `EXPLAIN (ANALYZE, BUFFERS, VERBOSE, FORMAT TEXT) ${dry.sql}`;
const t0 = Date.now();
const rows = await prisma.$queryRawUnsafe(explainSql, ...dry.values);
const elapsed = Date.now() - t0;

console.log("=== EXPLAIN_ANALYZE ===");
for (const r of rows) {
  const line = r["QUERY PLAN"] ?? Object.values(r)[0];
  console.log(line);
}
console.log(`=== ELAPSED_MS ${elapsed} ===`);

await prisma.$disconnect();
