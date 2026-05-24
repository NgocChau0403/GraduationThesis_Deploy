# Phase 1 Codebase Scan - Refined

- Mode: CODEBASE SCAN ONLY (report-only, no fix, no logging changes)
- Source scope: Backend + Frontend execution pipeline (not taskRegistry-only)
- Tasks scanned: 57

## 1) Availability Logic Trace (Actual Runtime)
- Entry points:
- `GET /api/tasks/validate-one/:taskId` -> `Backend/src/controllers/taskValidator.controller.js::validateOneTaskController`
- `POST /api/analytics/run` -> `Backend/src/controllers/analytics.controller.js::runAnalyticsController`
- Core engine: `Backend/src/services/capabilityValidator.service.js`
- Layer A (Structural): checks physical table existence via `information_schema.tables` for each `sourceTables` entry. Fail => `unsupported`.
- Layer B (Semantic): normalize/evaluate availability contract in `canonicalCapability.service.js`; validate required_all/required_any/optional_enrichments; detect dataset_specific mismatch; check stored FE field population.
- Layer C (Analytical warnings only): trend tasks require >=2 temporal points; comparison tasks require >=2 distinct students; warns only.
- Layer D (Data sufficiency): hard minimum enrollment >=5, assessment_result >=2; engagement-required tasks need >=1 positive engagement row; emits LOW/MEDIUM/HIGH confidence.
- Final status mapping (`deriveStatus`): structural fail => `unsupported`; data_sufficiency fail => `insufficient_data`; semantic fail => `partial`; else `executable`.

## 2) FE Field Trace (Per Task)
- Rule used: parse `[FE]`/`[FE cross]` in `keyDbFields`, then verify SQL alias evidence in task `sqlQuery/sqlQueries`.
- If alias evidence not found in code scan, mark `UNKNOWN`.

### S-B01 - Performance overview
- FE field `avg_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS avg_score`.
- FE field `pass_rate`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS pass_rate`.
- FE field `performance_trend`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS performance_trend`.

### S-B02 - Risk status card
- FE field `at_risk_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS at_risk_score`.
- FE field `at_risk_label`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS at_risk_label`.
- FE field `punctuality_rate`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS punctuality_rate`.

### S-B03 - Engagement summary
- FE field `total_engagement_count`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS total_engagement_count`.
- FE field `active_days`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS active_days`.
- FE field `engagement_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS engagement_score`.
- FE field `class_avg_engagement_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS class_avg_engagement_score`.
- FE field `study_effort_level`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS study_effort_level`.

### S-T00 - Score prediction (What-If)
- FE field `avg_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS avg_score`.
- FE field `engagement_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS engagement_score`.

### S-T01 - Score trend analysis
- FE field `performance_trend`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS performance_trend`.

### S-T02 - Competency gap analysis
- FE fields: NONE detected in `keyDbFields` (or not explicitly tagged).

### S-T03 - Peer comparison
- FE field `avg_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS avg_score`.
- FE field `engagement_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS engagement_score`.
- FE field `pass_rate`: computed in `UNKNOWN`; evidence: `No direct SQL alias match in task SQL text`.
- FE field `performance_trend`: computed in `UNKNOWN`; evidence: `No direct SQL alias match in task SQL text`.

### S-T04 - At-risk self-check
- FE field `at_risk_score`: computed in `UNKNOWN`; evidence: `No direct SQL alias match in task SQL text`.
- FE field `at_risk_label`: computed in `UNKNOWN`; evidence: `No direct SQL alias match in task SQL text`.
- FE field `avg_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS avg_score`.
- FE field `engagement_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS engagement_score`.
- FE field `punctuality_rate`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS punctuality_rate`.
- FE field `performance_trend`: computed in `UNKNOWN`; evidence: `No direct SQL alias match in task SQL text`.

### S-T05 - Weekly engagement trend
- FE field `early_warning_week`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS early_warning_week`.
- FE field `weekly_engagement_drop`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS weekly_engagement_drop`.

### S-T06 - Study consistency check
- FE field `consistency_level`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS consistency_level`.

### S-T07 - Absence / inactivity impact
- FE fields: NONE detected in `keyDbFields` (or not explicitly tagged).

