import prisma from "./Backend/src/lib/prisma.js";

const queries = {
  enrollment: 'SELECT COUNT(*)::bigint AS c FROM enrollment',
  assessment: 'SELECT COUNT(*)::bigint AS c FROM assessment',
  assessment_result: 'SELECT COUNT(*)::bigint AS c FROM assessment_result',
  dup_assessment_id: `SELECT COUNT(*)::bigint AS c FROM (SELECT assessment_id FROM assessment GROUP BY assessment_id HAVING COUNT(*)>1) t`,
  dup_class_id: `SELECT COUNT(*)::bigint AS c FROM (SELECT class_id FROM class GROUP BY class_id HAVING COUNT(*)>1) t`,
  by_batch_assessment_result: `SELECT batch_id, COUNT(*)::bigint AS c FROM assessment_result GROUP BY batch_id ORDER BY c DESC LIMIT 10`,
  by_batch_assessment: `SELECT batch_id, COUNT(*)::bigint AS c FROM assessment GROUP BY batch_id ORDER BY c DESC LIMIT 10`
};

for (const [name, q] of Object.entries(queries)) {
  const rows = await prisma.$queryRawUnsafe(q);
  console.log('\n#', name);
  console.log(JSON.stringify(rows, null, 2));
}
await prisma.$disconnect();
