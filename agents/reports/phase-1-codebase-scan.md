# Phase 1 Codebase Scan Report

- Mode: CODEBASE SCAN ONLY (report-only, no code changes)
- Scope: All analytics tasks found in `Backend/src/config/taskRegistry.json`
- Total tasks: 57

## Evidence Base
- Task registry: `Backend/src/config/taskRegistry.json`
- Analytics run endpoint: `POST /api/analytics/run` via `Backend/src/routes/analytics.routes.js` -> `runAnalyticsController` in `Backend/src/controllers/analytics.controller.js`
- Task list/detail endpoints: `GET /api/tasks`, `GET /api/tasks/:taskId` via `Backend/src/controllers/tasks.controller.js`
- Task validation endpoint: `GET /api/tasks/validate-one/:taskId` via `Backend/src/controllers/taskValidator.controller.js`
- Availability engine: `Backend/src/services/capabilityValidator.service.js` (Layer A/B/C/D)
- Frontend callers: `Frontend/src/services/analyticsApi.js`, `Frontend/src/hooks/useAnalytics.js`, `Frontend/src/pages/AnalyticsWorkspace.jsx`
- Chart component resolver: `Frontend/src/components/ChartRenderer.jsx`

## S-B01 - Performance overview
- Task name: Performance overview
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `S-B01`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: MetricCardView (Frontend/src/components/charts/MetricCardView.jsx)
- Tables used: enrollment, assessment_result, assessment
- Columns used: keyDbFields=[avg_score [FE], pass_rate [FE], performance_trend [FE], final_outcome]; output.required=[avg_score, pass_rate, performance_trend, final_outcome]; output.optional=[class_avg_score, score_percentile, unweighted_avg_score, weighted_avg_score, score_strategy, assessment_count, score_vs_class_avg, cohort_size, score_scale, pass_threshold, target_threshold, performance_band]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores,final_outcome; datasetCompatibility=both; fallbackStrategy=show_empty_state
- Related charts: card, bar | card

## S-B02 - Risk status card
- Task name: Risk status card
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `S-B02`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: MetricCardView (Frontend/src/components/charts/MetricCardView.jsx)
- Tables used: enrollment, assessment_result, assessment, engagement
- Columns used: keyDbFields=[at_risk_score [FE], at_risk_label [FE]; punctuality_rate [FE cross] (OULAD: submission_day/due_day; UCI: 1âˆ’absences_rate)]; output.required=[avg_score, at_risk_score, at_risk_label]; output.optional=[engagement_score, engagement_score_available, punctuality_rate, previous_attempt_count, score_strategy, score_scale, pass_threshold, target_threshold]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores; optionalCapabilities=engagement_tracking; datasetCompatibility=both; fallbackStrategy=show_empty_state
- Related charts: card

## S-B03 - Engagement summary
- Task name: Engagement summary
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `S-B03`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: MetricCardView (Frontend/src/components/charts/MetricCardView.jsx)
- Tables used: enrollment, engagement
- Columns used: keyDbFields=[total_engagement_count [FE], active_days [FE], engagement_score [FE], class_avg_engagement_score [FE], study_effort_level [FE]]; output.required=[total_engagement_count, active_days, engagement_score, class_avg_engagement_score, study_effort_level]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores,engagement_tracking; datasetCompatibility=both; fallbackStrategy=hide_when_unavailable
- Related charts: bar, gauge | card

## S-T00 - Score prediction (What-If)
- Task name: Score prediction (What-If)
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `S-T00`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: ScatterChartView (Frontend/src/components/charts/ScatterChartView.jsx)
- Tables used: enrollment, assessment_result, assessment, engagement
- Columns used: keyDbFields=[avg_score [FE cross], engagement_score [FE cross], studytime (UCI) / total_clicks (OULAD)]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores,engagement_tracking; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task; availability_contract=present
- Related charts: gauge, line | scatter_plot

## S-T01 - Score trend analysis
- Task name: Score trend analysis
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `S-T01`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: LineChartView (Frontend/src/components/charts/LineChartView.jsx)
- Tables used: assessment_result, assessment
- Columns used: keyDbFields=[score_normalized, assessment_order, week_of_class, assessment_type; performance_trend [FE cross]]; output.required=[assessment_order, score_normalized, pass_flag]; output.optional=[week_of_class, assessment_type, assessment_name, class_avg_score, score_vs_class_avg, score_scale, pass_threshold, target_threshold, below_pass_threshold, below_target_threshold, performance_trend, support_level, recommended_action]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores,submission_history; datasetCompatibility=both; fallbackStrategy=show_empty_state
- Related charts: line | line_chart