### S-T08 - Assessment lateness impact
- FE field `submission_delay_avg`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS submission_delay_avg`.
- FE field `punctuality_rate`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS punctuality_rate`.

### S-T09 - Lifestyle risk vs performance
- FE fields: NONE detected in `keyDbFields` (or not explicitly tagged).

### S-T10 - Resource engagement breakdown
- FE field `vle_diversity_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS vle_diversity_score`.
- FE field `forum_engagement_rate`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS forum_engagement_rate`.
- FE field `quiz_engagement_rate`: computed in `UNKNOWN`; evidence: `No direct SQL alias match in task SQL text`.

### S-T11 - Registration timing vs performance
- FE fields: NONE detected in `keyDbFields` (or not explicitly tagged).

### S-T12 - Procrastination analysis
- FE field `submission_delay_avg`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS submission_delay_avg`.
- FE field `punctuality_rate`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS punctuality_rate`.

### S-T13 - Action plan generation
- FE field `avg_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS avg_score`.
- FE field `at_risk_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS at_risk_score`.
- FE field `engagement_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS engagement_score`.
- FE field `performance_trend`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS performance_trend`.

### S-T14 - Social balance vs performance
- FE field `avg_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS avg_score`.

### S-T15 - Family context vs performance
- FE field `avg_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS avg_score`.

### S-T16 - Grade goal calculator
- FE field `current_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS current_score`.
- FE field `needed_score_for_pass`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS needed_score_for_pass`.
- FE field `needed_score_for_target`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS needed_score_for_target`.
- FE field `pass_goal_status`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS pass_goal_status`.
- FE field `target_goal_status`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS target_goal_status`.

### S-T17 - Assessment status timeline
- FE field `submission_status`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS submission_status`.

### A-B01 - Overall performance distribution
- FE fields: NONE detected in `keyDbFields` (or not explicitly tagged).

### A-B02 - Completion / outcome summary
- FE fields: NONE detected in `keyDbFields` (or not explicitly tagged).

### A-B03 - Engagement distribution
- FE field `engagement_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS engagement_score`.
- FE field `study_effort_level`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS study_effort_level`.

### A-B04 - At-risk overview
- FE field `at_risk_label`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS at_risk_label`.
- FE field `at_risk_score`: computed in `UNKNOWN`; evidence: `No direct SQL alias match in task SQL text`.

### A-S01 - Student full profile snapshot
- FE field `avg_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS avg_score`.
- FE field `engagement_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS engagement_score`.
- FE field `at_risk_label`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS at_risk_label`.
- FE field `at_risk_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS at_risk_score`.
- FE field `study_effort_level`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS study_effort_level`.

### A-S02 - Student score trend
- FE field `performance_trend`: computed in `UNKNOWN`; evidence: `No direct SQL alias match in task SQL text`.

### A-S03 - Student engagement trajectory
- FE field `early_warning_week`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS early_warning_week`.
- FE field `weekly_engagement_drop`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS weekly_engagement_drop`.
- FE field `consistency_level`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS consistency_level`.

### A-S04 - Student risk flag breakdown
- FE field `at_risk_score`: computed in `UNKNOWN`; evidence: `No direct SQL alias match in task SQL text`.
- FE field `at_risk_label`: computed in `UNKNOWN`; evidence: `No direct SQL alias match in task SQL text`.
- FE field `avg_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS avg_score`.
- FE field `engagement_score`: computed in `UNKNOWN`; evidence: `No direct SQL alias match in task SQL text`.
- FE field `punctuality_rate`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS punctuality_rate`.
- FE field `performance_trend`: computed in `UNKNOWN`; evidence: `No direct SQL alias match in task SQL text`.

### A-S05 - Student competency gap
- FE fields: NONE detected in `keyDbFields` (or not explicitly tagged).

### A-S06 - Student submission & punctuality
- FE field `submission_delay_avg`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS submission_delay_avg`.
- FE field `punctuality_rate`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS punctuality_rate`.

### A-S07 - Student background context
- FE fields: NONE detected in `keyDbFields` (or not explicitly tagged).

### A-S08 - Student intervention recommendation
- FE field `avg_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS avg_score`.
- FE field `at_risk_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS at_risk_score`.
- FE field `engagement_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS engagement_score`.
- FE field `punctuality_rate`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS punctuality_rate`.
- FE field `performance_trend`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS performance_trend`.
- FE field `early_warning_week`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS early_warning_week`.

