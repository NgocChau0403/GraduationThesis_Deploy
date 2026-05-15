# Canonical Database Schema — Learning Analytics System
> **Cập nhật lần cuối**: 2026-05-04  
> **Nguồn**: File doc chuẩn hóa schema (từ thầy hướng dẫn)  
> **Ghi chú**: `[FE]` = Feature Engineering (computed column, concat trực tiếp vào bảng)  
> Các cột màu đỏ trong doc gốc = khóa chính hoặc cột quan trọng cho JOIN

---

## 1. `student` Table

**Grain**: 1 row = 1 student × 1 source_dataset

### Core Identity
| Column | Type | Description | UCI Mapping | OULAD Mapping |
|---|---|---|---|---|
| `student_id` [PK] | VARCHAR | Surrogate student ID | Auto-generated | `id_student` |
| `source_dataset` | VARCHAR | `UCI \| OULAD \| OTHER` | Constant = UCI | Constant = OULAD |

### Demographics
| Column | Type | Description | UCI Mapping | OULAD Mapping |
|---|---|---|---|---|
| `gender` | VARCHAR | `male \| female \| other \| prefer_not_to_say` | `sex` (M/F mapped) | `gender` (M/F mapped) |
| `age_years` | INT | Raw age in years | `age` | NULL |
| `age_group` | VARCHAR | `0-35 \| 35-55 \| 55+` | `age` → bucketed | `age_band` (kept) |
| `region` | VARCHAR | Geographic region | NULL | `region` |
| `residence_area` | VARCHAR | `urban \| rural \| unknown` | `address`: U→urban, R→rural | NULL → unknown |
| `school` | VARCHAR | UCI: GP \| MS. NULL for OULAD | `school` | NULL |
| `family_size` | VARCHAR | UCI: `LE3` (≤3) \| `GT3` (>3). NULL for OULAD | `famsize` | NULL |

### Socioeconomic
| Column | Type | Description | UCI Mapping | OULAD Mapping |
|---|---|---|---|---|
| `highest_education` | VARCHAR | `no_formal \| lower_secondary \| post_secondary \| higher \| postgraduate \| unknown` | NULL → unknown | `highest_education` (mapped) |
| `socioeconomic_band` | VARCHAR | `low \| lower_mid \| upper_mid \| high \| very_high \| unknown` | NULL → unknown | `imd_band`: 0-20%→low, 20-40%→lower_mid, 40-60%→upper_mid, 60-80%→high, 80-100%→very_high |
| `imd_score_numeric` | FLOAT | 0-100 midpoint of imd_band | NULL | `imd_band` midpoint |
| `disability_flag` | BOOLEAN | True if declared disability | NULL | `disability`: Y→True, N→False |

### Support & Intent Flags
| Column | Type | Description | UCI Mapping | OULAD Mapping |
|---|---|---|---|---|
| `higher_education_intent_flag` | BOOLEAN | True if intends higher education | `higher`: Y→True, N→False | NULL |
| `internet_access_flag` | BOOLEAN | Has internet at home | `internet`: Y→True, N→False | NULL |
| `school_support_flag` | BOOLEAN | Extra school support | `schoolsup`: Y→True, N→False | NULL |
| `family_support_flag` | BOOLEAN | Family educational support | `famsup`: Y→True, N→False | NULL |

### Family & Parental Background
| Column | Type | Description | UCI Mapping | OULAD Mapping |
|---|---|---|---|---|
| `mother_education_level` | VARCHAR | `none \| primary \| secondary \| post_secondary \| higher_ed \| unknown` | `Medu` 0-4 mapped | NULL → unknown |
| `father_education_level` | VARCHAR | Same scale as mother | `Fedu` 0-4 mapped | NULL → unknown |
| `mother_job` | VARCHAR | `teacher \| health \| services \| at_home \| other \| unknown` | `Mjob` | NULL → unknown |
| `father_job` | VARCHAR | `teacher \| health \| services \| at_home \| other \| unknown` | `Fjob` | NULL → unknown |
| `guardian_type` | VARCHAR | `mother \| father \| other \| unknown` | `guardian` | NULL → unknown |
| `parent_cohabitation_status` | VARCHAR | `T (together) \| A (apart) \| unknown` | `Pstatus` | NULL → unknown |

