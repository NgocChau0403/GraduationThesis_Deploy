# LLM Judge Final Judge Context - SAMPLE_OULAD__A-G15__baseline_first_20_rows

This Phase F6 context is the record-level evidence package to supply with the frozen Judge Prompt V2 during full-run judge invocation.

## Frozen Prompt Reference

- Prompt path: `Docs/evaluation_v2/PromptEvaluateAI/JUDGE_PROMPT_V2.md`
- Prompt SHA-256: `e35e0b9d459cc13cd908acc693510832ccf611a61922bcd6bdb3f4e93f569517`

## Record Identity

```json
{
  "record_id": "SAMPLE_OULAD__A-G15__baseline_first_20_rows",
  "evaluation_run_id": "full_208_taskaware_v3_summary",
  "dataset_id": "SAMPLE_OULAD",
  "task_id": "A-G15",
  "explanation_mode": "baseline_first_20_rows",
  "prompt_version": "judge_prompt_v2_pilot_v1",
  "rubric_version": "judge_rubric_1_to_10_pilot_v1"
}
```

## Task Context

```json
{
  "task_name": "Intervention priority ranking",
  "scope": "Many students",
  "actionable_question": "Who are the top 10 students most in need of intervention right now?",
  "target_audience": "instructor, admin",
  "ai_summary_type": "ranking",
  "ai_prompt_hint": "Rank by at_risk_score [FE] descending. List triggered flags per student. Provide action per priority group.",
  "query_labels": [
    "intervention_priority_list"
  ],
  "explanation_strategy": "ranking"
}
```

## Schema Context

```json
{
  "source_tables": [
    "enrollment",
    "assessment_result",
    "assessment",
    "engagement",
    "student"
  ],
  "key_db_fields": [
    "student_id",
    "gender",
    "age_group",
    "region; at_risk_score [FE cross]",
    "at_risk_label [FE cross]",
    "avg_score [FE cross]",
    "all 5 flags",
    "final_outcome"
  ],
  "output_schema": {},
  "query_labels": [
    "intervention_priority_list"
  ]
}
```

## Evaluation Requirements

