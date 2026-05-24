# Phase 3 Chart / Plot Correctness Validation

- Mode: CHART / PLOT CORRECTNESS VALIDATION ONLY (no code/log changes)
- Scope: all analytics tasks with visualization rendering via AnalyticsWorkspace -> ChartRenderer -> chartAdapters -> chart components
- Source API: `POST /api/analytics/run`

## Priority Group: Risk / at-risk

Task:
A-B04 - At-risk overview
Chart/component:
BarChartView
viz_type:
bar_chart
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/bar.adapter.js -> Frontend/src/components/charts/BarChartView.jsx
Purpose:
How many students need urgent intervention?
Metric:
student_count
Aggregation:
avg/rate/count style aggregation (SQL-driven)
X-axis:
at_risk_label
Y-axis:
student_count
Grouping/filter:
color=at_risk_label
Required fields:
at_risk_label, student_count
Optional fields:
UNKNOWN
Derived fields:
at_risk_label
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Missing x/series/y => row skipped with warnings.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
Potential null->0 semantic coercion risk (verify metric meaning).
Severity:
Medium
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-B04); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
A-C03 - Compare risk profile
Chart/component:
DataTableView
viz_type:
table
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/table.adapter.js -> Frontend/src/components/charts/DataTableView.jsx
Purpose:
Who is at higher risk and what are the key differences?
Metric:
at_risk_score
Aggregation:
mixed count+avg
X-axis:
student_id
Y-axis:
at_risk_score
Grouping/filter:
color=at_risk_label
Required fields:
student_id, at_risk_score, at_risk_label
Optional fields:
avg_score, performance_trend, punctuality_rate, engagement_score, previous_attempt_count, flag_low_score, flag_repeated, flag_low_engagement, flag_low_punctuality, flag_neg_trend, final_outcome
Derived fields:
at_risk_score, at_risk_label, avg_score, engagement_score, punctuality_rate, performance_trend
Correctness assessment:
Chart-goal fit based on viz_type appears flexible but contract-sensitive; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
No row-level null filtering; values rendered via formatCellValue (null/undefined shown as dash).
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
Potential null->0 semantic coercion risk (verify metric meaning). Table adapter does not enforce semantic types; relies on backend schema/output contract.
Severity:
Medium
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-C03); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
A-G03 - Identify at-risk cohort
Chart/component:
DataTableView
viz_type:
table
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/table.adapter.js -> Frontend/src/components/charts/DataTableView.jsx
Purpose:
Who should the admin contact first this week?
Metric:
at_risk_score
Aggregation:
ranking
X-axis:
student_id
Y-axis:
at_risk_score
Grouping/filter:
color=at_risk_label
Required fields:
student_id, avg_score, at_risk_score, at_risk_label, triggered_flags
Optional fields:
enrollment_id, score_strategy, score_scale, pass_threshold, target_threshold, engagement_score, engagement_score_available, punctuality_rate, previous_attempt_count, triggered_flags_summary, primary_support_category, recommended_admin_action, flag_low_score, flag_repeated, flag_low_engagement, flag_low_punctuality, flag_neg_trend, final_outcome
Derived fields:
at_risk_score, at_risk_label, avg_score
Correctness assessment:
Chart-goal fit based on viz_type appears flexible but contract-sensitive; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
No row-level null filtering; values rendered via formatCellValue (null/undefined shown as dash).
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
Potential null->0 semantic coercion risk (verify metric meaning). Table adapter does not enforce semantic types; relies on backend schema/output contract.
Severity:
Medium
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-G03); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
A-G13 - Lifestyle risk across cohort
Chart/component:
ScatterChartView
viz_type:
scatter_plot
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/scatter.adapter.js -> Frontend/src/components/charts/ScatterChartView.jsx
Purpose:
Which lifestyle patterns are most common among low-performing students?
Metric:
avg_score
Aggregation:
correlation
X-axis:
lifestyle_risk_score
Y-axis:
avg_score
Grouping/filter:
none/implicit SQL grouping
Required fields:
lifestyle_risk_score, avg_score
Optional fields:
UNKNOWN
Derived fields:
avg_score
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Invalid numeric x/y => point skipped with warnings.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
No obvious correctness red flag from static scan; runtime sample validation still recommended.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-G13); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
A-G15 - Intervention priority ranking
Chart/component:
DataTableView
viz_type:
table
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/table.adapter.js -> Frontend/src/components/charts/DataTableView.jsx
Purpose:
Who are the top 10 students most in need of intervention right now?
Metric:
at_risk_score
Aggregation:
ranking
X-axis:
student_id
Y-axis:
at_risk_score
Grouping/filter:
color=at_risk_label
Required fields:
student_id, at_risk_score
Optional fields:
UNKNOWN
Derived fields:
at_risk_score, at_risk_label, avg_score
Correctness assessment:
Chart-goal fit based on viz_type appears flexible but contract-sensitive; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
No row-level null filtering; values rendered via formatCellValue (null/undefined shown as dash).
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
Table adapter does not enforce semantic types; relies on backend schema/output contract.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-G15); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
A-G19 - Assessment completion rate
Chart/component:
DataTableView
viz_type:
table
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/table.adapter.js -> Frontend/src/components/charts/DataTableView.jsx
Purpose:
Which assessments have the lowest completion rate and need intervention first?
Metric:
completion_rate
Aggregation:
ranking
X-axis:
assessment_name
Y-axis:
completion_rate
Grouping/filter:
color=completion_status
Required fields:
assessment_order, assessment_name, completion_rate, submissions_count, pending_count, completion_rank
Optional fields:
assessment_type, expected_students, completion_gap, completion_status
Derived fields:
completion_rate, pending_count, completion_rank
Correctness assessment:
Chart-goal fit based on viz_type appears flexible but contract-sensitive; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
No row-level null filtering; values rendered via formatCellValue (null/undefined shown as dash).
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
Potential null->0 semantic coercion risk (verify metric meaning). Table adapter does not enforce semantic types; relies on backend schema/output contract.
Severity:
Medium
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-G19); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
A-S04 - Student risk flag breakdown
Chart/component:
DataTableView
viz_type:
table
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/table.adapter.js -> Frontend/src/components/charts/DataTableView.jsx
Purpose:
Which specific risk factors should admin address for this student?
Metric:
flag_value
Aggregation:
ranking
X-axis:
flag_name
Y-axis:
flag_value
Grouping/filter:
color=triggered
Required fields:
flag_name, flag_value
Optional fields:
UNKNOWN
Derived fields:
avg_score, punctuality_rate
Correctness assessment:
Chart-goal fit based on viz_type appears flexible but contract-sensitive; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
No row-level null filtering; values rendered via formatCellValue (null/undefined shown as dash).
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
Potential null->0 semantic coercion risk (verify metric meaning). Table adapter does not enforce semantic types; relies on backend schema/output contract.
Severity:
Medium
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-S04); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
A-S08 - Student intervention recommendation
Chart/component:
DataTableView
viz_type:
table
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/table.adapter.js -> Frontend/src/components/charts/DataTableView.jsx
Purpose:
What should admin do for this student in the next 7 days?
Metric:
UNKNOWN
Aggregation:
mixed count+avg
X-axis:
UNKNOWN
Y-axis:
UNKNOWN
Grouping/filter:
color=at_risk_label
Required fields:
UNKNOWN
Optional fields:
UNKNOWN
Derived fields:
avg_score, at_risk_score, engagement_score, punctuality_rate, performance_trend, early_warning_week
Correctness assessment:
Chart-goal fit based on viz_type appears flexible but contract-sensitive; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
No row-level null filtering; values rendered via formatCellValue (null/undefined shown as dash).
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
Potential null->0 semantic coercion risk (verify metric meaning). Table adapter does not enforce semantic types; relies on backend schema/output contract.
Severity:
Medium
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-S08); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
S-B02 - Risk status card
Chart/component:
MetricCardView
viz_type:
card
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/card.adapter.js -> Frontend/src/components/charts/MetricCardView.jsx
Purpose:
Am I at risk of failing?
Metric:
avg_score
Aggregation:
avg/rate/count style aggregation (SQL-driven)
X-axis:
UNKNOWN
Y-axis:
UNKNOWN
Grouping/filter:
color=at_risk_label
Required fields:
avg_score, at_risk_score, at_risk_label
Optional fields:
engagement_score, engagement_score_available, punctuality_rate, previous_attempt_count, score_strategy, score_scale, pass_threshold, target_threshold
Derived fields:
at_risk_score, at_risk_label, punctuality_rate
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Uses first aggregate row; risk variant shows unknown state when at_risk_label/score invalid.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
Potential null->0 semantic coercion risk (verify metric meaning). Risk card tolerates unknown risk label and invalid score with warning; verify upstream metric reliability.
Severity:
Medium
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (S-B02); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
S-T04 - At-risk self-check
Chart/component:
ChecklistView
viz_type:
checklist
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/checklist.adapter.js -> Frontend/src/components/charts/ChecklistView.jsx
Purpose:
What specific risk signals are active for me right now?
Metric:
flag_value
Aggregation:
ranking
X-axis:
flag_name
Y-axis:
flag_value
Grouping/filter:
color=triggered
Required fields:
flag_name, flag_value, threshold, triggered
Optional fields:
severity, flag_description, recommended_action, support_category
Derived fields:
avg_score, engagement_score, punctuality_rate
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Missing flag_name rows skipped; defaults severity/support/action fallbacks applied.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
Potential null->0 semantic coercion risk (verify metric meaning).
Severity:
Medium
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (S-T04); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
S-T09 - Lifestyle risk vs performance
Chart/component:
MetricCardView
viz_type:
card
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/card.adapter.js -> Frontend/src/components/charts/MetricCardView.jsx
Purpose:
Could my lifestyle habits be affecting my academic results?
Metric:
avg_score
Aggregation:
correlation
X-axis:
lifestyle_risk_score
Y-axis:
avg_score
Grouping/filter:
none/implicit SQL grouping
Required fields:
lifestyle_risk_score, avg_score
Optional fields:
UNKNOWN
Derived fields:
UNKNOWN
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Uses first aggregate row; risk variant shows unknown state when at_risk_label/score invalid.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
No obvious correctness red flag from static scan; runtime sample validation still recommended.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (S-T09); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

