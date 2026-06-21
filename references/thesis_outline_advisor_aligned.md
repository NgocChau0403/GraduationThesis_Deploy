# Thesis Outline - Advisor-Aligned Version

## Thesis framing

Four contributions used consistently throughout the thesis:

1. **Canonical schema** for heterogeneous educational data.
2. **Task taxonomy**, operationalized through the metadata-driven task registry and task-availability validation.
3. **AI explanation/insight** grounded in analytical evidence.
4. **Evaluation protocol and results**, emphasizing Evaluations 3, 7, 10, and 11.

## Front matter

- Acknowledgments
- Abstract: problem to four contributions to evaluation to key results
- Table of Contents
- Lists of Figures, Tables, and Abbreviations

## Chapter 1 - Introduction

### 1.1 Research Motivation

### 1.2 Problem Statement

### 1.3 Research and Practical Gap

### 1.4 Objectives and Scope

### 1.5 Research Questions

- **RQ1:** How can heterogeneous educational datasets be normalized into a reusable analytical structure?
- **RQ2:** How can a task taxonomy determine which analyses are meaningful for each dataset?
- **RQ3:** How effectively can task-aware AI generate evidence-grounded explanations?
- **RQ4:** What do coverage, human-utility, and performance evaluations reveal about the proposed system?

### 1.6 Main Contributions

- Canonical schema
- Task taxonomy and availability mechanism
- Task-aware AI explanation
- Reproducible evaluation protocol and evidence

### 1.7 Thesis Structure

## Chapter 2 - Background and Related Work

### 2.1 Learning Analytics and Educational Data Mining

### 2.2 Educational Dashboards and Data Sources

### 2.3 ETL, Schema Mapping, and Canonical Data Models

### 2.4 Analytical Task Taxonomy and Metadata-Driven Systems

### 2.5 Task Availability and Data-Sufficiency Validation

### 2.6 Dashboard Visualization and AI Explanation

### 2.7 Prior-Work Comparison and Research Gap

### 2.8 Positioning of This Thesis

## Chapter 3 - Proposed Methodology

### 3.1 Overall Research Approach

### 3.2 Canonical Educational Data Schema

- Design principles
- Eight domain tables
- Cross-dataset normalization
- Partial dataset coverage

### 3.3 Import and Mapping Method

- Profiling and source detection
- Human-confirmed mapping
- Transformation and persistence
- Feature engineering and missing-data handling

### 3.4 Educational Analytics Task Taxonomy

- Student/admin analytical scopes
- Task categories and analytical intents
- Required and optional capabilities
- Taxonomy implementation through the task registry

### 3.5 Task Availability Method

- Availability statuses
- Structural, semantic, analytical, and sufficiency validation
- Capability snapshots and execution policy

### 3.6 AI Explanation Method

- Evidence preparation
- Baseline first-20-rows method
- Task-aware summarization
- Strategy-based prompting
- Structured output and safety screening

### 3.7 Evaluation Protocol

- Automated runners
- Ground-truth construction
- Comparison and scoring procedure
- Reproducibility and performance logging

## Chapter 4 - System Design and Implementation

### 4.1 Overall Architecture

### 4.2 Functional and Non-Functional Requirements

### 4.3 Canonical Database Implementation

### 4.4 Import Pipeline Implementation

### 4.5 Task Registry and Availability Validator

### 4.6 SQL Analytics Execution

### 4.7 Frontend and Visualization Layer

### 4.8 AI Explanation Service

### 4.9 API and Output Contracts

### 4.10 Evaluation and Logging Tooling

## Chapter 5 - Experiments and Results

### 5.1 Experimental Setup

- UCI Portuguese/Mathematics and OULAD
- Environment, versions, and evaluation scope
- Automated runner and ground-truth workflow

### 5.2 Supporting System Verification

- Evaluation 1: Import and Data Conversion
- Evaluation 2: Profiling and Mapping
- Evaluation 4: SQL Analysis Correctness
- Evaluation 5: API Response Contract
- Evaluation 6: Visualization Correctness
- Summarize only the results required to demonstrate that the system is sufficiently stable for the primary evaluations.

### 5.3 Evaluation 3: Task Availability

- Ground-truth definition
- Dataset/task matrix
- Accuracy and status-distribution results
- Error cases and corrected contracts
- Implications for the task taxonomy

### 5.4 Evaluation 7: AI Explanation Quality

- Baseline versus task-aware summarization
- Evaluation rubric
- Quantitative results
- Qualitative examples
- Faithfulness, correctness, relevance, and safety

### 5.5 Evaluation 10: Coverage and Human Utility

- Coverage by dataset, role, and task category
- Supported, partial, and unsupported analyses
- Practical usefulness of dashboard outputs
- Human-review procedure and limitations

### 5.6 Evaluation 11: System Performance

- Task-availability latency
- SQL analytics latency
- AI explanation latency, token usage, and cost
- UCI import time
- Large OULAD import and resource usage

### 5.7 Summary of Experimental Findings

- Results corresponding to RQ1–RQ4
- Do not emphasize Evaluations 8–9 without reliable evidence

## Chapter 6 - Discussion

### 6.1 Answering the Research Questions

### 6.2 Contribution 1: Value of the Canonical Schema

### 6.3 Contribution 2: Value of the Task Taxonomy

### 6.4 Contribution 3: Value and Risks of AI Explanation

### 6.5 Contribution 4: Evaluation Evidence and Reproducibility

### 6.6 Comparison with Hardcoded Dashboards

### 6.7 Threats to Validity

- Dataset representativeness
- Ground-truth coverage
- Human-review subjectivity
- LLM nondeterminism
- Absence of full Statistical Validity and Early-Warning Utility evaluations

## Chapter 7 - Conclusion and Future Work

### 7.1 Summary of the Four Contributions

### 7.2 Main Evaluation Findings

### 7.3 Limitations

### 7.4 Future Work

- Evaluation 8: Statistical Validity
- Evaluation 9: Early-Warning Utility
- Broader datasets and real-user studies
- Stronger AI claim verification
- Production-scale deployment

## Appendices

- Appendix A: Canonical schema and mapping specifications
- Appendix B: Full task taxonomy and registry
- Appendix C: Task-availability ground truth
- Appendix D: AI explanation rubric and examples
- Appendix E: Coverage/human-utility review artifacts
- Appendix F: Performance logs and reproducibility instructions

## Consistency rules

- Use **task taxonomy** for the contribution; the **task registry** is its implementation.
- Chapter 3 describes the methodology, Chapter 4 describes the code and architecture, and Chapter 5 presents evidence.
- The Abstract, Introduction, Discussion, and Conclusion must consistently state the same four contributions.
- Evaluations 3, 7, 10, and 11 provide the primary evidence. Evaluations 1, 2, 4, 5, and 6 support system reliability.
- Evaluations 8 and 9 are acknowledged as limitations/future work; do not make unverified claims about them.
