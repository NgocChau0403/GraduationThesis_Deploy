# Implementation Backlog Checklist

Last updated: 2026-05-23
Owner: USER + Codex

Status legend:
- `[ ]` Not started
- `[-]` In progress / partially done
- `[x]` Done (all acceptance + tests passed)

---

## Sprint 0 - Baseline Audit & Freeze
Goal: chot trang thai that truoc khi sua.

- `[-]` S0-1 Audit task contract hien tai
  - Files:
    - `C:\[Graduation_Thesis]Prototype\Backend\src\config\taskRegistry.json`
    - `C:\[Graduation_Thesis]Prototype\Backend\src\services\sqlExecution.service.js`
    - `C:\[Graduation_Thesis]Prototype\Backend\src\controllers\analytics.controller.js`
  - Acceptance:
    - `[-]` Co report liet ke task fail vi thieu cot / viz mismatch / semantic yeu
    - `[x]` Report duoc luu versioned trong repo
  - Test checklist:
    - `[ ]` Chay toan bo task bang dataset UCI active
    - `[ ]` Chay toan bo task bang dataset OULAD active
    - `[-]` So sanh output columns voi visualization_config (static audit co, runtime full chua)
    - `[ ]` Ghi ro PASS/PARTIAL/FAIL cho tung task (theo runtime full)
  - Evidence:
    - `C:\[Graduation_Thesis]Prototype\Docs\registry_audit_baseline_2026-05-22.md`
    - `C:\[Graduation_Thesis]Prototype\Backend\scripts\audit-task-registry.mjs`

---

## Sprint 1 - Data Contract & Runtime Safety
Goal: khong con chart trong silent.

- `[x]` S1-1 Them output_schema cho task rui ro cao
  - Scope tasks: `A-B03`, `A-B01`, `A-G07`, `S-B01`
  - Acceptance:
    - `[x]` 4 task co `output_schema.required_columns`
    - `[x]` `output_schema` co format thong nhat
  - Test checklist:
    - `[x]` JSON parse hop le
    - `[x]` Task load duoc qua `taskRegistry.service.js`
    - `[x]` Khong lam hong task registry load path used by `/api/tasks`
  - Evidence:
    - `C:\[Graduation_Thesis]Prototype\Backend\src\config\taskRegistry.json`

- `[x]` S1-2 Validate output_schema sau SQL execution
  - Files:
    - `C:\[Graduation_Thesis]Prototype\Backend\src\services\sqlExecution.service.js`
    - `C:\[Graduation_Thesis]Prototype\Backend\src\controllers\analytics.controller.js`
  - Acceptance:
    - `[x]` Neu thieu required column, API tra loi ro code/message (`422 OUTPUT_SCHEMA_MISMATCH`)
    - `[x]` Khong tra success gia khi data shape sai
  - Test checklist:
    - `[x]` Tao case thieu cot de API fail dung
    - `[x]` Tao case du cot de API pass
    - `[x]` FE nhan error va hien thi duoc message (static UI error path verified)
  - Evidence:
    - `C:\[Graduation_Thesis]Prototype\Backend\src\controllers\analytics.controller.js`
    - `C:\[Graduation_Thesis]Prototype\Backend\src\services\outputSchema.service.js`
    - `C:\[Graduation_Thesis]Prototype\Backend\scripts\verify-output-schema-contract.mjs`

