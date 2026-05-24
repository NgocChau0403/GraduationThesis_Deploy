import fs from "fs";
import path from "path";

const FRONTEND_ROOT = path.resolve(process.cwd());
const STUDENT_PAGE = path.join(FRONTEND_ROOT, "src", "pages", "StudentDashboardPage.jsx");
const ADMIN_PAGE = path.join(FRONTEND_ROOT, "src", "pages", "AdminDashboardPage.jsx");
const REPORT_PATH = path.resolve(FRONTEND_ROOT, "..", "Docs", "s5_1_dashboard_task_sets_verification_2026-05-23.md");

const EXPECTED = {
  STUDENT_BASIC_TASKS: ["S-B01", "S-B02", "S-T03"],
  STUDENT_CONDITIONAL_TASKS: ["S-B03"],
  STUDENT_ADVANCED_TASKS: [
    "S-T00", "S-T01", "S-T02", "S-T04", "S-T05", "S-T06", "S-T07",
    "S-T08", "S-T09", "S-T10", "S-T11", "S-T12", "S-T13", "S-T14", "S-T15",
  ],
  ADMIN_BASIC_TASKS: ["A-B01", "A-B02", "A-B03", "A-B04"],
  ADMIN_SINGLE_STUDENT_TASKS: ["A-S01", "A-S02", "A-S03", "A-S04", "A-S05", "A-S06", "A-S07", "A-S08"],
  ADMIN_COMPARISON_TASKS: ["A-C01", "A-C02", "A-C03", "A-C04", "A-C05", "A-C06"],
  ADMIN_COHORT_TASKS: [
    "A-G01", "A-G02", "A-G03", "A-G04", "A-G05", "A-G06", "A-G07", "A-G08",
    "A-G09", "A-G10", "A-G11", "A-G12", "A-G13", "A-G14", "A-G15", "A-G16",
  ],
};

function parseArrayConstant(source, constName) {
  const pattern = new RegExp(`const\\s+${constName}\\s*=\\s*\\[([\\s\\S]*?)\\];`, "m");
  const match = source.match(pattern);
  if (!match) {
    throw new Error(`Missing constant ${constName}`);
  }
  const rawItems = [...match[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  return rawItems;
}

function assertExactArray(name, actual, expected) {
  const sameLength = actual.length === expected.length;
  const sameValues = sameLength && actual.every((v, i) => v === expected[i]);
  if (!sameValues) {
    throw new Error(
      `${name} mismatch.\nExpected: ${JSON.stringify(expected)}\nActual: ${JSON.stringify(actual)}`
    );
  }
}

function renderReport(results) {
  const lines = [];
  lines.push("# S5-1 Dashboard Task Sets Verification - 2026-05-23");
  lines.push("");
  lines.push("## Scope");
  lines.push("- Verify Student/Admin dashboard task set constants match the approved sprint list exactly.");
  lines.push("- Verify no unintended task IDs are included in the default set constants.");
  lines.push("");
  lines.push("## Results");
  lines.push("| Constant | Count | Status |");
  lines.push("| --- | ---: | --- |");
  for (const item of results) {
    lines.push(`| ${item.name} | ${item.count} | PASS |`);
  }
  lines.push("");
  lines.push("## Verdict");
  lines.push("- PASS: S5-1 task sets in dashboard pages match the approved list.");
  lines.push("");
  return lines.join("\n");
}

function main() {
  const studentSource = fs.readFileSync(STUDENT_PAGE, "utf8");
  const adminSource = fs.readFileSync(ADMIN_PAGE, "utf8");

  const checks = [
    ["STUDENT_BASIC_TASKS", parseArrayConstant(studentSource, "STUDENT_BASIC_TASKS"), EXPECTED.STUDENT_BASIC_TASKS],
    ["STUDENT_CONDITIONAL_TASKS", parseArrayConstant(studentSource, "STUDENT_CONDITIONAL_TASKS"), EXPECTED.STUDENT_CONDITIONAL_TASKS],
    ["STUDENT_ADVANCED_TASKS", parseArrayConstant(studentSource, "STUDENT_ADVANCED_TASKS"), EXPECTED.STUDENT_ADVANCED_TASKS],
    ["ADMIN_BASIC_TASKS", parseArrayConstant(adminSource, "ADMIN_BASIC_TASKS"), EXPECTED.ADMIN_BASIC_TASKS],
    ["ADMIN_SINGLE_STUDENT_TASKS", parseArrayConstant(adminSource, "ADMIN_SINGLE_STUDENT_TASKS"), EXPECTED.ADMIN_SINGLE_STUDENT_TASKS],
    ["ADMIN_COMPARISON_TASKS", parseArrayConstant(adminSource, "ADMIN_COMPARISON_TASKS"), EXPECTED.ADMIN_COMPARISON_TASKS],
    ["ADMIN_COHORT_TASKS", parseArrayConstant(adminSource, "ADMIN_COHORT_TASKS"), EXPECTED.ADMIN_COHORT_TASKS],
  ];

  const results = [];
  for (const [name, actual, expected] of checks) {
    assertExactArray(name, actual, expected);
    results.push({ name, count: actual.length });
  }

  fs.writeFileSync(REPORT_PATH, renderReport(results));
  console.log(JSON.stringify({ success: true, reportPath: REPORT_PATH, results }, null, 2));
}

main();