## S-T02 - Competency gap analysis
- Task name: Competency gap analysis
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `S-T02`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: BarChartView (Frontend/src/components/charts/BarChartView.jsx)
- Tables used: assessment_result, assessment
- Columns used: keyDbFields=[competency_tag, score_normalized, pass_flag, assessment_type]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores; optionalCapabilities=competency_tagging,proxy_competency_available; datasetCompatibility=both; fallbackStrategy=show_partial_data
- Related charts: radar, bar | bar_chart

## S-T03 - Peer comparison
- Task name: Peer comparison
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `S-T03`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: MetricCardView (Frontend/src/components/charts/MetricCardView.jsx)
- Tables used: enrollment, assessment_result, assessment, engagement
- Columns used: keyDbFields=[avg_score [FE cross], engagement_score [FE cross], pass_rate [FE cross], performance_trend [FE cross]]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores,multi_student_comparison; optionalCapabilities=engagement_tracking; datasetCompatibility=both; fallbackStrategy=show_empty_state
- Related charts: bar, gauge | card

## S-T04 - At-risk self-check
- Task name: At-risk self-check
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `S-T04`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: ChecklistView (Frontend/src/components/charts/ChecklistView.jsx)
- Tables used: enrollment, assessment_result, assessment, engagement
- Columns used: keyDbFields=[at_risk_score [FE cross], at_risk_label [FE cross], avg_score [FE cross], engagement_score [FE cross], punctuality_rate [FE cross], performance_trend [FE cross], previous_attempt_count]; output.required=[flag_name, flag_value, threshold, triggered]; output.optional=[severity, flag_description, recommended_action, support_category]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores; optionalCapabilities=engagement_tracking,absence_tracking; datasetCompatibility=both; fallbackStrategy=show_empty_state
- Related charts: checklist

## S-T05 - Weekly engagement trend
- Task name: Weekly engagement trend
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `S-T05`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: BarChartView (Frontend/src/components/charts/BarChartView.jsx)
- Tables used: engagement [OULAD only]
- Columns used: keyDbFields=[week_number, engagement_count; early_warning_week [FE cross], weekly_engagement_drop [FE cross]]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=engagement_tracking,temporal_activity; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task
- Related charts: bar | bar_chart

## S-T06 - Study consistency check
- Task name: Study consistency check
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `S-T06`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: HeatmapView (Frontend/src/components/charts/HeatmapView.jsx)
- Tables used: enrollment, engagement [OULAD only]
- Columns used: keyDbFields=[week_number, engagement_count; consistency_level [FE cross]]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=engagement_tracking,temporal_activity; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task
- Related charts: heatmap, bar | heatmap

## S-T07 - Absence / inactivity impact
- Task name: Absence / inactivity impact
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `S-T07`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: BarChartView (Frontend/src/components/charts/BarChartView.jsx)
- Tables used: enrollment, assessment_result, assessment
- Columns used: keyDbFields=[absences [enrollment, UCI only]; score_normalized, pass_flag [assessment_result]]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores,absence_tracking; datasetCompatibility=both; fallbackStrategy=hide_task; availability_contract=present
- Related charts: bar, line | bar_chart

## S-T08 - Assessment lateness impact
- Task name: Assessment lateness impact
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `S-T08`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: ScatterChartView (Frontend/src/components/charts/ScatterChartView.jsx)
- Tables used: assessment_result, assessment [OULAD only]
- Columns used: keyDbFields=[submission_delay_days, score_normalized, assessment_type; submission_delay_avg [FE cross], punctuality_rate [FE cross]]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=submission_timestamps; datasetCompatibility=both; fallbackStrategy=hide_task; availability_contract=present
- Related charts: scatter, bar | scatter_plot

## S-T09 - Lifestyle risk vs performance
- Task name: Lifestyle risk vs performance
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `S-T09`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: MetricCardView (Frontend/src/components/charts/MetricCardView.jsx)
- Tables used: student, assessment_result, assessment [UCI only]
- Columns used: keyDbFields=[alcohol_weekday, alcohol_weekend, go_out_freq, health_status, family_relation, free_time, lifestyle_risk_score [FE single]]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores,lifestyle_factors; datasetCompatibility=UCI_only; fallbackStrategy=hide_task; availability_contract=present
- Related charts: scatter, radar | card

