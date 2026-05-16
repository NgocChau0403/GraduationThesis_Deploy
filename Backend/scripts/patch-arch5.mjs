// patch-arch5.mjs — one-time patch: narrow ARCH 5 to time-series viz types only
import { readFileSync, writeFileSync } from "fs";

const PATH = "c:/[Graduation_Thesis]Prototype/Backend/scripts/validateRegistry.js";
let code = readFileSync(PATH, "utf8");

const OLD = `if (ac?.granularity === "weekly" && vc.semantic_roles?.x !== "time") {`;
const NEW = `if (ac?.granularity === "weekly" && vc.semantic_roles?.x !== "time" && new Set(["line_chart", "heatmap"]).has(task.viz_type)) {`;

if (!code.includes(OLD)) {
  console.log("Pattern not found — may already be patched.");
} else {
  code = code.replace(OLD, NEW);
  writeFileSync(PATH, code, "utf8");
  console.log("✅ ARCH 5 patched — now only applies to line_chart and heatmap.");
}