- `[x]` S1-3 Fix runtime mismatch task trong diem
  - Scope:
    - `[x]` `A-B03` group dung ra `student_count`
    - `[x]` `A-B01` doi dung histogram buckets
    - `[x]` `A-G07` align SQL voi heatmap hoac doi viz phu hop
    - `[x]` `A-G09` sua datasetCompatibility vs SQL filter
    - `[x]` `S-T09`, `S-T14`, `S-T11` bo scatter 1-point
  - Acceptance:
    - `[x]` Khong con empty chart do semantic mismatch cho cac task scoped trong runtime verification
    - `[x]` Moi task scoped tra dung data shape cho viz mong muon
  - Test checklist:
    - `[x]` Run tung task tren UCI/OULAD
    - `[x]` Verify field mapping trong adapter
    - `[x]` Snapshot JSON response sau fix duoc luu trong report
  - Evidence:
    - `C:\[Graduation_Thesis]Prototype\Backend\src\config\taskRegistry.json`
    - `C:\[Graduation_Thesis]Prototype\Docs\registry_audit_baseline_2026-05-22.md`
    - `C:\[Graduation_Thesis]Prototype\Docs\s1_3_verification_2026-05-22.md`
    - `C:\[Graduation_Thesis]Prototype\Backend\scripts\verify-s1-3-runtime.mjs`

---

## Sprint 2 - SQL Quality & Insight Quality
Goal: output dung hon va huu ich hon.

- `[x]` S2-1 Chuan hoa fragment risk/score
  - Files:
    - `C:\[Graduation_Thesis]Prototype\Backend\src\lib\sqlFragments.js`
    - `C:\[Graduation_Thesis]Prototype\Backend\src\config\taskRegistry.json`
  - Scope tasks:
    - `S-B01`, `S-B02`, `S-T04`, `S-T13`, `A-B04`, `A-G03`
  - Acceptance:
    - `[x]` Logic `avg_score` co chien luoc ro: weighted by `assessment.weight_pct` neu co, fallback unweighted neu khong co weight
    - `[x]` Risk flags nhat quan giua student card, student flag list, admin cohort va overview
    - `[x]` Low engagement khong bi trigger gia khi dataset khong co engagement data
  - Test checklist:
    - `[x]` So sanh risk score voi tong triggered flags tren UCI va OULAD
    - `[x]` Khong lam doi schema output bat buoc cua `S-B01`
    - `[x]` Query van chay duoi timeout hien tai
  - Evidence:
    - `C:\[Graduation_Thesis]Prototype\Backend\scripts\verify-s2-1-risk-score.mjs`
    - `C:\[Graduation_Thesis]Prototype\Docs\s2_1_risk_score_verification_2026-05-22.md`
- `[x]` S2-2 Nang chat luong student core task
  - Files:
    - `C:\[Graduation_Thesis]Prototype\Backend\src\config\taskRegistry.json`
    - `C:\[Graduation_Thesis]Prototype\Backend\src\lib\sqlFragments.js`
  - Scope:
    - `[x]` `S-B01` them class benchmark, percentile, adaptive score scale, pass/target threshold, performance band
    - `[x]` `S-T01` them threshold/support fields theo tung assessment
    - `[x]` `S-T04` them `flag_description`, `recommended_action`, `severity`, `support_category`
  - Acceptance:
    - `[x]` Student co the tra loi "Toi dang o dau?" bang `class_avg_score`, `score_percentile`, `performance_band`
    - `[x]` Student co the tra loi "Toi can lam gi?" bang `support_level` va `recommended_action`
    - `[x]` Threshold dung theo score scale: UCI 20-point (`pass_threshold=10`), OULAD 100-point (`pass_threshold=40`)
  - Test checklist:
    - `[x]` Verify du fields moi tren UCI va OULAD
    - `[x]` Verify `aiPromptHint` tan dung fields moi
    - `[x]` Verify chart contract cu van render duoc vi cac field cu duoc giu lai
  - Evidence:
    - `C:\[Graduation_Thesis]Prototype\Backend\scripts\verify-s2-2-student-core.mjs`
    - `C:\[Graduation_Thesis]Prototype\Docs\s2_2_student_core_verification_2026-05-22.md`
