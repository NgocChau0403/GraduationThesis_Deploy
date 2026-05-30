import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DATASET_ID = "SAMPLE_UCI_POR";
const OUTPUT_DIR = path.resolve("Docs/evaluation/automatic_logs");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "import_performance_auto_SAMPLE_UCI_POR.json");
const BACKEND_ENV_FILE = path.resolve("Backend/.env");

async function loadBackendEnv() {
  const text = await readFile(BACKEND_ENV_FILE, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx <= 0) continue;
    const key = trimmed.slice(0, idx).trim();
    let value = trimmed.slice(idx + 1).trim();
    value = value.replace(/^['"]|['"]$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}

function summarizeBatch(batch) {
  return {
    batchId: batch.batchId,
    canonicalRowCount: batch.canonicalRowCount || 0,
    canonicalCounts: batch.canonicalCounts || {},
    rawRowCounts: batch.rawRowCounts || {},
    missingFiles: batch.missingFiles || [],
    warningsCount: (batch.warnings || []).length,
    validationErrorsCount: (batch.validationErrors || []).length,
    validationErrors: batch.validationErrors || [],
  };
}

async function main() {
  const startedAt = Date.now();
  await loadBackendEnv();
  const { previewSampleReseed, reseedSampleDatasets } = await import("../../../Backend/src/services/sampleSeeder.service.js");

  const previewStartedAt = Date.now();
  const preview = await previewSampleReseed({
    batchIds: [DATASET_ID],
    forceReseed: true,
  });
  const previewDurationMs = Date.now() - previewStartedAt;

  if (preview.validationFailed) {
    const output = {
      evaluation_part: "import_performance",
      datasetId: DATASET_ID,
      generated_at: new Date().toISOString(),
      status: "preview_validation_failed",
      preview_duration_ms: previewDurationMs,
      apply_duration_ms: null,
      total_duration_ms: Date.now() - startedAt,
      preview: {
        batchesToClear: preview.batchesToClear,
        activeImpact: preview.activeImpact,
        shouldSeedMatrix: preview.shouldSeedMatrix,
        batches: preview.batches.map(summarizeBatch),
      },
    };
    await mkdir(OUTPUT_DIR, { recursive: true });
    await writeFile(OUTPUT_FILE, `${JSON.stringify(output, null, 2)}\n`, "utf8");
    console.log(`Import performance log written: ${OUTPUT_FILE}`);
    console.log(JSON.stringify(output, null, 2));
    process.exitCode = 1;
    return;
  }

  const applyStartedAt = Date.now();
  const applyResult = await reseedSampleDatasets({
    apply: true,
    batchIds: [DATASET_ID],
    forceReseed: true,
  });
  const applyDurationMs = Date.now() - applyStartedAt;

  const output = {
    evaluation_part: "import_performance",
    datasetId: DATASET_ID,
    generated_at: new Date().toISOString(),
    status: "completed",
    preview_duration_ms: previewDurationMs,
    apply_duration_ms: applyDurationMs,
    total_duration_ms: Date.now() - startedAt,
    preview: {
      batchesToClear: preview.batchesToClear,
      activeImpact: preview.activeImpact,
      shouldSeedMatrix: preview.shouldSeedMatrix,
      batches: preview.batches.map(summarizeBatch),
    },
    apply: {
      perBatchResults: applyResult.perBatchResults || [],
      activeSync: applyResult.activeSync || null,
      activeStateAfter: applyResult.activeStateAfter || null,
    },
  };

  await mkdir(OUTPUT_DIR, { recursive: true });
  await writeFile(OUTPUT_FILE, `${JSON.stringify(output, null, 2)}\n`, "utf8");

  console.log(`Import performance log written: ${OUTPUT_FILE}`);
  console.log(JSON.stringify({
    datasetId: output.datasetId,
    status: output.status,
    preview_duration_ms: output.preview_duration_ms,
    apply_duration_ms: output.apply_duration_ms,
    total_duration_ms: output.total_duration_ms,
    canonicalRowCount: output.preview.batches[0]?.canonicalRowCount ?? null,
    canonicalCounts: output.preview.batches[0]?.canonicalCounts ?? null,
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