## S-T10 - Resource engagement breakdown
- Task name: Resource engagement breakdown
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `S-T10`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: PieChartView (Frontend/src/components/charts/PieChartView.jsx)
- Tables used: engagement, event [OULAD only]
- Columns used: keyDbFields=[resource_type, engagement_count; vle_diversity_score [FE cross], forum_engagement_rate [FE cross], quiz_engagement_rate [FE cross]]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=engagement_tracking,resource_clickstream; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task
- Related charts: donut, bar | pie_chart

## S-T11 - Registration timing vs performance
- Task name: Registration timing vs performance
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `S-T11`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: MetricCardView (Frontend/src/components/charts/MetricCardView.jsx)
- Tables used: enrollment, assessment_result, assessment [OULAD only]
- Columns used: keyDbFields=[enrollment_start_day, registration_lead_time [FE single], final_outcome]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores,registration_timing; datasetCompatibility=both; fallbackStrategy=show_empty_state; availability_contract=present
- Related charts: scatter | card

## S-T12 - Procrastination analysis
- Task name: Procrastination analysis
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `S-T12`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: MetricCardView (Frontend/src/components/charts/MetricCardView.jsx)
- Tables used: assessment_result, assessment [OULAD only]
- Columns used: keyDbFields=[submission_delay_days, score_normalized, pass_flag; submission_delay_avg [FE cross], punctuality_rate [FE cross]]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores,submission_timestamps; datasetCompatibility=both; fallbackStrategy=hide_task; availability_contract=present
- Related charts: bar | card

## S-T13 - Action plan generation
- Task name: Action plan generation
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `S-T13`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: DataTableView (Frontend/src/components/charts/DataTableView.jsx)
- Tables used: enrollment, student
- Columns used: keyDbFields=[[AI_SYNTHESIS] avg_score [FE cross], at_risk_score [FE cross], engagement_score [FE cross], absence_rate [FE single], performance_trend [FE cross], lifestyle_risk_score [FE single]]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores; optionalCapabilities=engagement_tracking; datasetCompatibility=both; fallbackStrategy=show_empty_state
- Related charts: none | table

## S-T14 - Social balance vs performance
- Task name: Social balance vs performance
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `S-T14`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: MetricCardView (Frontend/src/components/charts/MetricCardView.jsx)
- Tables used: student, assessment_result, assessment [UCI only]
- Columns used: keyDbFields=[social_balance_score [FE single], avg_score [FE cross], free_time, go_out_freq, alcohol_weekday]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores,lifestyle_factors; datasetCompatibility=UCI_only; fallbackStrategy=hide_task; availability_contract=present
- Related charts: scatter | card

## S-T15 - Family context vs performance
- Task name: Family context vs performance
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `S-T15`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: MetricCardView (Frontend/src/components/charts/MetricCardView.jsx)
- Tables used: student, assessment_result, assessment [UCI only]
- Columns used: keyDbFields=[family_stability_score [FE single], avg_score [FE cross], family_relation, parent_cohabitation_status, mother/father_education_level]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores,family_context; datasetCompatibility=UCI_only; fallbackStrategy=hide_task; availability_contract=present
- Related charts: scatter, bar | card

## S-T16 - Grade goal calculator
- Task name: Grade goal calculator
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `S-T16`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: MetricCardView (Frontend/src/components/charts/MetricCardView.jsx)
- Tables used: assessment, assessment_result, enrollment
- Columns used: keyDbFields=[current_score [FE], needed_score_for_pass [FE], needed_score_for_target [FE], remaining_assessments, pass_goal_status [FE], target_goal_status [FE]]; output.required=[current_score, needed_score_for_pass, needed_score_for_target, pass_goal_status, target_goal_status, remaining_assessments, calculation_mode]; output.optional=[score_scale, pass_threshold, target_threshold, completed_assessments, completed_weight_pct, remaining_weight_pct]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores; optionalCapabilities=assessment_weights; datasetCompatibility=both; fallbackStrategy=show_empty_state
- Related charts: card, table | card

## S-T17 - Assessment status timeline
- Task name: Assessment status timeline
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `S-T17`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: DataTableView (Frontend/src/components/charts/DataTableView.jsx)
- Tables used: assessment, assessment_result, enrollment
- Columns used: keyDbFields=[assessment_order, assessment_name, submission_status [FE], score_normalized, submission_day, due_day]; output.required=[assessment_order, assessment_name, submission_status, submitted_flag]; output.optional=[assessment_type, week_of_class, due_day, submission_day, score_normalized]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores; datasetCompatibility=both; fallbackStrategy=show_empty_state
- Related charts: timeline, table | table

