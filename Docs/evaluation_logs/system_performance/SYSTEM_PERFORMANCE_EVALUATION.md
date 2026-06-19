# System Performance Evaluation

## 1. Objective

This evaluation measures the runtime performance, stability, API cost, and resource usage of the main backend flows in the Learning Analytics system.

It is different from Task Availability Evaluation:

- Task Availability Evaluation checks whether tasks are classified as available or unavailable correctly.
- System Performance Evaluation measures how long the system takes to execute representative requests and whether those requests remain stable.

The benchmark was executed with:

[`systemPerformanceBenchmark.mjs`](../../../Backend/scripts/systemPerformanceBenchmark.mjs)

## 2. Experimental Environment

| Item | Value |
|---|---|
| Operating system | Windows 10, x64 |
| Processor | 11th Gen Intel Core i5-1135G7 @ 2.40 GHz |
| Logical processors | 8 |
| Memory | Approximately 8 GB RAM |
| Node.js | v22.14.0 |
| Backend | `http://localhost:4000` |
| Execution mode | Sequential |
| Main benchmark warm-up | 5 runs per scenario |
| Main benchmark measured runs | 30 runs per scenario |
| AI benchmark warm-up | 2 runs per scenario |
| AI benchmark measured runs | 10 runs per scenario |
| Import benchmark warm-up | 2 runs |
| Import benchmark measured runs | 10 runs |
| Request timeout | 120,000 ms |
| Percentile method | Nearest-rank |
| Resource sampling | Whole operating system CPU/RAM sampling during measured runs |

The experiment used the local PostgreSQL database and the same UCI and OULAD sample datasets used in the functional evaluation.

## 3. Evaluated Scenarios

| Scenario | Dataset | Endpoint/task | Measurement purpose |
|---|---|---|---|
| Task Availability | UCI | `GET /api/tasks/available` | Validate all 52 public tasks |
| Task Availability | OULAD | `GET /api/tasks/available` | Validate all 52 public tasks |
| Simple Analytics | UCI | `A-B02` | Cohort outcome aggregation query |
| Simple Analytics | OULAD | `A-B02` | Cohort outcome aggregation query |
| Trend Analytics | UCI | `S-T01` | Single-student score trend analysis |
| Trend Analytics | OULAD | `S-T01` | Single-student score trend analysis |
| AI Explanation | UCI | `POST /api/ai/explain` for `S-T01` | LLM explanation latency, tokens, and API cost |
| AI Explanation | OULAD | `POST /api/ai/explain` for `S-T01` | LLM explanation latency, tokens, and API cost |
| Import Pipeline | UCI | `/api/import/profile` → `/api/import/confirm-mapping` → `/api/import/run` | Real CSV profiling, mapping confirmation, database import, and cleanup |
| Import Pipeline | OULAD | Sample reseed + PostgreSQL bulk load for `studentVle.csv` | Full OULAD dataset import with large clickstream ingestion |

The UCI import benchmark was repeated 10 times because it is small enough for stable repeated API-path measurement. The OULAD full import was measured once as a dedicated long-running import benchmark because the OULAD `studentVle.csv` file contains more than 10 million raw rows and dominates runtime.

## 4. What Does Simple Analytics – A-B02 Measure?

Task `A-B02` is named:

```text
Completion / outcome summary
```

It answers:

```text
How many students passed, failed, withdrew, or achieved a distinction?
```

The system reads `enrollment`, filters by `class_id`, groups students by `final_outcome`, counts students in each group, calculates the class percentage, and returns JSON for visualization.

This scenario represents the basic aggregation-query category.

## 5. What Does Trend Analytics – S-T01 Measure?

Task `S-T01` is named:

```text
Score trend analysis
```

It answers:

```text
Are a student's scores improving or declining over time?
```

This task is more complex than A-B02 because it uses assessment joins, class benchmarks, pass/target thresholds, `REGR_SLOPE`, support labels, and time-series output.

This scenario represents the complex analytics category involving CTEs, JOINs, benchmarks, and trend calculations.

## 6. Why Were These Scenarios Selected?

The selected scenarios cover the main runtime paths:

