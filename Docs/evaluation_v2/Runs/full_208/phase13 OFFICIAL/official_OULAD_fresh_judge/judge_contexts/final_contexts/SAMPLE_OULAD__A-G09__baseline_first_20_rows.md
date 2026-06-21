# LLM Judge Final Judge Context - SAMPLE_OULAD__A-G09__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
 "record_id": "SAMPLE_OULAD__A-G09__baseline_first_20_rows",
 "evaluation_run_id": "oulad_official_r5",
 "dataset_id": "SAMPLE_OULAD",
 "task_id": "A-G09",
 "explanation_mode": "baseline_first_20_rows",
 "prompt_version": "judge_prompt_v2_pilot_v1",
 "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
 "task_name": "Socioeconomic disadvantage impact",
 "scope": "Many students",
 "actionable_question": "Are disadvantaged students receiving adequate support?",
 "target_audience": "academic_advisor, admin",
 "ai_summary_type": "correlation_evidence",
 "ai_prompt_hint": "Describe trend. Highlight which imd_band groups have most at-risk students. Recommend equity-aware support.",
 "query_labels": [
 "disadvantage_impact"
 ],
 "explanation_strategy": "correlation"
}
```

## Schema Context

```json
{
 "source_tables": [
 "student",
 "enrollment",
 "assessment_result",
 "assessment [OULAD only]"
 ],
 "key_db_fields": [
 "imd_score_numeric",
 "disability_flag",
 "highest_education",
 "disadvantage_score [FE single]; avg_score [FE cross]",
 "final_outcome"
 ],
 "output_schema": {},
 "query_labels": [
 "disadvantage_impact"
 ]
}
```

## Evaluation Requirements

```json
{
 "required_core_outputs": [
 {
 "requirement_id": "A-G09-CORE-01",
 "description": "Describe trend."
 },
 {
 "requirement_id": "A-G09-CORE-02",
 "description": "Highlight which imd_band groups have most at-risk students."
 },
 {
 "requirement_id": "A-G09-CORE-03",
 "description": "Recommend equity-aware support."
 }
 ],
 "required_supporting_outputs": [],
 "evaluation_constraints": [
 {
 "constraint_id": "A-G09-CONSTRAINT-01",
 "description": "Describe group-level patterns only; do not name individual students in equity analysis."
 },
 {
 "constraint_id": "A-G09-CONSTRAINT-02",
 "description": "Frame socioeconomic factors as context and association, not individual blame or deterministic cause."
 }
 ],
 "safety_fairness_applicability": "applicable",
 "safety_fairness_note": "Applicable because the task analyses socioeconomic disadvantage and recommends equity-aware support."
}
```

## Deterministic Derived-Stat Evidence

```json
[]
```

## Deterministic Action Evidence

```json
{
 "applicable": false,
 "evaluation_status": "not_available",
 "supported_action_count": 0,
 "supported_actions": []
}
```

## Deterministic Retrieval Evidence

```json
{
 "full_query_artifacts": [
 {
 "dataset_label": "disadvantage_impact",
 "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G09.json",
 "artifact_sha256": "f8ca1f2c8ec80458e585b492bd7d84ec7ddc5f846b6cfbefd814dcb0eadc8357",
 "row_count": 1998,
 "readable": true
 }
 ],
 "evidence_access_mode": "deterministic_artifact_retrieval",
 "full_result_row_count": 1998,
 "prompt_embedded_row_count": 0,
 "retrieved_row_count": 1998,
 "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase13_local_taskaware/oulad_official_r5/judge_inputs/retrieval_logs/SAMPLE_OULAD__A-G09__baseline_first_20_rows.json",
 "full_access_available": true,
 "full_result_sent_to_llm": false,
 "evidence_artifact_file_sha256": "f8ca1f2c8ec80458e585b492bd7d84ec7ddc5f846b6cfbefd814dcb0eadc8357",
 "evidence_rows_sha256": "116adbb70683d69c2db5f9580d23f9e2de936bd1a04fb4cbf5d10df2446cc60e",
 "retrieval_validation": {
 "status": "pass",
 "retrieved_row_count": 1998,
 "chunk_count": 1,
 "chunk_ids": [
 "SAMPLE_OULAD__A-G09__baseline_first_20_rows__disadvantage_impact__chunk_1"
 ],
 "row_ranges": [
 {
 "dataset_label": "disadvantage_impact",
 "row_start_inclusive": 0,
 "row_end_inclusive": 1997,
 "row_count": 1998
 }
 ],
 "issues": []
 }
}
```

```json
{
 "evidence_access_mode": "deterministic_artifact_retrieval",
 "retrieval_log": {
 "artifact_type": "llm_judge_v2_phase6_4_deterministic_retrieval_log",
 "generated_at": "2026-06-21T20:50:27.842Z",
 "record_id": "SAMPLE_OULAD__A-G09__baseline_first_20_rows",
 "retrieval_request_complete": true,
 "retrieval_coverage_status": "full",
 "chunks": [
 {
 "chunk_id": "SAMPLE_OULAD__A-G09__baseline_first_20_rows__disadvantage_impact__chunk_1",
 "dataset_label": "disadvantage_impact",
 "row_start_inclusive": 0,
 "row_end_inclusive": 1997,
 "row_count": 1998,
 "source_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G09.json",
 "source_artifact_sha256": "f8ca1f2c8ec80458e585b492bd7d84ec7ddc5f846b6cfbefd814dcb0eadc8357"
 }
 ]
 },
 "retrieved_datasets_sha256": "116adbb70683d69c2db5f9580d23f9e2de936bd1a04fb4cbf5d10df2446cc60e",
 "retrieved_datasets": {
 "disadvantage_impact": [
 {
 "student_id": "SAMPLE_OULAD_STU_2358258",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": null,
 "avg_score": 93.8,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_286658",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": null,
 "avg_score": 94.55555555555556,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_656539",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": null,
 "avg_score": 82.33333333333333,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_591869",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 50.2,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_676650",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": null,
 "avg_score": 98.44444444444444,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_675875",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 98.22222222222223,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_554065",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": null,
 "avg_score": 96.55555555555556,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_657050",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 95.44444444444444,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_674541",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 94.11111111111111,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_551220",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 80,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_675823",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 80.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_46705",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 83.71428571428571,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_675063",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 96.55555555555556,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_631117",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 94.44444444444444,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_675111",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": null,
 "avg_score": 88.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_654000",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": null,
 "avg_score": 62.666666666666664,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_559863",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": null,
 "avg_score": 93.22222222222223,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_654817",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": null,
 "avg_score": 80.6,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2439239",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": null,
 "avg_score": 49,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_557700",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": null,
 "avg_score": 72.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_655390",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": null,
 "avg_score": 85.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_678408",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": null,
 "avg_score": 82.8,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_275297",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 96.44444444444444,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_695673",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": null,
 "avg_score": 88.77777777777777,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_677085",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 73.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1752813",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 88.55555555555556,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_690439",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": null,
 "avg_score": 58.666666666666664,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_595553",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 86.33333333333333,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2026585",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 84.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_656277",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": null,
 "avg_score": 84.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_690695",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": null,
 "avg_score": 97.66666666666667,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_483543",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 83.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_467753",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": null,
 "avg_score": 51,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_686907",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": null,
 "avg_score": 86.71428571428571,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_691069",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": null,
 "avg_score": 91,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_691926",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 86.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_686110",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": null,
 "avg_score": 78,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_696869",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": null,
 "avg_score": 74.5,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_446479",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 67.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_446439",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": null,
 "avg_score": 64.83333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_686058",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": null,
 "avg_score": 94.44444444444444,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_590397",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": null,
 "avg_score": 75.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_692850",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 89,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_692928",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 77.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_692933",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 84,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_693302",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 90.22222222222223,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_686018",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 92.33333333333333,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_685988",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 93.66666666666667,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_685964",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": null,
 "avg_score": 96.44444444444444,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_698355",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": null,
 "avg_score": 95.66666666666667,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_694860",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": null,
 "avg_score": 92.44444444444444,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_694871",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": null,
 "avg_score": 32,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_63371",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": null,
 "avg_score": 78.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_589956",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": null,
 "avg_score": 84.83333333333333,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_696469",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 95.77777777777777,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_632756",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 97,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_698359",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 69.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2366117",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": null,
 "avg_score": 98.8,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_633960",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": null,
 "avg_score": 98.77777777777777,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_29639",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": null,
 "avg_score": 83.77777777777777,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_634420",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": null,
 "avg_score": 60,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_624060",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": null,
 "avg_score": 98.55555555555556,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_601735",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": null,
 "avg_score": 90.75,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_608422",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": null,
 "avg_score": 52.285714285714285,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_586750",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": null,
 "avg_score": 50.25,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_634853",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": null,
 "avg_score": 58.111111111111114,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_608577",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 83.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_473491",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": null,
 "avg_score": 97.16666666666667,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_685474",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 55,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_636387",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": null,
 "avg_score": 94.77777777777777,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2327472",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 54.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_616658",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": null,
 "avg_score": 82.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_685098",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": null,
 "avg_score": 98.44444444444444,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_684990",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": null,
 "avg_score": 64.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_499813",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": null,
 "avg_score": 93.55555555555556,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_627417",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": null,
 "avg_score": 83.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_609823",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 81.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_609852",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 95.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_688707",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 87.6,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_609969",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": null,
 "avg_score": 83.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_689399",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 61.77777777777778,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_641696",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": null,
 "avg_score": 80.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_684669",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 76.77777777777777,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_684643",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": null,
 "avg_score": 65.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1461795",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": null,
 "avg_score": 58,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_501617",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": null,
 "avg_score": 97,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_94978",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": null,
 "avg_score": 69.66666666666667,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_579283",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": null,
 "avg_score": 89,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_683668",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": null,
 "avg_score": 95.22222222222223,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_578815",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": null,
 "avg_score": 89.85714285714286,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_644516",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": null,
 "avg_score": 72,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_470159",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": null,
 "avg_score": 57.333333333333336,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_611033",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": null,
 "avg_score": 90.33333333333333,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_574705",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": null,
 "avg_score": 93.88888888888889,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_611255",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": null,
 "avg_score": 83,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_611417",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": null,
 "avg_score": 86.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_695946",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 82,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_647684",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": null,
 "avg_score": 44,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_682961",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": null,
 "avg_score": 95.44444444444444,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_648818",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": null,
 "avg_score": 71.2,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_695874",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 56,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_509150",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": null,
 "avg_score": 89.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_185057",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 22,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_510054",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": null,
 "avg_score": 76.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_681642",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": null,
 "avg_score": 91.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_599452",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 79,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_627450",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": null,
 "avg_score": 61.77777777777778,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_695732",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": null,
 "avg_score": 97,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_518359",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": null,
 "avg_score": 97,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_602288",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": null,
 "avg_score": 65.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2179304",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": null,
 "avg_score": 95.4,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_245600",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": null,
 "avg_score": 94.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_681174",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": null,
 "avg_score": 91.88888888888889,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_650271",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 79.33333333333333,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_631851",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 97.77777777777777,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_628034",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 65.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_604164",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": null,
 "avg_score": 80.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_257887",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 88.71428571428571,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_570757",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": null,
 "avg_score": 57.666666666666664,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_259641",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": null,
 "avg_score": 94.77777777777777,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_679959",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 80.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_651495",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 97.11111111111111,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_679569",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": null,
 "avg_score": 64.22222222222223,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_370839",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.7749999999999999,
 "avg_score": 52,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_328123",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.7749999999999999,
 "avg_score": 77,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_696833",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.7749999999999999,
 "avg_score": 92,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_393526",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.7749999999999999,
 "avg_score": 78,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_522754",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.7749999999999999,
 "avg_score": 54.875,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_629056",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.7749999999999999,
 "avg_score": 35,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_643434",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": true,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.7749999999999999,
 "avg_score": 44.666666666666664,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_693938",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.7749999999999999,
 "avg_score": 91.875,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_685619",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": true,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.7749999999999999,
 "avg_score": 53.57142857142857,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2564333",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.7749999999999999,
 "avg_score": 52.666666666666664,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_624789",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": true,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.7749999999999999,
 "avg_score": 79.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_561009",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.7749999999999999,
 "avg_score": 88,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_342799",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.7749999999999999,
 "avg_score": 59.666666666666664,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_638243",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.7749999999999999,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_614804",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.7749999999999999,
 "avg_score": 66.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_688533",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.725,
 "avg_score": 91.8,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_695643",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.725,
 "avg_score": 100,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_401011",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.725,
 "avg_score": 8,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_589778",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.725,
 "avg_score": 81.6,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_627295",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.725,
 "avg_score": 61,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_608681",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.725,
 "avg_score": 42.111111111111114,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_640773",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.725,
 "avg_score": 69.77777777777777,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_582550",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.725,
 "avg_score": 61.25,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_646589",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.725,
 "avg_score": 58.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_647417",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.725,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_572599",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.725,
 "avg_score": 78,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_627581",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.725,
 "avg_score": 1,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_655484",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.725,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_556476",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.725,
 "avg_score": 16,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1960479",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.725,
 "avg_score": 70.2,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2596553",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.725,
 "avg_score": 81.8,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_592657",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.725,
 "avg_score": 56,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2470326",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.725,
 "avg_score": 7.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_503779",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.725,
 "avg_score": 93.88888888888889,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_491926",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.725,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_697948",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.725,
 "avg_score": 49,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2619025",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.675,
 "avg_score": 79,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_603302",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.675,
 "avg_score": 80.33333333333333,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_649604",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "No Formal quals",
 "disadvantage_score": 0.675,
 "avg_score": 67.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_511350",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.675,
 "avg_score": 22,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_605540",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.675,
 "avg_score": 88,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_678339",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.675,
 "avg_score": 78.375,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_588824",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": true,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.675,
 "avg_score": 100,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_367510",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.675,
 "avg_score": 11,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_558440",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.675,
 "avg_score": 42.142857142857146,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_418397",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.675,
 "avg_score": 78.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_602533",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.675,
 "avg_score": 94.11111111111111,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_685487",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.675,
 "avg_score": 96.44444444444444,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_570954",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.675,
 "avg_score": 55,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_680002",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.675,
 "avg_score": 88.88888888888889,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_688171",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.675,
 "avg_score": 63,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_596620",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.675,
 "avg_score": 82.66666666666667,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_165733",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.675,
 "avg_score": 43.25,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_144745",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": true,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.675,
 "avg_score": 66.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_610684",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.675,
 "avg_score": 11,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_572919",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "No Formal quals",
 "disadvantage_score": 0.675,
 "avg_score": 69.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_680145",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.625,
 "avg_score": 37.8,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_597052",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.625,
 "avg_score": 86.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_465764",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.625,
 "avg_score": 0,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_523944",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.625,
 "avg_score": 82.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_680027",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.625,
 "avg_score": 98.77777777777777,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_603325",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.625,
 "avg_score": 91.85714285714286,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_632575",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.625,
 "avg_score": 76.875,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2483382",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.625,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2622627",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": true,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.625,
 "avg_score": 83,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_640109",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "No Formal quals",
 "disadvantage_score": 0.625,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_637070",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": true,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.625,
 "avg_score": 67.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_636628",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.625,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_160536",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.625,
 "avg_score": 74.8,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_632929",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.625,
 "avg_score": 44,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_675477",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.625,
 "avg_score": 70.42857142857143,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_688033",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "No Formal quals",
 "disadvantage_score": 0.575,
 "avg_score": 47,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_626768",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.575,
 "avg_score": 54,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_635410",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.575,
 "avg_score": 25.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_567597",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.575,
 "avg_score": 89.16666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1692156",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.575,
 "avg_score": 80.4,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_554691",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.575,
 "avg_score": 62,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_694705",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.575,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_696501",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.575,
 "avg_score": 78.33333333333333,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_69494",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "No Formal quals",
 "disadvantage_score": 0.575,
 "avg_score": 15.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_537654",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.575,
 "avg_score": 57.888888888888886,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_681731",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.575,
 "avg_score": 93.8,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_512330",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.575,
 "avg_score": 44,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_367815",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.575,
 "avg_score": 65.66666666666667,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_394791",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.575,
 "avg_score": 62.333333333333336,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_572231",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.575,
 "avg_score": 69.28571428571429,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_571765",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "No Formal quals",
 "disadvantage_score": 0.575,
 "avg_score": 89.22222222222223,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_182854",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.575,
 "avg_score": 64.125,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_590676",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "No Formal quals",
 "disadvantage_score": 0.575,
 "avg_score": 55.25,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1958121",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.575,
 "avg_score": 94.2,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_537811",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.525,
 "avg_score": 98,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_591891",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.525,
 "avg_score": 73.77777777777777,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_614265",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.525,
 "avg_score": 71.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_581410",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.525,
 "avg_score": 77.33333333333333,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_542167",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": true,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.525,
 "avg_score": 65.375,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_595495",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.525,
 "avg_score": 66.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_556521",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.525,
 "avg_score": 56,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_123598",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.525,
 "avg_score": 85.8,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_592051",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": true,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.525,
 "avg_score": 42.333333333333336,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_556440",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": true,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.525,
 "avg_score": 96.33333333333333,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_569944",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "No Formal quals",
 "disadvantage_score": 0.525,
 "avg_score": 88.44444444444444,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_698024",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.525,
 "avg_score": 71.66666666666667,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_695354",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.525,
 "avg_score": 97.11111111111111,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_238255",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": true,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.525,
 "avg_score": 45.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_425053",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.525,
 "avg_score": 83.33333333333333,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_379255",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 73,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_624209",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 86.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_624156",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 42.55555555555556,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_623484",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 88.55555555555556,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_175638",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 47,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_178072",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 57.125,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2333156",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 98.11111111111111,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_620716",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 87.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_607429",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 60.6,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_618849",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.475,
 "avg_score": 87.25,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_618590",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 65.66666666666667,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_617740",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 88.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_615242",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 0,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_612568",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 89,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_610622",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 0,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2274929",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.475,
 "avg_score": 44,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_233444",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 58.666666666666664,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2252437",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 50,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2620661",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 74.875,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2244214",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.475,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2613746",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 91.2,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2149324",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 85,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_253496",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 46,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_256680",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 82.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_35355",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 68.6,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2093150",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.475,
 "avg_score": 88.4,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_278413",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.475,
 "avg_score": 89,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2070517",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.475,
 "avg_score": 97.44444444444444,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_300611",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.475,
 "avg_score": 63.2,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_306202",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 61.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1773925",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.475,
 "avg_score": 97,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_334225",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 75.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1561750",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 52.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_336695",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 73.5,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1491894",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": true,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.475,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_356297",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 43,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_356523",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 85.16666666666667,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_698598",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.475,
 "avg_score": 77.2,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_365661",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 75.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_391059",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 69.42857142857143,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_391466",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 48.55555555555556,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_695369",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 11,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_402883",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 18,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_413087",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.475,
 "avg_score": 66.25,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_419024",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 47.666666666666664,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_423622",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 68.25,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_437968",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.475,
 "avg_score": 97,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_691257",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 0,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_467381",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 100,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_689527",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.475,
 "avg_score": 18,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_688537",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 40,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_688521",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 92.11111111111111,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_479649",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_687981",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 78.71428571428571,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_687160",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 93.33333333333333,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_687023",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 62.166666666666664,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_686797",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 78,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_497536",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 33,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_502356",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 42.2,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_683373",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 88,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_505722",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 65,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_681335",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 81.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_517416",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 93.77777777777777,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_522257",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 82,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_522525",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 66,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_534203",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 78,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_678089",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 95.33333333333333,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_535648",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 82.83333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_541040",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 74.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_541482",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 61,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_676783",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.475,
 "avg_score": 45,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_542054",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 28.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_543417",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 32,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_676538",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 69,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_544319",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 68,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_545118",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 38.6,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_545255",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 82.33333333333333,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_547506",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 44,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_549677",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 56,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_675396",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 77.11111111111111,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2691861",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 67.66666666666667,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_657285",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.475,
 "avg_score": 85.2,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2413037",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.475,
 "avg_score": 30.2,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_657048",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.475,
 "avg_score": 55.8,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_656634",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 100,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_654322",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 89.55555555555556,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_654188",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 63,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_654114",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 58.6,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_561826",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.475,
 "avg_score": 78.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_561913",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.475,
 "avg_score": 62.125,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_562884",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.475,
 "avg_score": 71.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_653278",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 81.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_653127",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.475,
 "avg_score": 97,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_653115",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.475,
 "avg_score": 78.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_565743",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 45.875,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_566979",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 88.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_651935",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 85.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_567719",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 61.666666666666664,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_568691",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 95,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_570453",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 64.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_651423",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 87.66666666666667,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_571808",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 93.66666666666667,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_571962",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 48.77777777777778,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_572746",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 79.66666666666667,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_573858",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 72.8,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_647869",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 96,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_647406",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 64,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_574928",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 73.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_575265",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_646841",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_645369",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 86,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_577148",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 22,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_645216",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 90.5,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_644480",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 67.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_644242",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 92.22222222222223,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_579325",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 78,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_643568",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 84.25,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_642839",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 32.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_581656",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 75.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_582530",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.475,
 "avg_score": 59.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_583288",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 31.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_584281",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 56,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_636996",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 74,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_586550",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.475,
 "avg_score": 83.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_586762",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 52.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_586808",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 85.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_634600",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 71.875,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_634309",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 65.66666666666667,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_633990",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 78,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2361633",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 88.6,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_632700",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 93,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_631880",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 65,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_631870",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 81.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_592494",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 75,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_592950",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2345751",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 88,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_631016",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 70.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_630073",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.475,
 "avg_score": 61,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_629607",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 82,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_597365",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 89,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_629405",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 92,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_598102",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.475,
 "avg_score": 70.5,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_628706",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 22.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_599169",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 83.375,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_627283",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.475,
 "avg_score": 57.166666666666664,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_625263",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.475,
 "avg_score": 80.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_625078",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.475,
 "avg_score": 94,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_624860",
 "socioeconomic_band": "0-10%",
 "imd_score_numeric": 5,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.475,
 "avg_score": 72,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_402210",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "No Formal quals",
 "disadvantage_score": 0.42500000000000004,
 "avg_score": 37,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_601043",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 85,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_627184",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 58.333333333333336,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_629535",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.425,
 "avg_score": 48.22222222222222,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_575047",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 44.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_647083",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 57.666666666666664,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_624730",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 8,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_347809",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.425,
 "avg_score": 92,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_341361",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.425,
 "avg_score": 44,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_686034",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 56,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_647464",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 81.4,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_545704",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 70.5,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_647518",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 70.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_413200",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.425,
 "avg_score": 46.22222222222222,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_546634",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 66,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_690365",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 78.75,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_546934",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 56,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_508295",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 21,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_389250",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 80.66666666666667,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_547612",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 69.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_647735",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 17.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1864086",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 27.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_124711",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 44,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_481350",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 77.66666666666667,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_597166",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.425,
 "avg_score": 44,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_573481",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_412663",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 52.666666666666664,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_469614",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 0,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_624493",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 89.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_573473",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 30.25,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_509710",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 23.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1874160",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 86.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_550702",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 91.25,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_572874",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 81.375,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_199760",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.425,
 "avg_score": 49,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_648872",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_297166",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 49.875,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_649761",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 66.33333333333333,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_138861",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.425,
 "avg_score": 94.33333333333333,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_465789",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 69.8,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_629692",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 89,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_188273",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 69.71428571428571,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_74290",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 10,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_633634",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 54.142857142857146,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_602151",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 91.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_338731",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 19.25,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_650370",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.425,
 "avg_score": 88.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_682301",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 52.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_80491",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 51.8,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2637912",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.425,
 "avg_score": 86.25,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2142516",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 91.8,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_554444",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 0,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_691218",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 81.71428571428571,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_291674",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 86.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_656929",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 54.42857142857143,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_366164",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 53.333333333333336,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_102209",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 54.333333333333336,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_478562",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 11,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_599297",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 47.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_285637",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 53.833333333333336,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_651267",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 0,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2083701",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 84.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2091230",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": 0.425,
 "avg_score": 92.77777777777777,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_275711",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 60.666666666666664,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_651508",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 83.22222222222223,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_651823",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 67.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_595988",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_688356",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 91.6,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_557959",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.425,
 "avg_score": 66.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_267619",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 58.333333333333336,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2384666",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 67.66666666666667,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_566464",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 81,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_681235",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 62.111111111111114,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_559518",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 42,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_515857",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 74.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_565883",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 63,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2469688",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 84.57142857142857,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_560554",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 41,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_654295",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 81.4,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_652994",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 0,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_684709",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 96.88888888888889,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_608746",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 80.85714285714286,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_630479",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 87.77777777777777,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_564649",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 37.8,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_636000",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 61.888888888888886,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_653506",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 6,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_692363",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 69,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_563051",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 62.5,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_686645",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 86.6,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_636420",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 33,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_680765",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 50.666666666666664,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_684663",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 80,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_627527",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 90.75,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_520332",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 66.6,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_521115",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.425,
 "avg_score": 81.625,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_609456",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.425,
 "avg_score": 86.77777777777777,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_585359",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 57.75,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_616646",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 54,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_607094",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 90,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_584711",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.425,
 "avg_score": 61,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_680222",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 0,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_334154",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 74,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_369208",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 56,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_492537",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 76,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_362548",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 33.8,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_523762",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 68,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_638771",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 78.5,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1612600",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 84.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_486300",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 62,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_524019",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 74,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_584443",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 98.33333333333333,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1646172",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 70.83333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_616386",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 59.22222222222222,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2462862",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 56,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_582723",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 55.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2372788",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 89,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_679733",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 98.22222222222223,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_642291",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 89,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_684617",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 56,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_71723",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 63.2,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_642838",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 72,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_679451",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 94,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_642902",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 55.125,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_529975",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 68.33333333333333,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_679431",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 97.88888888888889,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_684514",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 64.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_685597",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 77.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_613237",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 74.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_51576",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 92.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_622812",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 79.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_695270",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 77.77777777777777,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_693340",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 83.8,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_430020",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 66,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_580709",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 49.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_504363",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 88.22222222222223,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_579614",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 71.5,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_689190",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 86.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_677349",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 87.22222222222223,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2623427",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 54,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1744800",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.425,
 "avg_score": 11,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_536736",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.425,
 "avg_score": 44,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_612283",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 30,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_577566",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.425,
 "avg_score": 74,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_577551",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 20.666666666666668,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2559144",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 86.77777777777777,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_539451",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 58,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_611813",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 96.44444444444444,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_645124",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": 0.425,
 "avg_score": 94.33333333333333,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_677018",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 85.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_694510",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 89.2,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_625100",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 60.333333333333336,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_576541",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 59.42857142857143,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_694914",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.425,
 "avg_score": 44,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_417724",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.425,
 "avg_score": 79.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_610904",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.425,
 "avg_score": 77.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_645586",
 "socioeconomic_band": "10-20",
 "imd_score_numeric": 15,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.425,
 "avg_score": 89.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_632637",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 48.714285714285715,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_484435",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 94.5,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_365701",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 92.11111111111111,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2499779",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 69.44444444444444,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_685705",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 66.66666666666667,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_91040",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 42.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_494829",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 62.833333333333336,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_685458",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 91.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_498236",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 61.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_498828",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 72,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_684905",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 78.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_499683",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 33,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_352637",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 97.11111111111111,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1345808",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 65,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1483632",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 77.875,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_501867",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 80.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_501897",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 11,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_348855",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 88.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_96864",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 0,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_348351",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 49,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_682717",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 76,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_682569",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 73.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_508637",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 83.88888888888889,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_682414",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 78,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_339824",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 56.25,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_338983",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 81,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_510070",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 88,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_510266",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 61.44444444444444,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_682259",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 36,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1532840",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 90.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1552044",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 84.2,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_335914",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 78,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_514504",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 50.75,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_681302",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 80.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_606344",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 70.33333333333333,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_335401",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 22,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_519057",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 59.888888888888886,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_680687",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 97.125,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_591083",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 48.333333333333336,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_522924",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 32,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_523239",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 58.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2464118",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 72.875,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_330952",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 56,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_325497",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_679529",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 47.666666666666664,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_679179",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 75,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_679039",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 56.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_533006",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 89,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_119310",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 33,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_533689",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 47.333333333333336,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_591230",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 83.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_632378",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 93,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_539408",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 33,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_185127",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 56.714285714285715,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_541538",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 51.8,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_592093",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 59.714285714285715,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_592372",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 34.166666666666664,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_675902",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 69.42857142857143,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_626463",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 67.125,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_546139",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 25,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_546654",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 81.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2598631",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 56,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_605468",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 83.33333333333333,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_675638",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 96.2,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_308953",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 40.4,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_675442",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 56,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_550393",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 49,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1897054",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 86.77777777777777,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_674430",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 69.66666666666667,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_552255",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 11,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_621380",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 100,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_657210",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 67,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2598961",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 95.66666666666667,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2415526",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 74.4,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_631491",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 99.55555555555556,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2405934",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 34.55555555555556,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_554761",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 62.55555555555556,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_656642",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 56.22222222222222,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_593657",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 95.66666666666667,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2009279",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 0,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_656287",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 97.2,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_37652",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 98,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_654755",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 24,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2096918",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 60.55555555555556,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_594214",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 56,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_264715",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 75.8,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_561113",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 60.333333333333336,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_654016",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 89.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_626407",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 66,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2101566",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 33,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_653177",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 36,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_566694",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 56,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_262385",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 89,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_630452",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 69.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_630177",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 84.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_261160",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 64.4,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_622384",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 33,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_625541",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 58.375,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_650850",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 50.666666666666664,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_629822",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 11,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_572011",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 70.77777777777777,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2178686",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 91.66666666666667,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_246829",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 48,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_650145",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 54.8,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_649001",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 43.333333333333336,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_200372",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 77,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_596981",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 72.4,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_648363",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 99.33333333333333,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_648321",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 84.2,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_622413",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 23,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_573924",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 90.6,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_575763",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 75,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2373648",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 56,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_645948",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 76.33333333333333,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_604379",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 33,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_142092",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 97.75,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_577235",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 56.8,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_645160",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 11,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_612439",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 78,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_643770",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 65.33333333333333,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_580384",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 97.125,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_628008",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 44,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_581247",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 79.4,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_614300",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 77,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_581708",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 21.333333333333332,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_627947",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 79.66666666666667,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_583993",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 44.42857142857143,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_584077",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 56,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_622935",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 73.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_584771",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 67.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_586046",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 49.75,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_616870",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 91.77777777777777,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_636364",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 90.33333333333333,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_170030",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 85.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_617418",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 39,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_608423",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 67.16666666666667,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_623124",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 74.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_634648",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 52.333333333333336,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_618649",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 70.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_602973",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 81.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_634193",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 97,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_587377",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 57.75,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_633544",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 55.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_587881",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 89,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_588170",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 76.6,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_633334",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 50.75,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_694680",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 71,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_416860",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 40.2,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_422697",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 77.66666666666667,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_588566",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 68.66666666666667,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_694147",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 79,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_695122",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 33,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_695232",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 99,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_406698",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 84,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_693141",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 77.4,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_633328",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 90.66666666666667,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_405125",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 78,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_442669",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 89.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_692654",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 83.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_692603",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 98.11111111111111,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_401258",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 100,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2558071",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 58.6,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_447644",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 88.77777777777777,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_692219",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 56,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_448370",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 11,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_400266",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 74,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_607453",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 74.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_691195",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 16.555555555555557,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_398496",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 69.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_396631",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 83,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_465900",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 74.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_466372",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 78.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_695653",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 51.333333333333336,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_690644",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 83.5,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_690404",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 91.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2522932",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 47.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_471027",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 98.8,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_689855",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 91.11111111111111,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_633198",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 53.25,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_472309",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 57,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_696357",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 69,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_61227",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 68.25,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_474495",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 88,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_372577",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 58.6,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_475163",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 75,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_475734",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 63.625,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_477099",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 75,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_478346",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.375,
 "avg_score": 65.25,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_688117",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 33,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_589523",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.375,
 "avg_score": 46.285714285714285,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_697283",
 "socioeconomic_band": "20-30%",
 "imd_score_numeric": 25,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.375,
 "avg_score": 84.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_541531",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 81.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_693204",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 73.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_628717",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 86.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_646413",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 53.333333333333336,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_646359",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 24.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_646173",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 82.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_503710",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 56.25,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_632134",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 60,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_358578",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 33,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_433794",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 83.57142857142857,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_685950",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 51,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_540509",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 89,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_644848",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 82.4,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_539727",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1817515",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 84.2,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_316091",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 52.625,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_578000",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 52.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2338535",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 27,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_612179",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 53.111111111111114,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_644246",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 94,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_598478",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 78,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_120236",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 44.333333333333336,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_620484",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 47,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_579278",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 37.4,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_367352",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 58.888888888888886,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_628216",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 70.57142857142857,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_503610",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 86.75,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_613122",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 33.375,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1738582",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": true,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 95.2,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_580342",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 83.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_619927",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 88.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_643758",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 45.666666666666664,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_678393",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 73.4,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_532846",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 57,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_580722",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 77,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_678860",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 93.4,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_580845",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 63.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2437591",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 78,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_589782",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 91.77777777777777,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_581179",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 62.375,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_371439",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 47.25,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_322907",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 81.33333333333333,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_527958",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 33.2,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_404863",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 78,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_581552",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 87.25,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_598751",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 80,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_614458",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 94.77777777777777,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_472290",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 85,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_581770",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 56,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_641684",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 28.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_679750",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 83.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_641347",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 49.8,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_697253",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 46.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2316201",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 84.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_615075",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 94.66666666666667,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_679886",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 91.88888888888889,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_598983",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 48.22222222222222,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_583293",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 88.33333333333333,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_107883",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 93.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_353804",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 53,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1307784",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 63,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_696930",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_584386",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 57.111111111111114,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_330453",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 88.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1593442",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 84.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_680267",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 72.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_494498",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 75,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_638018",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 88.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_585134",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 86.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_585154",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 86.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_585222",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 51.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2464386",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 67.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_585422",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 92.66666666666667,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_680602",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 78.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_520077",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 81.44444444444444,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_689004",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 95.33333333333333,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_636732",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 81.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_586088",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 78.2,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_609235",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 95.66666666666667,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_681165",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 92.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_481314",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 71,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_379265",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 67.25,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1592048",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 91.2,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_368436",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 77.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_518134",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 91,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_589438",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 96.4,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1101190",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 85.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_686584",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 81.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_685206",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 95.88888888888889,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_632626",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 22,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_603049",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 66.625,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2555596",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 59,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_633047",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 18,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_687844",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 78.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_587244",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 56.111111111111114,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_685212",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 85.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_607600",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 44,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_510460",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 78,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2595204",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 34.42857142857143,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_466360",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 94.77777777777777,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_588033",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 84.8,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_619359",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": true,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 64,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_482938",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 11,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_588178",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 88.75,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_588482",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 72.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_54062",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 57,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_588842",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 77.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_507344",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 66.5,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_594627",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_411549",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 55.77777777777778,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_165647",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 43.42857142857143,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_653821",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "No Formal quals",
 "disadvantage_score": 0.325,
 "avg_score": 84,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2668106",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 86.88888888888889,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_654002",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 93,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_653452",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 69.71428571428571,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_600535",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 55.8,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_564213",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 83.125,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2574909",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 76,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_564714",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": true,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 55.75,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_622096",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 74.33333333333333,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_631073",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 68.77777777777777,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2393945",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 65.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_622192",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 85.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_622027",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 51.42857142857143,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_560064",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 50.666666666666664,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_652894",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 32.333333333333336,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_652501",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 69,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2599883",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 96.88888888888889,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_134190",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 78,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_695518",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 82,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2388623",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 44.55555555555556,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_595938",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 45.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_655051",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 50.875,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_557650",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 80.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_477185",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 82,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_694523",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 96.77777777777777,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2394090",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 69.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_568307",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 24.333333333333332,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_269388",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 55.875,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_505967",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 100,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_568948",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 91.22222222222223,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_569049",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 89,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_409953",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 76.77777777777777,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2127889",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 92.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_620369",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 68.375,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_601753",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 44,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_570671",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 78,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_285412",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 11,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2137171",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 79.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_593607",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 41.2,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_651159",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 90.2,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_650856",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 65.5,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_409733",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 84.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_293686",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 74.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2159868",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 52.666666666666664,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_505700",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 34.666666666666664,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2421961",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 23.25,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_650341",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 50.875,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_551791",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 89,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_694472",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 80.75,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_694212",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 83.75,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_674965",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 89,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_599663",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 72.25,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_694150",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_631663",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 77.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_572431",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 77.125,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2257112",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 70,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_685399",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 78,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_675054",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 72.625,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_648854",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 66.625,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_699370",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 62,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_125777",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 93.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_384106",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 100,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_425287",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 51.333333333333336,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_572816",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 33,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1896088",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 40,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2622441",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 67.28571428571429,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_693998",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 71.33333333333333,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_549888",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 84.6,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_675495",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 59.4,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_619928",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 90.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_648085",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 67.25,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_429015",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 61.22222222222222,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_621300",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 64.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_647865",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 57.22222222222222,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_548922",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2285527",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 86.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_545758",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 78,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_647479",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 46.22222222222222,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_620897",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 92.75,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_196189",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 79.875,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_600814",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.325,
 "avg_score": 60.625,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_574720",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 55.714285714285715,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_675915",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 28.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1850818",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 24,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_676469",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 73.25,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_575162",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.325,
 "avg_score": 10,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_624256",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 65.375,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1828753",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 92.88888888888889,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1485702",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 91,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_312061",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 12.4,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_685871",
 "socioeconomic_band": "30-40%",
 "imd_score_numeric": 35,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.325,
 "avg_score": 97.77777777777777,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_605840",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.3,
 "avg_score": 99.33333333333333,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_611542",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.3,
 "avg_score": 84,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_637754",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.3,
 "avg_score": 98.11111111111111,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_682309",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.3,
 "avg_score": 73.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_188251",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": true,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.3,
 "avg_score": 70.83333333333333,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_654031",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": true,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.3,
 "avg_score": 80.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_634119",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 88.2,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_25261",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 78,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_126812",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 47.75,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_132423",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 84,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_137281",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 60.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_145114",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 50.8,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_145490",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 46.6,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_171896",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 35.333333333333336,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_199361",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 82.66666666666667,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_242636",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 0,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_243358",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 64.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_244738",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 88.66666666666667,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_263150",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 89,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_266097",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 56,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_268018",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 61.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_294112",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 79.75,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_303218",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 83.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_310765",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 83.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_322844",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 36.6,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_324338",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 85,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_340010",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 61.75,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_369242",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 78,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_379406",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 84.125,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_410176",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 62,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_412600",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 51.333333333333336,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_418971",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 73.33333333333333,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_420042",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 88.85714285714286,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_427413",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 66,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_440171",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 65.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_446778",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 86,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_465577",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 37.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_465619",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 37.666666666666664,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_470914",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 39.666666666666664,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_479522",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 49.333333333333336,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_492020",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 78.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_493416",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 68.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_502004",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 19,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_503457",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 88.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_506144",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 80.4,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_509148",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 70.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_513969",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 79.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_517223",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 60.333333333333336,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_522004",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 6.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_523334",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 67.33333333333333,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_526124",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 71.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_526235",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 54.2,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_529309",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 44,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_529723",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 0,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_533512",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 55.4,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_536825",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 44,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_544052",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 53.111111111111114,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_549113",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 52,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_551158",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 78,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_551332",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 69,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_553599",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 100,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_553719",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 92.66666666666667,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_553741",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 60.142857142857146,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_554459",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 41.6,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_557608",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 61.333333333333336,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_561848",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 59.666666666666664,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_565605",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 93.6,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_566664",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 0,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_566938",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 96.22222222222223,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_567304",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 91.77777777777777,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_571610",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 45,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_572154",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 59.8,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_575798",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 85.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_576791",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 94.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_579052",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 49.666666666666664,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_579176",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 74,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_579583",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 64,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_582395",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 70.8,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_588100",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 82.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_588556",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 50,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_592625",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 78.6,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_592997",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 58.888888888888886,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_594419",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 60.888888888888886,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_594909",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 64.85714285714286,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_600350",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 56,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_601234",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 72.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_601388",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 67.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_601956",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 47,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_603179",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 61.2,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_603503",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 81.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_603620",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 83.14285714285714,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_603979",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_605545",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 78,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_606036",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 33,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_606170",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 65.8,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_607085",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 61.333333333333336,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_608978",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 97.11111111111111,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_610019",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 61.8,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_613644",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 89,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_614761",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 66.6,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_617327",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 24.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_619472",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 22,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_621414",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 15.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_621696",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 71.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_622425",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 49.666666666666664,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_623100",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 84.55555555555556,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_625928",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 9,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_627401",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 90.25,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_628300",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 77.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_628376",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 79.875,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_629096",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 52,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_629523",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 99.33333333333333,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_629560",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 64.4,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_630013",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 62.333333333333336,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_631573",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 63.22222222222222,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_632260",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_632904",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_633179",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 79.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_633618",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 82.8,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_633746",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 72.77777777777777,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_636783",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 94.77777777777777,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_638254",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 84.5,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_643309",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 84,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_643404",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 74,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_643690",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 33,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_644416",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 91.6,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_644905",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 98.66666666666667,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_644951",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 91.11111111111111,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_645939",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 78,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_646351",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 92.55555555555556,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_647148",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 62.142857142857146,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_648285",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 72.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_648369",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 71,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_649607",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 25,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_649840",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 66.25,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_649868",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 83.14285714285714,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_650099",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 77,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_650787",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 48.875,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_652902",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 99.33333333333333,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_655927",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 69,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_674808",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 66.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_675504",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 93.88888888888889,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_676526",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 89.66666666666667,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_677459",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 63.111111111111114,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_678204",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 85.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_679363",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 47,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_680492",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 87.77777777777777,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_680804",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 69.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_688843",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 61.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_689042",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 89,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_690589",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 32.77777777777778,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_690763",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 71.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_691550",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 96.88888888888889,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_691843",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 57.22222222222222,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_692105",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 91,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_693747",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 76.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_696019",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 90,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_698299",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 92.77777777777777,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1023623",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 77.25,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1068316",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 37.125,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1078701",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 89.8,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1478775",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 76.8,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1826819",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 97.4,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1915824",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 67.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1916140",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 88.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1936285",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 94.22222222222223,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1942491",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 74.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1982166",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 75.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1994385",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 78,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2020916",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 43.166666666666664,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2084711",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 90.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2257740",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 87.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2451523",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 92.5,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2462607",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.275,
 "avg_score": 90.2,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2500064",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.275,
 "avg_score": 52.25,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2590948",
 "socioeconomic_band": "40-50%",
 "imd_score_numeric": 45,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.275,
 "avg_score": 73,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_585769",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 86.25,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_637325",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 6,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_610033",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 88.55555555555556,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_561195",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 59.22222222222222,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_603529",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 71.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_610234",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 90,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_584926",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 58.285714285714285,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_562437",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 44,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_626625",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 81.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_584553",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 81,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_626757",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 91.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_682226",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 86.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_591733",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 44.833333333333336,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_348783",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 97,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_602683",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 96.66666666666667,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_582320",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 83.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_512852",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 91.8,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_641804",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 62.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_581316",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 65,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_620782",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 33,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_693111",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 90,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_305036",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 30.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2172136",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 98.44444444444444,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_642850",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 92.4,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_580916",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 69.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_563920",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 71,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2462628",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 38,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_128510",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 87.16666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_564931",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 71.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_686411",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 98.55555555555556,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_432478",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 56,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_652428",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 56,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_652023",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 73.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_579362",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 71.33333333333333,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_245217",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 56.714285714285715,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_651759",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 99.33333333333333,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_568596",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 100,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_651217",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 72.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_570997",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 48,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2383983",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 87.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_577460",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 77.66666666666667,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_76949",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 81.77777777777777,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_613667",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 83,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_512257",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 24.166666666666668,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_560879",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 67.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_626878",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 49.44444444444444,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_628407",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 80.42857142857143,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_577427",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 28.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_603129",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 80.6,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_430806",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 77.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_610537",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 33,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_34068",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 73.33333333333333,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_592951",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_427390",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 74,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_605367",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 62.55555555555556,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_645590",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 78,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_645698",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 75.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_571921",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 88.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_572098",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 78.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_472736",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 93.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_612860",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 78,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_610549",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 56,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_133419",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 89,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_494911",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 44,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_689246",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 96.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_599341",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_495438",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 60.875,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_490313",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 58,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_482751",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 100,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_630905",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 97,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_494211",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 59,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_689792",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 78.16666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_575398",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 40.4,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_612327",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 68.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_572339",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 85,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_627471",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 84.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2396985",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 54.8,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_649856",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 100,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2520539",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 69,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_649343",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 76.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_574523",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 22,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_572584",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 53.666666666666664,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_515734",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 41.111111111111114,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_496845",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 83.375,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_572588",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 42,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_630430",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 71.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_572589",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 48,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_610881",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 91.88888888888889,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_602856",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 89,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_648649",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 84.4,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_602827",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 68,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_648250",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2593755",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 59.333333333333336,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_685557",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 56,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_296725",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 88.25,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1906003",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 62,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_499703",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 94.88888888888889,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_335405",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 96.11111111111111,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_499848",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 42.2,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_523872",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 75,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_595106",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 93.44444444444444,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1091274",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 69.25,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1945240",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 49.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_530663",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 71.77777777777777,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_395757",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 85.8,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_679128",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 92.8,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_592310",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 91.33333333333333,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2434666",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 93.55555555555556,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_290043",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 56,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1468838",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 61.666666666666664,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_630519",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 83.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_350267",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 62.25,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2013403",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 91.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_678203",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 59.42857142857143,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1752098",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 70,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_620159",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 50,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_382378",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 67.33333333333333,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1449245",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 66,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_379042",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 62.2,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_696515",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 61.857142857142854,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_677641",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 94.33333333333333,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2067377",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 83.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_619380",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 66.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_677089",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 96.28571428571429,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_536276",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 86.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_943374",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 54.44444444444444,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_481169",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 64.57142857142857,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_624354",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 23.142857142857142,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_465732",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 45.25,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_857856",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 100,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_311862",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 77.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_686558",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 70.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_596846",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 68.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_364103",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 60.22222222222222,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_327057",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 94.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_618982",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 46,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_633504",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 82.5,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_633511",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 60,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_61236",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 56,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_464780",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 44,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_683625",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 65.875,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_633647",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 73,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_42746",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 95.88888888888889,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_351903",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 68.33333333333333,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_633914",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 78.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_687190",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 97,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_508244",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 54.333333333333336,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_310280",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 52,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_23698",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 74.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_264151",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 59.75,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_605111",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 76.6,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_550814",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 53.625,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_551397",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 85.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_674882",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 65.16666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_70495",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 89.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_674699",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "No Formal quals",
 "disadvantage_score": 0.225,
 "avg_score": 77.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_447695",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 81,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_445921",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 22,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_586781",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 98.4,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_552498",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 79,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_552666",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 38.333333333333336,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_554266",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 84,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_555498",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 83.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_624957",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 27.75,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_635573",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 97.55555555555556,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_72609",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.225,
 "avg_score": 51,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_616439",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 37.375,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_655498",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 86,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_692500",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 78.33333333333333,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_655408",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 33,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_586476",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 73.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_253013",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 82.6,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_654539",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": 0.225,
 "avg_score": 90.33333333333333,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_609891",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 41.375,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_445114",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 61.2,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_560065",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 75.6,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_628777",
 "socioeconomic_band": "50-60%",
 "imd_score_numeric": 55,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.225,
 "avg_score": 71.75,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_104480",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "No Formal quals",
 "disadvantage_score": 0.2,
 "avg_score": 88,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_656347",
 "socioeconomic_band": null,
 "imd_score_numeric": null,
 "disability_flag": false,
 "highest_education": "No Formal quals",
 "disadvantage_score": 0.2,
 "avg_score": 80.875,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_264845",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 32.142857142857146,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_594399",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 44,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_687686",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 93.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1583847",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 90.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_594326",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 53.22222222222222,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_479987",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 70.66666666666667,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_478513",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 78.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_604991",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 99,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1490624",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 92,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_688770",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 77.14285714285714,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2593920",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 78.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_472762",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 85.66666666666667,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1474903",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 95.2,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_689436",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 99,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_471810",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 78,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_592731",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 99,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_690046",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 73.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_470617",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 65.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_469887",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 56,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_690962",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 72.33333333333333,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1442981",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 93.25,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_632004",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 71.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_439855",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 92,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_632451",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 82.8,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_432724",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 98.33333333333333,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_430487",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 91.22222222222223,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_590974",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 67,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_621884",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 92.44444444444444,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_423607",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 56.111111111111114,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_354688",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 64.75,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_589723",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 44,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_589634",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 83.6,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_422343",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 85.77777777777777,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_417522",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 84.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_694536",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 44,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1301103",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 94.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_694726",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 54.6,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_412304",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 100,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_355935",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 72.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_408608",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 74.125,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_632866",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 87.625,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_392890",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 59.75,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_385980",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 57,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_622890",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 57,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2376512",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 76.77777777777777,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_30850",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 99.33333333333333,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_379185",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 64.25,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_372234",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 83.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_697460",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 36,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_633303",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 97.33333333333333,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_359958",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 92,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_366367",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 56.6,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_588765",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 68.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_618875",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 64,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_618777",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 96.44444444444444,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_625357",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 90,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2686712",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 75.16666666666667,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_587122",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_634111",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 75.66666666666667,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_634200",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 75.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_138997",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 36.4,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_608891",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 83.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_586594",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 89.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_636124",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 97.77777777777777,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_636716",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 84,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_585812",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 60.857142857142854,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_583704",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 79.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_582651",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 74.8,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_582514",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 32,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_581676",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 58.111111111111114,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_610279",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 66.5,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_610285",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 88.66666666666667,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_643403",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 86.33333333333333,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_580798",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 77.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_580714",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 82.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_577279",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 90.88888888888889,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_577149",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 44,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_645334",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 96.33333333333333,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_576568",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 84.77777777777777,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_645835",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 72.16666666666667,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_576433",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 98,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_96874",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 79.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_646363",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 92.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_646406",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 98.4,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_612449",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 22,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_605666",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 84.25,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_646553",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 75,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_610643",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 68.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_647593",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 84.125,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_610650",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 85.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_599084",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 100,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_620819",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 56,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_572735",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 77.4,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_648868",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 33,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_598501",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 80.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_649105",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 91.2,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_131933",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 75.25,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_161781",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 50,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_572396",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 87.66666666666667,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_190780",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 56,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_628361",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 98.22222222222223,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2533650",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 67.33333333333333,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2277009",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 62.375,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_571131",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 59.333333333333336,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_201425",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 78.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_232072",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 48.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2242383",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 33,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_628618",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 56.666666666666664,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_598299",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 78.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_247304",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 87.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_564356",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 56,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_248818",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 44,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_561208",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 82.83333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_654504",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 64.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_654646",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 96.75,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_654915",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 91.11111111111111,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_655108",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 91.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_655378",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 76.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_556645",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 55.888888888888886,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_628910",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 73.75,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_556251",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 51.75,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_656340",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 81.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_597436",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 94.6,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_656683",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 92.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_552965",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 94.44444444444444,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2139273",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 39,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_258042",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 44,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_669530",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 51.6,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_552220",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 38.42857142857143,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_674497",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 76.77777777777777,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2133234",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 75,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_551214",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 77.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_550545",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 76.75,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_549769",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 60.2,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_622374",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 95.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_549687",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 74,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_675760",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 97.2,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2410609",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 61.666666666666664,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_676390",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 76.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_278600",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 56,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_676964",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 83.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_540694",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 46,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2050179",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 88.33333333333333,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_534093",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 78.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_602030",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 36.25,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1986081",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 44,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_532440",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 73.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_607143",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 22,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_526441",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 43.333333333333336,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_28952",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 59.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_524170",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 56,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1902240",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 87.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_522708",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 64.25,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_521292",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 83.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_630200",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 49,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_518503",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_630431",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 71.2,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_681966",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_307297",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 66,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_508775",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 33,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_630467",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 94.44444444444444,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1841267",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 58.666666666666664,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_683777",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 65.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_314956",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 56.77777777777778,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_684444",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 71.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_319492",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 62.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_502353",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_499420",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 91.4,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1681946",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 93.25,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_601566",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 72,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_685287",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 91.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_685514",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 65.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_490394",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 55.8,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1656486",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 50,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_486877",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.175,
 "avg_score": 78,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_485920",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 37.4,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_630935",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 84.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_686515",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.175,
 "avg_score": 84.33333333333333,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_483666",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 89.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_482868",
 "socioeconomic_band": "60-70%",
 "imd_score_numeric": 65,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.175,
 "avg_score": 44,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_682738",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 91,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_655919",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 62,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_609527",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 56,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2142055",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 73.4,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_655988",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 87.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_597755",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 88.11111111111111,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1848820",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 66.33333333333333,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_605868",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 96.8,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_505403",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 78,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_586668",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 60.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_555989",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 96,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_685952",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 56,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_555760",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 93.75,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_601567",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 38.25,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_609031",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 82.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_656954",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_604906",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 58.44444444444444,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_691433",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 83.66666666666667,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_606345",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 88.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_634776",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 66.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_634721",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 56,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_505108",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 40.833333333333336,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_488755",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 89,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_691177",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 56,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_687772",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 97.6,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_684270",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 55,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_686001",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 89,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_607947",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 89.88888888888889,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_622015",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 56,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_634365",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 94.6,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_607900",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 91.75,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_487314",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 78.25,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_587008",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 83,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_690733",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 98.77777777777777,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_675374",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 80,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_675383",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 95,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_549783",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 98.55555555555556,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_483858",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 72.71428571428571,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_322641",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 84,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_468902",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 47.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_70214",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 33,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_602123",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 56.125,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_470385",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 87.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_548926",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 37.333333333333336,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_592338",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 71.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_544720",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 46.75,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_597319",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 39,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_483793",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 78,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_587082",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 82.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_587391",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 98.88888888888889,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_587641",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 50.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_698112",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 48,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_498602",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 84,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_541708",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 98.77777777777777,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_676909",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 91.88888888888889,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_633238",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 16.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_484787",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 78,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_279879",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 52,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_332436",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 86,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_370512",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 63.8,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_589327",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 62.75,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_624469",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 56,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_378576",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 45.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_696696",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 96.33333333333333,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_677741",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 92.33333333333333,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_114367",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 90.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_631860",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 98,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_633069",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 93,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_130671",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 78,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2030117",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 52,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_685236",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 43.75,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_589441",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 26,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_532649",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 58,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1501577",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 91.66666666666667,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_601082",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 64.125,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_685289",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 78,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_496530",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 53,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_29420",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 75.25,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2650741",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 63.125,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1966597",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 62,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_27116",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 93.33333333333333,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_679386",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 59.111111111111114,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_400958",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 51.44444444444444,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_529550",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 83,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_291156",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 67.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_528290",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 97,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_679599",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 87.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1674799",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 81,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_526741",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 67.33333333333333,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_293162",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 73,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_689637",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 89.375,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_402378",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 61.22222222222222,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_472651",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 88,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_631771",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 97.22222222222223,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_407404",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 85.83333333333333,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_612187",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 55,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_414772",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 56.166666666666664,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_573093",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 39,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_628114",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 73.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_612177",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 63,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_612127",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 59.666666666666664,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_573920",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 45,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_623511",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 96.16666666666667,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_686957",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 80.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_574310",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 92.22222222222223,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1118218",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_574325",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 62.666666666666664,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_339235",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 97.77777777777777,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_574508",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 56,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_522534",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 83,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_619503",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 91.33333333333333,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_649141",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 76.83333333333333,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_574586",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 70,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_649592",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 87.22222222222223,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1658963",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 81.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_574590",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 70.77777777777777,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_519684",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 85.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_145640",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 99.2,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_601431",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 65,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_574637",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 77,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_680890",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 99.33333333333333,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_599109",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 82.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_416284",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 61.285714285714285,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_650105",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 51,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_650133",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 56,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_575039",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 39.2,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_645792",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 98.33333333333333,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_645770",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 69.22222222222223,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_599740",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 60.42857142857143,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_650511",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 91.8,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_613954",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 90.8,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_650849",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 58.75,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_492613",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 39.333333333333336,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_105168",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 85,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_650863",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 97.33333333333333,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_632709",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 89.77777777777777,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2681198",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 43.25,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_644369",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 55,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1332356",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 76.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_570491",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 64.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_492357",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 54.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_578820",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 64,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_578823",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 42.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_628480",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 33,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2202076",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 22,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1340760",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 83.25,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_644093",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 85.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_580657",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 71.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_105413",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 66.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_512259",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 68.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_566135",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 65,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2557563",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 67.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_565840",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 31,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_685849",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 72.77777777777777,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_109577",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 57.25,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_442924",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 92.2,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_643199",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 52.8,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_563321",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 81.75,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_581123",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 56.77777777777778,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_653700",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 88,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_642591",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 86.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_641363",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 67.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_626519",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 70.85714285714286,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_607555",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 42.2,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_561476",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 91.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_511612",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 79,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_136335",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 91.85714285714286,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_637089",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 22,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_600509",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 33,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_604694",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 63.333333333333336,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_685860",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 95,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_636422",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 88.8,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_691931",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 85.6,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_586261",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 68.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_628846",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 63,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_480115",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 72.2,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_558463",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 81.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_596332",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 85.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_655353",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 85.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_464732",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 38.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_556824",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 91.22222222222223,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_609605",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.125,
 "avg_score": 56.8,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_688337",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.125,
 "avg_score": 77.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_616407",
 "socioeconomic_band": "70-80%",
 "imd_score_numeric": 75,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.125,
 "avg_score": 93.33333333333333,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2112670",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 64.75,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_622972",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 78,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_622976",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 85.6,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_623221",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 94.2,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_601517",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 51.55555555555556,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_624927",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 88.22222222222223,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_625126",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 78,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_600796",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 77.4,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_626103",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 85.83333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_626296",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 79.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_626417",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 83.77777777777777,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_600175",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 73,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_600067",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 90.88888888888889,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_599491",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 73,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_627599",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 78,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_598963",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 73.77777777777777,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_598713",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 75.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_628720",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 57,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_597433",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 64.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_629696",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 91.88888888888889,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_629748",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_596711",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 85.42857142857143,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_595514",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 64.8,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_630891",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 0,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_593022",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 73.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_632083",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 72.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_592259",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 44,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_590519",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 73.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_589565",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 98.88888888888889,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_589463",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 67.83333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_632942",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 95.66666666666667,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_633008",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 94.11111111111111,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_633655",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 100,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_586921",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 49.333333333333336,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_634552",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 83.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_634817",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_586047",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 60.44444444444444,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2458925",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 56.333333333333336,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_637708",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 94.77777777777777,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_585662",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 89,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2689013",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 65.33333333333333,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_638504",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 22,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_639012",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 52.375,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_578026",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 65.66666666666667,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_100788",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 91.2,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_644974",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 88.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_645144",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 99.5,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_576453",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 95.88888888888889,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_646071",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 52.125,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_576251",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 93.66666666666667,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_646481",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 84.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_80868",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 78.6,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_647195",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 97.77777777777777,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_647763",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 81.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_574259",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 65.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_647888",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 81.375,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_648140",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 59,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2691267",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 87.25,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_572783",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 76.28571428571429,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_648959",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 58.25,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_649129",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 92.44444444444444,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_80329",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 77.5,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_650085",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_571833",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 69.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_651764",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 97.88888888888889,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_651850",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 46.833333333333336,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_566447",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 98.55555555555556,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_563016",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 91.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_653887",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 58,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_560784",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 49.333333333333336,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_558839",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 79.8,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_655890",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 96.11111111111111,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_656203",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 63.857142857142854,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_556140",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 61,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_555884",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 91.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_657145",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 93,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_549439",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 73.77777777777777,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_547153",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 63.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_544267",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 88.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_543653",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 64.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_676916",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 80.57142857142857,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_535259",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 42,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_535161",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 83.55555555555556,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2588294",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 44,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_678419",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 71,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_679663",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 64.71428571428571,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2593689",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 69.71428571428571,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_519506",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 72.8,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_519116",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 75.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_515426",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 78,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_682511",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 60.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_506705",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 78.875,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_683503",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 64.6,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_500189",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 65.33333333333333,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_497955",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 82.33333333333333,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_496355",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 86,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_686268",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 63.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_483108",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 73.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_687216",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 98.55555555555556,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_482145",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 43.75,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_475149",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 78.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_474628",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 74.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_689050",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 92.25,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_689164",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 66.8,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_689217",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 78.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_689759",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 65.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_471580",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 54.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_690062",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 78,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_690507",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 62.333333333333336,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_690948",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 62,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_464981",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 99.55555555555556,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2609069",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 46,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_692490",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 71.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_443964",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 87.4,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_440103",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 46.333333333333336,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_693182",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 60.22222222222222,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_694103",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 87.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_423664",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 60.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_694362",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 87.33333333333333,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_422542",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 46.375,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_694563",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 78.2,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_415631",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 67.5,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_406326",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_387963",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 92.88888888888889,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_387944",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 66.2,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_695915",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 89,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_385033",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 84.2,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2614093",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 77.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_696234",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 44,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_696324",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 92.8,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_371429",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 67.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_697567",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 91.33333333333333,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_366873",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 56.77777777777778,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_362140",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 82,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_358075",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 73.83333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_941282",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 88.66666666666667,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1031884",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 92.77777777777777,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1076015",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 85.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1352733",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 95.66666666666667,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1360953",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 93.77777777777777,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1439723",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 25.333333333333332,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_29411",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 7,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1501614",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 82.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_336772",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 87.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_336131",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 93.33333333333333,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_336014",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 88.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1564630",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 84,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1634278",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 45.166666666666664,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1671022",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 89.66666666666667,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_320153",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 84,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1808622",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 90.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_311332",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 63,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1851108",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 96.33333333333333,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2630469",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 56,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2637000",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 22,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1942870",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 95.77777777777777,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1961938",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 95,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1991399",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 93.44444444444444,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2655763",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 29.25,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2658314",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 70.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2032057",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 76.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2044299",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 69,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_28787",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 53.6,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_271526",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 56,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_256867",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 84.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2166000",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 80,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_240486",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 53.25,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2268049",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 83,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_199261",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 60.666666666666664,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_188662",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 87.375,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_169297",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 75,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_610681",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 79.66666666666667,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_612183",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 61.5,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_612798",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 78.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_610287",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 76.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_613370",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 95,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_155956",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 53.6,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_616789",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.075,
 "avg_score": 57.4,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2367058",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 94.66666666666667,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_618865",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 58.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_620231",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 66.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_620243",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 64.16666666666667,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_606064",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.075,
 "avg_score": 88.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_621605",
 "socioeconomic_band": "80-90%",
 "imd_score_numeric": 85,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.075,
 "avg_score": 83.2,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_487570",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 44,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_685572",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 71.42857142857143,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_618513",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 61.22222222222222,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_685412",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 90.22222222222223,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_498459",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 97.44444444444444,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_501146",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 78.11111111111111,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_322499",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 78,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_634351",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 86.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_502766",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 88,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_684498",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 46.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_317801",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 48.44444444444444,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_607812",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 84,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1810414",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 55.888888888888886,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_684111",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 54.666666666666664,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2627491",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.025,
 "avg_score": 91,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_683865",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 67,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_683406",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 72.4,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_506543",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.025,
 "avg_score": 91.2,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_618683",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 98.8,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_587550",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 71,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_682367",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 90.875,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_511258",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 88.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_515491",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 86,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_680187",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 95.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_523817",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 57,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_680133",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 100,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_607668",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 77.75,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_625067",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 48.625,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_524276",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 29,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2647893",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 97.66666666666667,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_112454",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 76.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_679939",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 82.75,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_526601",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.025,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_528506",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 74.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_588493",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 66.16666666666667,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_679271",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 41,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_531896",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 44,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_532565",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.025,
 "avg_score": 37.833333333333336,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_128072",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 67,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_631924",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 67.875,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_678790",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 70.75,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_678395",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 98.8,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_631247",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 86.25,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_284095",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 90.11111111111111,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_534733",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 85.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_596441",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 11,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_630165",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 74.33333333333333,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_678194",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 66.22222222222223,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2578004",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.025,
 "avg_score": 96,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_283618",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.025,
 "avg_score": 43,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2078353",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 40.333333333333336,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_677006",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 80.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_607047",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 75.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_542557",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 96.55555555555556,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_596845",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 84.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_676503",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 98.4,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_543788",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 88.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_549706",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 64.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_260062",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 78,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_551772",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 53.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_665414",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 95.8,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_657352",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 66.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_655973",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 79.14285714285714,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_603560",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.025,
 "avg_score": 89,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_559225",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 78.66666666666667,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2154220",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.025,
 "avg_score": 74.2,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_561560",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.025,
 "avg_score": 77.2,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_604057",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 99.125,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_563230",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 88,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_565066",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.025,
 "avg_score": 49.6,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_567451",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.025,
 "avg_score": 60.666666666666664,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_567888",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 96.8,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2230407",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 76.33333333333333,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_569277",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.025,
 "avg_score": 84.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_242778",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 53.888888888888886,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_131222",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 83.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_570732",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.025,
 "avg_score": 94.71428571428571,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_570985",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 84.44444444444444,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_622541",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 63.77777777777778,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_651058",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 78,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2552412",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 64,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_620652",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 88.6,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2289145",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 75.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_649816",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 50.625,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2405801",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 44,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_181861",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.025,
 "avg_score": 77,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_598028",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 44,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2339333",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 63.4,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2340786",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 93.44444444444444,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_164968",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 69.55555555555556,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_572537",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 96.44444444444444,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2358707",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 54.333333333333336,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_611407",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 81.33333333333333,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_611173",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 52.166666666666664,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_611593",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 96.22222222222223,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_648781",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 78.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_648590",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 59,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2517389",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 85.55555555555556,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_598665",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.025,
 "avg_score": 95.85714285714286,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_599176",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 95.55555555555556,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_648161",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 81.16666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_574507",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.025,
 "avg_score": 55,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_646998",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 83.625,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_575766",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.025,
 "avg_score": 61.77777777777778,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_576233",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 57.75,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_576439",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.025,
 "avg_score": 91.11111111111111,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_605459",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.025,
 "avg_score": 43.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_2472995",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 66.66666666666667,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_645174",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 64.28571428571429,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_599398",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.025,
 "avg_score": 68.88888888888889,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_134982",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.025,
 "avg_score": 22,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_621442",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.025,
 "avg_score": 46.375,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_577458",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.025,
 "avg_score": 52,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_613806",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 98.8,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_644828",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 88.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_581288",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 81.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_642817",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 73.6,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_585098",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 78,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_155298",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 69.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_31161",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 96.88888888888889,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_637691",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 44.375,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_698002",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 96.44444444444444,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_586227",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.025,
 "avg_score": 84,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_697998",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.025,
 "avg_score": 75.25,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_921739",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 89.33333333333333,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_615241",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 88.5,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_369610",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 88.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_973526",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 93.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_986561",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 87.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_696271",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 96.77777777777777,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_586497",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 93.75,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_30096",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 93.55555555555556,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_609537",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 97.66666666666667,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_393142",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 97.77777777777777,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_695340",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 81.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_409852",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.025,
 "avg_score": 31.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_694807",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 67.25,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_694579",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 84.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_422670",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 76.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_437482",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 84.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1332514",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 69.2,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_693058",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 96.55555555555556,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_35508",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 81.8,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_586526",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 39.666666666666664,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_635802",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 96.77777777777777,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_635711",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 79.4,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_465331",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 69.5,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_48635",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 78,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_468623",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 56,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_53300",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 90.88888888888889,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_689101",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 85.33333333333333,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1478030",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 78,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_634824",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 53.333333333333336,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_349093",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 99.2,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_60809",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.025,
 "avg_score": 85.66666666666667,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_473082",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 56.333333333333336,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_475065",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 77.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_688281",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 85.11111111111111,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_604825",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.025,
 "avg_score": 75.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_586838",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.025,
 "avg_score": 42.8,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_617130",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 73.5,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_1554143",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 79.66666666666667,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_600869",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.025,
 "avg_score": 100,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_608571",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "A Level or Equivalent",
 "disadvantage_score": 0.025,
 "avg_score": 76.5,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_687877",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Post Graduate Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 76.22222222222223,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_687310",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 41,
 "final_outcome": "Fail"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_687206",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 98.22222222222223,
 "final_outcome": "Distinction"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_330966",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 70.5,
 "final_outcome": "Withdrawn"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_634536",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "HE Qualification",
 "disadvantage_score": 0.025,
 "avg_score": 93.88888888888889,
 "final_outcome": "Pass"
 },
 {
 "student_id": "SAMPLE_OULAD_STU_484223",
 "socioeconomic_band": "90-100%",
 "imd_score_numeric": 95,
 "disability_flag": false,
 "highest_education": "Lower Than A Level",
 "disadvantage_score": 0.025,
 "avg_score": 74.25,
 "final_outcome": "Pass"
 }
 ]
 }
}
```

## Generator Input Provenance

```json
{
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G09__baseline_first_20_rows.json",
 "explanation_artifact_sha256": "11f5ca981d79fbdddef83210e02696439cfaf9dabd35308b4076cf7ee1a75268",
 "generator_input_sha256": "6b6e93fc352f35bf0ce0e0520ddcdc1e7d67e1a033b8056898f4a9b80cc0d781",
 "generator_input_compact": {
 "task_id": "A-G09",
 "execution_id": "exec_1781847754708_61279c1a",
 "task_name": "Socioeconomic disadvantage impact",
 "analysis_type": "correlation",
 "explanation_strategy": "correlation",
 "actionable_question": "Are disadvantaged students receiving adequate support?",
 "target_audience": [
 "academic_advisor",
 "admin"
 ],
 "query_labels": [
 "disadvantage_impact"
 ],
 "confidence": {
 "level": "HIGH",
 "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
 },
 "dataset_labels": [
 "disadvantage_impact"
 ],
 "dataset_row_counts": {
 "disadvantage_impact": 1998
 },
 "ai_summary_config_summary": {
 "summary_type": "correlation_evidence",
 "metric_column": null,
 "entity_column": "student_id",
 "group_column": null,
 "time_column": null,
 "sort_by": null,
 "sort_direction": null,
 "top_k": 10,
 "bottom_k": null,
 "threshold_direction": null,
 "numeric_threshold": null,
 "require_sensitive_context_policy": false,
 "require_complete_action_provenance": true
 }
 }
}
```

## AI Explanation To Judge

```json
{
 "raw_text": "Summary: The analysis of the relationship between Disadvantage Score and Average Score reveals a negative correlation, indicating that as the Disadvantage Score increases, the Average Score tends to decrease. This suggests that students with higher disadvantage scores may be at risk of lower academic performance.\n\nInsights: Negative Correlation Observed: The correlation between Disadvantage Score and Average Score is negative, suggesting that students with higher disadvantage scores tend to have lower average scores. This pattern indicates a potential educational gap that needs to be addressed.\n\nEducational implications: Students with higher disadvantage scores may require additional academic support and resources to improve their performance.\n\nRecommendations: high - Implement targeted support programs for students with high disadvantage scores. - To address the negative correlation and improve academic outcomes for at-risk students.",
 "structured_payload": {
 "task_id": "A-G09",
 "execution_id": "exec_1781847754708_61279c1a",
 "explanation": {
 "summary": "The analysis of the relationship between Disadvantage Score and Average Score reveals a negative correlation, indicating that as the Disadvantage Score increases, the Average Score tends to decrease. This suggests that students with higher disadvantage scores may be at risk of lower academic performance.",
 "insights": [
 {
 "title": "Negative Correlation Observed",
 "description": "The correlation between Disadvantage Score and Average Score is negative, suggesting that students with higher disadvantage scores tend to have lower average scores. This pattern indicates a potential educational gap that needs to be addressed.",
 "severity": "high",
 "evidence": [
 {
 "metric": "disadvantage_score",
 "value": "N/A",
 "comparison": "baseline",
 "delta": null,
 "context": "Correlation analysis indicates a negative trend."
 },
 {
 "metric": "avg_score",
 "value": "N/A",
 "comparison": "baseline",
 "delta": null,
 "context": "Average scores decrease as disadvantage scores increase."
 }
 ]
 }
 ],
 "educational_implications": [
 "Students with higher disadvantage scores may require additional academic support and resources to improve their performance."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Implement targeted support programs for students with high disadvantage scores.",
 "rationale": "To address the negative correlation and improve academic outcomes for at-risk students."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The dataset is sufficiently large and contains relevant data points for correlation analysis.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "correlation",
 "explanation_type": "correlation",
 "ai_summary_method": "baseline_first_20_rows",
 "ai_summary_version": "baseline",
 "baseline_available": true,
 "input_summary_type": "raw_first_20_rows",
 "ai_summary_method_warning": null,
 "full_result_row_count": null,
 "included_row_count": null,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [],
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 7292,
 "token_usage": {
 "prompt_tokens": 2292,
 "completion_tokens": 365,
 "total_tokens": 2657
 },
 "strategy": "correlation",
 "granularity": "cohort_aggregate",
 "cost_usd": 0.000563
 }
 },
 "generation_metadata": {
 "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G09__baseline_first_20_rows.json",
 "explanation_artifact_sha256": "11f5ca981d79fbdddef83210e02696439cfaf9dabd35308b4076cf7ee1a75268",
 "ai_service_url": "http://localhost:8000",
 "expected_ai_summary_method": "baseline_first_20_rows",
 "observed_ai_summary_method": "baseline_first_20_rows",
 "degraded": false,
 "model": "gpt-4o-mini-2024-07-18",
 "token_usage": {
 "prompt_tokens": 2292,
 "completion_tokens": 365,
 "total_tokens": 2657
 },
 "latency_ms": 7308,
 "attempts_used": 1
 },
 "source_response_body": {
 "task_id": "A-G09",
 "execution_id": "exec_1781847754708_61279c1a",
 "explanation": {
 "summary": "The analysis of the relationship between Disadvantage Score and Average Score reveals a negative correlation, indicating that as the Disadvantage Score increases, the Average Score tends to decrease. This suggests that students with higher disadvantage scores may be at risk of lower academic performance.",
 "insights": [
 {
 "title": "Negative Correlation Observed",
 "description": "The correlation between Disadvantage Score and Average Score is negative, suggesting that students with higher disadvantage scores tend to have lower average scores. This pattern indicates a potential educational gap that needs to be addressed.",
 "severity": "high",
 "evidence": [
 {
 "metric": "disadvantage_score",
 "value": "N/A",
 "comparison": "baseline",
 "delta": null,
 "context": "Correlation analysis indicates a negative trend."
 },
 {
 "metric": "avg_score",
 "value": "N/A",
 "comparison": "baseline",
 "delta": null,
 "context": "Average scores decrease as disadvantage scores increase."
 }
 ]
 }
 ],
 "educational_implications": [
 "Students with higher disadvantage scores may require additional academic support and resources to improve their performance."
 ],
 "recommendations": [
 {
 "priority": "high",
 "action": "Implement targeted support programs for students with high disadvantage scores.",
 "rationale": "To address the negative correlation and improve academic outcomes for at-risk students."
 }
 ],
 "warnings": []
 },
 "confidence": {
 "level": "HIGH",
 "reason": "The dataset is sufficiently large and contains relevant data points for correlation analysis.",
 "based_on": [
 "sufficient_data"
 ]
 },
 "explanation_strategy": "correlation",
 "explanation_type": "correlation",
 "ai_summary_method": "baseline_first_20_rows",
 "ai_summary_version": "baseline",
 "baseline_available": true,
 "input_summary_type": "raw_first_20_rows",
 "ai_summary_method_warning": null,
 "full_result_row_count": null,
 "included_row_count": null,
 "small_result_threshold": null,
 "small_result_full_rows_applied": null,
 "dataset_row_breakdown": [],
 "safety_flags": [],
 "degraded": false,
 "meta": {
 "model": "gpt-4o-mini-2024-07-18",
 "latency_ms": 7292,
 "token_usage": {
 "prompt_tokens": 2292,
 "completion_tokens": 365,
 "total_tokens": 2657
 },
 "strategy": "correlation",
 "granularity": "cohort_aggregate",
 "cost_usd": 0.000563
 }
 }
}
```

## Full-run Deterministic Checks

```json
[
 {
 "check_id": "row_count_total",
 "check_type": "row_count",
 "status": "pass",
 "expected": 1998,
 "observed": 1998
 },
 {
 "check_id": "artifact_file_sha256",
 "check_type": "artifact_hash",
 "status": "pass",
 "observed": "f8ca1f2c8ec80458e585b492bd7d84ec7ddc5f846b6cfbefd814dcb0eadc8357",
 "expected_values": [
 "f8ca1f2c8ec80458e585b492bd7d84ec7ddc5f846b6cfbefd814dcb0eadc8357"
 ]
 },
 {
 "check_id": "canonical_rows_sha256",
 "check_type": "embedded_rows_hash",
 "status": "pass",
 "observed": "116adbb70683d69c2db5f9580d23f9e2de936bd1a04fb4cbf5d10df2446cc60e",
 "expected": "116adbb70683d69c2db5f9580d23f9e2de936bd1a04fb4cbf5d10df2446cc60e"
 },
 {
 "check_id": "numeric_fields_disadvantage_impact",
 "check_type": "numeric_field_extraction",
 "status": "pass",
 "dataset_label": "disadvantage_impact",
 "numeric_columns": [
 "avg_score",
 "disadvantage_score",
 "imd_score_numeric"
 ],
 "numeric_summaries": {
 "avg_score": {
 "count": 1998,
 "min": 0,
 "max": 100
 },
 "disadvantage_score": {
 "count": 1875,
 "min": 0.025,
 "max": 0.7749999999999999
 },
 "imd_score_numeric": {
 "count": 1867,
 "min": 5,
 "max": 95
 }
 }
 },
 {
 "check_id": "threshold_flag_fields_disadvantage_impact",
 "check_type": "threshold_flag_detection",
 "status": "pass",
 "dataset_label": "disadvantage_impact",
 "flag_columns": [
 "disability_flag"
 ],
 "triggered_like_counts": {
 "disability_flag": 152
 }
 }
]
```