### Lifestyle & Social
| Column | Type | Description | UCI Mapping | OULAD Mapping |
|---|---|---|---|---|
| `travel_time` | INT | 1-4 scale | `traveltime` | NULL |
| `free_time` | INT | 1-5 scale | `freetime` | NULL |
| `go_out_freq` | INT | 1-5 scale | `goout` | NULL |
| `alcohol_weekday` | INT | 1-5 scale (Dalc) | `Dalc` | NULL |
| `alcohol_weekend` | INT | 1-5 scale (Walc) | `Walc` | NULL |
| `health_status` | INT | 1-5 scale | `health` | NULL |
| `family_relation` | INT | 1-5 quality of family relations | `famrel` | NULL |
| `has_romantic` | BOOLEAN | In romantic relationship | `romantic`: Y→True, N→False | NULL |
| `has_extracurricular` | BOOLEAN | Participates in extracurricular | `activities`: Y→True, N→False | NULL |
| `has_paid_class` | BOOLEAN | Attends paid tutoring | `paid`: Y→True, N→False | NULL |

### 🟩 Computed Features [FE] — Background Profile Snapshot
> Tính trực tiếp từ student data, concat vào bảng `student`

| Column | Type | Formula | UCI | OULAD |
|---|---|---|---|---|
| `lifestyle_risk_score` [FE] | FLOAT 0-1 | `norm(alcohol_weekday + alcohol_weekend) × 0.4 + norm(go_out_freq) × 0.3 + norm(5 - health_status) × 0.3` | Computed | NULL |
| `support_score` [FE] | FLOAT 0-1 | `(school_support_flag + family_support_flag + has_paid_class + internet_access_flag) / 4` | Computed | NULL |
| `social_balance_score` [FE] | FLOAT 0-1 | `norm(free_time) × 0.5 - norm(go_out_freq) × 0.3 - norm(alcohol_weekday) × 0.2` | Computed | NULL |
| `family_stability_score` [FE] | FLOAT 0-1 | `norm(family_relation) × 0.5 + (parent_cohabitation_status = T) × 0.3 + norm(max(mother_education_level, father_education_level)) × 0.2` | Computed | NULL |
| `disadvantage_score` [FE] | FLOAT 0-1 | `norm(100 - imd_score_numeric) × 0.5 + disability_flag × 0.3 + (highest_education = no_formal) × 0.2` | NULL | Computed |

### Timestamps
| Column | Type | Description |
|---|---|---|
| `created_at` | TIMESTAMP | Record creation time |
| `updated_at` | TIMESTAMP | Last update time |

---

## 2. `course` Table

**Grain**: 1 row = 1 course module

| Column | Type | Description | UCI Mapping | OULAD Mapping |
|---|---|---|---|---|
| `course_id` [PK] | VARCHAR | Unique course module ID | subject (e.g. `math`, `por`) | `code_module` (e.g. `AAA`) |
| `source_dataset` | VARCHAR | `UCI \| OULAD \| OTHER` | Constant = UCI | Constant = OULAD |
| `course_name` | VARCHAR | Human-readable name | Mathematics \| Portuguese | `code_module` |
| `subject_area` | VARCHAR | `Mathematics \| Language \| Unknown` | `student-mat` → mathematics | NULL → Unknown |
| `created_at` | TIMESTAMP | Record creation time | ETL timestamp | ETL timestamp |
| `updated_at` | TIMESTAMP | Last update time | ETL timestamp | ETL timestamp |

---

## 3. `class` Table