## A-B01 - Overall performance distribution
- Task name: Overall performance distribution
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-B01`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: BarChartView (Frontend/src/components/charts/BarChartView.jsx)
- Tables used: assessment_result, assessment, enrollment
- Columns used: keyDbFields=[score_normalized, assessment_type]; output.required=[score_bucket, student_count]; output.optional=[pct_of_class, dataset_source, avg_score_in_bucket]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores,final_outcome; datasetCompatibility=both; fallbackStrategy=show_empty_state
- Related charts: histogram, boxplot | bar_chart

## A-B02 - Completion / outcome summary
- Task name: Completion / outcome summary
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-B02`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: PieChartView (Frontend/src/components/charts/PieChartView.jsx)
- Tables used: enrollment
- Columns used: keyDbFields=[final_outcome, class_id]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=final_outcome; datasetCompatibility=both; fallbackStrategy=show_empty_state
- Related charts: bar, donut | pie_chart

## A-B03 - Engagement distribution
- Task name: Engagement distribution
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-B03`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: BarChartView (Frontend/src/components/charts/BarChartView.jsx)
- Tables used: enrollment, engagement
- Columns used: keyDbFields=[engagement_score [FE], study_effort_level [FE], total_engagement_count]; output.required=[study_effort_level, student_count]; output.optional=[pct_of_class, avg_engagement_score]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=engagement_tracking; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task
- Related charts: histogram, bar | bar_chart

## A-B04 - At-risk overview
- Task name: At-risk overview
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-B04`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: BarChartView (Frontend/src/components/charts/BarChartView.jsx)
- Tables used: enrollment, assessment_result, assessment, engagement
- Columns used: keyDbFields=[at_risk_label [FE], at_risk_score [FE]; enrollment_id and avg_score from enrollment + score_agg JOIN (not from risk_flags directly)]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores,engagement_tracking; datasetCompatibility=both; fallbackStrategy=hide_task
- Related charts: card, bar | bar_chart

## A-S01 - Student full profile snapshot
- Task name: Student full profile snapshot
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-S01`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: DataTableView (Frontend/src/components/charts/DataTableView.jsx)
- Tables used: student, enrollment
- Columns used: keyDbFields=[student_id, gender, age_group, avg_score [FE cross], engagement_score [FE cross], at_risk_label [FE cross], at_risk_score [FE cross], study_effort_level [FE cross], final_outcome, previous_attempt_count]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores,engagement_tracking; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task
- Related charts: card | table

## A-S02 - Student score trend
- Task name: Student score trend
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-S02`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: LineChartView (Frontend/src/components/charts/LineChartView.jsx)
- Tables used: assessment_result, assessment
- Columns used: keyDbFields=[score_normalized, assessment_order, week_of_class, assessment_type; performance_trend [FE cross]]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores,submission_history; datasetCompatibility=both; fallbackStrategy=show_empty_state
- Related charts: line | line_chart

## A-S03 - Student engagement trajectory
- Task name: Student engagement trajectory
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-S03`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: LineChartView (Frontend/src/components/charts/LineChartView.jsx)
- Tables used: engagement [OULAD only]
- Columns used: keyDbFields=[week_number, engagement_count; early_warning_week [FE cross], weekly_engagement_drop [FE cross], consistency_level [FE cross]]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=engagement_tracking,temporal_activity; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task
- Related charts: line, bar | line_chart

## A-S04 - Student risk flag breakdown
- Task name: Student risk flag breakdown
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-S04`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: DataTableView (Frontend/src/components/charts/DataTableView.jsx)
- Tables used: enrollment, assessment_result, assessment, engagement
- Columns used: keyDbFields=[at_risk_score [FE cross], at_risk_label [FE cross], avg_score [FE cross], engagement_score [FE cross], punctuality_rate [FE cross], performance_trend [FE cross], previous_attempt_count]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores,absence_tracking; datasetCompatibility=UCI_only; fallbackStrategy=hide_task; availability_contract=present
- Related charts: checklist | table

