# Phase 4 End-to-End Debug Report

- Mode: END-TO-END DEBUG WITH TEMPORARY LOGGING
- Prefix: `[DEBUG_TASK:<task_id>]`
- Business logic: unchanged

Task:
A-B02 - Completion / outcome summary
Dataset/class tested:
OULAD | batch_id=SAMPLE_OULAD | class_id=SAMPLE_OULAD_CLASS_AAA_2013J | student_id=N/A
User action:
Run task from AnalyticsWorkspace with params {"batch_id":"SAMPLE_OULAD","class_id":"SAMPLE_OULAD_CLASS_AAA_2013J"}
Availability status:
executable (executable=true)
Layer A/B/C/D:
{"structural":"pass","semantic":"pass","analytical":"pass","data_sufficiency":"pass"}
API:
status=200, success=true
Backend SQL/query:
```json
{
  "isMultiQuery": false,
  "sqlPreview": "SELECT final_outcome, COUNT(*) AS student_count, ROUND(COUNT(*)*100.0/NULLIF(SUM(COUNT(*)) OVER(), 0),1) AS pct_of_class FROM enrollment WHERE class_id=$1 GROUP BY final_outcome ORDER BY student_count DESC\nLIMIT 10000"
}
```
SQL params:
```json
{
  "batch_id": "SAMPLE_OULAD",
  "class_id": "SAMPLE_OULAD_CLASS_AAA_2013J"
}
```
SQL row count:
4
SQL sample rows:
```json
[
  {
    "final_outcome": "Pass",
    "student_count": 258,
    "pct_of_class": "67.4"
  },
  {
    "final_outcome": "Withdrawn",
    "student_count": 60,
    "pct_of_class": "15.7"
  },
  {
    "final_outcome": "Fail",
    "student_count": 45,
    "pct_of_class": "11.7"
  }
]
```
API response shape:
```json
{
  "success": true,
  "taskId": "A-B02",
  "datasetsKeys": [
    "outcome_counts"
  ],
  "metaKeys": [
    "taskId",
    "isMultiQuery",
    "rowCount",
    "executionTimeMs",
    "queryHash",
    "cacheHit",
    "retryCount",
    "query_labels",
    "dataQuality"
  ],
  "dataQuality": {
    "status": "executable",
    "confidence": "HIGH",
    "confidence_reason": "365 students × 5 assessments across 5 weeks — strong statistical basis.",
    "warnings": []
  }
}
```
Required fields check:
```json
{
  "required": [
    "final_outcome",
    "student_count"
  ],
  "present": [
    "final_outcome",
    "student_count"
  ],
  "missing": []
}
```
Frontend adapter:
pie_chart -> Frontend/src/chartAdapters/pie.adapter.js
Rows before adapter:
4
Rows after adapter:
4
Adapter warnings:
```json
[
  "Selected dataset block \"outcome_counts\" by field match."
]
```
Chart render result:
```json
{
  "emptyState": "Renderable chart",
  "skippedRows": 0,
  "adapterMeta": {
    "chart_type": "pie_chart",
    "selected_dataset_label": "outcome_counts",
    "null_handling_policy": {
      "numeric": "real_zero_kept_null_missing_not_coerced",
      "category": "missing_category_not_silent_fallback",
      "row": "invalid_rows_skipped_with_warnings"
    },
    "input_rows": 4,
    "valid_rows": 4,
    "skipped_rows": 0,
    "missing_fields": [],
    "missing_field_counts": {},
    "warnings": []
  },
  "keys": [
    "data",
    "meta"
  ]
}
```
Issue found:
No critical runtime correctness issue detected in this run.
Where data is lost/changed:
Adapter/selection warnings emitted: 1
Evidence from logs:
Console logs with prefix [DEBUG_TASK:A-B02] captured for request->availability->SQL->API->adapter pipeline.
Severity:
Medium
Recommended fix:
Define strict output_schema.required_columns, keep adapter diagnostics surfaced, and normalize metric units (0-1 vs 0-100) in metadata; do not change business logic until approved.

