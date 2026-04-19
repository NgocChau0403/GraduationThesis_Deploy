import { useMemo, useState } from "react";
import UploadPanel from "../components/import/UploadPanel";
import BundleSummaryCard from "../components/import/BundleSummaryCard";
import FileSelector from "../components/import/FileSelector";
import MappingEditor from "../components/import/MappingEditor";
import ConfirmActions from "../components/import/ConfirmActions";
import RunImportPanel from "../components/import/RunImportPanel";
import ResultPanel from "../components/import/ResultPanel";
import {
  profileImport,
  confirmMapping,
  runImport
} from "../services/importApi";

function buildEditableMappingConfig(mappingSuggestion) {
  const safeSuggestion = structuredClone(mappingSuggestion || {});

  return {
    ...safeSuggestion,
    mapping_status: "draft",
    version: safeSuggestion?.version || 1,
    confirmed_at: null,
    field_mappings: (safeSuggestion?.field_mappings || []).map((item) => {
      const next = { ...item };
      const confidence = Number(next.confidence || 0);

      if (next.status === "unmapped" || next.status === "ignored") {
        return {
          ...next,
          status: "ignored",
          transform: "ignore",
          canonical_field: null,
          entity_scope: null
        };
      }

      if (next.status === "suggested") {
        return {
          ...next,
          status: confidence >= 0.97 ? "confirmed" : "needs_review"
        };
      }

      return next;
    })
  };
}

function getFileValidation(file) {
  return (
    file?.mappingConfirmationResult?.validationResult ||
    file?.mappingConfirmationResult ||
    null
  );
}

function getCounts(files) {
  const total = files.length;
  const confirmed = files.filter((file) => !!file.confirmedMappingConfig).length;
  const needsReview = files.filter((file) => {
    const mappings = file?.editableMappingConfig?.field_mappings || [];
    return mappings.some((item) => item.status === "needs_review");
  }).length;

  return { total, confirmed, needsReview };
}

function Banner({ banner, onClose }) {
  if (!banner) return null;

  const toneMap = {
    success: "border-emerald-200 bg-emerald-50 text-emerald-800",
    error: "border-red-200 bg-red-50 text-red-800",
    info: "border-slate-200 bg-white text-slate-800"
  };

  return (
    <div className={`rounded-2xl border px-4 py-3 ${toneMap[banner.type] || toneMap.info}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold">{banner.title}</div>
          <div className="mt-1 text-sm opacity-90">{banner.message}</div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg px-2 py-1 text-xs font-medium hover:bg-black/5"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}

function StepPill({ index, label, active, complete }) {
  const className = complete
    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
    : active
      ? "border-slate-900 bg-slate-900 text-white"
      : "border-slate-200 bg-white text-slate-500";

  return (
    <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium ${className}`}>
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-black/10 text-xs">
        {index}
      </span>
      <span>{label}</span>
    </div>
  );
}