## Priority Group: Score / performance

Task:
A-B01 - Overall performance distribution
Chart/component:
BarChartView
viz_type:
bar_chart
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/bar.adapter.js -> Frontend/src/components/charts/BarChartView.jsx
Purpose:
How is the class performing overall?
Metric:
student_count
Aggregation:
distribution
X-axis:
score_bucket
Y-axis:
student_count
Grouping/filter:
none/implicit SQL grouping
Required fields:
score_bucket, student_count
Optional fields:
pct_of_class, dataset_source, avg_score_in_bucket
Derived fields:
UNKNOWN
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Missing x/series/y => row skipped with warnings.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
No obvious correctness red flag from static scan; runtime sample validation still recommended.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-B01); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
A-C01 - Compare performance trajectories
Chart/component:
LineChartView
viz_type:
line_chart
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/line.adapter.js -> Frontend/src/components/charts/LineChartView.jsx
Purpose:
Which student is improving faster and when did their paths diverge?
Metric:
score_normalized
Aggregation:
trend (time-ordered aggregation from SQL)
X-axis:
assessment_order
Y-axis:
score_normalized
Grouping/filter:
series=student_id, color=student_id
Required fields:
assessment_order, score_normalized, student_id
Optional fields:
UNKNOWN
Derived fields:
UNKNOWN
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Missing x => row skipped; missing y => kept as null gap; diagnostics include missing counts/warnings.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
Adapter preserves null y as gaps (no fake zero), suitable for trend continuity checks.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-C01); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
A-C02 - Compare engagement patterns
Chart/component:
BarChartView
viz_type:
bar_chart
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/bar.adapter.js -> Frontend/src/components/charts/BarChartView.jsx
Purpose:
Which student is more engaged across total clicks, active days, and combined engagement score?
Metric:
engagement_score
Aggregation:
sum
X-axis:
student_id
Y-axis:
engagement_score
Grouping/filter:
series=metric, color=student_id
Required fields:
student_id, metric, engagement_score
Optional fields:
total_clicks, active_days, study_effort_level
Derived fields:
metric, engagement_score, study_effort_level
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Missing x/series/y => row skipped with warnings.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
Potential null->0 semantic coercion risk (verify metric meaning).
Severity:
Medium
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-C02); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
A-C04 - Compare lifestyle context
Chart/component:
BarChartView
viz_type:
bar_chart
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/bar.adapter.js -> Frontend/src/components/charts/BarChartView.jsx
Purpose:
Which lifestyle context dimensions differ most between these two students?
Metric:
lifestyle_risk_score
Aggregation:
UNKNOWN
X-axis:
student_id
Y-axis:
lifestyle_risk_score
Grouping/filter:
series=lifestyle_dimension, color=student_id
Required fields:
student_id, lifestyle_dimension, lifestyle_risk_score
Optional fields:
alcohol_weekday, alcohol_weekend, go_out_freq, health_status, free_time, composite_lifestyle_risk_score, social_balance_score
Derived fields:
UNKNOWN
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: score scale may be dynamic (20/100 in several SQL tasks).
Missing/null handling:
Missing x/series/y => row skipped with warnings.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
No obvious correctness red flag from static scan; runtime sample validation still recommended.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-C04); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
A-C05 - Compare academic background
Chart/component:
DataTableView
viz_type:
table
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/table.adapter.js -> Frontend/src/components/charts/DataTableView.jsx
Purpose:
Does one student face more structural disadvantage than the other?
Metric:
disadvantage_score
Aggregation:
UNKNOWN
X-axis:
student_id
Y-axis:
disadvantage_score
Grouping/filter:
color=disadvantage_score
Required fields:
student_id, disadvantage_score
Optional fields:
UNKNOWN
Derived fields:
UNKNOWN
Correctness assessment:
Chart-goal fit based on viz_type appears flexible but contract-sensitive; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
No row-level null filtering; values rendered via formatCellValue (null/undefined shown as dash).
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
Table adapter does not enforce semantic types; relies on backend schema/output contract.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-C05); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
A-G02 - Engagement–performance relationship
Chart/component:
ScatterChartView
viz_type:
scatter_plot
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/scatter.adapter.js -> Frontend/src/components/charts/ScatterChartView.jsx
Purpose:
Does engaging more in this class actually lead to better grades?
Metric:
avg_score
Aggregation:
correlation
X-axis:
engagement_score
Y-axis:
avg_score
Grouping/filter:
color=final_outcome
Required fields:
engagement_score, avg_score, final_outcome
Optional fields:
UNKNOWN
Derived fields:
engagement_score, avg_score
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Invalid numeric x/y => point skipped with warnings.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
Potential null->0 semantic coercion risk (verify metric meaning).
Severity:
Medium
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-G02); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
A-G07 - Factor correlation analysis
Chart/component:
HeatmapView
viz_type:
heatmap
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/heatmap.adapter.js -> Frontend/src/components/charts/HeatmapView.jsx
Purpose:
What are the strongest predictors of student success in this dataset?
Metric:
correlation_with_avg_score
Aggregation:
correlation
X-axis:
feature_name
Y-axis:
correlation_with_avg_score
Grouping/filter:
color=correlation_with_avg_score
Required fields:
feature_name, correlation_with_avg_score
Optional fields:
n_samples, abs_correlation_rank
Derived fields:
avg_score
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Missing row/col dimension => row skipped; missing value => null cell displayed as dash (not zero-filled).
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
No obvious correctness red flag from static scan; runtime sample validation still recommended.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-G07); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
A-G08 - Background group performance & engagement profile
Chart/component:
BarChartView
viz_type:
bar_chart
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/bar.adapter.js -> Frontend/src/components/charts/BarChartView.jsx
Purpose:
Which demographic groups are scoring or engaging below the class average?
Metric:
avg_score
Aggregation:
mixed count+avg
X-axis:
group_value
Y-axis:
avg_score
Grouping/filter:
color=score_vs_cohort
Required fields:
group_value, avg_score
Optional fields:
UNKNOWN
Derived fields:
avg_score, engagement_score
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Missing x/series/y => row skipped with warnings.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
Potential null->0 semantic coercion risk (verify metric meaning).
Severity:
Medium
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-G08); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
A-G09 - Socioeconomic disadvantage impact
Chart/component:
ScatterChartView
viz_type:
scatter_plot
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/scatter.adapter.js -> Frontend/src/components/charts/ScatterChartView.jsx
Purpose:
Are disadvantaged students receiving adequate support?
Metric:
avg_score
Aggregation:
correlation
X-axis:
disadvantage_score
Y-axis:
avg_score
Grouping/filter:
color=final_outcome
Required fields:
disadvantage_score, avg_score, final_outcome
Optional fields:
UNKNOWN
Derived fields:
avg_score
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Invalid numeric x/y => point skipped with warnings.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
No obvious correctness red flag from static scan; runtime sample validation still recommended.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-G09); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
A-G10 - Consistency analysis across cohort
Chart/component:
BarChartView
viz_type:
bar_chart
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/bar.adapter.js -> Frontend/src/components/charts/BarChartView.jsx
Purpose:
How many students are cramming instead of studying consistently?
Metric:
student_count
Aggregation:
distribution
X-axis:
consistency_level
Y-axis:
student_count
Grouping/filter:
color=consistency_level
Required fields:
consistency_level, student_count
Optional fields:
pct_students, avg_weekly_stddev, avg_weekly_clicks, avg_active_weeks
Derived fields:
consistency_level, student_count, pct_students
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Missing x/series/y => row skipped with warnings.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
No obvious correctness red flag from static scan; runtime sample validation still recommended.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-G10); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
A-G16 - Admin action recommendation
Chart/component:
DataTableView
viz_type:
table
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/table.adapter.js -> Frontend/src/components/charts/DataTableView.jsx
Purpose:
What concrete actions should the admin take in the next 2 weeks?
Metric:
UNKNOWN
Aggregation:
mixed count+avg
X-axis:
UNKNOWN
Y-axis:
UNKNOWN
Grouping/filter:
none/implicit SQL grouping
Required fields:
UNKNOWN
Optional fields:
UNKNOWN
Derived fields:
UNKNOWN
Correctness assessment:
Chart-goal fit based on viz_type appears flexible but contract-sensitive; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
No row-level null filtering; values rendered via formatCellValue (null/undefined shown as dash).
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
Potential null->0 semantic coercion risk (verify metric meaning). Table adapter does not enforce semantic types; relies on backend schema/output contract.
Severity:
Medium
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-G16); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
A-G18 - Class performance trend
Chart/component:
LineChartView
viz_type:
line_chart
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/line.adapter.js -> Frontend/src/components/charts/LineChartView.jsx
Purpose:
How is class performance changing across assessments?
Metric:
class_avg_score
Aggregation:
trend (time-ordered aggregation from SQL)
X-axis:
assessment_order
Y-axis:
class_avg_score
Grouping/filter:
none/implicit SQL grouping
Required fields:
assessment_order, class_avg_score, pass_rate, completion_rate
Optional fields:
assessment_name, assessment_type, week_of_class, submissions_count, score_scale, pass_threshold, target_threshold
Derived fields:
class_avg_score, pass_rate, completion_rate, pass_threshold, target_threshold
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Missing x => row skipped; missing y => kept as null gap; diagnostics include missing counts/warnings.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
Adapter preserves null y as gaps (no fake zero), suitable for trend continuity checks.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-G18); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
A-S01 - Student full profile snapshot
Chart/component:
DataTableView
viz_type:
table
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/table.adapter.js -> Frontend/src/components/charts/DataTableView.jsx
Purpose:
Who is this student and what is their current overall situation?
Metric:
UNKNOWN
Aggregation:
avg/rate/count style aggregation (SQL-driven)
X-axis:
UNKNOWN
Y-axis:
UNKNOWN
Grouping/filter:
color=at_risk_label
Required fields:
UNKNOWN
Optional fields:
UNKNOWN
Derived fields:
avg_score, engagement_score, at_risk_label, at_risk_score, study_effort_level
Correctness assessment:
Chart-goal fit based on viz_type appears flexible but contract-sensitive; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
No row-level null filtering; values rendered via formatCellValue (null/undefined shown as dash).
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
Table adapter does not enforce semantic types; relies on backend schema/output contract.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-S01); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
A-S02 - Student score trend
Chart/component:
LineChartView
viz_type:
line_chart
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/line.adapter.js -> Frontend/src/components/charts/LineChartView.jsx
Purpose:
Is this student getting better or worse — and how fast?
Metric:
score_normalized
Aggregation:
trend (time-ordered aggregation from SQL)
X-axis:
assessment_order
Y-axis:
score_normalized
Grouping/filter:
none/implicit SQL grouping
Required fields:
assessment_order, score_normalized
Optional fields:
UNKNOWN
Derived fields:
UNKNOWN
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Missing x => row skipped; missing y => kept as null gap; diagnostics include missing counts/warnings.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
Adapter preserves null y as gaps (no fake zero), suitable for trend continuity checks.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-S02); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
A-S06 - Student submission & punctuality
Chart/component:
BarChartView
viz_type:
bar_chart
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/bar.adapter.js -> Frontend/src/components/charts/BarChartView.jsx
Purpose:
Is this student consistently submitting late and does it affect their score?
Metric:
submission_delay_days
Aggregation:
distribution
X-axis:
assessment_order
Y-axis:
submission_delay_days
Grouping/filter:
color=pass_flag
Required fields:
assessment_order, submission_delay_days
Optional fields:
UNKNOWN
Derived fields:
submission_delay_avg, punctuality_rate
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Missing x/series/y => row skipped with warnings.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
No obvious correctness red flag from static scan; runtime sample validation still recommended.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-S06); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
A-S07 - Student background context
Chart/component:
DataTableView
viz_type:
table
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/table.adapter.js -> Frontend/src/components/charts/DataTableView.jsx
Purpose:
What background factors should admin consider when deciding how to support this student?
Metric:
UNKNOWN
Aggregation:
avg/rate/count style aggregation (SQL-driven)
X-axis:
UNKNOWN
Y-axis:
UNKNOWN
Grouping/filter:
color=disadvantage_score
Required fields:
UNKNOWN
Optional fields:
UNKNOWN
Derived fields:
UNKNOWN
Correctness assessment:
Chart-goal fit based on viz_type appears flexible but contract-sensitive; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
No row-level null filtering; values rendered via formatCellValue (null/undefined shown as dash).
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
Table adapter does not enforce semantic types; relies on backend schema/output contract.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-S07); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
S-B01 - Performance overview
Chart/component:
MetricCardView
viz_type:
card
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/card.adapter.js -> Frontend/src/components/charts/MetricCardView.jsx
Purpose:
How am I performing overall?
Metric:
avg_score
Aggregation:
avg/rate/count style aggregation (SQL-driven)
X-axis:
final_outcome
Y-axis:
avg_score
Grouping/filter:
color=final_outcome
Required fields:
avg_score, pass_rate, performance_trend, final_outcome
Optional fields:
class_avg_score, score_percentile, unweighted_avg_score, weighted_avg_score, score_strategy, assessment_count, score_vs_class_avg, cohort_size, score_scale, pass_threshold, target_threshold, performance_band
Derived fields:
avg_score, pass_rate, performance_trend
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Uses first aggregate row; risk variant shows unknown state when at_risk_label/score invalid.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
No obvious correctness red flag from static scan; runtime sample validation still recommended.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (S-B01); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
S-T00 - Score prediction (What-If)
Chart/component:
ScatterChartView
viz_type:
scatter_plot
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/scatter.adapter.js -> Frontend/src/components/charts/ScatterChartView.jsx
Purpose:
How much do I need to study to pass / get a higher score?
Metric:
avg_score
Aggregation:
mixed count+avg
X-axis:
engagement_score
Y-axis:
avg_score
Grouping/filter:
none/implicit SQL grouping
Required fields:
engagement_score, avg_score
Optional fields:
UNKNOWN
Derived fields:
avg_score, engagement_score
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Invalid numeric x/y => point skipped with warnings.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
Potential null->0 semantic coercion risk (verify metric meaning).
Severity:
Medium
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (S-T00); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
S-T01 - Score trend analysis
Chart/component:
LineChartView
viz_type:
line_chart
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/line.adapter.js -> Frontend/src/components/charts/LineChartView.jsx
Purpose:
Am I getting better or worse over time?
Metric:
score_normalized
Aggregation:
trend (time-ordered aggregation from SQL)
X-axis:
assessment_order
Y-axis:
score_normalized
Grouping/filter:
none/implicit SQL grouping
Required fields:
assessment_order, score_normalized, pass_flag
Optional fields:
week_of_class, assessment_type, assessment_name, class_avg_score, score_vs_class_avg, score_scale, pass_threshold, target_threshold, below_pass_threshold, below_target_threshold, performance_trend, support_level, recommended_action
Derived fields:
performance_trend
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Missing x => row skipped; missing y => kept as null gap; diagnostics include missing counts/warnings.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
Adapter preserves null y as gaps (no fake zero), suitable for trend continuity checks.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (S-T01); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
S-T03 - Peer comparison
Chart/component:
MetricCardView
viz_type:
card
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/card.adapter.js -> Frontend/src/components/charts/MetricCardView.jsx
Purpose:
Where do I stand compared to my class?
Metric:
score_percentile
Aggregation:
mixed count+avg
X-axis:
UNKNOWN
Y-axis:
score_percentile
Grouping/filter:
series=dimension, color=dimension
Required fields:
score_percentile, dimension
Optional fields:
UNKNOWN
Derived fields:
avg_score, engagement_score
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Uses first aggregate row; risk variant shows unknown state when at_risk_label/score invalid.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
Potential null->0 semantic coercion risk (verify metric meaning).
Severity:
Medium
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (S-T03); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
S-T06 - Study consistency check
Chart/component:
HeatmapView
viz_type:
heatmap
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/heatmap.adapter.js -> Frontend/src/components/charts/HeatmapView.jsx
Purpose:
Am I studying steadily or only before exams?
Metric:
weekly_clicks
Aggregation:
distribution
X-axis:
week_number
Y-axis:
weekly_clicks
Grouping/filter:
color=consistency_level
Required fields:
week_number, weekly_clicks
Optional fields:
UNKNOWN
Derived fields:
consistency_level
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Missing row/col dimension => row skipped; missing value => null cell displayed as dash (not zero-filled).
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
No obvious correctness red flag from static scan; runtime sample validation still recommended.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (S-T06); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
S-T07 - Absence / inactivity impact
Chart/component:
BarChartView
viz_type:
bar_chart
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/bar.adapter.js -> Frontend/src/components/charts/BarChartView.jsx
Purpose:
How much are my absences hurting my grades?
Metric:
score_normalized
Aggregation:
correlation
X-axis:
assessment_order
Y-axis:
score_normalized
Grouping/filter:
none/implicit SQL grouping
Required fields:
assessment_order, score_normalized
Optional fields:
UNKNOWN
Derived fields:
UNKNOWN
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Missing x/series/y => row skipped with warnings.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
No obvious correctness red flag from static scan; runtime sample validation still recommended.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (S-T07); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
S-T08 - Assessment lateness impact
Chart/component:
ScatterChartView
viz_type:
scatter_plot
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/scatter.adapter.js -> Frontend/src/components/charts/ScatterChartView.jsx
Purpose:
Does submitting late actually lower my score?
Metric:
score_normalized
Aggregation:
correlation
X-axis:
submission_delay_days
Y-axis:
score_normalized
Grouping/filter:
color=pass_flag
Required fields:
submission_delay_days, score_normalized, pass_flag
Optional fields:
UNKNOWN
Derived fields:
submission_delay_avg, punctuality_rate
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Invalid numeric x/y => point skipped with warnings.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
No obvious correctness red flag from static scan; runtime sample validation still recommended.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (S-T08); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
S-T11 - Registration timing vs performance
Chart/component:
MetricCardView
viz_type:
card
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/card.adapter.js -> Frontend/src/components/charts/MetricCardView.jsx
Purpose:
Did enrolling late put me at a disadvantage?
Metric:
avg_score
Aggregation:
correlation
X-axis:
registration_lead_time
Y-axis:
avg_score
Grouping/filter:
color=final_outcome
Required fields:
registration_lead_time, avg_score
Optional fields:
UNKNOWN
Derived fields:
UNKNOWN
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Uses first aggregate row; risk variant shows unknown state when at_risk_label/score invalid.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
No obvious correctness red flag from static scan; runtime sample validation still recommended.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (S-T11); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
S-T12 - Procrastination analysis
Chart/component:
MetricCardView
viz_type:
card
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/card.adapter.js -> Frontend/src/components/charts/MetricCardView.jsx
Purpose:
Am I a procrastinator and is it costing me marks?
Metric:
submission_delay_days
Aggregation:
distribution
X-axis:
assessment_order
Y-axis:
submission_delay_days
Grouping/filter:
color=pass_flag
Required fields:
assessment_order, submission_delay_days
Optional fields:
UNKNOWN
Derived fields:
submission_delay_avg, punctuality_rate
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Uses first aggregate row; risk variant shows unknown state when at_risk_label/score invalid.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
No obvious correctness red flag from static scan; runtime sample validation still recommended.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (S-T12); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
S-T13 - Action plan generation
Chart/component:
DataTableView
viz_type:
table
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/table.adapter.js -> Frontend/src/components/charts/DataTableView.jsx
Purpose:
What should I do differently starting next week?
Metric:
UNKNOWN
Aggregation:
mixed count+avg
X-axis:
UNKNOWN
Y-axis:
UNKNOWN
Grouping/filter:
color=at_risk_label
Required fields:
UNKNOWN
Optional fields:
UNKNOWN
Derived fields:
avg_score, at_risk_score, engagement_score, performance_trend
Correctness assessment:
Chart-goal fit based on viz_type appears flexible but contract-sensitive; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
No row-level null filtering; values rendered via formatCellValue (null/undefined shown as dash).
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
Potential null->0 semantic coercion risk (verify metric meaning). Table adapter does not enforce semantic types; relies on backend schema/output contract.
Severity:
Medium
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (S-T13); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
S-T14 - Social balance vs performance
Chart/component:
MetricCardView
viz_type:
card
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/card.adapter.js -> Frontend/src/components/charts/MetricCardView.jsx
Purpose:
Is my social life balanced with my academic commitments?
Metric:
avg_score
Aggregation:
correlation
X-axis:
social_balance_score
Y-axis:
avg_score
Grouping/filter:
none/implicit SQL grouping
Required fields:
social_balance_score, avg_score
Optional fields:
UNKNOWN
Derived fields:
avg_score
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Uses first aggregate row; risk variant shows unknown state when at_risk_label/score invalid.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
No obvious correctness red flag from static scan; runtime sample validation still recommended.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (S-T14); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
S-T15 - Family context vs performance
Chart/component:
MetricCardView
viz_type:
card
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/card.adapter.js -> Frontend/src/components/charts/MetricCardView.jsx
Purpose:
How might my family background be reflected in my academic patterns?
Metric:
avg_score
Aggregation:
correlation
X-axis:
family_stability_score
Y-axis:
avg_score
Grouping/filter:
none/implicit SQL grouping
Required fields:
family_stability_score, avg_score
Optional fields:
UNKNOWN
Derived fields:
avg_score
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Uses first aggregate row; risk variant shows unknown state when at_risk_label/score invalid.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
No obvious correctness red flag from static scan; runtime sample validation still recommended.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (S-T15); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
S-T16 - Grade goal calculator
Chart/component:
MetricCardView
viz_type:
card
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/card.adapter.js -> Frontend/src/components/charts/MetricCardView.jsx
Purpose:
What score do I need on remaining assessments to pass or hit my target?
Metric:
current_score
Aggregation:
sum
X-axis:
UNKNOWN
Y-axis:
UNKNOWN
Grouping/filter:
color=pass_goal_status
Required fields:
current_score, needed_score_for_pass, needed_score_for_target, pass_goal_status, target_goal_status, remaining_assessments, calculation_mode
Optional fields:
score_scale, pass_threshold, target_threshold, completed_assessments, completed_weight_pct, remaining_weight_pct
Derived fields:
current_score, needed_score_for_pass, needed_score_for_target, pass_goal_status, target_goal_status
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Uses first aggregate row; risk variant shows unknown state when at_risk_label/score invalid.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
No obvious correctness red flag from static scan; runtime sample validation still recommended.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (S-T16); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