Task:
A-B04 - At-risk overview
Dataset/class tested:
OULAD | batch_id=SAMPLE_OULAD | class_id=SAMPLE_OULAD_CLASS_AAA_2013J | student_id=N/A
User action:
Run task from AnalyticsWorkspace with params {"batch_id":"SAMPLE_OULAD","class_id":"SAMPLE_OULAD_CLASS_AAA_2013J"}
Availability status:
executable (executable=true)
Layer A/B/C/D:
{"structural":"pass","semantic":"pass","analytical":"pass","data_sufficiency":"pass"}
API:
status=200, success=true
Backend SQL/query:
```json
{
  "isMultiQuery": false,
  "sqlPreview": "WITH\nscore_context AS MATERIALIZED (\n  SELECT CASE\n           WHEN MAX(ar.score_normalized) <= 20 THEN 20::float8\n           ELSE 100::float8\n         END AS score_scale,\n         CASE\n           WHEN MAX(ar.score_normalized) <= 20 THEN 10::float8\n           ELSE 40::float8\n         END AS pass_threshold,\n         CASE\n           WHEN MAX(ar.score_normalized) <= 20 THEN 14::float8\n           ELSE 70::float8\n         END AS target_threshold\n  FROM assessment_result ar\n  JOIN assessment a ON ar.assessment_id = a.assessment_id AND ar.batch_id = a.batch_id\n  JOIN enrollment e ON ar.enrollment_id = e.enrollment_id AND ar.batch_id = e.batch_id\n                   AND a.class_id = e.class_id AND a.batch_id = e.batch_id\n  WHERE e.class_id = $1 AND e.batch_id = $2\n),\nscore_agg AS (\n  SELECT ar.student_id,\n         ROUND((\n           CASE\n             WHEN SUM(a.weight_pct) FILTER (\n                    WHERE a.weight_pct IS NOT NULL\n                      AND ar.score_normalized IS NOT NULL\n                  ) > 0\n               THEN SUM(ar.score_normalized * a.weight_pct) FILTER (\n                      WHERE a.weight_pct IS NOT NULL\n                        AND ar.score_normalized IS NOT NULL\n"
}
```
SQL params:
```json
{
  "batch_id": "SAMPLE_OULAD",
  "class_id": "SAMPLE_OULAD_CLASS_AAA_2013J"
}
```
SQL row count:
3
SQL sample rows:
```json
[
  {
    "at_risk_label": "high",
    "student_count": 33
  },
  {
    "at_risk_label": "medium",
    "student_count": 84
  },
  {
    "at_risk_label": "low",
    "student_count": 248
  }
]
```
API response shape:
```json
{
  "success": true,
  "taskId": "A-B04",
  "datasetsKeys": [
    "risk_overview"
  ],
  "metaKeys": [
    "taskId",
    "isMultiQuery",
    "rowCount",
    "executionTimeMs",
    "queryHash",
    "cacheHit",
    "retryCount",
    "query_labels",
    "dataQuality"
  ],
  "dataQuality": {
    "status": "executable",
    "confidence": "HIGH",
    "confidence_reason": "365 students × 5 assessments across 5 weeks — strong statistical basis.",
    "warnings": []
  }
}
```
Required fields check:
```json
{
  "required": [
    "at_risk_label",
    "student_count"
  ],
  "present": [
    "at_risk_label",
    "student_count"
  ],
  "missing": []
}
```
Frontend adapter:
bar_chart -> Frontend/src/chartAdapters/bar.adapter.js
Rows before adapter:
3
Rows after adapter:
3
Adapter warnings:
```json
[
  "No dataset block matched required chart fields; fallback to \"risk_overview\"."
]
```
Chart render result:
```json
{
  "emptyState": "Renderable chart",
  "skippedRows": 0,
  "adapterMeta": {
    "chart_type": "bar_chart",
    "selected_dataset_label": "risk_overview",
    "null_handling_policy": {
      "numeric": "real_zero_kept_null_missing_not_coerced",
      "category": "missing_category_not_silent_fallback",
      "row": "invalid_rows_skipped_with_warnings"
    },
    "input_rows": 3,
    "valid_rows": 3,
    "skipped_rows": 0,
    "missing_fields": [],
    "missing_field_counts": {},
    "warnings": []
  },
  "keys": [
    "data",
    "xKey",
    "bars",
    "stacked",
    "meta"
  ]
}
```
Issue found:
Potential null converted to 0 via COALESCE(...,0).
Where data is lost/changed:
Adapter/selection warnings emitted: 1
Evidence from logs:
Console logs with prefix [DEBUG_TASK:A-B04] captured for request->availability->SQL->API->adapter pipeline.
Severity:
High
Recommended fix:
Define strict output_schema.required_columns, keep adapter diagnostics surfaced, and normalize metric units (0-1 vs 0-100) in metadata; do not change business logic until approved.