## A-S05 - Student competency gap
- Task name: Student competency gap
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-S05`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: BarChartView (Frontend/src/components/charts/BarChartView.jsx)
- Tables used: assessment_result, assessment
- Columns used: keyDbFields=[competency_tag, score_normalized, pass_flag, assessment_type]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores; optionalCapabilities=competency_tagging,proxy_competency_available; datasetCompatibility=both; fallbackStrategy=show_partial_data
- Related charts: radar, bar | bar_chart

## A-S06 - Student submission & punctuality
- Task name: Student submission & punctuality
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-S06`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: BarChartView (Frontend/src/components/charts/BarChartView.jsx)
- Tables used: assessment_result, assessment [OULAD only]
- Columns used: keyDbFields=[submission_delay_days, score_normalized, assessment_type; submission_delay_avg [FE cross], punctuality_rate [FE cross]]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=submission_timestamps; datasetCompatibility=both; fallbackStrategy=hide_task; availability_contract=present
- Related charts: bar | bar_chart

## A-S07 - Student background context
- Task name: Student background context
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-S07`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: DataTableView (Frontend/src/components/charts/DataTableView.jsx)
- Tables used: student, enrollment
- Columns used: keyDbFields=[highest_education, socioeconomic_band, disadvantage_score [FE single], support_score [FE single], family_stability_score [FE single], disability_flag, internet_access_flag, previous_attempt_count]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores,demographics,lifestyle_factors; optionalCapabilities=family_context; datasetCompatibility=UCI_only; fallbackStrategy=show_partial_data
- Related charts: card, radar | table

## A-S08 - Student intervention recommendation
- Task name: Student intervention recommendation
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-S08`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: DataTableView (Frontend/src/components/charts/DataTableView.jsx)
- Tables used: enrollment, student, assessment_result, assessment, engagement
- Columns used: keyDbFields=[[AI_SYNTHESIS] avg_score [FE cross], at_risk_score [FE cross], engagement_score [FE cross], punctuality_rate [FE cross], performance_trend [FE cross], early_warning_week [FE cross], support_score [FE single]]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores,engagement_tracking; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task; availability_contract=present
- Related charts: none | table

## A-C01 - Compare performance trajectories
- Task name: Compare performance trajectories
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-C01`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: LineChartView (Frontend/src/components/charts/LineChartView.jsx)
- Tables used: assessment_result, assessment, enrollment
- Columns used: keyDbFields=[score_normalized, assessment_order, week_of_class, assessment_type]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores,multi_student_comparison; datasetCompatibility=both; fallbackStrategy=show_empty_state
- Related charts: line | line_chart

## A-C02 - Compare engagement patterns
- Task name: Compare engagement patterns
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-C02`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: BarChartView (Frontend/src/components/charts/BarChartView.jsx)
- Tables used: enrollment, engagement
- Columns used: keyDbFields=[metric [FE cross], engagement_score [FE cross], study_effort_level [FE cross], total_clicks, active_days]; output.required=[student_id, metric, engagement_score]; output.optional=[total_clicks, active_days, study_effort_level]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=engagement_tracking,multi_student_comparison; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task; availability_contract=present
- Related charts: grouped_bar | bar_chart

## A-C03 - Compare risk profile
- Task name: Compare risk profile
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-C03`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: DataTableView (Frontend/src/components/charts/DataTableView.jsx)
- Tables used: enrollment, assessment_result, assessment, engagement
- Columns used: keyDbFields=[student_id [FE cross], at_risk_score [FE cross], at_risk_label [FE cross], avg_score [FE cross], engagement_score [FE cross], punctuality_rate [FE cross], performance_trend [FE cross], flag_low_score, flag_repeated, flag_low_engagement, flag_low_punctuality, flag_neg_trend, previous_attempt_count, final_outcome]; output.required=[student_id, at_risk_score, at_risk_label]; output.optional=[avg_score, performance_trend, punctuality_rate, engagement_score, previous_attempt_count, flag_low_score, flag_repeated, flag_low_engagement, flag_low_punctuality, flag_neg_trend, final_outcome]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores,engagement_tracking,multi_student_comparison; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task; availability_contract=present
- Related charts: table

## A-C04 - Compare lifestyle context
- Task name: Compare lifestyle context
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-C04`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: BarChartView (Frontend/src/components/charts/BarChartView.jsx)
- Tables used: student, enrollment [UCI only]
- Columns used: keyDbFields=[student_id [FE cross], lifestyle_dimension [FE cross], lifestyle_risk_score [FE cross], alcohol_weekday, alcohol_weekend, go_out_freq, health_status, free_time, composite_lifestyle_risk_score, social_balance_score]; output.required=[student_id, lifestyle_dimension, lifestyle_risk_score]; output.optional=[alcohol_weekday, alcohol_weekend, go_out_freq, health_status, free_time, composite_lifestyle_risk_score, social_balance_score]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores,lifestyle_factors,multi_student_comparison; datasetCompatibility=UCI_only; fallbackStrategy=show_empty_state; availability_contract=present
- Related charts: grouped_bar | bar_chart