- `[x]` S2-3 Nang chat luong admin risk task
  - Files:
    - `C:\[Graduation_Thesis]Prototype\Backend\src\config\taskRegistry.json`
    - `C:\[Graduation_Thesis]Prototype\Frontend\src\utils\responseTransformer.js`
  - Scope:
    - `[x]` `A-G03` them `triggered_flags`
    - `[x]` `A-G03` them `triggered_flags_summary`
    - `[x]` `A-G03` them `primary_support_category` va `recommended_admin_action`
  - Acceptance:
    - `[x]` Admin thay ro ly do tung student bi at-risk
    - `[x]` `triggered_flags.length` khop `at_risk_score`
    - `[x]` Table view doc duoc array flags qua formatter
  - Test checklist:
    - `[x]` Task tra ve mang flags dung tren UCI va OULAD
    - `[x]` Table formatter hien thi array doc duoc
    - `[x]` Khong null bat thuong voi sample dataset
  - Evidence:
    - `C:\[Graduation_Thesis]Prototype\Backend\scripts\verify-s2-3-admin-risk.mjs`
    - `C:\[Graduation_Thesis]Prototype\Docs\s2_3_admin_risk_verification_2026-05-22.md`

---

## Sprint 3 - Visualization Usability
Goal: chart de doc, dung ngu canh role.

- `[x]` S3-1 Risk card hoa `S-B02`
  - Acceptance:
    - `[x]` Hien thi badge `Low/Medium/High` ro rang theo `at_risk_label`
    - `[x]` Mau sac/label nhat quan voi contract `risk_status`
  - Test checklist:
    - `[x]` Runtime `S-B02` PASS tren UCI va OULAD, output schema hop le
    - `[x]` Adapter verify du 3 trang thai `low/medium/high`
    - `[x]` Frontend build PASS, khong vo compile flow
  - Evidence:
    - `C:\[Graduation_Thesis]Prototype\Backend\scripts\verify-s3-1-risk-card.mjs`
    - `C:\[Graduation_Thesis]Prototype\Frontend\scripts\verify-s3-1-risk-card-adapter.mjs`
    - `C:\[Graduation_Thesis]Prototype\Docs\s3_1_risk_card_verification_2026-05-23.md`
- `[x]` S3-2 Checklist view cho `S-T04`
  - Acceptance:
    - `[x]` Moi flag co trang thai + mo ta + action ro rang
    - `[x]` Student doc duoc theo ngon ngu checklist, khong can doc ten field ky thuat
  - Test checklist:
    - `[x]` Adapter map dung du lieu SQL checklist
    - `[x]` ChartRenderer route dung `viz_type=checklist`
    - `[x]` Frontend build PASS, khong regression viz type cu
    - `[x]` Runtime `S-T04` PASS tren UCI va OULAD, schema + expected flags day du
  - Evidence:
    - `C:\[Graduation_Thesis]Prototype\Backend\scripts\verify-s3-2-checklist.mjs`
    - `C:\[Graduation_Thesis]Prototype\Frontend\scripts\verify-s3-2-checklist-adapter.mjs`
    - `C:\[Graduation_Thesis]Prototype\Docs\s3_2_checklist_verification_2026-05-23.md`
- `[x]` S3-3 Line threshold + table color coding
  - Acceptance:
    - `[x]` Line chart hien thi reference line khi co threshold fields
    - `[x]` Table co semantic color cho risk/status/triggered/severity
  - Test checklist:
    - `[x]` Task line co threshold render duoc reference lines (`S-T01`)
    - `[x]` Task line khong threshold van render on dinh (khong crash)
    - `[x]` Semantic tag mapping PASS cho high/medium/low + boolean triggered/stable
    - `[x]` Frontend build PASS, khong regression viz cu
  - Evidence:
    - `C:\[Graduation_Thesis]Prototype\Backend\scripts\verify-s3-3-line-threshold.mjs`
    - `C:\[Graduation_Thesis]Prototype\Frontend\scripts\verify-s3-3-line-table.mjs`
    - `C:\[Graduation_Thesis]Prototype\Docs\s3_3_line_threshold_verification_2026-05-23.md`

---

## Sprint 4 - Bo sung task thieu cho decision-making
Goal: du thong tin cho student/admin.