**Grain**: 1 row = 1 course × 1 presentation/run. Key entity for temporal analysis.

| Column | Type | Description | UCI Mapping | OULAD Mapping |
|---|---|---|---|---|
| `class_id` [PK] | VARCHAR | Surrogate: course_id + run | Auto: course_id + year | `code_module + "_" + code_presentation` |
| `course_id` [FK] | VARCHAR | FK → `course.course_id` | `course_id` | `code_module` |
| `source_dataset` | VARCHAR | `UCI \| OULAD \| OTHER` | Constant = UCI | Constant = OULAD |
| `class_run` | VARCHAR | Presentation code | Auto: `2005_2006` | `code_presentation` (e.g. `2013J`) |
| `semester` | VARCHAR | e.g. `2013-Semester-1` | NULL | Derived from `code_presentation` suffix |
| `academic_year` | VARCHAR | e.g. `2013-2014` | NULL | Derived from `code_presentation` year |
| `duration_days` | INT | Length in days. OULAD: `module_presentation_length`. NULL for UCI | NULL | `module_presentation_length` |
| `delivery_mode` | VARCHAR | `online \| offline \| hybrid` | `face_to_face` (default) | `online` (default) |
| `platform` | VARCHAR | LMS platform | NULL | `Moodle/VLE` |
| `created_at` | TIMESTAMP | Record creation | ETL timestamp | ETL timestamp |
| `updated_at` | TIMESTAMP | Last update time | ETL timestamp | ETL timestamp |

---

## 4. `enrollment` Table

**Grain**: 1 row = 1 student × 1 class

### Core Fields
| Column | Type | Description | UCI Mapping | OULAD Mapping |
|---|---|---|---|---|
| `enrollment_id` [PK] | VARCHAR | Surrogate: student_id + class_id | Auto | Auto: `id_student + code_module + code_pres` |
| `student_id` [FK] | VARCHAR | FK → `student.student_id` | Generated | `id_student` |
| `class_id` [FK] | VARCHAR | FK → `class.class_id` | Generated | `code_module + "_" + code_presentation` |
| `source_dataset` | VARCHAR | `UCI \| OULAD \| OTHER` | Constant = UCI | Constant = OULAD |

### Temporal & Outcome
| Column | Type | Description | UCI Mapping | OULAD Mapping |
|---|---|---|---|---|
| `enrollment_start_day` | INT | Days from class start (raw OULAD). NULL for UCI | NULL | `date_registration` |
| `enrollment_end_day` | INT | Days from class start on withdrawal. NULL if active or UCI | NULL | `date_unregistration` |
| `final_outcome` | VARCHAR | `distinction \| pass \| fail \| withdrawn` | G3: ≥14→distinction, 10-13→pass, <10→fail | `final_result` |
| `previous_attempt_count` | INT | Prior attempts. 0 = first time | `failures` | `num_of_prev_attempts` |
| `study_load_credits` | INT | Credits studied | NULL | `studied_credits` |

### Engagement Proxies (UCI-specific)
| Column | Type | Description | UCI Mapping | OULAD Mapping |
|---|---|---|---|---|
| `absences` | INT | Number of school absences (0-93). NULL for OULAD | `absences` | NULL |
| `studytime` | INT | Weekly self-study time 1-4 scale. NULL for OULAD | `studytime` | NULL |

### 🟩 Computed Features [FE]
| Column | Type | Formula | UCI | OULAD |
|---|---|---|---|---|
| `registration_lead_time` [FE] | INT | `ABS(enrollment_start_day)` WHERE `enrollment_start_day < 0`. Positive = registered early | NULL | `ABS(date_registration)` if negative |

### Timestamps
| Column | Type |
|---|---|
| `created_at` | TIMESTAMP |
| `updated_at` | TIMESTAMP |

---

## 5. `assessment` Table

**Grain**: 1 row = 1 assessment item per class