Task:
A-B03 - Engagement distribution
Dataset/class tested:
OULAD | batch_id=SAMPLE_OULAD | class_id=SAMPLE_OULAD_CLASS_AAA_2013J | student_id=N/A
User action:
Run task from AnalyticsWorkspace with params {"batch_id":"SAMPLE_OULAD","class_id":"SAMPLE_OULAD_CLASS_AAA_2013J"}
Availability status:
executable (executable=true)
Layer A/B/C/D:
{"structural":"pass","semantic":"pass","analytical":"pass","data_sufficiency":"pass"}
API:
status=200, success=true
Backend SQL/query:
```json
{
  "isMultiQuery": false,
  "sqlPreview": "WITH eng_agg AS (SELECT e.student_id, e.enrollment_id, COALESCE(SUM(eng.engagement_count), 0)::float8 AS total_clicks, COUNT(DISTINCT eng.event_day)::float8 AS active_days FROM enrollment e LEFT JOIN engagement eng ON e.enrollment_id = eng.enrollment_id WHERE e.class_id = $1 AND e.batch_id = $2 GROUP BY e.student_id, e.enrollment_id), class_stats AS (SELECT MAX(total_clicks) AS max_clicks, MAX(active_days) AS max_active FROM eng_agg), scored AS (SELECT ea.student_id, ea.total_clicks, ea.active_days, CASE WHEN cs.max_clicks IS NULL AND cs.max_active IS NULL THEN NULL ELSE COALESCE((ea.total_clicks / NULLIF(cs.max_clicks, 0)) * 0.5, 0) + COALESCE((ea.active_days / NULLIF(cs.max_active, 0)) * 0.5, 0) END AS engagement_score FROM eng_agg ea CROSS JOIN class_stats cs), ranked AS (SELECT *, CASE NTILE(4) OVER (ORDER BY engagement_score ASC, total_clicks ASC) WHEN 1 THEN 'very_low' WHEN 2 THEN 'low' WHEN 3 THEN 'medium' ELSE 'high' END AS study_effort_level FROM scored) SELECT study_effort_level, COUNT(*)::int AS student_count, ROUND((COUNT(*) * 100.0 / NULLIF(SUM(COUNT(*)) OVER (), 0))::numeric, 1)::float8 AS pct_of_class, ROUND(AVG(engagement_score)::numeric, 4)::float8 AS avg_engagemen"
}
```
SQL params:
```json
{
  "batch_id": "SAMPLE_OULAD",
  "class_id": "SAMPLE_OULAD_CLASS_AAA_2013J"
}
```
SQL row count:
4
SQL sample rows:
```json
[
  {
    "study_effort_level": "very_low",
    "student_count": 96,
    "pct_of_class": 25.1,
    "avg_engagement_score": 0.0576
  },
  {
    "study_effort_level": "low",
    "student_count": 96,
    "pct_of_class": 25.1,
    "avg_engagement_score": 0.1508
  },
  {
    "study_effort_level": "medium",
    "student_count": 96,
    "pct_of_class": 25.1,
    "avg_engagement_score": 0.2564
  }
]
```
API response shape:
```json
{
  "success": true,
  "taskId": "A-B03",
  "datasetsKeys": [
    "engagement_distribution"
  ],
  "metaKeys": [
    "taskId",
    "isMultiQuery",
    "rowCount",
    "executionTimeMs",
    "queryHash",
    "cacheHit",
    "retryCount",
    "query_labels",
    "dataQuality"
  ],
  "dataQuality": {
    "status": "executable",
    "confidence": "HIGH",
    "confidence_reason": "365 students × 5 assessments across 5 weeks — strong statistical basis.",
    "warnings": []
  }
}
```
Required fields check:
```json
{
  "required": [
    "study_effort_level",
    "student_count"
  ],
  "present": [
    "study_effort_level",
    "student_count"
  ],
  "missing": []
}
```
Frontend adapter:
bar_chart -> Frontend/src/chartAdapters/bar.adapter.js
Rows before adapter:
4
Rows after adapter:
4
Adapter warnings:
```json
[
  "Selected dataset block \"engagement_distribution\" by field match."
]
```
Chart render result:
```json
{
  "emptyState": "Renderable chart",
  "skippedRows": 0,
  "adapterMeta": {
    "chart_type": "bar_chart",
    "selected_dataset_label": "engagement_distribution",
    "null_handling_policy": {
      "numeric": "real_zero_kept_null_missing_not_coerced",
      "category": "missing_category_not_silent_fallback",
      "row": "invalid_rows_skipped_with_warnings"
    },
    "input_rows": 4,
    "valid_rows": 4,
    "skipped_rows": 0,
    "missing_fields": [],
    "missing_field_counts": {},
    "warnings": []
  },
  "keys": [
    "data",
    "xKey",
    "bars",
    "stacked",
    "meta"
  ]
}
```
Issue found:
Potential null converted to 0 via COALESCE(...,0).
Where data is lost/changed:
Adapter/selection warnings emitted: 1
Evidence from logs:
Console logs with prefix [DEBUG_TASK:A-B03] captured for request->availability->SQL->API->adapter pipeline.
Severity:
High
Recommended fix:
Define strict output_schema.required_columns, keep adapter diagnostics surfaced, and normalize metric units (0-1 vs 0-100) in metadata; do not change business logic until approved.