## A-C05 - Compare academic background
- Task name: Compare academic background
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-C05`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: DataTableView (Frontend/src/components/charts/DataTableView.jsx)
- Tables used: student, enrollment
- Columns used: keyDbFields=[highest_education, previous_attempt_count, imd_score_numeric, socioeconomic_band, disability_flag, disadvantage_score [FE single], support_score [FE single], family_stability_score [FE single]]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=socioeconomic_context,multi_student_comparison; datasetCompatibility=both; fallbackStrategy=hide_task; availability_contract=present
- Related charts: table

## A-C06 - Compare resource usage
- Task name: Compare resource usage
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-C06`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: BarChartView (Frontend/src/components/charts/BarChartView.jsx)
- Tables used: enrollment, engagement, event [OULAD only]
- Columns used: keyDbFields=[resource_type, engagement_count; vle_diversity_score [FE cross], forum_engagement_rate [FE cross], quiz_engagement_rate [FE cross]]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=engagement_tracking,resource_clickstream,multi_student_comparison; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task
- Related charts: bar, donut | bar_chart

## A-G01 - Identify low-engagement group
- Task name: Identify low-engagement group
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-G01`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: ScatterChartView (Frontend/src/components/charts/ScatterChartView.jsx)
- Tables used: enrollment, engagement
- Columns used: keyDbFields=[engagement_score [FE cross], study_effort_level [FE cross], total_clicks (engagement), active_days]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=engagement_tracking; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task
- Related charts: scatter, histogram | scatter_plot

## A-G02 - Engagementâ€“performance relationship
- Task name: Engagementâ€“performance relationship
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-G02`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: ScatterChartView (Frontend/src/components/charts/ScatterChartView.jsx)
- Tables used: enrollment, assessment_result, assessment, engagement
- Columns used: keyDbFields=[engagement_score [FE cross], avg_score [FE cross], final_outcome]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores,engagement_tracking; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task; availability_contract=present
- Related charts: scatter | scatter_plot

## A-G03 - Identify at-risk cohort
- Task name: Identify at-risk cohort
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-G03`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: DataTableView (Frontend/src/components/charts/DataTableView.jsx)
- Tables used: enrollment, assessment_result, assessment, engagement
- Columns used: keyDbFields=[at_risk_score [FE cross], at_risk_label [FE cross], avg_score [FE cross], final_outcome]; output.required=[student_id, avg_score, at_risk_score, at_risk_label, triggered_flags]; output.optional=[enrollment_id, score_strategy, score_scale, pass_threshold, target_threshold, engagement_score, engagement_score_available, punctuality_rate, previous_attempt_count, triggered_flags_summary, primary_support_category, recommended_admin_action, flag_low_score, flag_repeated, flag_low_engagement, flag_low_punctuality, flag_neg_trend, final_outcome]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores; optionalCapabilities=engagement_tracking,absence_tracking; datasetCompatibility=both; fallbackStrategy=show_empty_state
- Related charts: table

## A-G04 - Assessment difficulty analysis
- Task name: Assessment difficulty analysis
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-G04`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: BarChartView (Frontend/src/components/charts/BarChartView.jsx)
- Tables used: assessment_result, assessment, enrollment
- Columns used: keyDbFields=[assessment_name, assessment_type, week_of_class, competency_tag, score_normalized, pass_flag]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores; optionalCapabilities=competency_tagging,proxy_competency_available; datasetCompatibility=both; fallbackStrategy=show_partial_data
- Related charts: bar | bar_chart