| Area | Why it matters |
|---|---|
| Task Availability | Measures the validator that checks all registered tasks and capabilities |
| Simple Analytics | Measures a lightweight SQL aggregation |
| Trend Analytics | Measures a more complex SQL analytics workflow |
| AI Explanation | Measures the optional external LLM layer, including token usage and cost |
| Import Pipeline | Measures a real data-ingestion path that mutates the database |
| CPU/RAM sampling | Captures resource pressure during measured runs |

The recorded duration includes backend processing, PostgreSQL execution, HTTP response delivery, and external AI service latency for AI scenarios. It does not include frontend chart rendering or browser page loading.

## 7. Measurement Procedure

For the main backend scenarios:

1. Five warm-up requests were executed and excluded from statistics.
2. Thirty measured requests were executed sequentially.
3. Start and completion times were recorded using `performance.now()`.
4. HTTP status, response size, duration, validation result, and selected server metrics were recorded.
5. CPU and RAM were sampled during measured runs.
6. Summary metrics were calculated automatically.
7. Raw results and summaries were written to JSON logs.

For AI Explanation:

1. Two warm-up requests were executed.
2. Ten measured requests were executed per dataset.
3. Latency, degradation status, model name, prompt tokens, completion tokens, total tokens, and estimated cost were recorded.

For Import Pipeline:

1. Two warm-up imports were executed.
2. Ten measured imports were executed.
3. Each measured import used the real API flow: profile CSV, confirm mapping, run import.
4. The benchmark used accepted valid mappings and ignored `absence_count` because the current strict validator and transform layer disagree on its scope.
5. After each iteration, the benchmark deleted the temporary `PERF_*` import batch, deleted the upload session, and restored `app_state`.
6. A database check after the run confirmed `perfImportBatchCount = 0`.

For the OULAD full import:

1. The benchmark used the optimized sample reseed path rather than the interactive upload wizard.
2. Non-engagement canonical tables were imported first.
3. The large OULAD clickstream file `studentVle.csv` was loaded through PostgreSQL bulk loading and transformed into canonical `engagement` rows.
4. CPU/RAM samples were collected during the measured run.
5. The measured result was written to a separate JSON performance log because this scenario is intentionally long-running.

Benchmark requests include:

```http
x-performance-benchmark: true
```

This prevents benchmark iterations from creating extra evaluation evidence logs. The measured business logic still executes normally.

## 8. Evaluation Metrics

| Metric | Meaning |
|---|---|
| Average response time | Mean duration of successful measured requests |
| P50 latency | Median successful request duration |
| P95 latency | Nearest-rank 95th percentile |
| Maximum latency | Slowest successful measured request |
| Throughput | Successful sequential requests divided by measured wall-clock time |
| Error rate | Failed or invalid requests divided by total requests |
| CPU percent | Whole operating system CPU usage sampled during measured runs |
| RAM percent | Whole operating system memory usage sampled during measured runs |
| AI tokens/cost | Token usage and estimated cost returned by the AI service |
| Import rows/sec | Imported input rows divided by end-to-end import duration |

Throughput is sequential throughput, not concurrent load-test throughput.

## 9. Experimental Results

### 9.1. Backend and analytics performance

Raw evidence:

[`system_performance_20260619T103232Z_5b5d39.json`](system_performance_20260619T103232Z_5b5d39.json)

| Scenario | Dataset | Runs | Average (ms) | P50 (ms) | P95 (ms) | Maximum (ms) | Throughput (req/s) | Error Rate |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| Task Availability | UCI | 30 | 841.282 | 785.171 | 1,249.040 | 1,275.836 | 1.187 | 0% |
| Task Availability | OULAD | 30 | 28,790.822 | 26,130.289 | 31,048.256 | 91,670.026 | 0.035 | 0% |
| Simple Analytics | UCI | 30 | 16.761 | 16.021 | 26.149 | 37.832 | 59.003 | 0% |
| Simple Analytics | OULAD | 30 | 66.890 | 62.630 | 102.880 | 115.171 | 14.926 | 0% |
| Trend Analytics | UCI | 30 | 59.235 | 41.613 | 71.140 | 548.506 | 16.839 | 0% |
| Trend Analytics | OULAD | 30 | 107.205 | 106.259 | 138.737 | 139.987 | 9.317 | 0% |

### 9.2. CPU/RAM during backend and analytics benchmark