## Priority Group: Engagement

Task:
A-B03 - Engagement distribution
Chart/component:
BarChartView
viz_type:
bar_chart
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/bar.adapter.js -> Frontend/src/components/charts/BarChartView.jsx
Purpose:
What proportion of the class is disengaged?
Metric:
student_count
Aggregation:
distribution
X-axis:
study_effort_level
Y-axis:
student_count
Grouping/filter:
color=study_effort_level
Required fields:
study_effort_level, student_count
Optional fields:
pct_of_class, avg_engagement_score
Derived fields:
engagement_score, study_effort_level
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Missing x/series/y => row skipped with warnings.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
Potential null->0 semantic coercion risk (verify metric meaning).
Severity:
Medium
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-B03); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
A-C06 - Compare resource usage
Chart/component:
BarChartView
viz_type:
bar_chart
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/bar.adapter.js -> Frontend/src/components/charts/BarChartView.jsx
Purpose:
Is one student using resources more strategically than the other?
Metric:
pct_of_total
Aggregation:
sum
X-axis:
resource_type
Y-axis:
pct_of_total
Grouping/filter:
series=student_id, color=student_id
Required fields:
resource_type, pct_of_total, student_id
Optional fields:
UNKNOWN
Derived fields:
vle_diversity_score
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Missing x/series/y => row skipped with warnings.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
No obvious correctness red flag from static scan; runtime sample validation still recommended.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-C06); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
A-G01 - Identify low-engagement group
Chart/component:
ScatterChartView
viz_type:
scatter_plot
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/scatter.adapter.js -> Frontend/src/components/charts/ScatterChartView.jsx
Purpose:
Which students are dangerously disengaged and need outreach?
Metric:
engagement_score
Aggregation:
sum
X-axis:
active_days
Y-axis:
engagement_score
Grouping/filter:
color=study_effort_level
Required fields:
active_days, engagement_score, study_effort_level
Optional fields:
UNKNOWN
Derived fields:
engagement_score, study_effort_level
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Invalid numeric x/y => point skipped with warnings.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
Potential null->0 semantic coercion risk (verify metric meaning).
Severity:
Medium
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-G01); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
A-G06 - Activity type effectiveness
Chart/component:
BarChartView
viz_type:
bar_chart
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/bar.adapter.js -> Frontend/src/components/charts/BarChartView.jsx
Purpose:
Which learning activities should the admin encourage students to use more?
Metric:
avg_score_by_resource_type
Aggregation:
correlation
X-axis:
resource_type
Y-axis:
avg_score_by_resource_type
Grouping/filter:
color=resource_type
Required fields:
resource_type, avg_score_by_resource_type
Optional fields:
UNKNOWN
Derived fields:
avg_score
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Missing x/series/y => row skipped with warnings.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
No obvious correctness red flag from static scan; runtime sample validation still recommended.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-G06); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
A-G11 - Weekly engagement drop detection
Chart/component:
LineChartView
viz_type:
line_chart
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/line.adapter.js -> Frontend/src/components/charts/LineChartView.jsx
Purpose:
Which weeks should the admin schedule check-ins or motivational nudges?
Metric:
week_total_clicks
Aggregation:
trend (time-ordered aggregation from SQL)
X-axis:
week_number
Y-axis:
week_total_clicks
Grouping/filter:
series=rolling_3wk_avg, color=is_drop_week
Required fields:
week_number, week_total_clicks, rolling_3wk_avg
Optional fields:
UNKNOWN
Derived fields:
is_drop_week
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Missing x => row skipped; missing y => kept as null gap; diagnostics include missing counts/warnings.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
Adapter preserves null y as gaps (no fake zero), suitable for trend continuity checks.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-G11); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
A-S03 - Student engagement trajectory
Chart/component:
LineChartView
viz_type:
line_chart
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/line.adapter.js -> Frontend/src/components/charts/LineChartView.jsx
Purpose:
When exactly did this student start disengaging?
Metric:
weekly_clicks
Aggregation:
trend (time-ordered aggregation from SQL)
X-axis:
week_number
Y-axis:
weekly_clicks
Grouping/filter:
series=rolling_3wk_avg
Required fields:
week_number, weekly_clicks, rolling_3wk_avg
Optional fields:
UNKNOWN
Derived fields:
early_warning_week, weekly_engagement_drop, consistency_level
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Missing x => row skipped; missing y => kept as null gap; diagnostics include missing counts/warnings.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
Adapter preserves null y as gaps (no fake zero), suitable for trend continuity checks.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-S03); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
S-B03 - Engagement summary
Chart/component:
MetricCardView
viz_type:
card
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/card.adapter.js -> Frontend/src/components/charts/MetricCardView.jsx
Purpose:
How active am I compared to classmates?
Metric:
engagement_score
Aggregation:
avg/rate/count style aggregation (SQL-driven)
X-axis:
study_effort_level
Y-axis:
engagement_score
Grouping/filter:
color=study_effort_level
Required fields:
total_engagement_count, active_days, engagement_score, class_avg_engagement_score, study_effort_level
Optional fields:
UNKNOWN
Derived fields:
total_engagement_count, active_days, engagement_score, class_avg_engagement_score, study_effort_level
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Uses first aggregate row; risk variant shows unknown state when at_risk_label/score invalid.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
Potential null->0 semantic coercion risk (verify metric meaning).
Severity:
Medium
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (S-B03); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
S-T05 - Weekly engagement trend
Chart/component:
BarChartView
viz_type:
bar_chart
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/bar.adapter.js -> Frontend/src/components/charts/BarChartView.jsx
Purpose:
Which weeks did I disengage and why might that be?
Metric:
weekly_clicks
Aggregation:
trend (time-ordered aggregation from SQL)
X-axis:
week_number
Y-axis:
weekly_clicks
Grouping/filter:
color=weekly_engagement_drop
Required fields:
week_number, weekly_clicks
Optional fields:
UNKNOWN
Derived fields:
early_warning_week, weekly_engagement_drop
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Missing x/series/y => row skipped with warnings.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
No obvious correctness red flag from static scan; runtime sample validation still recommended.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (S-T05); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
S-T10 - Resource engagement breakdown
Chart/component:
PieChartView
viz_type:
pie_chart
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/pie.adapter.js -> Frontend/src/components/charts/PieChartView.jsx
Purpose:
Am I using the full range of learning resources available?
Metric:
clicks
Aggregation:
distribution
X-axis:
resource_type
Y-axis:
clicks
Grouping/filter:
color=resource_type
Required fields:
resource_type, clicks
Optional fields:
UNKNOWN
Derived fields:
vle_diversity_score, forum_engagement_rate
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Missing category => mapped to Unknown; invalid value => slice skipped; small categories can be merged into Other.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
Adapter maps missing category to "Unknown" and may merge small slices into "Other".
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (S-T10); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