## A-G05 - Submission behaviour analysis
- Task name: Submission behaviour analysis
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-G05`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: BarChartView (Frontend/src/components/charts/BarChartView.jsx)
- Tables used: assessment_result, assessment, enrollment [OULAD only]
- Columns used: keyDbFields=[final_outcome [FE cross], assessment_type [FE cross], submission_delay_avg [FE cross], late_submission_rate [FE cross], punctuality_rate [FE cross], student_count, submission_count, avg_score, submission_risk_level]; output.required=[final_outcome, assessment_type, submission_delay_avg, late_submission_rate]; output.optional=[submission_count, student_count, net_submission_delay_avg, punctuality_rate, avg_score, submission_risk_level]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=submission_history,submission_timestamps; datasetCompatibility=both; fallbackStrategy=show_empty_state; availability_contract=present
- Related charts: grouped_bar | bar_chart

## A-G06 - Activity type effectiveness
- Task name: Activity type effectiveness
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-G06`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: BarChartView (Frontend/src/components/charts/BarChartView.jsx)
- Tables used: enrollment, engagement, event, assessment_result, assessment [OULAD only]
- Columns used: keyDbFields=[resource_type, engagement_count; avg_score [FE cross] by resource_type]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=engagement_tracking,resource_clickstream; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task
- Related charts: bar | bar_chart

## A-G07 - Factor correlation analysis
- Task name: Factor correlation analysis
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-G07`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: HeatmapView (Frontend/src/components/charts/HeatmapView.jsx)
- Tables used: enrollment, assessment_result, assessment, engagement, student
- Columns used: keyDbFields=[avg_score [FE cross], engagement_score [FE cross], previous_attempt_count, absences, studytime, total_clicks, active_days]; output.required=[feature_name, correlation_with_avg_score]; output.optional=[n_samples, abs_correlation_rank]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores,engagement_tracking; optionalCapabilities=demographics; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task
- Related charts: heatmap

## A-G08 - Background group performance & engagement profile
- Task name: Background group performance & engagement profile
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-G08`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: BarChartView (Frontend/src/components/charts/BarChartView.jsx)
- Tables used: student, enrollment, assessment_result, assessment, engagement
- Columns used: keyDbFields=[socioeconomic_band / gender / age_group / highest_education; avg_score [FE cross], engagement_score [FE cross]]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores,engagement_tracking,demographics; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task; availability_contract=present
- Related charts: bar | bar_chart

## A-G09 - Socioeconomic disadvantage impact
- Task name: Socioeconomic disadvantage impact
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-G09`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: ScatterChartView (Frontend/src/components/charts/ScatterChartView.jsx)
- Tables used: student, enrollment, assessment_result, assessment [OULAD only]
- Columns used: keyDbFields=[imd_score_numeric, disability_flag, highest_education, disadvantage_score [FE single]; avg_score [FE cross], final_outcome]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores,demographics; optionalCapabilities=socioeconomic_context; datasetCompatibility=OULAD_only; fallbackStrategy=show_partial_data
- Related charts: scatter, boxplot | scatter_plot

## A-G10 - Consistency analysis across cohort
- Task name: Consistency analysis across cohort
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-G10`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: BarChartView (Frontend/src/components/charts/BarChartView.jsx)
- Tables used: enrollment, engagement [OULAD only]
- Columns used: keyDbFields=[consistency_level [FE cross], student_count [FE cross], pct_students [FE cross], avg_weekly_stddev, avg_weekly_clicks, avg_active_weeks]; output.required=[consistency_level, student_count]; output.optional=[pct_students, avg_weekly_stddev, avg_weekly_clicks, avg_active_weeks]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=engagement_tracking,temporal_activity; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task
- Related charts: bar | bar_chart

## A-G11 - Weekly engagement drop detection
- Task name: Weekly engagement drop detection
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-G11`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: LineChartView (Frontend/src/components/charts/LineChartView.jsx)
- Tables used: enrollment, engagement [OULAD only]
- Columns used: keyDbFields=[week_number, engagement_count; is_drop_week [FE cross], rolling_3wk_avg, drop_pct]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=engagement_tracking,temporal_activity; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task
- Related charts: line | line_chart

## A-G12 - Background group pass/fail/withdrawal rate
- Task name: Background group pass/fail/withdrawal rate
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-G12`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: BarChartView (Frontend/src/components/charts/BarChartView.jsx)
- Tables used: student, enrollment
- Columns used: keyDbFields=[socioeconomic_band / gender / age_group / highest_education; final_outcome]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores,final_outcome,demographics; datasetCompatibility=both; fallbackStrategy=show_empty_state
- Related charts: bar (100% stacked) | bar_chart