- `[x]` S4-1 Task moi `S-T16` Grade Goal Calculator
  - Acceptance:
    - `[x]` Tra duoc `current_score`, `needed_score_for_pass`, `needed_score_for_target`
    - `[x]` Co status ro rang cho pass/target goal (`already_achieved`, `achievable`, `unreachable`, `no_remaining_below_threshold`)
  - Test checklist:
    - `[x]` Case con assessment: OULAD `remaining_assessments > 0`
    - `[x]` Case da hoan tat assessment: UCI `remaining_assessments = 0`
    - `[x]` Case missing weight fallback: UCI `calculation_mode = unweighted_average_fallback`
    - `[x]` Registry load duoc task moi qua `taskRegistry.service.js`
    - `[x]` Frontend build PASS (regression check)
  - Evidence:
    - `C:\[Graduation_Thesis]Prototype\Backend\scripts\verify-s4-1-grade-goal.mjs`
    - `C:\[Graduation_Thesis]Prototype\Docs\s4_1_grade_goal_verification_2026-05-23.md`
- `[x]` S4-2 Task moi `S-T17` Assessment Status Timeline
  - Acceptance:
    - `[x]` Hien thi `submitted/pending` theo `assessment_order`
    - `[x]` Co timeline row day du theo tung assessment trong class
  - Test checklist:
    - `[x]` Context OULAD co ca `submitted` va `pending` (9/1)
    - `[x]` Sort tang dan theo `assessment_order`
    - `[x]` `submission_status` khop voi `submitted_flag`
    - `[x]` Registry load duoc task moi qua `taskRegistry.service.js`
    - `[x]` Frontend build PASS (regression check)
  - Evidence:
    - `C:\[Graduation_Thesis]Prototype\Backend\scripts\verify-s4-2-assessment-timeline.mjs`
    - `C:\[Graduation_Thesis]Prototype\Docs\s4_2_assessment_timeline_verification_2026-05-23.md`
- `[x]` S4-3 Task moi `A-G18` Class Performance Trend
  - Acceptance:
    - `[x]` Co trend `class_avg_score` theo `assessment_order`
    - `[x]` Co them `pass_rate` + `completion_rate` de admin doc xu huong day du hon
  - Test checklist:
    - `[x]` Class nho van chay (`size=649`, runtime 45ms)
    - `[x]` Class lon khong timeout (`size=2498`, runtime 27ms)
    - `[x]` Output schema PASS, sort tang dan theo `assessment_order`
    - `[x]` Registry load task moi qua `taskRegistry.service.js`
    - `[x]` Frontend build PASS (regression check)
  - Evidence:
    - `C:\[Graduation_Thesis]Prototype\Backend\scripts\verify-s4-3-class-performance-trend.mjs`
    - `C:\[Graduation_Thesis]Prototype\Docs\s4_3_class_performance_trend_verification_2026-05-23.md`
- `[x]` S4-4 Task moi `A-G19` Assessment Completion Rate
  - Acceptance:
    - `[x]` Admin thay assessment co completion rate thap nhat o top ranking
    - `[x]` Co day du submissions/pending/completion_rank de uu tien can thiep
  - Test checklist:
    - `[x]` Ty le tinh dung theo `submissions_count / expected_students`
    - `[x]` Handle chia 0 an toan bang `NULLIF(cs.class_size, 0)` trong SQL
    - `[x]` Sort completion tang dan, dong dau la completion thap nhat
    - `[x]` Registry load duoc task moi qua `taskRegistry.service.js`
    - `[x]` Frontend build PASS (regression check)
  - Evidence:
    - `C:\[Graduation_Thesis]Prototype\Backend\scripts\verify-s4-4-assessment-completion-rate.mjs`
    - `C:\[Graduation_Thesis]Prototype\Docs\s4_4_assessment_completion_rate_verification_2026-05-23.md`

---