### A-C01 - Compare performance trajectories
- FE fields: NONE detected in `keyDbFields` (or not explicitly tagged).

### A-C02 - Compare engagement patterns
- FE field `metric`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS metric`.
- FE field `engagement_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS engagement_score`.
- FE field `study_effort_level`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS study_effort_level`.

### A-C03 - Compare risk profile
- FE field `student_id`: computed in `UNKNOWN`; evidence: `No direct SQL alias match in task SQL text`.
- FE field `at_risk_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS at_risk_score`.
- FE field `at_risk_label`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS at_risk_label`.
- FE field `avg_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS avg_score`.
- FE field `engagement_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS engagement_score`.
- FE field `punctuality_rate`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS punctuality_rate`.
- FE field `performance_trend`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS performance_trend`.

### A-C04 - Compare lifestyle context
- FE field `student_id`: computed in `UNKNOWN`; evidence: `No direct SQL alias match in task SQL text`.
- FE field `lifestyle_dimension`: computed in `UNKNOWN`; evidence: `No direct SQL alias match in task SQL text`.
- FE field `lifestyle_risk_score`: computed in `UNKNOWN`; evidence: `No direct SQL alias match in task SQL text`.

### A-C05 - Compare academic background
- FE fields: NONE detected in `keyDbFields` (or not explicitly tagged).

### A-C06 - Compare resource usage
- FE field `vle_diversity_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS vle_diversity_score`.
- FE field `forum_engagement_rate`: computed in `UNKNOWN`; evidence: `No direct SQL alias match in task SQL text`.
- FE field `quiz_engagement_rate`: computed in `UNKNOWN`; evidence: `No direct SQL alias match in task SQL text`.

### A-G01 - Identify low-engagement group
- FE field `engagement_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS engagement_score`.
- FE field `study_effort_level`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS study_effort_level`.

### A-G02 - Engagement–performance relationship
- FE field `engagement_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS engagement_score`.
- FE field `avg_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS avg_score`.

### A-G03 - Identify at-risk cohort
- FE field `at_risk_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS at_risk_score`.
- FE field `at_risk_label`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS at_risk_label`.
- FE field `avg_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS avg_score`.

### A-G04 - Assessment difficulty analysis
- FE fields: NONE detected in `keyDbFields` (or not explicitly tagged).

### A-G05 - Submission behaviour analysis
- FE field `final_outcome`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS final_outcome`.
- FE field `assessment_type`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS assessment_type`.
- FE field `submission_delay_avg`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS submission_delay_avg`.
- FE field `late_submission_rate`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS late_submission_rate`.
- FE field `punctuality_rate`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS punctuality_rate`.

### A-G06 - Activity type effectiveness
- FE field `avg_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS avg_score`.

### A-G07 - Factor correlation analysis
- FE field `avg_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS avg_score`.
- FE field `engagement_score`: computed in `UNKNOWN`; evidence: `No direct SQL alias match in task SQL text`.

### A-G08 - Background group performance & engagement profile
- FE field `avg_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS avg_score`.
- FE field `engagement_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS engagement_score`.

### A-G09 - Socioeconomic disadvantage impact
- FE field `avg_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS avg_score`.

### A-G10 - Consistency analysis across cohort
- FE field `consistency_level`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS consistency_level`.
- FE field `student_count`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS student_count`.
- FE field `pct_students`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS pct_students`.

### A-G11 - Weekly engagement drop detection
- FE field `is_drop_week`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS is_drop_week`.

### A-G12 - Background group pass/fail/withdrawal rate
- FE fields: NONE detected in `keyDbFields` (or not explicitly tagged).

### A-G13 - Lifestyle risk across cohort
- FE field `avg_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS avg_score`.

### A-G14 - Early withdrawal signal analysis
- FE fields: NONE detected in `keyDbFields` (or not explicitly tagged).