Task:
S-T01 - Score trend analysis
Dataset/class tested:
OULAD | batch_id=SAMPLE_OULAD | class_id=SAMPLE_OULAD_CLASS_AAA_2013J | student_id=SAMPLE_OULAD_STU_11391
User action:
Run task from AnalyticsWorkspace with params {"batch_id":"SAMPLE_OULAD","class_id":"SAMPLE_OULAD_CLASS_AAA_2013J","student_id":"SAMPLE_OULAD_STU_11391"}
Availability status:
executable (executable=true)
Layer A/B/C/D:
{"structural":"pass","semantic":"pass","analytical":"pass","data_sufficiency":"pass"}
API:
status=200, success=true
Backend SQL/query:
```json
{
  "isMultiQuery": false,
  "sqlPreview": "WITH\nscore_context AS (\n  SELECT CASE WHEN MAX(ar.score_normalized) <= 20 THEN 20::float8 ELSE 100::float8 END AS score_scale,\n         CASE WHEN MAX(ar.score_normalized) <= 20 THEN 10::float8 ELSE 40::float8 END AS pass_threshold,\n         CASE WHEN MAX(ar.score_normalized) <= 20 THEN 14::float8 ELSE 70::float8 END AS target_threshold\n  FROM assessment_result ar\n  JOIN assessment a ON ar.assessment_id = a.assessment_id AND ar.batch_id = a.batch_id\n  WHERE a.class_id = $1 AND a.batch_id = $2\n),\nclass_assessment AS (\n  SELECT ar.assessment_id,\n         ROUND(AVG(ar.score_normalized)::numeric, 2)::float8 AS class_avg_score\n  FROM assessment_result ar\n  JOIN assessment a ON ar.assessment_id = a.assessment_id AND ar.batch_id = a.batch_id\n  WHERE a.class_id = $1 AND a.batch_id = $2\n  GROUP BY ar.assessment_id\n),\nstudent_trend AS (\n  SELECT ar.student_id,\n         REGR_SLOPE(ar.score_normalized, a.assessment_order)::float8 AS performance_trend\n  FROM assessment_result ar\n  JOIN assessment a ON ar.assessment_id = a.assessment_id AND ar.batch_id = a.batch_id\n  WHERE ar.student_id = $3\n    AND a.class_id = $1 AND a.batch_id = $2\n  GROUP BY ar.student_id\n)\nSELECT a.assessment_order,\n       a"
}
```
SQL params:
```json
{
  "batch_id": "SAMPLE_OULAD",
  "class_id": "SAMPLE_OULAD_CLASS_AAA_2013J",
  "student_id": "SAMPLE_OULAD_STU_11391"
}
```
SQL row count:
5
SQL sample rows:
```json
[
  {
    "assessment_order": 1,
    "week_of_class": 3,
    "assessment_type": "TMA",
    "assessment_name": "1752",
    "score_normalized": 78,
    "pass_flag": true,
    "class_avg_score": 70.31,
    "score_vs_class_avg": 7.69,
    "score_scale": 100,
    "pass_threshold": 40,
    "target_threshold": 70,
    "below_pass_threshold": false,
    "below_target_threshold": false,
    "performance_trend": 0.8,
    "support_level": "maintain",
    "recommended_action": "Keep the current preparation pattern and use feedback to protect this level."
  },
  {
    "assessment_order": 2,
    "week_of_class": 8,
    "assessment_type": "TMA",
    "assessment_name": "1753",
    "score_normalized": 85,
    "pass_flag": true,
    "class_avg_score": 66.8,
    "score_vs_class_avg": 18.2,
    "score_scale": 100,
    "pass_threshold": 40,
    "target_threshold": 70,
    "below_pass_threshold": false,
    "below_target_threshold": false,
    "performance_trend": 0.8,
    "support_level": "maintain",
    "recommended_action": "Keep the current preparation pattern and use feedback to protect this level."
  },
  {
    "assessment_order": 3,
    "week_of_class": 17,
    "assessment_type": "TMA",
    "assessment_name": "1754",
    "score_normalized": 80,
    "pass_flag": true,
    "class_avg_score": 70.44,
    "score_vs_class_avg": 9.56,
    "score_scale": 100,
    "pass_threshold": 40,
    "target_threshold": 70,
    "below_pass_threshold": false,
    "below_target_threshold": false,
    "performance_trend": 0.8,
    "support_level": "maintain",
    "recommended_action": "Keep the current preparation pattern and use feedback to protect this level."
  }
]
```
API response shape:
```json
{
  "success": true,
  "taskId": "S-T01",
  "datasetsKeys": [
    "score_trend"
  ],
  "metaKeys": [
    "taskId",
    "isMultiQuery",
    "rowCount",
    "executionTimeMs",
    "queryHash",
    "cacheHit",
    "retryCount",
    "query_labels",
    "dataQuality"
  ],
  "dataQuality": {
    "status": "executable",
    "confidence": "HIGH",
    "confidence_reason": "365 students × 5 assessments across 5 weeks — strong statistical basis.",
    "warnings": []
  }
}
```
Required fields check:
```json
{
  "required": [
    "assessment_order",
    "score_normalized",
    "pass_flag"
  ],
  "present": [
    "assessment_order",
    "score_normalized",
    "pass_flag"
  ],
  "missing": []
}
```
Frontend adapter:
line_chart -> Frontend/src/chartAdapters/line.adapter.js
Rows before adapter:
5
Rows after adapter:
5
Adapter warnings:
```json
[
  "Selected dataset block \"score_trend\" by field match."
]
```
Chart render result:
```json
{
  "emptyState": "Renderable chart",
  "skippedRows": 0,
  "adapterMeta": {
    "chart_type": "line_chart",
    "selected_dataset_label": "score_trend",
    "null_handling_policy": {
      "numeric": "real_zero_kept_null_missing_not_coerced",
      "category": "missing_category_not_silent_fallback",
      "row": "invalid_rows_skipped_with_warnings"
    },
    "input_rows": 5,
    "valid_rows": 5,
    "skipped_rows": 0,
    "missing_fields": [],
    "missing_field_counts": {},
    "warnings": []
  },
  "keys": [
    "data",
    "xKey",
    "lines",
    "referenceLines",
    "meta"
  ]
}
```
Issue found:
No critical runtime correctness issue detected in this run.
Where data is lost/changed:
Adapter/selection warnings emitted: 1
Evidence from logs:
Console logs with prefix [DEBUG_TASK:S-T01] captured for request->availability->SQL->API->adapter pipeline.
Severity:
Medium
Recommended fix:
Define strict output_schema.required_columns, keep adapter diagnostics surfaced, and normalize metric units (0-1 vs 0-100) in metadata; do not change business logic until approved.