## Priority Group: Assessment

Task:
A-B02 - Completion / outcome summary
Chart/component:
PieChartView
viz_type:
pie_chart
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/pie.adapter.js -> Frontend/src/components/charts/PieChartView.jsx
Purpose:
How many students passed, failed, or withdrew?
Metric:
student_count
Aggregation:
avg/rate/count style aggregation (SQL-driven)
X-axis:
final_outcome
Y-axis:
student_count
Grouping/filter:
color=final_outcome
Required fields:
final_outcome, student_count
Optional fields:
UNKNOWN
Derived fields:
UNKNOWN
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Missing category => mapped to Unknown; invalid value => slice skipped; small categories can be merged into Other.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
Potential division-by-zero risk (division seen without NULLIF guard). Adapter maps missing category to "Unknown" and may merge small slices into "Other".
Severity:
High
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-B02); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
A-G04 - Assessment difficulty analysis
Chart/component:
BarChartView
viz_type:
bar_chart
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/bar.adapter.js -> Frontend/src/components/charts/BarChartView.jsx
Purpose:
Which assessment is causing the most students to fail?
Metric:
fail_rate_pct
Aggregation:
distribution
X-axis:
assessment_name
Y-axis:
fail_rate_pct
Grouping/filter:
color=assessment_type
Required fields:
assessment_name, fail_rate_pct
Optional fields:
UNKNOWN
Derived fields:
UNKNOWN
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Missing x/series/y => row skipped with warnings.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
No obvious correctness red flag from static scan; runtime sample validation still recommended.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-G04); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
A-G05 - Submission behaviour analysis
Chart/component:
BarChartView
viz_type:
bar_chart
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/bar.adapter.js -> Frontend/src/components/charts/BarChartView.jsx
Purpose:
Are late submissions a systemic problem in this class?
Metric:
submission_delay_avg
Aggregation:
mixed count+avg
X-axis:
final_outcome
Y-axis:
submission_delay_avg
Grouping/filter:
series=assessment_type, color=late_submission_rate
Required fields:
final_outcome, assessment_type, submission_delay_avg, late_submission_rate
Optional fields:
submission_count, student_count, net_submission_delay_avg, punctuality_rate, avg_score, submission_risk_level
Derived fields:
final_outcome, assessment_type, submission_delay_avg, late_submission_rate, punctuality_rate
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Missing x/series/y => row skipped with warnings.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
Potential null->0 semantic coercion risk (verify metric meaning).
Severity:
Medium
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-G05); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
A-S05 - Student competency gap
Chart/component:
BarChartView
viz_type:
bar_chart
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/bar.adapter.js -> Frontend/src/components/charts/BarChartView.jsx
Purpose:
Where should we focus academic support for this student?
Metric:
avg_score
Aggregation:
distribution
X-axis:
competency_tag
Y-axis:
avg_score
Grouping/filter:
color=competency_tag
Required fields:
competency_tag, avg_score
Optional fields:
UNKNOWN
Derived fields:
UNKNOWN
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Missing x/series/y => row skipped with warnings.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
No obvious correctness red flag from static scan; runtime sample validation still recommended.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-S05); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
S-T02 - Competency gap analysis
Chart/component:
BarChartView
viz_type:
bar_chart
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/bar.adapter.js -> Frontend/src/components/charts/BarChartView.jsx
Purpose:
Which skill area should I prioritise for improvement?
Metric:
avg_score
Aggregation:
distribution
X-axis:
competency_tag
Y-axis:
avg_score
Grouping/filter:
color=competency_tag
Required fields:
competency_tag, avg_score
Optional fields:
UNKNOWN
Derived fields:
UNKNOWN
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Missing x/series/y => row skipped with warnings.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
No obvious correctness red flag from static scan; runtime sample validation still recommended.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (S-T02); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
S-T17 - Assessment status timeline
Chart/component:
DataTableView
viz_type:
table
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/table.adapter.js -> Frontend/src/components/charts/DataTableView.jsx
Purpose:
Which assessments are already submitted and which are still pending?
Metric:
submitted_flag
Aggregation:
UNKNOWN
X-axis:
assessment_order
Y-axis:
submitted_flag
Grouping/filter:
color=submission_status
Required fields:
assessment_order, assessment_name, submission_status, submitted_flag
Optional fields:
assessment_type, week_of_class, due_day, submission_day, score_normalized
Derived fields:
submission_status
Correctness assessment:
Chart-goal fit based on viz_type appears flexible but contract-sensitive; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
No row-level null filtering; values rendered via formatCellValue (null/undefined shown as dash).
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
Table adapter does not enforce semantic types; relies on backend schema/output contract.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (S-T17); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