| Scenario | Dataset | Avg CPU (%) | Peak CPU (%) | Avg RAM (%) | Peak RAM (%) |
|---|---|---:|---:|---:|---:|
| Task Availability | UCI | 34.764 | 78.036 | 90.053 | 92.895 |
| Task Availability | OULAD | 28.915 | 100.000 | 84.842 | 96.287 |
| Simple Analytics | UCI | 44.338 | 49.600 | 84.861 | 84.902 |
| Simple Analytics | OULAD | 36.520 | 45.518 | 86.730 | 87.201 |
| Trend Analytics | UCI | 23.665 | 43.867 | 85.814 | 86.534 |
| Trend Analytics | OULAD | 23.842 | 28.330 | 85.712 | 85.852 |

### 9.3. AI Explanation performance

Raw evidence:

- [`system_performance_20260619T105017Z_82af79.json`](system_performance_20260619T105017Z_82af79.json)
- [`system_performance_20260619T105144Z_bd7433.json`](system_performance_20260619T105144Z_bd7433.json)

| Scenario | Dataset | Runs | Average (ms) | P50 (ms) | P95 (ms) | Maximum (ms) | Total tokens | Estimated cost (USD) | Error Rate |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|
| AI Explanation | UCI | 10 | 5,733.360 | 5,731.914 | 6,284.419 | 6,284.419 | 18,142 | 0.004909 | 0% |
| AI Explanation | OULAD | 10 | 6,075.344 | 5,961.053 | 7,420.751 | 7,420.751 | 21,084 | 0.005332 | 0% |

The AI service returned model `gpt-4o-mini-2024-07-18` in the measured runs.

### 9.4. Import Pipeline performance

Raw evidence:

- [`system_performance_20260619T105308Z_276275.json`](system_performance_20260619T105308Z_276275.json)
- [`system_performance_20260619T205853Z_ab8bde.json`](system_performance_20260619T205853Z_ab8bde.json)

| Scenario | Dataset | Runs | Average (ms) | P50 (ms) | P95 (ms) | Maximum (ms) | Avg rows/sec | Error Rate |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| Import Pipeline | UCI | 10 | 2,408.664 | 2,161.472 | 4,413.060 | 4,413.060 | 289.229 | 0% |
| Import Pipeline | OULAD | 1 | 1,028,042.561 | 1,028,042.561 | 1,028,042.561 | 1,028,042.561 | 10,364.629 | 0% |

Average step timing:

| Step | Average time (ms) |
|---|---:|
| CSV profile | 132.779 |
| Confirm mapping | 100.316 |
| Import run | 2,156.124 |

The UCI import benchmark processed 6,490 input rows across 10 measured imports.

OULAD full import details:

| Metric | Value |
|---|---:|
| Raw `studentVle.csv` rows | 10,655,280 |
| Canonical `engagement` rows inserted | 8,459,320 |
| Total canonical rows after import | 8,701,209 |
| Engagement bulk phase | 832,697 ms, approximately 13.88 minutes |
| Full OULAD import duration | 1,028,042.561 ms, approximately 17.13 minutes |
| Average CPU during run | 55.851% |
| Peak CPU during run | 100.000% |
| Average RAM during run | 88.545% |
| Peak RAM during run | 96.842% |

## 10. Result Analysis

### 10.1. Stability

All final benchmark scenarios completed without measured request failures:

```text
Backend/analytics: 180 measured requests, 0 failures
AI Explanation: 20 measured requests, 0 failures
Import Pipeline: 11 measured imports, 0 failures
```

### 10.2. Task Availability

OULAD Task Availability is the main backend bottleneck. It averaged approximately 28.79 seconds, while UCI averaged approximately 0.84 seconds.

The OULAD run also contained one large latency spike of approximately 91.67 seconds. The spike was kept in the raw log because it is part of the actual measured behavior. Possible causes include database contention, garbage collection, operating-system scheduling, or other background processes.

### 10.3. Analytics execution

Simple Analytics remained fast on both datasets. Trend Analytics was slower than Simple Analytics because it performs joins, class benchmarking, and trend calculations, but the final measured OULAD trend run remained stable with P95 under 140 ms.

### 10.4. AI Explanation

AI Explanation is much slower than SQL analytics because it includes an external LLM call. The average latency was around 5.7–6.1 seconds. The estimated cost for 20 measured AI calls was approximately USD 0.010241.