```json
{
  "required_core_outputs": [
    {
      "requirement_id": "A-G15-CORE-01",
      "description": "Rank by at_risk_score [FE] descending."
    },
    {
      "requirement_id": "A-G15-CORE-02",
      "description": "List triggered flags per student."
    },
    {
      "requirement_id": "A-G15-CORE-03",
      "description": "Provide action per priority group."
    }
  ],
  "required_supporting_outputs": [],
  "evaluation_constraints": [
    {
      "constraint_id": "A-G15-CONSTRAINT-01",
      "description": "Treat the output as internal admin use only."
    },
    {
      "constraint_id": "A-G15-CONSTRAINT-02",
      "description": "Do not include personally identifying information beyond identifiers already present in returned data."
    }
  ],
  "safety_fairness_applicability": "applicable",
  "safety_fairness_note": "Conservative pilot default; human review is required before any not_applicable exception."
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
      "dataset_label": "intervention_priority_list",
      "artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G15.json",
      "artifact_sha256": "fd0892367ab4f4b3965fbfa243b4a856ae8901a1f8f7c8ff616484765adb837b",
      "row_count": 50,
      "readable": true
    }
  ],
  "evidence_access_mode": "deterministic_artifact_retrieval",
  "full_result_row_count": 50,
  "prompt_embedded_row_count": 0,
  "retrieved_row_count": 50,
  "retrieval_log_path": "Docs/evaluation_v2/Runs/full_208/phase13_taskaware_v3_summary/judge_inputs/retrieval_logs/SAMPLE_OULAD__A-G15__baseline_first_20_rows.json",
  "full_access_available": true,
  "full_result_sent_to_llm": false,
  "evidence_artifact_file_sha256": "fd0892367ab4f4b3965fbfa243b4a856ae8901a1f8f7c8ff616484765adb837b",
  "evidence_rows_sha256": "403173580ceb7c41580c37174b23ef26439b857da0806999b3f1d8518766665d",
  "retrieval_validation": {
    "status": "pass",
    "retrieved_row_count": 50,
    "chunk_count": 1,
    "chunk_ids": [
      "SAMPLE_OULAD__A-G15__baseline_first_20_rows__intervention_priority_list__chunk_1"
    ],
    "row_ranges": [
      {
        "dataset_label": "intervention_priority_list",
        "row_start_inclusive": 0,
        "row_end_inclusive": 49,
        "row_count": 50
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
    "generated_at": "2026-06-20T16:29:37.222Z",
    "record_id": "SAMPLE_OULAD__A-G15__baseline_first_20_rows",
    "retrieval_request_complete": true,
    "retrieval_coverage_status": "full",
    "chunks": [
      {
        "chunk_id": "SAMPLE_OULAD__A-G15__baseline_first_20_rows__intervention_priority_list__chunk_1",
        "dataset_label": "intervention_priority_list",
        "row_start_inclusive": 0,
        "row_end_inclusive": 49,
        "row_count": 50,
        "source_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_evidence_sql/SAMPLE_OULAD/full_query_artifacts/SAMPLE_OULAD__A-G15.json",
        "source_artifact_sha256": "fd0892367ab4f4b3965fbfa243b4a856ae8901a1f8f7c8ff616484765adb837b"
      }
    ]
  },
  "retrieved_datasets_sha256": "403173580ceb7c41580c37174b23ef26439b857da0806999b3f1d8518766665d",
  "retrieved_datasets": {
    "intervention_priority_list": [
      {
        "student_id": "SAMPLE_OULAD_STU_69494",
        "gender": "F",
        "age_group": "0-35",
        "region": "Yorkshire Region",
        "avg_score": 15.5,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0",
        "previous_attempt_count": 1,
        "at_risk_score": 5,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 1,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 1,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_338731",
        "gender": "M",
        "age_group": "35-55",
        "region": "Yorkshire Region",
        "avg_score": 19.25,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0",
        "previous_attempt_count": 1,
        "at_risk_score": 5,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 1,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 1,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_624354",
        "gender": "F",
        "age_group": "0-35",
        "region": "South West Region",
        "avg_score": 23.142857142857142,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0.14285714285714285714",
        "previous_attempt_count": 1,
        "at_risk_score": 5,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 1,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 1,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_629056",
        "gender": "M",
        "age_group": "0-35",
        "region": "Wales",
        "avg_score": 35,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0",
        "previous_attempt_count": 1,
        "at_risk_score": 5,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 1,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 1,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_171896",
        "gender": "F",
        "age_group": "0-35",
        "region": "South East Region",
        "avg_score": 35.333333333333336,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0",
        "previous_attempt_count": 1,
        "at_risk_score": 5,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 1,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 1,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_548926",
        "gender": "F",
        "age_group": "0-35",
        "region": "East Anglian Region",
        "avg_score": 37.333333333333336,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0.5",
        "previous_attempt_count": 1,
        "at_risk_score": 5,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 1,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 1,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_616439",
        "gender": "M",
        "age_group": "0-35",
        "region": "East Anglian Region",
        "avg_score": 37.375,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0.5",
        "previous_attempt_count": 1,
        "at_risk_score": 5,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 1,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 1,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_465619",
        "gender": "M",
        "age_group": "0-35",
        "region": "Wales",
        "avg_score": 37.666666666666664,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0",
        "previous_attempt_count": 1,
        "at_risk_score": 5,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 1,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 1,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_532565",
        "gender": "M",
        "age_group": "0-35",
        "region": "Yorkshire Region",
        "avg_score": 37.833333333333336,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0.33333333333333333333",
        "previous_attempt_count": 1,
        "at_risk_score": 5,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 1,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 1,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_586526",
        "gender": "M",
        "age_group": "0-35",
        "region": "South Region",
        "avg_score": 39.666666666666664,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0.33333333333333333333",
        "previous_attempt_count": 1,
        "at_risk_score": 5,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 1,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 1,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_566664",
        "gender": "M",
        "age_group": "0-35",
        "region": "London Region",
        "avg_score": 0,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0",
        "previous_attempt_count": 1,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 1,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 0,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_469614",
        "gender": "M",
        "age_group": "0-35",
        "region": "Wales",
        "avg_score": 0,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0",
        "previous_attempt_count": 1,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 1,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 0,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_465764",
        "gender": "F",
        "age_group": "35-55",
        "region": "East Midlands Region",
        "avg_score": 0,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0",
        "previous_attempt_count": 1,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 1,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 0,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_522004",
        "gender": "F",
        "age_group": "0-35",
        "region": "South East Region",
        "avg_score": 6.5,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0",
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 0,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 1,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_2470326",
        "gender": "M",
        "age_group": "35-55",
        "region": "East Midlands Region",
        "avg_score": 7.5,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0",
        "previous_attempt_count": 0,
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
        "student_id": "SAMPLE_OULAD_STU_624730",
        "gender": "M",
        "age_group": "0-35",
        "region": "Yorkshire Region",
        "avg_score": 8,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0",
        "previous_attempt_count": 1,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 1,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 0,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_625928",
        "gender": "F",
        "age_group": "0-35",
        "region": "North Region",
        "avg_score": 9,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0",
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 0,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 1,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_1744800",
        "gender": "M",
        "age_group": "35-55",
        "region": "Scotland",
        "avg_score": 11,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0",
        "previous_attempt_count": 1,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 1,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 0,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_556476",
        "gender": "F",
        "age_group": "0-35",
        "region": "London Region",
        "avg_score": 16,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0",
        "previous_attempt_count": 0,
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
        "student_id": "SAMPLE_OULAD_STU_647735",
        "gender": "F",
        "age_group": "0-35",
        "region": "Wales",
        "avg_score": 17.5,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0",
        "previous_attempt_count": 0,
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
        "student_id": "SAMPLE_OULAD_STU_502004",
        "gender": "M",
        "age_group": "35-55",
        "region": "North Western Region",
        "avg_score": 19,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0.5",
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 0,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 1,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_508295",
        "gender": "F",
        "age_group": "0-35",
        "region": "East Anglian Region",
        "avg_score": 21,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0.5",
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 0,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 1,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_2202076",
        "gender": "M",
        "age_group": "0-35",
        "region": "Ireland",
        "avg_score": 22,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0",
        "previous_attempt_count": 1,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 1,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 0,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_574523",
        "gender": "M",
        "age_group": "0-35",
        "region": "South East Region",
        "avg_score": 22,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0",
        "previous_attempt_count": 1,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 1,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 0,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_2421961",
        "gender": "M",
        "age_group": "0-35",
        "region": "Yorkshire Region",
        "avg_score": 23.25,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0.25",
        "previous_attempt_count": 1,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 1,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 0,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_568307",
        "gender": "F",
        "age_group": "0-35",
        "region": "North Western Region",
        "avg_score": 24.333333333333332,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0.33333333333333333333",
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 0,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 1,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_617327",
        "gender": "F",
        "age_group": "0-35",
        "region": "West Midlands Region",
        "avg_score": 24.5,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0",
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 0,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 1,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_649607",
        "gender": "F",
        "age_group": "0-35",
        "region": "East Midlands Region",
        "avg_score": 25,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0",
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 0,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 1,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_546139",
        "gender": "F",
        "age_group": "0-35",
        "region": "North Region",
        "avg_score": 25,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0",
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 0,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 1,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_1439723",
        "gender": "M",
        "age_group": "35-55",
        "region": "East Midlands Region",
        "avg_score": 25.333333333333332,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0",
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 0,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 1,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_1864086",
        "gender": "M",
        "age_group": "35-55",
        "region": "Scotland",
        "avg_score": 27.5,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0",
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 0,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 1,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_624957",
        "gender": "M",
        "age_group": "0-35",
        "region": "North Region",
        "avg_score": 27.75,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0",
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 0,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 1,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_675915",
        "gender": "F",
        "age_group": "0-35",
        "region": "South West Region",
        "avg_score": 28.5,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0",
        "previous_attempt_count": 0,
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
        "student_id": "SAMPLE_OULAD_STU_577427",
        "gender": "M",
        "age_group": "0-35",
        "region": "Scotland",
        "avg_score": 28.5,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0.5",
        "previous_attempt_count": 1,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 1,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 0,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_573473",
        "gender": "M",
        "age_group": "0-35",
        "region": "South Region",
        "avg_score": 30.25,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0.5",
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 0,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 1,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_409852",
        "gender": "F",
        "age_group": "35-55",
        "region": "South Region",
        "avg_score": 31.5,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0",
        "previous_attempt_count": 0,
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
        "student_id": "SAMPLE_OULAD_STU_694871",
        "gender": "M",
        "age_group": "35-55",
        "region": "North Region",
        "avg_score": 32,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0",
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 0,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 1,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_522924",
        "gender": "M",
        "age_group": "35-55",
        "region": "London Region",
        "avg_score": 32,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0",
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 0,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 1,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_264845",
        "gender": "F",
        "age_group": "55<=",
        "region": "West Midlands Region",
        "avg_score": 32.142857142857146,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0.42857142857142857143",
        "previous_attempt_count": 0,
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
        "student_id": "SAMPLE_OULAD_STU_642839",
        "gender": "F",
        "age_group": "0-35",
        "region": "West Midlands Region",
        "avg_score": 32.5,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0",
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 0,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 1,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_690589",
        "gender": "F",
        "age_group": "0-35",
        "region": "Scotland",
        "avg_score": 32.77777777777778,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0.22222222222222222222",
        "previous_attempt_count": 0,
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
        "student_id": "SAMPLE_OULAD_STU_622384",
        "gender": "M",
        "age_group": "0-35",
        "region": "Scotland",
        "avg_score": 33,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0",
        "previous_attempt_count": 1,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 1,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 0,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_600509",
        "gender": "M",
        "age_group": "0-35",
        "region": "North Western Region",
        "avg_score": 33,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0",
        "previous_attempt_count": 1,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 1,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 0,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_527958",
        "gender": "M",
        "age_group": "0-35",
        "region": "West Midlands Region",
        "avg_score": 33.2,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0.2",
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 0,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 1,
        "final_outcome": "Withdrawn"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_613122",
        "gender": "M",
        "age_group": "35-55",
        "region": "North Western Region",
        "avg_score": 33.375,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0.25",
        "previous_attempt_count": 0,
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
        "student_id": "SAMPLE_OULAD_STU_362548",
        "gender": "M",
        "age_group": "0-35",
        "region": "Yorkshire Region",
        "avg_score": 33.8,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0",
        "previous_attempt_count": 0,
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
        "student_id": "SAMPLE_OULAD_STU_592372",
        "gender": "M",
        "age_group": "35-55",
        "region": "Yorkshire Region",
        "avg_score": 34.166666666666664,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0.33333333333333333333",
        "previous_attempt_count": 0,
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
        "student_id": "SAMPLE_OULAD_STU_2595204",
        "gender": "M",
        "age_group": "0-35",
        "region": "South West Region",
        "avg_score": 34.42857142857143,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0",
        "previous_attempt_count": 0,
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
        "student_id": "SAMPLE_OULAD_STU_2405934",
        "gender": "M",
        "age_group": "35-55",
        "region": "North Western Region",
        "avg_score": 34.55555555555556,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0.22222222222222222222",
        "previous_attempt_count": 1,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 1,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 0,
        "final_outcome": "Fail"
      },
      {
        "student_id": "SAMPLE_OULAD_STU_505700",
        "gender": "M",
        "age_group": "0-35",
        "region": "West Midlands Region",
        "avg_score": 34.666666666666664,
        "engagement_score": "0",
        "engagement_score_available": true,
        "punctuality_rate": "0.33333333333333333333",
        "previous_attempt_count": 0,
        "at_risk_score": 4,
        "at_risk_label": "high",
        "flag_low_score": 1,
        "flag_repeated": 0,
        "flag_low_engagement": 1,
        "flag_low_punctuality": 1,
        "flag_neg_trend": 1,
        "final_outcome": "Withdrawn"
      }
    ]
  }
}
```

