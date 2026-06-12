import fs from "fs";
import path from "path";
import crypto from "crypto";
import csv from "csv-parser";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..", "..");
const BACKEND_ROOT = path.resolve(__dirname, "..");
const BATCH_ID = "SAMPLE_OULAD";
const SOURCE_DATASET = "OULAD";
const PARTITION_COUNT = 64;
const HEADER =
  "engagement_id,batch_id,event_id,student_id,enrollment_id,source_dataset,event_day,week_number,engagement_count,log_click_score";

const OULAD_DIR = path.join(BACKEND_ROOT, "uploads", "OULAD");
const GENERATED_DIR = path.join(REPO_ROOT, "Docs", "evaluation", "input_csv", "OULAD", "generated");
const PARTITION_DIR = path.join(GENERATED_DIR, "partitions");
const FINAL_CSV = path.join(GENERATED_DIR, "oulad_canonical_engagement.csv");
const FINAL_MANIFEST = path.join(GENERATED_DIR, "oulad_canonical_engagement_manifest.json");
const TMP_CSV = `${FINAL_CSV}.tmp`;
const TMP_MANIFEST = `${FINAL_MANIFEST}.tmp`;

function norm(value) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function toInt(value) {
  if (value === null || value === undefined || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? Math.trunc(n) : null;
}

function buildClassKey(moduleCode, presentation) {
  return `${moduleCode}::${presentation}`;
}

function toStudentId(batchId, rawStudentId) {
  return `${batchId}_STU_${norm(rawStudentId)}`;
}

function toCourseId(batchId, moduleCode) {
  return `${batchId}_COURSE_${moduleCode}`;
}

function toClassId(batchId, moduleCode, presentation) {
  return `${batchId}_CLASS_${moduleCode}_${presentation}`;
}

function toEnrollmentId(batchId, classId, studentId) {
  return `${batchId}_ENR_${classId}_${studentId}`;
}

function toEventId(batchId, rawSiteId) {
  return `${batchId}_EVT_${norm(rawSiteId)}`;
}

function toEngagementId(batchId, studentId, eventId, eventDay) {
  return `${batchId}_ENG_${studentId}_${eventId}_${eventDay}`;
}

function csvEscape(value) {
  if (value === null || value === undefined) return "";
  const text = String(value);
  if (/[",\r\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function toCsvLine(values) {
  return values.map(csvEscape).join(",");
}

async function writeLine(stream, line) {
  if (stream.write(line)) return;
  await new Promise((resolve, reject) => {
    stream.once("drain", resolve);
    stream.once("error", reject);
  });
}

function hashKey(key) {
  const digest = crypto.createHash("sha1").update(key).digest();
  return digest.readUInt32BE(0) % PARTITION_COUNT;
}

async function streamCsv(filePath, onRow) {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(filePath).pipe(csv());
    stream.on("data", (row) => {
      const maybePromise = onRow(row);
      if (maybePromise && typeof maybePromise.then === "function") {
        stream.pause();
        maybePromise.then(() => stream.resume()).catch(reject);
      }
    });
    stream.on("end", resolve);
    stream.on("error", reject);
  });
}

async function countLinesAndHash(filePath) {
  return new Promise((resolve, reject) => {
    let lines = 0;
    let lastByte = null;
    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(filePath);
    stream.on("data", (chunk) => {
      hash.update(chunk);
      for (let i = 0; i < chunk.length; i += 1) {
        if (chunk[i] === 10) lines += 1;
      }
      if (chunk.length > 0) lastByte = chunk[chunk.length - 1];
    });
    stream.on("end", () => {
      if (lastByte !== null && lastByte !== 10) lines += 1;
      resolve({ lines, hash: hash.digest("hex") });
    });
    stream.on("error", reject);
  });
}

function removeIfExists(filePath) {
  if (fs.existsSync(filePath)) fs.rmSync(filePath, { force: true });
}

function prepareOutput({ force }) {
  fs.mkdirSync(GENERATED_DIR, { recursive: true });
  if (!force && (fs.existsSync(FINAL_CSV) || fs.existsSync(FINAL_MANIFEST))) {
    throw new Error(
      "Generated OULAD engagement outputs already exist. Re-run with --force to rebuild."
    );
  }
  removeIfExists(TMP_CSV);
  removeIfExists(TMP_MANIFEST);
  if (force) {
    removeIfExists(FINAL_CSV);
    removeIfExists(FINAL_MANIFEST);
    fs.rmSync(PARTITION_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(PARTITION_DIR, { recursive: true });
}

async function buildLookups() {
  const classesByKey = new Map();
  const enrollmentsByKey = new Map();
  const validEnrollmentIds = new Set();
  const eventIdBySite = new Map();

  await streamCsv(path.join(OULAD_DIR, "courses.csv"), (row) => {
    const moduleCode = norm(row.code_module);
    const presentation = norm(row.code_presentation);
    if (!moduleCode || !presentation) return;
    const classKey = buildClassKey(moduleCode, presentation);
    classesByKey.set(classKey, {
      class_id: toClassId(BATCH_ID, moduleCode, presentation),
      course_id: toCourseId(BATCH_ID, moduleCode),
    });
  });

  await streamCsv(path.join(OULAD_DIR, "studentInfo.csv"), (row) => {
    const moduleCode = norm(row.code_module);
    const presentation = norm(row.code_presentation);
    const rawStudent = norm(row.id_student);
    if (!moduleCode || !presentation || !rawStudent) return;
    const classEntry = classesByKey.get(buildClassKey(moduleCode, presentation));
    if (!classEntry) return;
    const studentId = toStudentId(BATCH_ID, rawStudent);
    const enrollmentKey = `${classEntry.class_id}::${studentId}`;
    const enrollmentId = toEnrollmentId(BATCH_ID, classEntry.class_id, studentId);
    enrollmentsByKey.set(enrollmentKey, { enrollment_id: enrollmentId });
    validEnrollmentIds.add(enrollmentId);
  });

  await streamCsv(path.join(OULAD_DIR, "vle.csv"), (row) => {
    const moduleCode = norm(row.code_module);
    const presentation = norm(row.code_presentation);
    const siteId = norm(row.id_site);
    if (!moduleCode || !presentation || !siteId) return;
    const classEntry = classesByKey.get(buildClassKey(moduleCode, presentation));
    if (!classEntry) return;
    eventIdBySite.set(siteId, toEventId(BATCH_ID, siteId));
  });

  return { classesByKey, enrollmentsByKey, validEnrollmentIds, eventIdBySite };
}

async function writePartitionedMiniRows(lookups) {
  const partitionStreams = [];
  for (let i = 0; i < PARTITION_COUNT; i += 1) {
    const partPath = path.join(PARTITION_DIR, `part_${String(i).padStart(2, "0")}.csv`);
    const stream = fs.createWriteStream(partPath, { encoding: "utf8" });
    stream.setMaxListeners(0);
    stream.write(
      "engagement_id,batch_id,event_id,student_id,enrollment_id,source_dataset,event_day,week_number,engagement_count\n"
    );
    partitionStreams.push(stream);
  }

  let rawDataRows = 0;
  let mappedRows = 0;
  let skippedRows = 0;

  await streamCsv(path.join(OULAD_DIR, "studentVle.csv"), async (row) => {
    rawDataRows += 1;
    const moduleCode = norm(row.code_module);
    const presentation = norm(row.code_presentation);
    const rawStudent = norm(row.id_student);
    const siteId = norm(row.id_site);
    if (!moduleCode || !presentation || !rawStudent || !siteId) {
      skippedRows += 1;
      return;
    }

    const classEntry = lookups.classesByKey.get(buildClassKey(moduleCode, presentation));
    if (!classEntry) {
      skippedRows += 1;
      return;
    }

    const studentId = toStudentId(BATCH_ID, rawStudent);
    const enrollment = lookups.enrollmentsByKey.get(`${classEntry.class_id}::${studentId}`);
    const eventId = lookups.eventIdBySite.get(siteId);
    const eventDay = toInt(row.date);
    if (!enrollment || !eventId || eventDay === null) {
      skippedRows += 1;
      return;
    }

    const clicks = toInt(row.sum_click) ?? 0;
    const weekNumber = Math.floor(eventDay / 7) + 1;
    const key = `${BATCH_ID}::${studentId}::${eventId}::${eventDay}`;
    const partitionIndex = hashKey(key);
    await writeLine(
      partitionStreams[partitionIndex],
      `${toCsvLine([
        toEngagementId(BATCH_ID, studentId, eventId, eventDay),
        BATCH_ID,
        eventId,
        studentId,
        enrollment.enrollment_id,
        SOURCE_DATASET,
        eventDay,
        weekNumber,
        clicks,
      ])}\n`
    );
    mappedRows += 1;
  });

  await Promise.all(
    partitionStreams.map(
      (stream) =>
        new Promise((resolve, reject) => {
          stream.end(resolve);
          stream.on("error", reject);
        })
    )
  );

  return { rawDataRows, mappedRows, skippedRows };
}

async function aggregatePartitionsToFinalCsv() {
  const finalStream = fs.createWriteStream(TMP_CSV, { encoding: "utf8" });
  finalStream.setMaxListeners(0);
  finalStream.write(`${HEADER}\n`);

  let canonicalRows = 0;
  let rawCollapsedCanonicalKeyGroups = 0;
  const unstableKeySets = {
    enrollment: new Set(),
    source: new Set(),
    week: new Set(),
  };

  for (let i = 0; i < PARTITION_COUNT; i += 1) {
    const partPath = path.join(PARTITION_DIR, `part_${String(i).padStart(2, "0")}.csv`);
    const aggregateByKey = new Map();

    // eslint-disable-next-line no-await-in-loop
    await streamCsv(partPath, (row) => {
      const key = `${row.batch_id}::${row.student_id}::${row.event_id}::${row.event_day}`;
      const existing = aggregateByKey.get(key);
      const count = toInt(row.engagement_count) ?? 0;
      if (!existing) {
        aggregateByKey.set(key, {
          engagement_id: row.engagement_id,
          batch_id: row.batch_id,
          event_id: row.event_id,
          student_id: row.student_id,
          enrollment_id: row.enrollment_id,
          source_dataset: row.source_dataset,
          event_day: toInt(row.event_day),
          week_number: toInt(row.week_number),
          engagement_count: count,
          raw_row_count: 1,
        });
        return;
      }
      existing.raw_row_count += 1;
      existing.engagement_count += count;
      if (existing.enrollment_id !== row.enrollment_id) unstableKeySets.enrollment.add(key);
      if (existing.source_dataset !== row.source_dataset) unstableKeySets.source.add(key);
      if (existing.week_number !== toInt(row.week_number)) unstableKeySets.week.add(key);
    });

    for (const row of aggregateByKey.values()) {
      if (row.raw_row_count > 1) rawCollapsedCanonicalKeyGroups += 1;
      // eslint-disable-next-line no-await-in-loop
      await writeLine(
        finalStream,
        `${toCsvLine([
          row.engagement_id,
          row.batch_id,
          row.event_id,
          row.student_id,
          row.enrollment_id,
          row.source_dataset,
          row.event_day,
          row.week_number,
          row.engagement_count,
          Math.log(row.engagement_count + 1),
        ])}\n`
      );
      canonicalRows += 1;
    }
  }

  await new Promise((resolve, reject) => {
    finalStream.end(resolve);
    finalStream.on("error", reject);
  });

  return {
    canonicalRows,
    rawCollapsedCanonicalKeyGroups,
    unstable_enrollment_id_groups: unstableKeySets.enrollment.size,
    unstable_source_dataset_groups: unstableKeySets.source.size,
    unstable_week_number_groups: unstableKeySets.week.size,
  };
}

async function hashFile(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    const stream = fs.createReadStream(filePath);
    stream.on("data", (chunk) => hash.update(chunk));
    stream.on("end", () => resolve(hash.digest("hex")));
    stream.on("error", reject);
  });
}

function validateManifestFields(manifest) {
  if (manifest.dataset !== BATCH_ID) throw new Error("Manifest dataset mismatch.");
  if (!manifest.canonical_engagement_rows || manifest.canonical_engagement_rows <= 0) {
    throw new Error("Manifest canonical engagement row count must be > 0.");
  }
  if (manifest.duplicate_canonical_key_groups !== 0) {
    throw new Error("Generated engagement file has duplicate canonical key groups.");
  }
  for (const field of [
    "unstable_enrollment_id_groups",
    "unstable_source_dataset_groups",
    "unstable_week_number_groups",
  ]) {
    if (manifest[field] !== 0) throw new Error(`Manifest ${field} must be 0.`);
  }
}

async function main() {
  const force = process.argv.includes("--force");
  const startedAt = Date.now();
  prepareOutput({ force });

  const studentVlePath = path.join(OULAD_DIR, "studentVle.csv");
  const inputInfo = await countLinesAndHash(studentVlePath);
  const lookups = await buildLookups();
  const partitionStats = await writePartitionedMiniRows(lookups);
  const aggregateStats = await aggregatePartitionsToFinalCsv();
  const outputHash = await hashFile(TMP_CSV);
  const outputStats = fs.statSync(TMP_CSV);

  const manifest = {
    dataset: BATCH_ID,
    generated_at: new Date().toISOString(),
    raw_student_vle_lines: inputInfo.lines,
    raw_student_vle_data_rows: partitionStats.rawDataRows,
    mapped_student_vle_rows: partitionStats.mappedRows,
    skipped_student_vle_rows: partitionStats.skippedRows,
    canonical_engagement_rows: aggregateStats.canonicalRows,
    aggregation_key: ["batch_id", "student_id", "event_id", "event_day"],
    formula: {
      engagement_count: "SUM(sum_click)",
      log_click_score: "LN(engagement_count + 1)",
    },
    unstable_enrollment_id_groups: aggregateStats.unstable_enrollment_id_groups,
    unstable_source_dataset_groups: aggregateStats.unstable_source_dataset_groups,
    unstable_week_number_groups: aggregateStats.unstable_week_number_groups,
    duplicate_canonical_key_groups: 0,
    raw_collapsed_canonical_key_groups: aggregateStats.rawCollapsedCanonicalKeyGroups,
    partition_count: PARTITION_COUNT,
    output_file_size_bytes: outputStats.size,
    output_file_size_mb: Number((outputStats.size / 1024 / 1024).toFixed(2)),
    input_hash: inputInfo.hash,
    output_hash: outputHash,
    output_header: HEADER,
    elapsed_ms: Date.now() - startedAt,
  };

  validateManifestFields(manifest);
  fs.writeFileSync(TMP_MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  fs.renameSync(TMP_CSV, FINAL_CSV);
  fs.renameSync(TMP_MANIFEST, FINAL_MANIFEST);
  fs.rmSync(PARTITION_DIR, { recursive: true, force: true });

  console.log(JSON.stringify(manifest, null, 2));
}

main().catch((error) => {
  console.error("OULAD canonical engagement materialization failed.");
  console.error(error?.stack || error?.message || error);
  process.exitCode = 1;
});
