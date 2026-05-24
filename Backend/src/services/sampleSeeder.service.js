import prisma from "../lib/prisma.js";
import { SAMPLE_BATCHES } from "../config/sampleBatches.js";
import {
  computeCanonicalRowCount,
  getSampleCanonicalData,
} from "./sampleDataLoader.service.js";

const SAMPLE_BATCH_ID_SET = new Set(
  Object.values(SAMPLE_BATCHES).map((meta) => meta.batch_id)
);

function inferSourceDataset(batchId) {
  return batchId.includes("OULAD") ? "OULAD" : "UCI";
}

async function clearSampleBatchData(tx, batchId) {
  await tx.engagement.deleteMany({ where: { batch_id: batchId } });
  await tx.assessmentResult.deleteMany({ where: { batch_id: batchId } });
  await tx.event.deleteMany({ where: { batch_id: batchId } });
  await tx.assessment.deleteMany({ where: { batch_id: batchId } });
  await tx.enrollment.deleteMany({ where: { batch_id: batchId } });
  await tx.class.deleteMany({ where: { batch_id: batchId } });
  await tx.course.deleteMany({ where: { batch_id: batchId } });
  await tx.student.deleteMany({ where: { batch_id: batchId } });
}

async function upsertImportBatchSeedRow(tx, meta) {
  const sourceDataset = inferSourceDataset(meta.batch_id);
  await tx.importBatch.upsert({
    where: { batch_id: meta.batch_id },
    update: {
      batch_name: meta.batch_name,
      source_dataset: sourceDataset,
      learning_mode: meta.learning_mode,
      imported_at: new Date(),
      is_sample: true,
      status: "processing",
      row_count: 0,
    },
    create: {
      batch_id: meta.batch_id,
      batch_name: meta.batch_name,
      source_dataset: sourceDataset,
      learning_mode: meta.learning_mode,
      imported_at: new Date(),
      is_active: false,
      is_sample: true,
      row_count: 0,
      status: "processing",
    },
  });
}

async function insertCanonicalRows(tx, dataset) {
  if (dataset.students.length > 0) {
    await tx.student.createMany({ data: dataset.students, skipDuplicates: true });
  }
  if (dataset.courses.length > 0) {
    await tx.course.createMany({ data: dataset.courses, skipDuplicates: true });
  }
  if (dataset.classes.length > 0) {
    await tx.class.createMany({ data: dataset.classes, skipDuplicates: true });
  }
  if (dataset.enrollments.length > 0) {
    await tx.enrollment.createMany({ data: dataset.enrollments, skipDuplicates: true });
  }
  if (dataset.assessments.length > 0) {
    await tx.assessment.createMany({ data: dataset.assessments, skipDuplicates: true });
  }
  if (dataset.assessment_results.length > 0) {
    await tx.assessmentResult.createMany({
      data: dataset.assessment_results,
      skipDuplicates: true,
    });
  }
  if (dataset.events.length > 0) {
    await tx.event.createMany({ data: dataset.events, skipDuplicates: true });
  }
  if (dataset.engagements.length > 0) {
    await tx.engagement.createMany({ data: dataset.engagements, skipDuplicates: true });
  }
}

async function seedOneSampleBatch(meta) {
  const dataset = getSampleCanonicalData(meta.batch_id);
  const canonicalRowCount = computeCanonicalRowCount(dataset);

  await prisma.$transaction(async (tx) => {
    await upsertImportBatchSeedRow(tx, meta);
    await clearSampleBatchData(tx, meta.batch_id);
    await insertCanonicalRows(tx, dataset);

    await tx.importBatch.update({
      where: { batch_id: meta.batch_id },
      data: {
        status: "completed",
        row_count: canonicalRowCount,
        is_sample: true,
        imported_at: new Date(),
      },
    });
  });

  return canonicalRowCount;
}

async function shouldSeedSampleBatch(meta, forceReseed) {
  if (forceReseed) return true;

  const exists = await prisma.importBatch.findUnique({
    where: { batch_id: meta.batch_id },
    select: {
      batch_id: true,
      status: true,
      row_count: true,
      is_sample: true,
    },
  });

  if (!exists) return true;
  if (!exists.is_sample) return true;
  if (exists.status !== "completed") return true;
  if ((exists.row_count ?? 0) <= 0) return true;

  const studentCount = await prisma.student.count({
    where: { batch_id: meta.batch_id },
  });
  const enrollmentCount = await prisma.enrollment.count({
    where: { batch_id: meta.batch_id },
  });
  const assessmentResultCount = await prisma.assessmentResult.count({
    where: { batch_id: meta.batch_id },
  });

  return studentCount === 0 || enrollmentCount === 0 || assessmentResultCount === 0;
}

export async function seedSampleDatasets(options = {}) {
  const {
    forceReseed = false,
    batchIds = null,
  } = options;

  const selectedBatchIds = Array.isArray(batchIds) && batchIds.length > 0
    ? new Set(batchIds)
    : SAMPLE_BATCH_ID_SET;

  for (const meta of Object.values(SAMPLE_BATCHES)) {
    if (!selectedBatchIds.has(meta.batch_id)) continue;

    const shouldSeed = await shouldSeedSampleBatch(meta, forceReseed);
    if (!shouldSeed) {
      console.log(`[Seeder] ${meta.batch_name} skipped (already completed with data).`);
      continue;
    }

    const canonicalRowCount = await seedOneSampleBatch(meta);
    console.log(
      `[Seeder] ${meta.batch_name} loaded (${canonicalRowCount} canonical rows).`
    );
  }

  const appState = await prisma.appState.upsert({
    where: { id: 1 },
    update: {},
    create: { id: 1 },
  });

  if (!appState?.active_dataset_id) {
    await prisma.appState.update({
      where: { id: 1 },
      data: {
        active_dataset_id: SAMPLE_BATCHES.OULAD.batch_id,
        active_dataset_name: SAMPLE_BATCHES.OULAD.batch_name,
        active_dataset_type: "sample",
        active_dataset_source: "OULAD",
        active_dataset_set_at: new Date(),
        is_first_use: false,
      },
    });
    console.log(
      `[Seeder] Default active dataset set to ${SAMPLE_BATCHES.OULAD.batch_id}.`
    );
  }
}