Task:
A-G14 - Early withdrawal signal analysis
Dataset/class tested:
OULAD | batch_id=SAMPLE_OULAD | class_id=SAMPLE_OULAD_CLASS_AAA_2013J | student_id=N/A
User action:
Run task from AnalyticsWorkspace with params {"batch_id":"SAMPLE_OULAD","class_id":"SAMPLE_OULAD_CLASS_AAA_2013J"}
Availability status:
executable (executable=true)
Layer A/B/C/D:
{"structural":"pass","semantic":"pass","analytical":"pass","data_sufficiency":"pass"}
API:
status=200, success=true
Backend SQL/query:
```json
{
  "isMultiQuery": false,
  "sqlPreview": "WITH weekly AS (SELECT e.student_id, e.final_outcome, eng.week_number, SUM(eng.engagement_count) AS weekly_clicks, AVG(SUM(eng.engagement_count)) OVER(PARTITION BY e.student_id ORDER BY eng.week_number ROWS BETWEEN 3 PRECEDING AND 1 PRECEDING) AS rolling_avg FROM enrollment e JOIN engagement eng ON e.enrollment_id=eng.enrollment_id WHERE e.class_id = $1 AND e.batch_id = $2 AND e.source_dataset='OULAD' GROUP BY e.student_id, e.final_outcome, eng.week_number)SELECT week_number, final_outcome, ROUND(AVG(weekly_clicks),2) AS avg_clicks, COUNT(*) AS student_count FROM weekly GROUP BY week_number, final_outcome ORDER BY final_outcome, week_number\nLIMIT 10000"
}
```
SQL params:
```json
{
  "batch_id": "SAMPLE_OULAD",
  "class_id": "SAMPLE_OULAD_CLASS_AAA_2013J"
}
```
SQL row count:
161
SQL sample rows:
```json
[
  {
    "week_number": -1,
    "final_outcome": "Distinction",
    "avg_clicks": "149.33",
    "student_count": 18
  },
  {
    "week_number": 0,
    "final_outcome": "Distinction",
    "avg_clicks": "162.25",
    "student_count": 20
  },
  {
    "week_number": 1,
    "final_outcome": "Distinction",
    "avg_clicks": "197.44",
    "student_count": 18
  }
]
```
API response shape:
```json
{
  "success": true,
  "taskId": "A-G14",
  "datasetsKeys": [
    "withdrawal_signal_trend"
  ],
  "metaKeys": [
    "taskId",
    "isMultiQuery",
    "rowCount",
    "executionTimeMs",
    "queryHash",
    "cacheHit",
    "retryCount",
    "query_labels",
    "dataQuality"
  ],
  "dataQuality": {
    "status": "executable",
    "confidence": "HIGH",
    "confidence_reason": "365 students × 5 assessments across 5 weeks — strong statistical basis.",
    "warnings": []
  }
}
```
Required fields check:
```json
{
  "required": [
    "week_number",
    "avg_clicks",
    "final_outcome"
  ],
  "present": [
    "week_number",
    "avg_clicks",
    "final_outcome"
  ],
  "missing": []
}
```
Frontend adapter:
line_chart -> Frontend/src/chartAdapters/line.adapter.js
Rows before adapter:
161
Rows after adapter:
161
Adapter warnings:
```json
[
  "Selected dataset block \"withdrawal_signal_trend\" by field match.",
  "Multi-series line collapsed 161 rows into 41 x-buckets."
]
```
Chart render result:
```json
{
  "emptyState": "Renderable chart",
  "skippedRows": 0,
  "adapterMeta": {
    "chart_type": "line_chart",
    "selected_dataset_label": "withdrawal_signal_trend",
    "null_handling_policy": {
      "numeric": "real_zero_kept_null_missing_not_coerced",
      "category": "missing_category_not_silent_fallback",
      "row": "invalid_rows_skipped_with_warnings"
    },
    "input_rows": 161,
    "valid_rows": 161,
    "skipped_rows": 0,
    "missing_fields": [],
    "missing_field_counts": {},
    "warnings": [
      "Multi-series line collapsed 161 rows into 41 x-buckets."
    ]
  },
  "keys": [
    "data",
    "xKey",
    "lines",
    "referenceLines",
    "meta"
  ]
}
```
Issue found:
No critical runtime correctness issue detected in this run.
Where data is lost/changed:
Adapter/selection warnings emitted: 2
Evidence from logs:
Console logs with prefix [DEBUG_TASK:A-G14] captured for request->availability->SQL->API->adapter pipeline.
Severity:
Medium
Recommended fix:
Define strict output_schema.required_columns, keep adapter diagnostics surfaced, and normalize metric units (0-1 vs 0-100) in metadata; do not change business logic until approved.