## Priority Group: Dropout/outcome

Task:
A-G12 - Background group pass/fail/withdrawal rate
Chart/component:
BarChartView
viz_type:
bar_chart
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/bar.adapter.js -> Frontend/src/components/charts/BarChartView.jsx
Purpose:
Which demographic groups have the highest failure or dropout rate?
Metric:
student_count
Aggregation:
sum
X-axis:
group_value
Y-axis:
student_count
Grouping/filter:
series=final_outcome, color=final_outcome
Required fields:
group_value, student_count, final_outcome
Optional fields:
UNKNOWN
Derived fields:
UNKNOWN
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Missing x/series/y => row skipped with warnings.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
No obvious correctness red flag from static scan; runtime sample validation still recommended.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-G12); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

Task:
A-G14 - Early withdrawal signal analysis
Chart/component:
LineChartView
viz_type:
line_chart
Source API:
POST /api/analytics/run (Backend/src/controllers/analytics.controller.js::runAnalyticsController)
Adapter/renderer:
Frontend/src/components/ChartRenderer.jsx -> Frontend/src/chartAdapters/line.adapter.js -> Frontend/src/components/charts/LineChartView.jsx
Purpose:
How early can admin detect a student about to drop out?
Metric:
avg_clicks
Aggregation:
trend (time-ordered aggregation from SQL)
X-axis:
week_number
Y-axis:
avg_clicks
Grouping/filter:
series=final_outcome, color=final_outcome
Required fields:
week_number, avg_clicks, final_outcome
Optional fields:
UNKNOWN
Derived fields:
UNKNOWN
Correctness assessment:
Chart-goal fit based on viz_type appears reasonable; axis mapping driven by visualization_config and adapter checks. Unit/scale: rate/percentage or normalized score (verify 0-1 vs 0-100 semantics).
Missing/null handling:
Missing x => row skipped; missing y => kept as null gap; diagnostics include missing counts/warnings.
Empty state behavior:
ChartRenderer shows NoDataState: "No valid data after applying missing-data policy."; chart views also show "No data to display" for empty adapted payload.
Potential issue:
Adapter preserves null y as gaps (no fake zero), suitable for trend continuity checks.
Severity:
Low
Evidence:
Task metadata: Backend/src/config/taskRegistry.json (A-G14); runtime renderer: Frontend/src/components/ChartRenderer.jsx; adapter policy: Frontend/src/chartAdapters/adapterPolicy.js; chart view component behavior from Frontend/src/components/charts/*.jsx; output contract gate: Backend/src/services/outputSchema.service.js.
Recommended change:
Define/complete output_schema.required_columns for this task, include explicit unit/scale metadata, and surface adapter diagnostics/warnings in UI when partial data is rendered.