## Sprint 5 - Dashboard integration + AI prompt quality
Goal: task tot phai vao luong dung that.

- `[x]` S5-1 Update default task sets trong dashboard
  - Acceptance:
    - `[x]` Student basic auto-load dung: `S-B01`, `S-B02`, `S-B03`
    - `[x]` Student advanced selectable dung: `S-T00` -> `S-T15` (khong gom `S-T16`, `S-T17`)
    - `[x]` Admin basic auto-load dung: `A-B01` -> `A-B04`
    - `[x]` Admin co 3 nhom selectable dung contract:
      - `[x]` Single student deep dive: `A-S01` -> `A-S08` (chon 1 student)
      - `[x]` Comparison: `A-C01` -> `A-C06` (chon 2 students)
      - `[x]` Cohort/group: `A-G01` -> `A-G16`
  - Test checklist:
    - `[x]` Verify task-set constants match 1-1 approved list
    - `[x]` Verify dashboard pages compile va load khong loi
    - `[x]` Frontend build PASS (regression check)
  - Evidence:
    - `C:\[Graduation_Thesis]Prototype\Frontend\scripts\verify-s5-1-dashboard-task-sets.mjs`
    - `C:\[Graduation_Thesis]Prototype\Docs\s5_1_dashboard_task_sets_verification_2026-05-23.md`
- `[x]` S5-2 Cap nhat `aiPromptHint` + strategy alignment
  - Acceptance:
    - `[x]` `aiPromptHint` cac task uu tien duoc cap nhat bam sat field chart/data output thuc te (`S-B02`, `S-T04`, `S-T16`, `S-T17`, `A-G18`, `A-G19`)
    - `[x]` Strategy runtime alignment: khong con strategy "mo coi" trong registry so voi AIService factory
    - `[x]` AIService prompt pipeline co consume `ai_prompt_hint` + `actionable_question`
  - Test checklist:
    - `[x]` Verify static strategy contract: `used_strategies` subset cua `factory.strategies`
    - `[x]` Verify hint token coverage cho task uu tien
    - `[x]` Verify Python syntax compile cho `AIService/main.py`, `schemas.py`, `strategies/factory.py`, `strategies/other_strategies.py`
  - Evidence:
    - `C:\[Graduation_Thesis]Prototype\Backend\scripts\verify-s5-2-ai-prompt-alignment.mjs`
    - `C:\[Graduation_Thesis]Prototype\Docs\s5_2_ai_prompt_alignment_verification_2026-05-23.md`

---

## Post-Audit Remediation - High Priority Tasks
Goal: xu ly nhom `USED_BROKEN` / `WRONG` theo batch nho, tranh sua lan rong.

- `[x]` Batch 1 - SQL syntax/runtime errors
  - Scope tasks:
    - `S-T00`, `S-T06`, `S-T12`, `A-S03`, `A-S08`, `A-C03`, `A-C06`, `A-G02`, `A-G08`, `A-G16`
  - Acceptance:
    - `[x]` Chi sua task bi loi runtime SQL
    - `[x]` Khong doi UI/chart layout
    - `[x]` 10 task khong con SQL runtime error tren OULAD
  - Test checklist:
    - `[x]` JSON parse hop le
    - `[x]` Registry load qua `taskRegistry.service.js`
    - `[x]` Targeted OULAD execution PASS cho 10 task
    - `[x]` UCI full audit PASS, 0 SQL errors

- `[x]` Batch 2.1 - Comparison output/data shape
  - Scope tasks:
    - `A-C02`, `A-C03`, `A-C04`
  - Acceptance:
    - `[x]` `A-C02` tra long-format grouped-bar data co `metric`
    - `[x]` `A-C03` tra du 2 student rows bang selected-students base CTE
    - `[x]` `A-C04` tra long-format grouped-bar data co `lifestyle_dimension`
  - Test checklist:
    - `[x]` API `/api/analytics/run` PASS sau backend restart
    - `[x]` Output schema PASS
    - `[x]` Frontend adapter verification PASS

