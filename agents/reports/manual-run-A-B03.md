# One-click Debug Agent Report

## Run Context
- Task: `A-B03`
- Batch: `SAMPLE_OULAD`
- Class: `SAMPLE_OULAD_CLASS_AAA_2013J`
- Student: `N/A`
- Timestamp: `2026-05-24T18:18:32.594Z`
- Env file: `C:\[Graduation_Thesis]Prototype\Backend\.env`
- DATABASE_URL: `postgresql://***:***@127.0.0.1:5433/learning_dashboard?schema=public`
- Prisma check: `SUCCESS`

## Task Metadata
```json
{
  "task_id": "A-B03",
  "task_name": "Engagement distribution",
  "viz_type": "bar_chart",
  "requiredCapabilities": [
    "engagement_tracking"
  ],
  "optionalCapabilities": [],
  "datasetCompatibility": "both",
  "fallbackStrategy": "show_partial_with_warnings",
  "availability_contract": {
    "required_all": [
      "engagement_tracking"
    ],
    "optional_enrichments": [
      "temporal_activity"
    ],
    "chart_required_fields": [
      "study_effort_level",
      "student_count"
    ]
  },
  "output_schema_required_columns": [
    "study_effort_level",
    "student_count"
  ]
}
```

## Availability Result
```json
{
  "status": "executable",
  "executable": true,
  "layer_results": {
    "structural": "pass",
    "semantic": "pass",
    "analytical": "pass",
    "data_sufficiency": "pass"
  },
  "warnings": [],
  "reasons": []
}
```

## Analytics Execution
```json
{
  "http_status": 200,
  "success": true,
  "taskId": "A-B03",
  "datasets_keys": [
    "engagement_distribution"
  ],
  "meta_keys": [
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
  },
  "row_count": 4,
  "execution_time_ms": 95
}
```

## SQL / Query
```json
{
  "preview": "WITH eng_agg AS (SELECT e.student_id, e.enrollment_id, COALESCE(SUM(eng.engagement_count), 0)::float8 AS total_clicks, COUNT(DISTINCT eng.event_day)::float8 AS active_days FROM enrollment e LEFT JOIN engagement eng ON e.enrollment_id = eng.enrollment_id WHERE e.class_id = :class_id GROUP BY e.student_id, e.enrollment_id), class_stats AS (SELECT MAX(total_clicks) AS max_clicks, MAX(active_days) AS max_active FROM eng_agg), scored AS (SELECT ea.student_id, ea.total_clicks, ea.active_days, CASE WHEN cs.max_clicks IS NULL AND cs.max_active IS NULL THEN NULL ELSE COALESCE((ea.total_clicks / NULLIF(cs.max_clicks, 0)) * 0.5, 0) + COALESCE((ea.active_days / NULLIF(cs.max_active, 0)) * 0.5, 0) END AS engagement_score FROM eng_agg ea CROSS JOIN class_stats cs), ranked AS (SELECT *, CASE NTILE(4) OVER (ORDER BY engagement_score ASC, total_clicks ASC) WHEN 1 THEN 'very_low' WHEN 2 THEN 'low' WHEN 3 THEN 'medium' ELSE 'high' END AS study_effort_level FROM scored) SELECT study_effort_level, COUNT(*)::int AS student_count, ROUND((COUNT(*) * 100.0 / NULLIF(SUM(COUNT(*)) OVER (), 0))::numeric, 1)::float8 AS pct_of_class, ROUND(AVG(engagement_score)::numeric, 4)::float8 AS avg_engagement_score FROM ranked GROUP BY study_effort_level ORDER BY CASE study_effort_level WHEN 'very_low' THEN 1 WHEN 'low' THEN 2 WHEN 'medium' THEN 3 ELSE 4 END",
  "params": {
    "batch_id": "SAMPLE_OULAD",
    "class_id": "SAMPLE_OULAD_CLASS_AAA_2013J"
  }
}
```

## Dataset Summary
```json
{
  "summary_by_dataset": {
    "engagement_distribution": {
      "row_count": 4,
      "fields_present": [
        "study_effort_level",
        "student_count",
        "pct_of_class",
        "avg_engagement_score"
      ],
      "null_counts": {
        "study_effort_level": 0,
        "student_count": 0,
        "pct_of_class": 0,
        "avg_engagement_score": 0
      },
      "nan_counts": {
        "study_effort_level": 0,
        "student_count": 0,
        "pct_of_class": 0,
        "avg_engagement_score": 0
      },
      "infinity_counts": {
        "study_effort_level": 0,
        "student_count": 0,
        "pct_of_class": 0,
        "avg_engagement_score": 0
      },
      "empty_string_counts": {
        "study_effort_level": 0,
        "student_count": 0,
        "pct_of_class": 0,
        "avg_engagement_score": 0
      },
      "numeric_min_max": {
        "study_effort_level": {
          "min": null,
          "max": null
        },
        "student_count": {
          "min": 95,
          "max": 96
        },
        "pct_of_class": {
          "min": 24.8,
          "max": 25.1
        },
        "avg_engagement_score": {
          "min": 0.0576,
          "max": 0.4788
        }
      }
    }
  },
  "sample_rows": {
    "engagement_distribution": [
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
  }
}
```

## Required Fields Check
```json
{
  "required_fields": [
    "study_effort_level",
    "student_count"
  ],
  "available_fields": [
    "study_effort_level",
    "student_count",
    "pct_of_class",
    "avg_engagement_score"
  ],
  "missing_required_fields": []
}
```

## Adapter / Chart Validation
```json
{
  "adapter_selected": "bar.adapter.js",
  "viz_type": "bar_chart",
  "selected_dataset_block": "engagement_distribution",
  "selector_warnings": [
    "Selected dataset block \"engagement_distribution\" by field match."
  ],
  "rows_before_adapter": 4,
  "accepted_valid_rows": 4,
  "rows_after_adapter": 4,
  "skipped_rows": 0,
  "missing_fields": [],
  "warnings": [],
  "null_handling_policy": {
    "numeric": "real_zero_kept_null_missing_not_coerced",
    "category": "missing_category_not_silent_fallback",
    "row": "invalid_rows_skipped_with_warnings"
  },
  "renderable": true,
  "empty_state_reason": null,
  "collapse_warnings": []
}
```

## Detected Issues
1. **Low** `SQL_COALESCE_ZERO` - SQL contains COALESCE(..., 0) pattern; verify semantic intent.
   - Evidence: Matched COALESCE(...,0).

## Final Verdict
- Verdict: **PASS**
- Issue counts:
  - Critical: 0
  - High: 0
  - Medium: 0
  - Low: 1

## Manual Verification Checklist
1. Confirm task metadata matches `taskRegistry.json`.
2. Confirm availability `status/executable/layers` aligns with dataset reality.
3. Verify analytics API success and `dataQuality` warnings are actionable.
4. Inspect dataset summary for null/NaN/Infinity spikes.
5. Validate adapter output is renderable and skipped rows are expected.
6. For line multi-series, treat explicit collapse warning as intentional grouping (not row loss).