### A-G15 - Intervention priority ranking
- FE field `at_risk_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS at_risk_score`.
- FE field `at_risk_label`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS at_risk_label`.
- FE field `avg_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS avg_score`.

### A-G16 - Admin action recommendation
- FE fields: NONE detected in `keyDbFields` (or not explicitly tagged).

### A-G18 - Class performance trend
- FE field `class_avg_score`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS class_avg_score`.
- FE field `pass_rate`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS pass_rate`.
- FE field `completion_rate`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS completion_rate`.
- FE field `pass_threshold`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS pass_threshold`.
- FE field `target_threshold`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS target_threshold`.

### A-G19 - Assessment completion rate
- FE field `completion_rate`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS completion_rate`.
- FE field `pending_count`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS pending_count`.
- FE field `completion_rank`: computed in `Backend SQL (taskRegistry.sqlQuery/sqlQueries)`; evidence: `alias AS completion_rank`.

## 3) Output Contract Refinement
- Runtime validator: `Backend/src/services/outputSchema.service.js::validateOutputSchema` enforces `output_schema.required_columns` only when non-empty datasets are returned.
- For tasks missing required_columns, inferred contract below uses `viz_type + visualization_config + ChartRenderer + adapter requirements`.

### S-B01 - Performance overview
- Viz/component: `card` -> `MetricCardView`.
- Contract mode: `EXPLICIT(output_schema.required_columns)`.
- Required output fields: `avg_score`, `pass_rate`, `performance_trend`, `final_outcome`

### S-B02 - Risk status card
- Viz/component: `card` -> `MetricCardView`.
- Contract mode: `EXPLICIT(output_schema.required_columns)`.
- Required output fields: `avg_score`, `at_risk_score`, `at_risk_label`

### S-B03 - Engagement summary
- Viz/component: `card` -> `MetricCardView`.
- Contract mode: `EXPLICIT(output_schema.required_columns)`.
- Required output fields: `total_engagement_count`, `active_days`, `engagement_score`, `class_avg_engagement_score`, `study_effort_level`

### S-T00 - Score prediction (What-If)
- Viz/component: `scatter_plot` -> `ScatterChartView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `engagement_score`, `avg_score`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### S-T01 - Score trend analysis
- Viz/component: `line_chart` -> `LineChartView`.
- Contract mode: `EXPLICIT(output_schema.required_columns)`.
- Required output fields: `assessment_order`, `score_normalized`, `pass_flag`

### S-T02 - Competency gap analysis
- Viz/component: `bar_chart` -> `BarChartView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `competency_tag`, `avg_score`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### S-T03 - Peer comparison
- Viz/component: `card` -> `MetricCardView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `UNKNOWN(any first-row keys accepted by card.adapter.js)`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### S-T04 - At-risk self-check
- Viz/component: `checklist` -> `ChecklistView`.
- Contract mode: `EXPLICIT(output_schema.required_columns)`.
- Required output fields: `flag_name`, `flag_value`, `threshold`, `triggered`

### S-T05 - Weekly engagement trend
- Viz/component: `bar_chart` -> `BarChartView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `week_number`, `weekly_clicks`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### S-T06 - Study consistency check
- Viz/component: `heatmap` -> `HeatmapView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `week_number`, `weekly_clicks`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### S-T07 - Absence / inactivity impact
- Viz/component: `bar_chart` -> `BarChartView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `assessment_order`, `score_normalized`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### S-T08 - Assessment lateness impact
- Viz/component: `scatter_plot` -> `ScatterChartView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `submission_delay_days`, `score_normalized`, `pass_flag`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### S-T09 - Lifestyle risk vs performance
- Viz/component: `card` -> `MetricCardView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `UNKNOWN(any first-row keys accepted by card.adapter.js)`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### S-T10 - Resource engagement breakdown
- Viz/component: `pie_chart` -> `PieChartView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `resource_type`, `clicks`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### S-T11 - Registration timing vs performance
- Viz/component: `card` -> `MetricCardView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `UNKNOWN(any first-row keys accepted by card.adapter.js)`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### S-T12 - Procrastination analysis
- Viz/component: `card` -> `MetricCardView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `UNKNOWN(any first-row keys accepted by card.adapter.js)`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### S-T13 - Action plan generation
- Viz/component: `table` -> `DataTableView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `UNKNOWN(any row keys accepted by table.adapter.js)`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### S-T14 - Social balance vs performance
- Viz/component: `card` -> `MetricCardView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `UNKNOWN(any first-row keys accepted by card.adapter.js)`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### S-T15 - Family context vs performance
- Viz/component: `card` -> `MetricCardView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `UNKNOWN(any first-row keys accepted by card.adapter.js)`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### S-T16 - Grade goal calculator
- Viz/component: `card` -> `MetricCardView`.
- Contract mode: `EXPLICIT(output_schema.required_columns)`.
- Required output fields: `current_score`, `needed_score_for_pass`, `needed_score_for_target`, `pass_goal_status`, `target_goal_status`, `remaining_assessments`, `calculation_mode`