export default function ImportPage() {
  const [sessionId, setSessionId] = useState(null);
  const [datasetName, setDatasetName] = useState(null);
  const [sourceDataset, setSourceDataset] = useState(null);
  const [bundleSchema, setBundleSchema] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [runResult, setRunResult] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [running, setRunning] = useState(false);

  const [banner, setBanner] = useState(null);

  const selectedFile = useMemo(
    () => uploadedFiles.find((file) => file.fileId === selectedFileId) || null,
    [uploadedFiles, selectedFileId]
  );

  const counts = useMemo(() => getCounts(uploadedFiles), [uploadedFiles]);

  const stepState = {
    uploaded: uploadedFiles.length > 0,
    selected: !!selectedFile,
    confirmed: counts.confirmed > 0,
    ran: !!runResult
  };

  async function handleUpload(payload) {
    try {
      setUploading(true);
      setRunResult(null);

      const response = await profileImport(payload);

      const files = (response.uploadedFiles || []).map((file) => ({
        ...file,
        editableMappingConfig: buildEditableMappingConfig(file.mappingSuggestion),
        confirmedMappingConfig: null,
        mappingConfirmationResult: null
      }));

      setSessionId(response.sessionId);
      setDatasetName(response.datasetName);
      setSourceDataset(response.sourceDataset);
      setBundleSchema(response.bundleSchema || null);
      setUploadedFiles(files);
      setSelectedFileId(files[0]?.fileId || null);

      setBanner({
        type: "success",
        title: "Upload completed",
        message: `Loaded ${files.length} file${files.length > 1 ? "s" : ""}. Review the mapping suggestions before confirming.`
      });
    } catch (error) {
      console.error(error);
      setBanner({
        type: "error",
        title: "Upload failed",
        message: error.response?.error || error.message || "Upload failed"
      });
    } finally {
      setUploading(false);
    }
  }

  function handleChangeEditableConfig(fileId, nextConfig) {
    setUploadedFiles((prev) =>
      prev.map((file) =>
        file.fileId === fileId
          ? {
              ...file,
              editableMappingConfig: nextConfig,
              confirmedMappingConfig: null
            }
          : file
      )
    );
  }

  async function handleConfirmSelected(file) {
    if (!file) return;

    try {
      setConfirming(true);

      const response = await confirmMapping({
        sessionId,
        fileId: file.fileId,
        mappingConfig: file.editableMappingConfig
      });

      setUploadedFiles((prev) =>
        prev.map((item) =>
          item.fileId === file.fileId
            ? {
                ...item,
                confirmedMappingConfig: response.confirmedMappingConfig,
                mappingConfirmationResult: response.mappingConfirmationResult
              }
            : item
        )
      );

      setBanner({
        type: "success",
        title: "Mapping confirmed",
        message: `${file.fileName} passed validation and is ready for import.`
      });
    } catch (error) {
      console.error(error);

      const validationResult = error.response?.validationResult || null;

      setUploadedFiles((prev) =>
        prev.map((item) =>
          item.fileId === file.fileId
            ? {
                ...item,
                confirmedMappingConfig: null,
                mappingConfirmationResult: validationResult
                  ? { validationResult }
                  : null
              }
            : item
        )
      );

      setBanner({
        type: "error",
        title: "Mapping confirmation failed",
        message: error.response?.error || error.message || "Confirm mapping failed"
      });
    } finally {
      setConfirming(false);
    }
  }

  async function handleRun(payload) {
    try {
      setRunning(true);

      const response = await runImport(payload);
      setRunResult(response);

      setBanner({
        type: "success",
        title: "Import completed",
        message: "The import pipeline finished. Review the summary below."
      });
    } catch (error) {
      console.error(error);
      setBanner({
        type: "error",
        title: "Run failed",
        message: error.response?.error || error.message || "Run import failed"
      });
    } finally {
      setRunning(false);
    }
  }

  const selectedValidation = getFileValidation(selectedFile);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-[1700px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-[radial-gradient(circle_at_top_left,_rgba(15,23,42,0.08),_transparent_30%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-6 py-8 sm:px-8">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-3xl">
                <div className="mb-3 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Smart Import Workspace
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  Import & Human-in-the-loop Mapping
                </h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                  Upload one or more learning datasets, review schema suggestions, confirm mappings, and run the pipeline from a single workspace.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <StepPill index="1" label="Upload" active={!stepState.uploaded} complete={stepState.uploaded} />
                <StepPill index="2" label="Review" active={stepState.uploaded && !stepState.confirmed} complete={stepState.confirmed} />
                <StepPill index="3" label="Confirm" active={stepState.confirmed && !stepState.ran} complete={stepState.ran} />
                <StepPill index="4" label="Run" active={false} complete={stepState.ran} />
              </div>
            </div>
          </div>

          <div className="space-y-6 p-6 sm:p-8">
            <Banner banner={banner} onClose={() => setBanner(null)} />

            <UploadPanel onUpload={handleUpload} loading={uploading} />

            <BundleSummaryCard
              sessionId={sessionId}
              datasetName={datasetName}
              sourceDataset={sourceDataset}
              bundleSchema={bundleSchema}
              uploadedFiles={uploadedFiles}
            />

            {uploadedFiles.length > 0 && (
              <div className="grid grid-cols-1 gap-6 xl:grid-cols-[340px_minmax(0,1fr)]">
                <div className="xl:sticky xl:top-6 xl:self-start">
                  <FileSelector
                    files={uploadedFiles}
                    selectedFileId={selectedFileId}
                    onSelect={setSelectedFileId}
                  />
                </div>

                <div className="space-y-6">
                  <MappingEditor
                    file={selectedFile}
                    onChangeEditableConfig={handleChangeEditableConfig}
                  />

                  <ConfirmActions
                    selectedFile={selectedFile}
                    validation={selectedValidation}
                    onConfirmSelected={handleConfirmSelected}
                    confirming={confirming}
                  />

                  <RunImportPanel
                    sessionId={sessionId}
                    files={uploadedFiles}
                    selectedFile={selectedFile}
                    onRun={handleRun}
                    loading={running}
                  />

                  <ResultPanel result={runResult} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}