# Best Framing for the Thesis

## Central framing

> **A metadata-driven, evidence-aware learning analytics architecture that transforms heterogeneous educational data into validated analytical tasks and grounded AI explanations.**

The thesis should not be framed merely as the development of a smart dashboard. Its main value lies in the reusable architecture behind the dashboard: data from different educational sources can be normalized, matched to meaningful analytical tasks, validated before execution, and explained through AI using grounded analytical evidence.

## Core research problem

Existing educational dashboards are often limited in three ways:

- They are hardcoded for a specific dataset or schema.
- They assume that all analytical tasks are meaningful whenever data has been imported.
- Their AI-generated explanations may not be sufficiently grounded in the complete analytical evidence.

The thesis therefore addresses the following central problem:

> How can a learning analytics system support heterogeneous educational datasets while ensuring that analytical tasks are valid for the available data and that AI-generated explanations remain grounded in verified analytical results?

## Proposed solution

The proposed system combines four connected contributions:

1. **Canonical schema**
   - Normalizes heterogeneous educational datasets into a reusable analytical structure.
   - Separates source-specific data formats from downstream analytics.

2. **Task taxonomy**
   - Organizes educational analytical intents by user role, purpose, required data, output structure, and visualization type.
   - Is operationalized through the metadata-driven task registry.

3. **Task validity and evidence-grounded AI explanation**
   - Determines task availability from the actual capabilities and sufficiency of each dataset.
   - Generates AI explanations only from completed analytical outputs and task-specific evidence.

4. **Evaluation protocol and results**
   - Evaluates task availability, AI explanation quality, analytical coverage, human utility, and system performance.
   - Produces reproducible evidence through automated runners, ground-truth comparisons, review artifacts, and performance logs.

## Main thesis claim

> The proposed architecture enables reusable learning analytics across heterogeneous educational datasets by separating data normalization, analytical intent, task validity, and AI interpretation.

The thesis should demonstrate this claim through the following evidence:

- **Evaluation 3 - Task Availability:** whether the system correctly determines which tasks are supported by each dataset.
- **Evaluation 7 - AI Explanation Quality:** whether task-aware evidence summarization improves explanation quality over the baseline method.
- **Evaluation 10 - Coverage and Human Utility:** how much analytical coverage and practical value the system provides across datasets, roles, and task categories.
- **Evaluation 11 - System Performance:** whether the architecture operates with acceptable latency, stability, resource usage, and import performance at thesis scale.

## Contribution hierarchy

The contributions should be presented as one connected research story rather than four unrelated features:

```text
Heterogeneous educational data
        -> canonical schema
        -> task taxonomy and registry
        -> task-availability validation
        -> SQL analytics and visualization
        -> evidence-grounded AI explanation
        -> reproducible evaluation
```

The canonical schema provides a common data foundation. The task taxonomy defines the intended analyses. Task-availability validation connects analytical intent to actual dataset evidence. The AI layer interprets only completed analytical results. The evaluation protocol measures the reliability and practical value of the complete pipeline.

## Recommended title

If the thesis title can be changed, the recommended title is:

> **A Metadata-Driven and Evidence-Aware Learning Analytics Dashboard for Heterogeneous Educational Data**

If the official title must remain unchanged, retain:

> **Smart Learning Dashboard with AI-Assisted Data Analysis**

In that case, the stronger metadata-driven and evidence-aware framing should still be used consistently in the Abstract, Introduction, Discussion, and Conclusion.

## Claim boundaries

The thesis should not claim to provide:

- A novel foundation model or LLM architecture.
- A fully validated predictive early-warning system.
- A universal production-ready educational platform.
- Proof of causal relationships between educational factors and outcomes.
- Fully autonomous educational decision-making without human review.

The defensible contribution is a thesis-scale, reusable learning analytics architecture with explicit task validity, evidence-aware AI interpretation, and reproducible evaluation.

## Consistency rule

The Abstract, research questions, contributions, methodology, evaluation, Discussion, and Conclusion must all support the same central framing and use the same terminology:

- **Canonical schema** for the shared data foundation.
- **Task taxonomy** for the conceptual analytical organization.
- **Task registry** for the implementation of that taxonomy.
- **Task availability** for validity checking against dataset evidence.
- **Evidence-grounded AI explanation** for the interpretation layer.
- **Evaluation protocol and results** for empirical validation.