- `[x]` Batch 2.2 - Cohort output/data shape
  - Scope tasks:
    - `A-G05`, `A-G10`
  - Acceptance:
    - `[x]` `A-G05` khong con dump raw 10,000 rows; tra cohort aggregate theo `final_outcome` + `assessment_type`
    - `[x]` `A-G10` tra distribution rows co `consistency_level` + `student_count`
  - Test checklist:
    - `[x]` API `/api/analytics/run` PASS: `A-G05=11 rows`, `A-G10=3 rows`
    - `[x]` Output schema PASS
    - `[x]` Frontend adapter verification PASS

- `[x]` Batch 3 - Metadata / Registry Alignment
  - Scope tasks:
    - `A-C02`, `A-C03`, `A-C04`, `A-G05`, `A-G10`
  - Acceptance:
    - `[x]` `keyDbFields`, `analytics.*`, `aiPromptHint`, `output_schema` align voi SQL output moi
    - `[x]` `/api/tasks` sau backend restart tra metadata moi
  - Test checklist:
    - `[x]` Metadata API verification PASS
    - `[x]` Output schema validation PASS cho 5 task

- `[x]` Batch 4 - AI Prompt / Strategy Runtime Safety
  - Scope:
    - `A-C02`, `A-C03`, `A-C04`, `A-G05`, `A-G10`
    - `AIService/schemas.py`
    - `AIService/strategies/base.py`
  - Acceptance:
    - `[x]` AIService chap nhan `visualization_config.orientation = null`
    - `[x]` LLM output bot bi cat JSON do default token budget/tham vong output qua lon
    - `[x]` `A-G10.explanation_strategy` align thanh `distribution`
  - Test checklist:
    - `[x]` AIService health PASS
    - `[x]` Backend AI proxy PASS, 0 degraded cho 5 task
    - `[x]` Frontend production build PASS

---

## Change Log

- 2026-05-22:
  - Tao checklist backlog.
  - Cap nhat trang thai thuc te:
    - S0-1: partial
    - S1-1: done
    - S1-2: done
    - S1-3: done; verified with active UCI data and an OULAD verification batch built from official upload CSVs
    - S2-1: done; standardized weighted/fallback score strategy and risk flag contract across scoped tasks
    - S2-2: done; student core tasks now include benchmark, threshold, support/action fields across UCI and OULAD
    - S2-3: done; A-G03 now exposes triggered risk reasons and admin action fields
- 2026-05-23:
  - S3-1: done; S-B02 moved to `card/risk_status`, risk badge rendering added, backend+frontend verification passed
  - S3-2: done; S-T04 moved to `checklist/risk_flags`, checklist adapter/view added, backend+frontend verification passed
  - S3-3: done; line threshold reference lines + table semantic color coding added with runtime and frontend verification
  - S4-1: done; new S-T16 Grade Goal Calculator added with weighted/fallback logic and runtime verification on UCI/OULAD
  - S4-2: done; new S-T17 Assessment Status Timeline added and verified with mixed submitted/pending timeline context
  - S4-3: done; new A-G18 Class Performance Trend added and verified on small/large classes with runtime checks
  - S4-4: done; new A-G19 Assessment Completion Rate added with ranking + formula validation and divide-by-zero safety
  - S5-1: done; dashboard default/selectable task sets updated to approved lists with automated verification
  - S5-2: done; aiPromptHint updated for sprint-priority chart tasks, strategy registry aligned with AIService (`recommendation`, `progress`), and prompt pipeline now consumes task hint context
  - Post-audit remediation: done for high-priority runtime/data-shape/metadata/AI-safety batches covering `S-T00`, `S-T06`, `S-T12`, `A-S03`, `A-S08`, `A-C02`, `A-C03`, `A-C04`, `A-C06`, `A-G02`, `A-G05`, `A-G08`, `A-G10`, `A-G16`