## Generator Input Provenance

```json
{
  "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G15__baseline_first_20_rows.json",
  "explanation_artifact_sha256": "5765f4b33ea3c66acd131d154eea7a6a341c8f5df887e76e26eb7c28f287d244",
  "generator_input_sha256": "ef690d9c0e18c9e15695ad2c06fbd2fced01eb41017aa58d44b883c6a925eb95",
  "generator_input_compact": {
    "task_id": "A-G15",
    "execution_id": "exec_1781847783925_1391f9af",
    "task_name": "Intervention priority ranking",
    "analysis_type": "ranking",
    "explanation_strategy": "ranking",
    "actionable_question": "Who are the top 10 students most in need of intervention right now?",
    "target_audience": [
      "instructor",
      "admin"
    ],
    "query_labels": [
      "intervention_priority_list"
    ],
    "confidence": {
      "level": "HIGH",
      "reason": "1998 students × 9 assessments across 8 weeks — strong statistical basis."
    },
    "dataset_labels": [
      "intervention_priority_list"
    ],
    "dataset_row_counts": {
      "intervention_priority_list": 50
    },
    "ai_summary_config_summary": {
      "summary_type": "ranking",
      "metric_column": "at_risk_score",
      "entity_column": "student_id",
      "group_column": null,
      "time_column": null,
      "sort_by": null,
      "sort_direction": "desc",
      "top_k": 10,
      "bottom_k": 5,
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
  "raw_text": "Summary: The analysis of the intervention priority list reveals that the top-ranked students, who are most in need of intervention, exhibit consistently low average scores and high at-risk scores. In contrast, the bottom-ranked students show slightly better performance metrics but still require attention due to their flagged issues.\n\nInsights: High At-Risk Scores and Low Engagement: The top students, such as SAMPLE_OULAD_STU_69494 and SAMPLE_OULAD_STU_338731, have an at-risk score of 5, indicating a critical need for intervention. They also show flags for low scores, low engagement, and negative trends, which collectively highlight their risk of failing or withdrawing. | Consistent Flags Across Students: All top-ranked students have multiple flags triggered, including low scores and low engagement, indicating systemic issues that need addressing through targeted interventions.\n\nEducational implications: Immediate intervention strategies are necessary to support students with high at-risk scores and low engagement to prevent further decline in performance.\n\nRecommendations: high - Implement personalized learning plans for top at-risk students. - Tailored support can address specific learning gaps and improve engagement. | medium - Increase monitoring and support for students flagged for low engagement. - Regular check-ins can help identify barriers to participation and learning.",
  "structured_payload": {
    "task_id": "A-G15",
    "execution_id": "exec_1781847783925_1391f9af",
    "explanation": {
      "summary": "The analysis of the intervention priority list reveals that the top-ranked students, who are most in need of intervention, exhibit consistently low average scores and high at-risk scores. In contrast, the bottom-ranked students show slightly better performance metrics but still require attention due to their flagged issues.",
      "insights": [
        {
          "title": "High At-Risk Scores and Low Engagement",
          "description": "The top students, such as SAMPLE_OULAD_STU_69494 and SAMPLE_OULAD_STU_338731, have an at-risk score of 5, indicating a critical need for intervention. They also show flags for low scores, low engagement, and negative trends, which collectively highlight their risk of failing or withdrawing.",
          "severity": "high",
          "evidence": [
            {
              "metric": "at_risk_score",
              "value": 5,
              "comparison": "baseline",
              "delta": null,
              "context": "Top students with highest intervention needs"
            },
            {
              "metric": "avg_score",
              "value": 15.5,
              "comparison": "baseline",
              "delta": null,
              "context": "Lowest average score among top-ranked students"
            }
          ]
        },
        {
          "title": "Consistent Flags Across Students",
          "description": "All top-ranked students have multiple flags triggered, including low scores and low engagement, indicating systemic issues that need addressing through targeted interventions.",
          "severity": "high",
          "evidence": [
            {
              "metric": "flag_low_score",
              "value": 1,
              "comparison": "baseline",
              "delta": null,
              "context": "Indicates low performance across top students"
            },
            {
              "metric": "flag_low_engagement",
              "value": 1,
              "comparison": "baseline",
              "delta": null,
              "context": "Indicates lack of engagement in learning activities"
            }
          ]
        }
      ],
      "educational_implications": [
        "Immediate intervention strategies are necessary to support students with high at-risk scores and low engagement to prevent further decline in performance."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement personalized learning plans for top at-risk students.",
          "rationale": "Tailored support can address specific learning gaps and improve engagement."
        },
        {
          "priority": "medium",
          "action": "Increase monitoring and support for students flagged for low engagement.",
          "rationale": "Regular check-ins can help identify barriers to participation and learning."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is comprehensive and reflects consistent patterns across multiple metrics.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "ranking",
    "explanation_type": "ranking",
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
      "latency_ms": 9847,
      "token_usage": {
        "prompt_tokens": 4042,
        "completion_tokens": 599,
        "total_tokens": 4641
      },
      "strategy": "ranking",
      "granularity": "semester",
      "cost_usd": 0.000966
    }
  },
  "generation_metadata": {
    "explanation_artifact_path": "Docs/evaluation_v2/Runs/full_208/phase8_explanations/baseline_first_20_rows/SAMPLE_OULAD/explanation_artifacts/SAMPLE_OULAD__A-G15__baseline_first_20_rows.json",
    "explanation_artifact_sha256": "5765f4b33ea3c66acd131d154eea7a6a341c8f5df887e76e26eb7c28f287d244",
    "ai_service_url": "http://localhost:8000",
    "expected_ai_summary_method": "baseline_first_20_rows",
    "observed_ai_summary_method": "baseline_first_20_rows",
    "degraded": false,
    "model": "gpt-4o-mini-2024-07-18",
    "token_usage": {
      "prompt_tokens": 4042,
      "completion_tokens": 599,
      "total_tokens": 4641
    },
    "latency_ms": 9851,
    "attempts_used": 1
  },
  "source_response_body": {
    "task_id": "A-G15",
    "execution_id": "exec_1781847783925_1391f9af",
    "explanation": {
      "summary": "The analysis of the intervention priority list reveals that the top-ranked students, who are most in need of intervention, exhibit consistently low average scores and high at-risk scores. In contrast, the bottom-ranked students show slightly better performance metrics but still require attention due to their flagged issues.",
      "insights": [
        {
          "title": "High At-Risk Scores and Low Engagement",
          "description": "The top students, such as SAMPLE_OULAD_STU_69494 and SAMPLE_OULAD_STU_338731, have an at-risk score of 5, indicating a critical need for intervention. They also show flags for low scores, low engagement, and negative trends, which collectively highlight their risk of failing or withdrawing.",
          "severity": "high",
          "evidence": [
            {
              "metric": "at_risk_score",
              "value": 5,
              "comparison": "baseline",
              "delta": null,
              "context": "Top students with highest intervention needs"
            },
            {
              "metric": "avg_score",
              "value": 15.5,
              "comparison": "baseline",
              "delta": null,
              "context": "Lowest average score among top-ranked students"
            }
          ]
        },
        {
          "title": "Consistent Flags Across Students",
          "description": "All top-ranked students have multiple flags triggered, including low scores and low engagement, indicating systemic issues that need addressing through targeted interventions.",
          "severity": "high",
          "evidence": [
            {
              "metric": "flag_low_score",
              "value": 1,
              "comparison": "baseline",
              "delta": null,
              "context": "Indicates low performance across top students"
            },
            {
              "metric": "flag_low_engagement",
              "value": 1,
              "comparison": "baseline",
              "delta": null,
              "context": "Indicates lack of engagement in learning activities"
            }
          ]
        }
      ],
      "educational_implications": [
        "Immediate intervention strategies are necessary to support students with high at-risk scores and low engagement to prevent further decline in performance."
      ],
      "recommendations": [
        {
          "priority": "high",
          "action": "Implement personalized learning plans for top at-risk students.",
          "rationale": "Tailored support can address specific learning gaps and improve engagement."
        },
        {
          "priority": "medium",
          "action": "Increase monitoring and support for students flagged for low engagement.",
          "rationale": "Regular check-ins can help identify barriers to participation and learning."
        }
      ],
      "warnings": []
    },
    "confidence": {
      "level": "HIGH",
      "reason": "The data is comprehensive and reflects consistent patterns across multiple metrics.",
      "based_on": [
        "sufficient_data"
      ]
    },
    "explanation_strategy": "ranking",
    "explanation_type": "ranking",
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
      "latency_ms": 9847,
      "token_usage": {
        "prompt_tokens": 4042,
        "completion_tokens": 599,
        "total_tokens": 4641
      },
      "strategy": "ranking",
      "granularity": "semester",
      "cost_usd": 0.000966
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
    "expected": 50,
    "observed": 50
  },
  {
    "check_id": "artifact_file_sha256",
    "check_type": "artifact_hash",
    "status": "pass",
    "observed": "fd0892367ab4f4b3965fbfa243b4a856ae8901a1f8f7c8ff616484765adb837b",
    "expected_values": [
      "fd0892367ab4f4b3965fbfa243b4a856ae8901a1f8f7c8ff616484765adb837b"
    ]
  },
  {
    "check_id": "canonical_rows_sha256",
    "check_type": "embedded_rows_hash",
    "status": "pass",
    "observed": "403173580ceb7c41580c37174b23ef26439b857da0806999b3f1d8518766665d",
    "expected": "403173580ceb7c41580c37174b23ef26439b857da0806999b3f1d8518766665d"
  },
  {
    "check_id": "numeric_fields_intervention_priority_list",
    "check_type": "numeric_field_extraction",
    "status": "pass",
    "dataset_label": "intervention_priority_list",
    "numeric_columns": [
      "at_risk_score",
      "avg_score",
      "flag_low_engagement",
      "flag_low_punctuality",
      "flag_low_score",
      "flag_neg_trend",
      "flag_repeated",
      "previous_attempt_count"
    ],
    "numeric_summaries": {
      "at_risk_score": {
        "count": 50,
        "min": 4,
        "max": 5
      },
      "avg_score": {
        "count": 50,
        "min": 0,
        "max": 39.666666666666664
      },
      "flag_low_engagement": {
        "count": 50,
        "min": 1,
        "max": 1
      },
      "flag_low_punctuality": {
        "count": 50,
        "min": 1,
        "max": 1
      },
      "flag_low_score": {
        "count": 50,
        "min": 1,
        "max": 1
      },
      "flag_neg_trend": {
        "count": 50,
        "min": 0,
        "max": 1
      },
      "flag_repeated": {
        "count": 50,
        "min": 0,
        "max": 1
      },
      "previous_attempt_count": {
        "count": 50,
        "min": 0,
        "max": 1
      }
    }
  },
  {
    "check_id": "threshold_flag_fields_intervention_priority_list",
    "check_type": "threshold_flag_detection",
    "status": "pass",
    "dataset_label": "intervention_priority_list",
    "flag_columns": [
      "at_risk_score",
      "at_risk_label",
      "flag_low_score",
      "flag_repeated",
      "flag_low_engagement",
      "flag_low_punctuality",
      "flag_neg_trend"
    ],
    "triggered_like_counts": {
      "at_risk_score": 0,
      "at_risk_label": 0,
      "flag_low_score": 0,
      "flag_repeated": 0,
      "flag_low_engagement": 0,
      "flag_low_punctuality": 0,
      "flag_neg_trend": 0
    }
  }
]
```