| Column | Type | Description | UCI Mapping | OULAD Mapping |
|---|---|---|---|---|
| `assessment_id` [PK] | VARCHAR | Unique ID | Auto: class_id + name | `class_id + id_assessment` |
| `class_id` [FK] | VARCHAR | FK → `class.class_id` | Generated | `code_module + "_" + code_presentation` |
| `source_dataset` | VARCHAR | `UCI \| OULAD \| OTHER` | Constant = UCI | Constant = OULAD |
| `assessment_name` | VARCHAR | Display name | G1 \| G2 \| G3 | `TMA/CMA/Exam + id_assessment` |
| `assessment_type` | VARCHAR | `quiz \| assignment \| exam \| periodic_grade \| other` | G1/G2→periodic_grade, G3→exam | TMA→assignment, CMA→quiz, Exam→exam |
| `assessment_order` | INT | Sequence within class | G1=1, G2=2, G3=3 | Ascending sort by `due_day` |
| `due_day` | INT | Relative day from class start (raw OULAD). NULL for UCI | NULL | `date` |
| `week_of_class` | INT | `= CEIL(due_day / 7)`. **Primary temporal dimension for trend analysis** | NULL | Computed |
| `weight_pct` | FLOAT | Weight as % of final grade. NULL for UCI (equal weight assumed) | NULL | `weight` |
| `is_final_assessment` | BOOLEAN | Is summative/final exam | G3 → True | `assessment_type = Exam` → True |
| `competency_tag` | VARCHAR | ETL rule-based: `foundational_knowledge \| applied_knowledge \| comprehensive_mastery` | G1→foundational_knowledge, G2→applied_knowledge, G3→comprehensive_mastery | CMA→knowledge_recall, TMA→applied_understanding, Exam→comprehensive_mastery |
| `created_at` | TIMESTAMP | Record creation | ETL timestamp | ETL timestamp |
| `updated_at` | TIMESTAMP | Last update time | ETL timestamp | ETL timestamp |

> *Note: `competency_tag` is atomic (one tag per row). If an assessment covers multiple competencies, create multiple rows with the same `assessment_id` but different `competency_tag` - preserves 1NF.*

---

## 6. `assessment_result` Table

**Grain**: 1 row = 1 student × 1 assessment.

| Column | Type | Description | UCI Mapping | OULAD Mapping |
|---|---|---|---|---|
| `result_id` [PK] | VARCHAR | Surrogate ID | Auto: `student_id + assessment_id` | Auto: `id_student + id_assessment` |
| `student_id` [FK] | VARCHAR | FK → `student.student_id` | Generated | `id_student` |
| `assessment_id` [FK] | VARCHAR | FK → `assessment.assessment_id` | Generated | `id_assessment` |
| `enrollment_id` [FK] | VARCHAR | FK → `enrollment.enrollment_id`. **Denormalized shortcut** — avoids JOIN through `student_id + class_id` in feature computation | Generated | Generated |
| `source_dataset` | VARCHAR | `UCI \| OULAD \| OTHER` | Constant = UCI | Constant = OULAD |
| `score_raw` | FLOAT | Original score from source. Preserved for audit only | G1/G2/G3 (0-20) | `score` (0-100) |
| `score_normalized` | FLOAT | Always 0-100. UCI: G × 5. OULAD: as-is. Use this for all analysis | G × 5 | `score` |
| `pass_flag` [FE] | BOOLEAN | `= score_normalized >= 40`. Fixed threshold, consistent across all datasets | Computed | Computed |
| `submission_day` | INT | Relative day submitted (raw OULAD). NULL for UCI | NULL | `date_submitted` |
| `is_banked` | BOOLEAN | Score carried from prior attempt | Hardcode = False | `is_banked` |

> **Note**: `submission_delay_days` (= `submission_day` - `assessment.due_day`) cần JOIN 2 bảng → **không tính trong relational DB**. Sẽ tính on-the-fly trong Python EDA từ flat CSV.
| `created_at` | TIMESTAMP | Record creation | ETL timestamp | ETL timestamp |
| `updated_at` | TIMESTAMP | Last update time | ETL timestamp | ETL timestamp |