## A-G13 - Lifestyle risk across cohort
- Task name: Lifestyle risk across cohort
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-G13`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: ScatterChartView (Frontend/src/components/charts/ScatterChartView.jsx)
- Tables used: student, enrollment, assessment_result, assessment [UCI only]
- Columns used: keyDbFields=[alcohol_weekday, alcohol_weekend, go_out_freq, health_status, lifestyle_risk_score [FE single]; avg_score [FE cross]]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores,lifestyle_factors; datasetCompatibility=UCI_only; fallbackStrategy=show_partial_data
- Related charts: scatter | scatter_plot

## A-G14 - Early withdrawal signal analysis
- Task name: Early withdrawal signal analysis
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-G14`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: LineChartView (Frontend/src/components/charts/LineChartView.jsx)
- Tables used: enrollment, engagement [OULAD only]
- Columns used: keyDbFields=[week_number, engagement_count; final_outcome, avg_clicks by outcome group]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=engagement_tracking,temporal_activity,final_outcome; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task
- Related charts: line | line_chart

## A-G15 - Intervention priority ranking
- Task name: Intervention priority ranking
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-G15`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: DataTableView (Frontend/src/components/charts/DataTableView.jsx)
- Tables used: enrollment, assessment_result, assessment, engagement, student
- Columns used: keyDbFields=[student_id, gender, age_group, region; at_risk_score [FE cross], at_risk_label [FE cross], avg_score [FE cross], all 5 flags, final_outcome]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores,engagement_tracking; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task
- Related charts: table

## A-G16 - Admin action recommendation
- Task name: Admin action recommendation
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-G16`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: DataTableView (Frontend/src/components/charts/DataTableView.jsx)
- Tables used: enrollment, assessment_result, assessment, engagement
- Columns used: keyDbFields=[[AI_SYNTHESIS] low_engagement_count, high_risk_count, hardest_assessment, best_resource_type, total_students]; output.required=[UNKNOWN]; output.optional=[UNKNOWN]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores,engagement_tracking; datasetCompatibility=OULAD_only; fallbackStrategy=hide_task; availability_contract=present
- Related charts: none | table

## A-G18 - Class performance trend
- Task name: Class performance trend
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-G18`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: LineChartView (Frontend/src/components/charts/LineChartView.jsx)
- Tables used: assessment, assessment_result, enrollment
- Columns used: keyDbFields=[assessment_order, class_avg_score [FE], pass_rate [FE], completion_rate [FE], pass_threshold [FE cross], target_threshold [FE cross]]; output.required=[assessment_order, class_avg_score, pass_rate, completion_rate]; output.optional=[assessment_name, assessment_type, week_of_class, submissions_count, score_scale, pass_threshold, target_threshold]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores; optionalCapabilities=final_outcome; datasetCompatibility=both; fallbackStrategy=show_empty_state
- Related charts: line, table | line_chart

## A-G19 - Assessment completion rate
- Task name: Assessment completion rate
- UI/page: `Frontend/src/pages/AnalyticsWorkspace.jsx` (TaskListPanel + TaskDetailPanel)
- API endpoint: `POST /api/analytics/run` (execute), `GET /api/tasks/:taskId` (metadata), `GET /api/tasks/validate-one/:taskId` (availability check)
- Backend file/function: `Backend/src/controllers/analytics.controller.js::runAnalyticsController` -> `Backend/src/services/sqlExecution.service.js::executeSqlTask`
- SQL/query file/function: `Backend/src/config/taskRegistry.json` field `sqlQuery`/`sqlQueries` for task `A-G19`; execution via `executeSqlTask`
- Frontend API caller: `Frontend/src/services/analyticsApi.js::runAnalyticsTask` -> `Frontend/src/hooks/useAnalytics.js::run` -> `Frontend/src/pages/AnalyticsWorkspace.jsx::handleRun`
- Chart/table component: DataTableView (Frontend/src/components/charts/DataTableView.jsx)
- Tables used: assessment, assessment_result, enrollment
- Columns used: keyDbFields=[assessment_order, assessment_name, completion_rate [FE], submissions_count, pending_count [FE], completion_rank [FE]]; output.required=[assessment_order, assessment_name, completion_rate, submissions_count, pending_count, completion_rank]; output.optional=[assessment_type, expected_students, completion_gap, completion_status]
- Current availability logic: global Layer A/B/C/D validator in `capabilityValidator.service.js`; task-level requiredCapabilities=assessment_scores; datasetCompatibility=both; fallbackStrategy=show_empty_state
- Related charts: table, bar | table

