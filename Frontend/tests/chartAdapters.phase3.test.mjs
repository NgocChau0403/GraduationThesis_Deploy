import test from "node:test";
import assert from "node:assert/strict";

import * as lineAdapter from "../src/chartAdapters/line.adapter.js";
import * as barAdapter from "../src/chartAdapters/bar.adapter.js";
import * as scatterAdapter from "../src/chartAdapters/scatter.adapter.js";
import * as pieAdapter from "../src/chartAdapters/pie.adapter.js";
import * as heatmapAdapter from "../src/chartAdapters/heatmap.adapter.js";
import * as tableAdapter from "../src/chartAdapters/table.adapter.js";
import * as cardAdapter from "../src/chartAdapters/card.adapter.js";
import * as checklistAdapter from "../src/chartAdapters/checklist.adapter.js";
import {
  deriveChartRequiredFields,
  resolveDatasetForVisualization,
} from "../src/components/chartSelectionPolicy.js";

test("line adapter keeps real values for full valid data", () => {
  const raw = [
    { week: "W1", avg_score: 10 },
    { week: "W2", avg_score: 0 },
  ];
  const out = lineAdapter.adapt(raw, { x_field: "week", y_field: "avg_score" });
  assert.equal(out.data.length, 2);
  assert.deepEqual(out.data.map((d) => d.y), [10, 0]);
  assert.equal(out.meta.skipped_rows, 0);
});

test("bar adapter returns empty structure for empty data", () => {
  const out = barAdapter.adapt([], { x_field: "k", y_field: "v" });
  assert.deepEqual(out.data, []);
  assert.equal(out.meta.valid_rows, 0);
});

test("line adapter skips row with missing x", () => {
  const raw = [
    { week: "W1", avg_score: 1 },
    { week: null, avg_score: 2 },
  ];
  const out = lineAdapter.adapt(raw, { x_field: "week", y_field: "avg_score" });
  assert.equal(out.data.length, 1);
  assert.equal(out.meta.skipped_rows, 1);
  assert.ok(out.meta.missing_fields.includes("week"));
});

test("bar adapter skips row with missing y (no fake zero)", () => {
  const raw = [
    { cohort: "A", cnt: 5 },
    { cohort: "B", cnt: null },
  ];
  const out = barAdapter.adapt(raw, { x_field: "cohort", y_field: "cnt" });
  assert.deepEqual(out.data, [{ x: "A", y: 5 }]);
  assert.equal(out.meta.skipped_rows, 1);
  assert.ok(out.meta.missing_fields.includes("cnt"));
});

test("heatmap adapter keeps null numeric as missing cell", () => {
  const raw = [
    { week: "1", class_name: "A", score: 10 },
    { week: "2", class_name: "A", score: null },
  ];
  const out = heatmapAdapter.adapt(raw, {
    x_field: "week",
    y_field: "score",
    series_field: "class_name",
  });
  const nullCell = out.cells.find((c) => c.row === "A" && c.col === "2");
  assert.equal(nullCell.value, null);
  assert.equal(out.meta.skipped_rows, 0);
});

test("scatter adapter skips invalid numeric strings", () => {
  const raw = [
    { x: "10", y: "20" },
    { x: "abc", y: "5" },
  ];
  const out = scatterAdapter.adapt(raw, { x_field: "x", y_field: "y" });
  assert.equal(out.series[0].data.length, 1);
  assert.deepEqual(out.series[0].data[0], { x: 10, y: 20 });
  assert.equal(out.meta.skipped_rows, 1);
});

test("pie adapter groups excess categories into Other", () => {
  const raw = [
    { label: "A", v: 50 },
    { label: "B", v: 20 },
    { label: "C", v: 10 },
    { label: "D", v: 8 },
    { label: "E", v: 6 },
    { label: "F", v: 4 },
    { label: "G", v: 2 },
  ];
  const out = pieAdapter.adapt(raw, { x_field: "label", y_field: "v" });
  assert.ok(out.data.some((slice) => slice.name === "Other"));
  assert.ok(out.meta.warnings.some((w) => w.includes("Other")));
});

test("table/card/checklist adapters handle minimal valid data", () => {
  const table = tableAdapter.adapt([{ a: 1, b: "x" }], {});
  assert.equal(table.rows.length, 1);

  const card = cardAdapter.adapt([{ total: 10 }], {});
  assert.equal(card.type, "card_list");
  assert.equal(card.items.length, 1);

  const checklist = checklistAdapter.adapt(
    [{ flag_name: "flag_test", triggered: true, severity: "high" }],
    {}
  );
  assert.equal(checklist.items.length, 1);
});

test("multi-query selector uses explicit dataset_label and deterministic fallback", () => {
  const taskMeta = {
    query_labels: ["summary", "detail"],
    availability_contract: { chart_required_fields: ["x", "y"] },
  };
  const datasets = {
    summary: [{ x: "A", y: 1 }],
    detail: [{ x: "B", y: 2 }],
  };
  const config = { x_field: "x", y_field: "y", dataset_label: "detail" };
  const required = deriveChartRequiredFields(taskMeta, config, "scatter_plot");
  const explicit = resolveDatasetForVisualization({
    taskMeta,
    datasets,
    config,
    vizType: "scatter_plot",
    chartRequiredFields: required,
  });
  assert.equal(explicit.selectedDatasetLabel, "detail");
  assert.deepEqual(explicit.rawData, datasets.detail);

  const fallback = resolveDatasetForVisualization({
    taskMeta,
    datasets,
    config: { x_field: "x", y_field: "y", dataset_label: "missing" },
    vizType: "scatter_plot",
    chartRequiredFields: required,
  });
  assert.equal(fallback.selectedDatasetLabel, "summary");
  assert.ok(fallback.warnings.length > 0);
});