Task:
A-G15 - Intervention priority ranking
Dataset/class tested:
OULAD | batch_id=SAMPLE_OULAD | class_id=SAMPLE_OULAD_CLASS_AAA_2013J | student_id=N/A
User action:
Run task from AnalyticsWorkspace with params {"batch_id":"SAMPLE_OULAD","class_id":"SAMPLE_OULAD_CLASS_AAA_2013J"}
Availability status:
executable (executable=true)
Layer A/B/C/D:
{"structural":"pass","semantic":"pass","analytical":"pass","data_sufficiency":"pass"}
API:
status=200, success=true
Backend SQL/query:
```json
{
  "isMultiQuery": false,
  "sqlPreview": "WITH score_agg AS (SELECT ar.student_id, AVG(ar.score_normalized) AS avg_score, REGR_SLOPE(ar.score_normalized, a.assessment_order) AS perf_trend FROM assessment_result ar JOIN assessment a ON ar.assessment_id = a.assessment_id AND ar.batch_id = a.batch_id JOIN enrollment e ON ar.student_id = e.student_id AND ar.batch_id = e.batch_id AND a.class_id = e.class_id AND a.batch_id = e.batch_id WHERE e.class_id = $1 AND e.batch_id = $2 GROUP BY ar.student_id), eng_agg AS (SELECT e.student_id, SUM(eng.engagement_count) AS total_clicks, COUNT(DISTINCT eng.event_day) AS active_days FROM enrollment e JOIN engagement eng ON e.enrollment_id = eng.enrollment_id WHERE e.class_id = $1 AND e.batch_id = $2 GROUP BY e.student_id), class_max AS (SELECT MAX(total_clicks) AS mc, MAX(active_days) AS ma FROM eng_agg), eng_score AS (SELECT ea.student_id, (ea.total_clicks / NULLIF(cm.mc, 0)) * 0.5 + (ea.active_days / NULLIF(cm.ma, 0)) * 0.5 AS engagement_score FROM eng_agg ea, class_max cm), punctuality AS (SELECT ar.student_id, COUNT(*) FILTER (WHERE ar.submission_day <= a.due_day) * 1.0 / NULLIF(COUNT(*), 0) AS punctuality_rate FROM assessment_result ar JOIN assessment a ON ar.assessment_id = a.assessmen"
}
```
SQL params:
```json
{
  "batch_id": "SAMPLE_OULAD",
  "class_id": "SAMPLE_OULAD_CLASS_AAA_2013J"
}
```
SQL row count:
50
SQL sample rows:
```json
[
  {
    "student_id": "SAMPLE_OULAD_STU_2456480",
    "gender": "M",
    "age_group": "35-55",
    "region": "Scotland",
    "avg_score": 24.666666666666668,
    "at_risk_score": 4,
    "at_risk_label": "high",
    "flag_low_score": 1,
    "flag_repeated": 0,
    "flag_low_engagement": 1,
    "flag_low_punctuality": 1,
    "flag_neg_trend": 1,
    "final_outcome": "Fail"
  },
  {
    "student_id": "SAMPLE_OULAD_STU_1401935",
    "gender": "M",
    "age_group": "35-55",
    "region": "West Midlands Region",
    "avg_score": 35,
    "at_risk_score": 4,
    "at_risk_label": "high",
    "flag_low_score": 1,
    "flag_repeated": 0,
    "flag_low_engagement": 1,
    "flag_low_punctuality": 1,
    "flag_neg_trend": 1,
    "final_outcome": "Fail"
  },
  {
    "student_id": "SAMPLE_OULAD_STU_175991",
    "gender": "F",
    "age_group": "0-35",
    "region": "North Western Region",
    "avg_score": 37.6,
    "at_risk_score": 4,
    "at_risk_label": "high",
    "flag_low_score": 1,
    "flag_repeated": 0,
    "flag_low_engagement": 1,
    "flag_low_punctuality": 1,
    "flag_neg_trend": 1,
    "final_outcome": "Fail"
  }
]
```
API response shape:
```json
{
  "success": true,
  "taskId": "A-G15",
  "datasetsKeys": [
    "intervention_priority_list"
  ],
  "metaKeys": [
    "taskId",
    "isMultiQuery",
    "rowCount",
    "executionTimeMs",
    "queryHash",
    "cacheHit",
    "retryCount",
    "query_labels",
    "dataQuality"
  ],
  "dataQuality": {
    "status": "executable",
    "confidence": "HIGH",
    "confidence_reason": "365 students × 5 assessments across 5 weeks — strong statistical basis.",
    "warnings": []
  }
}
```
Required fields check:
```json
{
  "required": [
    "student_id",
    "at_risk_score"
  ],
  "present": [
    "student_id",
    "at_risk_score"
  ],
  "missing": []
}
```
Frontend adapter:
table -> Frontend/src/chartAdapters/table.adapter.js
Rows before adapter:
50
Rows after adapter:
50
Adapter warnings:
```json
[
  "Selected dataset block \"intervention_priority_list\" by field match."
]
```
Chart render result:
```json
{
  "emptyState": "Renderable chart",
  "skippedRows": 0,
  "adapterMeta": {
    "chart_type": "table",
    "selected_dataset_label": "intervention_priority_list",
    "null_handling_policy": {
      "numeric": "real_zero_kept_null_missing_not_coerced",
      "category": "missing_category_not_silent_fallback",
      "row": "invalid_rows_skipped_with_warnings"
    },
    "input_rows": 50,
    "valid_rows": 50,
    "skipped_rows": 0,
    "missing_fields": [],
    "missing_field_counts": {},
    "warnings": []
  },
  "keys": [
    "columns",
    "rows",
    "meta"
  ]
}
```
Issue found:
No critical runtime correctness issue detected in this run.
Where data is lost/changed:
Adapter/selection warnings emitted: 1
Evidence from logs:
Console logs with prefix [DEBUG_TASK:A-G15] captured for request->availability->SQL->API->adapter pipeline.
Severity:
Medium
Recommended fix:
Define strict output_schema.required_columns, keep adapter diagnostics surfaced, and normalize metric units (0-1 vs 0-100) in metadata; do not change business logic until approved.
