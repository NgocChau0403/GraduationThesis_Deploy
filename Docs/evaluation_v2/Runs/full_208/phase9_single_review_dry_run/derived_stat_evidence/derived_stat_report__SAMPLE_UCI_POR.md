# Derived-Stat Evidence Report

Dataset: SAMPLE_UCI_POR
Dry-run mode: single_review
Tasks processed: 7
Pass: 4
Skipped: 3

| Task | Status | x | y | Dataset | Rows | Valid pairs | Pearson r | Direction | Strength |
|---|---:|---|---|---|---:|---:|---:|---|---|
| A-G02 | skipped | engagement_score | avg_score | engagement_performance_scatter | 649 | 649 |  |  |  |
| A-G09 | skipped | disadvantage_score | avg_score | disadvantage_impact | 0 | 0 |  |  |  |
| A-G13 | pass | lifestyle_risk_score | avg_score | lifestyle_risk_scatter | 649 | 649 | -0.1041 | negative | weak |
| S-T09 | pass | lifestyle_risk_score | avg_score | lifestyle_risk_scatter | 649 | 649 | -0.1041 | negative | weak |
| S-T11 | skipped | registration_lead_time | avg_score | registration_data | 0 | 0 |  |  |  |
| S-T14 | pass | social_balance_score | avg_score | social_balance_scatter | 649 | 649 | 0.0144 | positive | negligible |
| S-T15 | pass | family_stability_score | avg_score | family_context_scatter | 649 | 649 | 0.1442 | positive | weak |

Use these artifacts as deterministic support only. They do not provide p-values and must not be read as causal evidence.
