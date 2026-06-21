# Automatic Mapping Accuracy Evaluation

Unit of analysis: file-qualified raw field. This avoids treating identically named fields such as `date` as semantically identical across source files.

| Dataset | Total | Mappable | Exact | Near-correct | Wrong | Unknown | Correctly excluded | Exact accuracy | Usable rate |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| UCI Portuguese | 33 | 31 | 31 | 0 | 0 | 0 | 2 | 100.00% | 100.00% |
| OULAD | 43 | 43 | 28 | 11 | 4 | 0 | 0 | 65.12% | 90.70% |
| Combined | 76 | 74 | 59 | 11 | 4 | 0 | 2 | 79.73% | 94.59% |

## Fields requiring correction

| Dataset | File | Raw field | Expected | Actual | Category | Confidence | Reason |
|---|---|---|---|---|---|---:|---|
| OULAD | assessments.csv | code_module | course_id | course_name | near_correct | 0.78 | course_name preserves related course context, but the canonical target should be course_id. |
| OULAD | assessments.csv | date | assessment_due_day | event_day | wrong | 0.96 | Wrong canonical target: expected assessment_due_day, received event_day. |
| OULAD | courses.csv | code_module | course_id | course_name | near_correct | 0.78 | course_name preserves related course context, but the canonical target should be course_id. |
| OULAD | courses.csv | module_presentation_length | course_duration_days | course_run | wrong | 0.72 | Wrong canonical target: expected course_duration_days, received course_run. |
| OULAD | studentInfo.csv | code_module | course_id | course_name | near_correct | 0.78 | course_name preserves related course context, but the canonical target should be course_id. |
| OULAD | studentInfo.csv | num_of_prev_attempts | previous_attempt_count | previous_attempt_count | near_correct | 0.95 | Correct target with scope student, expected enrollment. |
| OULAD | studentInfo.csv | studied_credits | study_load_credits | study_load_credits | near_correct | 0.96 | Correct target with scope course, expected enrollment. |
| OULAD | studentInfo.csv | final_result | final_outcome | final_outcome | near_correct | 0.98 | Correct target with scope student, expected enrollment. |
| OULAD | studentRegistration.csv | code_module | course_id | course_name | near_correct | 0.78 | course_name preserves related course context, but the canonical target should be course_id. |
| OULAD | studentRegistration.csv | date_registration | enrollment_start_day | enrollment_start_day | near_correct | 1.00 | Correct target with scope course, expected enrollment. |
| OULAD | studentRegistration.csv | date_unregistration | enrollment_end_day | enrollment_end_day | near_correct | 1.00 | Correct target with scope course, expected enrollment. |
| OULAD | studentVle.csv | code_module | course_id | course_name | near_correct | 0.78 | course_name preserves related course context, but the canonical target should be course_id. |
| OULAD | vle.csv | code_module | course_id | course_name | near_correct | 0.78 | course_name preserves related course context, but the canonical target should be course_id. |
| OULAD | vle.csv | week_from | available_from_week | week_number | wrong | 0.76 | Wrong canonical target: expected available_from_week, received week_number. |
| OULAD | vle.csv | week_to | available_to_week | week_number | wrong | 0.76 | Wrong canonical target: expected available_to_week, received week_number. |

## Interpretation

Mapper confidence is not an accuracy measure. Accuracy is established by comparison with the manually defined field-level ground truth above. Near-correct mappings are operationally recoverable but still require user review or a rule correction.