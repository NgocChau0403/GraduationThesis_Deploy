/**
 * run-migration.mjs
 * One-time script to apply the AiExplanationLog migration directly via pg.
 * Use this when `prisma migrate dev` cannot resolve DATABASE_URL from config.
 *
 * Run: node scripts/run-migration.mjs
 */
import { readFileSync } from "fs";
import { createRequire } from "module";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { config } from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env from Backend root
config({ path: join(__dirname, "../.env") });

const require = createRequire(import.meta.url);
const { Client } = require("pg");

const SQL_PATH = join(
  __dirname,
  "../prisma/migrations/20260517000000_add_ai_explanation_log/migration.sql"
);

const sql = readFileSync(SQL_PATH, "utf8");
const client = new Client({ connectionString: process.env.DATABASE_URL });

try {
  await client.connect();
  console.log("✅ Connected to PostgreSQL");

  await client.query(sql);
  console.log("✅ Migration applied: ai_explanation_log table created");

  // Mark migration as applied in Prisma's _prisma_migrations table
  await client.query(`
    INSERT INTO "_prisma_migrations" (
      id, checksum, finished_at, migration_name, logs, rolled_back_at,
      started_at, applied_steps_count
    ) VALUES (
      gen_random_uuid(),
      'manual',
      NOW(),
      '20260517000000_add_ai_explanation_log',
      NULL,
      NULL,
      NOW(),
      1
    ) ON CONFLICT DO NOTHING;
  `);
  console.log("✅ Migration recorded in _prisma_migrations");
} catch (err) {
  if (err.message?.includes("already exists")) {
    console.log("⚠️  Table already exists — migration may have already run.");
    console.log("   If so, just run: npx prisma generate");
  } else {
    console.error("❌ Migration failed:", err.message);
    process.exit(1);
  }
} finally {
  await client.end();
}