---

## 7. `event` Table

**Grain**: 1 row = 1 resource × 1 class.

| Column | Type | Description | UCI Mapping | OULAD Mapping |
|---|---|---|---|---|
| `event_id` [PK] | VARCHAR | Surrogate ID | NULL (no resource data in UCI) | Auto: `class_id + id_site` |
| `class_id` [FK] | VARCHAR | FK → `class.class_id` | Generated | `code_module + "_" + code_presentation` |
| `source_dataset` | VARCHAR | `UCI \| OULAD \| OTHER` | Constant = UCI | Constant = OULAD |
| `resource_id` | VARCHAR | Source resource/site ID | NULL | `id_site` |
| `resource_type` | VARCHAR | `resource \| forumng \| oucontent \| quiz \| subpage \| homepage \| url \| other \| unknown` | NULL → unknown | `activity_type` |
| `available_from_week` | INT | Week the material is planned to be used. NULL for UCI | NULL | `week_from` |
| `available_to_week` | INT | Last week the material is planned to be used. NULL for UCI | NULL | `week_to` |
| `created_at` | TIMESTAMP | Record creation | ETL timestamp | ETL timestamp |
| `updated_at` | TIMESTAMP | Last update time | ETL timestamp | ETL timestamp |

---

## 8. `engagement` Table

**Grain**: 1 row = 1 student × 1 event × 1 day.

| Column | Type | Description | UCI Mapping | OULAD Mapping |
|---|---|---|---|---|
| `event_id` [PK, FK] | VARCHAR | FK → `event.event_id` | NULL | Auto: `class_id + id_site` |
| `enrollment_id` [PK, FK] | VARCHAR | FK → `enrollment.enrollment_id` | Auto | Auto: `id_student + code_module + code_pres` |
| `event_day` [PK] | INT | Relative day from class start (raw OULAD). NULL for UCI | NULL | `date` |
| `week_number` | INT | `= CEIL(event_day / 7)`. Primary temporal dimension for trend analysis | NULL | `CEIL(date / 7)` |
| `engagement_count` | INT | Clicks/interactions this session | NULL | `sum_click` |
| `log_click_score` [FE] | FLOAT | `log(engagement_count + 1)` | NULL | Computed |
| `created_at` | TIMESTAMP | Record creation | ETL timestamp | ETL timestamp |
| `updated_at` | TIMESTAMP | Last update time | ETL timestamp | ETL timestamp |

---

## Summary: Feature Engineering Strategy

| Scope | Strategy | Tables affected |
|---|---|---|
| **Per-table features** (chỉ dùng data của 1 bảng) | Concat trực tiếp vào bảng đó (Node.js tính) | `student`, `enrollment`, `assessment_result`, `engagement` |
| **Cross-table features** (cần JOIN nhiều bảng) | Python EDA engine tính on-the-fly từ flat CSV | `avg_score`, `engagement_score`, `at_risk_*` |

### Per-table FE summary

| Table | Features [FE] |
|---|---|
| `student` | `lifestyle_risk_score`, `support_score`, `social_balance_score`, `family_stability_score`, `disadvantage_score` |
| `enrollment` | `registration_lead_time` |
| `assessment` | `week_of_class` (computed from `due_day`) |
| `assessment_result` | `pass_flag` |
| `engagement` | `log_click_score` |

> **Cross-table features (Python EDA only)**: `submission_delay_days` (assessment_result × assessment), `withdrew_early` (enrollment × class), `avg_score` (enrollment × assessment_result), `engagement_score` (enrollment × engagement), `at_risk_*` (multi-table).

---

## Cross-reference: Flat Tables (to be defined)

> Flatten tables sẽ được export thành CSV phục vụ Python Analytics Engine.