### S-T17 - Assessment status timeline
- Viz/component: `table` -> `DataTableView`.
- Contract mode: `EXPLICIT(output_schema.required_columns)`.
- Required output fields: `assessment_order`, `assessment_name`, `submission_status`, `submitted_flag`

### A-B01 - Overall performance distribution
- Viz/component: `bar_chart` -> `BarChartView`.
- Contract mode: `EXPLICIT(output_schema.required_columns)`.
- Required output fields: `score_bucket`, `student_count`

### A-B02 - Completion / outcome summary
- Viz/component: `pie_chart` -> `PieChartView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `final_outcome`, `student_count`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### A-B03 - Engagement distribution
- Viz/component: `bar_chart` -> `BarChartView`.
- Contract mode: `EXPLICIT(output_schema.required_columns)`.
- Required output fields: `study_effort_level`, `student_count`

### A-B04 - At-risk overview
- Viz/component: `bar_chart` -> `BarChartView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `at_risk_label`, `student_count`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### A-S01 - Student full profile snapshot
- Viz/component: `table` -> `DataTableView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `UNKNOWN(any row keys accepted by table.adapter.js)`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### A-S02 - Student score trend
- Viz/component: `line_chart` -> `LineChartView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `assessment_order`, `score_normalized`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### A-S03 - Student engagement trajectory
- Viz/component: `line_chart` -> `LineChartView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `week_number`, `weekly_clicks`, `rolling_3wk_avg`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### A-S04 - Student risk flag breakdown
- Viz/component: `table` -> `DataTableView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `UNKNOWN(any row keys accepted by table.adapter.js)`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### A-S05 - Student competency gap
- Viz/component: `bar_chart` -> `BarChartView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `competency_tag`, `avg_score`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### A-S06 - Student submission & punctuality
- Viz/component: `bar_chart` -> `BarChartView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `assessment_order`, `submission_delay_days`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### A-S07 - Student background context
- Viz/component: `table` -> `DataTableView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `UNKNOWN(any row keys accepted by table.adapter.js)`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### A-S08 - Student intervention recommendation
- Viz/component: `table` -> `DataTableView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `UNKNOWN(any row keys accepted by table.adapter.js)`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### A-C01 - Compare performance trajectories
- Viz/component: `line_chart` -> `LineChartView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `assessment_order`, `score_normalized`, `student_id`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### A-C02 - Compare engagement patterns
- Viz/component: `bar_chart` -> `BarChartView`.
- Contract mode: `EXPLICIT(output_schema.required_columns)`.
- Required output fields: `student_id`, `metric`, `engagement_score`

### A-C03 - Compare risk profile
- Viz/component: `table` -> `DataTableView`.
- Contract mode: `EXPLICIT(output_schema.required_columns)`.
- Required output fields: `student_id`, `at_risk_score`, `at_risk_label`

### A-C04 - Compare lifestyle context
- Viz/component: `bar_chart` -> `BarChartView`.
- Contract mode: `EXPLICIT(output_schema.required_columns)`.
- Required output fields: `student_id`, `lifestyle_dimension`, `lifestyle_risk_score`

### A-C05 - Compare academic background
- Viz/component: `table` -> `DataTableView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `UNKNOWN(any row keys accepted by table.adapter.js)`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### A-C06 - Compare resource usage
- Viz/component: `bar_chart` -> `BarChartView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `resource_type`, `pct_of_total`, `student_id`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### A-G01 - Identify low-engagement group
- Viz/component: `scatter_plot` -> `ScatterChartView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `active_days`, `engagement_score`, `study_effort_level`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### A-G02 - Engagement–performance relationship
- Viz/component: `scatter_plot` -> `ScatterChartView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `engagement_score`, `avg_score`, `final_outcome`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### A-G03 - Identify at-risk cohort
- Viz/component: `table` -> `DataTableView`.
- Contract mode: `EXPLICIT(output_schema.required_columns)`.
- Required output fields: `student_id`, `avg_score`, `at_risk_score`, `at_risk_label`, `triggered_flags`

### A-G04 - Assessment difficulty analysis
- Viz/component: `bar_chart` -> `BarChartView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `assessment_name`, `fail_rate_pct`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### A-G05 - Submission behaviour analysis
- Viz/component: `bar_chart` -> `BarChartView`.
- Contract mode: `EXPLICIT(output_schema.required_columns)`.
- Required output fields: `final_outcome`, `assessment_type`, `submission_delay_avg`, `late_submission_rate`