### 10.5. Import Pipeline

The UCI import pipeline averaged approximately 2.41 seconds per import. Most of the time was spent in the import run step, not profiling or mapping confirmation. Cleanup was successful after the benchmark: no `PERF_*` import batches remained in the database.

The OULAD full import completed successfully in approximately 17.13 minutes. This run imported a 10.65-million-row raw clickstream file and produced 8.46 million canonical engagement rows. The result is substantially faster than the earlier one-hour import behavior and is close to the practical 15-minute target for the local machine used in this evaluation.

### 10.6. Resource usage

CPU usage occasionally reached 100%, especially during OULAD Task Availability, AI calls, and import. RAM usage was high throughout the benchmark because the machine was already running the backend, database, AI service, and development tools. The resource metrics are whole-OS measurements, not process-isolated measurements.

## 11. Performance Log Contents

The final evidence set keeps the following performance logs:

| Log file | Evidence role |
|---|---|
| `system_performance_20260619T103232Z_5b5d39.json` | Backend, task availability, simple analytics, trend analytics, and CPU/RAM sampling |
| `system_performance_20260619T105017Z_82af79.json` | AI Explanation performance for UCI |
| `system_performance_20260619T105144Z_bd7433.json` | AI Explanation performance for OULAD |
| `system_performance_20260619T105308Z_276275.json` | Repeated UCI import pipeline benchmark |
| `system_performance_20260619T205853Z_ab8bde.json` | Successful full OULAD import benchmark |

Failed or draft benchmark logs were removed from the final evidence folder so that the directory contains only logs used by this evaluation document.

Each JSON performance log contains:

| Section | Contents |
|---|---|
| `schema_version`, `run_id`, timestamps | Run identity and start/end times |
| `methodology` | Warm-up count, measured count, timeout, percentile method, resource sampling, AI/import inclusion |
| `environment` | OS, CPU, memory, Node.js, backend URL |
| `scenarios` | One object per measured scenario |
| `request` | Endpoint, method, task ID, parameters, or import source file |
| `warmup_results` | Warm-up request measurements, preserved but excluded from statistics |
| `requests` | Official measured request records |
| `summary` | Automatically calculated average, P50, P95, max, throughput, and error rate |
| `resource_summary` | Average/peak CPU and RAM during measured runs |
| `resource_samples` | Timestamped CPU/RAM samples |
| `server_metrics` | Scenario-specific metrics such as query count, AI tokens/cost, or import rows/sec |
| `cleanup_protocol` | Present for import scenarios; describes batch/session deletion and app-state restoration |

The summary values are calculated directly from the measured request array and are not manually entered.

## 12. Limitations

- The experiment was performed on one personal computer.
- Requests were executed sequentially, not concurrently.
- CPU/RAM metrics represent whole operating system usage, not backend-process-only usage.
- AI cost is an estimate returned by the configured AI service pricing logic.
- OULAD full import was measured once because the dataset contains a very large clickstream file and each run takes approximately 17 minutes.
- Background processes, PostgreSQL state, and operating-system scheduling may affect individual measurements.

The results therefore describe controlled local performance, not production-scale capacity.

## 13. Reproduction

From the `Backend` directory:

```powershell
npm run performance:benchmark -- --warmup=5 --runs=30 --timeout-ms=120000 --resource-sample-ms=500
```

Run AI scenarios:

```powershell
npm run performance:benchmark -- --warmup=2 --runs=10 --include-ai --scenario=ai_explanation_uci --timeout-ms=120000 --resource-sample-ms=250
npm run performance:benchmark -- --warmup=2 --runs=10 --include-ai --scenario=ai_explanation_oulad --timeout-ms=120000 --resource-sample-ms=250
```

Run import benchmark:

```powershell
npm run performance:benchmark -- --warmup=2 --runs=10 --scenario=import_pipeline_uci --timeout-ms=120000 --resource-sample-ms=250
```

Run the dedicated OULAD full import benchmark:

```powershell
npm run performance:benchmark -- --scenario=import_pipeline_oulad --runs=1 --warmup=0 --timeout-ms=1800000 --resource-sample-ms=1000
```

Logs are written to:

```text
Docs/evaluation_logs/system_performance/
```