### A-G06 - Activity type effectiveness
- Viz/component: `bar_chart` -> `BarChartView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `resource_type`, `avg_score_by_resource_type`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### A-G07 - Factor correlation analysis
- Viz/component: `heatmap` -> `HeatmapView`.
- Contract mode: `EXPLICIT(output_schema.required_columns)`.
- Required output fields: `feature_name`, `correlation_with_avg_score`

### A-G08 - Background group performance & engagement profile
- Viz/component: `bar_chart` -> `BarChartView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `group_value`, `avg_score`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### A-G09 - Socioeconomic disadvantage impact
- Viz/component: `scatter_plot` -> `ScatterChartView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `disadvantage_score`, `avg_score`, `final_outcome`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### A-G10 - Consistency analysis across cohort
- Viz/component: `bar_chart` -> `BarChartView`.
- Contract mode: `EXPLICIT(output_schema.required_columns)`.
- Required output fields: `consistency_level`, `student_count`

### A-G11 - Weekly engagement drop detection
- Viz/component: `line_chart` -> `LineChartView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `week_number`, `week_total_clicks`, `rolling_3wk_avg`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### A-G12 - Background group pass/fail/withdrawal rate
- Viz/component: `bar_chart` -> `BarChartView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `group_value`, `student_count`, `final_outcome`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### A-G13 - Lifestyle risk across cohort
- Viz/component: `scatter_plot` -> `ScatterChartView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `lifestyle_risk_score`, `avg_score`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### A-G14 - Early withdrawal signal analysis
- Viz/component: `line_chart` -> `LineChartView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `week_number`, `avg_clicks`, `final_outcome`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### A-G15 - Intervention priority ranking
- Viz/component: `table` -> `DataTableView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `at_risk_score`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### A-G16 - Admin action recommendation
- Viz/component: `table` -> `DataTableView`.
- Contract mode: `INFERRED(chart+adapter)`.
- Required output fields: `UNKNOWN(any row keys accepted by table.adapter.js)`
- Evidence path: `ChartRenderer -> chartSelectionPolicy -> chartAdapters/*.adapter.js`.

### A-G18 - Class performance trend
- Viz/component: `line_chart` -> `LineChartView`.
- Contract mode: `EXPLICIT(output_schema.required_columns)`.
- Required output fields: `assessment_order`, `class_avg_score`, `pass_rate`, `completion_rate`

### A-G19 - Assessment completion rate
- Viz/component: `table` -> `DataTableView`.
- Contract mode: `EXPLICIT(output_schema.required_columns)`.
- Required output fields: `assessment_order`, `assessment_name`, `completion_rate`, `submissions_count`, `pending_count`, `completion_rank`

## 4) Cross-Cutting Notes
- FE computation is primarily backend-side in SQL task queries; frontend adapters mainly validate/filter/reshape visualization payloads.
- Remaining FE mappings are `UNKNOWN` where a tagged FE name is not found as a concrete SQL alias in the task query text.
