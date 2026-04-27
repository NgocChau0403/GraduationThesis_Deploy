import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { switchSampleDataset, deleteDataset, renameDataset } from "../services/datasetApi";
import { message, Popconfirm, Input, Button } from "antd";

// --- Icons ---
function InfoIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function CheckIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function UploadCloudIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
    </svg>
  );
}

function PlusIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  );
}

function TrashIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}

function PencilIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  );
}

// --- Component ---
export default function DataSelectionPage() {
  const navigate = useNavigate();
  const { activeDataset, setActiveDataset, importHistory, refreshImportHistory } = useAppContext();
  const [isSwitching, setIsSwitching] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  
  const [renamingId, setRenamingId] = useState(null);
  const [newName, setNewName] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);
  
  const [isDeleting, setIsDeleting] = useState(false);

  const isSampleActive = (source) =>
    activeDataset?.type === "sample" && activeDataset?.source === source;

  useEffect(() => {
    refreshImportHistory();
  }, [refreshImportHistory]);

  const handleSelectSample = async (datasetName) => {
    try {
      setIsSwitching(true);
      setLoadingId(datasetName);
      const res = await switchSampleDataset(datasetName);
      if (res.success && res.activeDataset) {
        setActiveDataset(res.activeDataset);
        message.success(`Dataset switched to ${res.activeDataset.name}`);
        // Slight delay for UX
        setTimeout(() => navigate("/admin/dashboard"), 500);
      }
    } catch (error) {
      console.error("Failed to switch sample dataset:", error);
      message.error("Failed to switch dataset. Please try again.");
    } finally {
      setIsSwitching(false);
      setLoadingId(null);
    }
  };

  const handleSelectImported = async (historyItem) => {
    const datasetObj = {
      id: historyItem.import_batch_id,
      name: `Imported Dataset (${historyItem.source_dataset})`,
      type: "imported",
      source: historyItem.source_dataset,
      setAt: new Date().toISOString(),
    };
    
    try {
      setIsSwitching(true);
      setLoadingId(historyItem.import_batch_id);
      const { setActiveDataset: apiSetActive } = await import("../services/datasetApi");
      const res = await apiSetActive(datasetObj);
      if (res.success) {
        setActiveDataset(res.activeDataset || datasetObj);
        message.success(`Dataset switched to imported dataset`);
        setTimeout(() => navigate("/admin/dashboard"), 500);
      }
    } catch (error) {
      console.error("Failed to set imported dataset:", error);
      message.error("Failed to activate imported dataset.");
    } finally {
      setIsSwitching(false);
      setLoadingId(null);
    }
  };

  const handleDeleteDataset = async (batchId) => {
    try {
      setIsDeleting(true);
      const res = await deleteDataset(batchId);
      if (res.success) {
        message.success("Dataset deleted successfully");
        if (res.wasActive && res.newActiveDataset) {
          setActiveDataset(res.newActiveDataset);
          message.info("Reverted active dataset to OULAD Sample");
        }
        refreshImportHistory();
      }
    } catch (error) {
      console.error("Failed to delete dataset:", error);
      message.error("Failed to delete dataset.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleRenameDataset = async (batchId) => {
    if (!newName.trim()) {
      message.error("Dataset name cannot be empty");
      return;
    }
    
    try {
      setIsRenaming(true);
      const res = await renameDataset(batchId, newName);
      if (res.success) {
        message.success("Dataset renamed successfully");
        setRenamingId(null);
        refreshImportHistory();
        
        // Update activeDataset context if the renamed one is currently active
        if (activeDataset?.id === batchId) {
          setActiveDataset({ ...activeDataset, name: res.dataset.batch_name });
        }
      }
    } catch (error) {
      console.error("Failed to rename dataset:", error);
      message.error("Failed to rename dataset.");
    } finally {
      setIsRenaming(false);
    }
  };

  const startRenaming = (item) => {
    setRenamingId(item.import_batch_id);
    setNewName(item.batch_name);
  };


  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Select Data Source
          </h1>
          <p className="text-lg text-slate-500">
            Choose a standard sample dataset or select from your uploaded history.
          </p>
        </header>

        {/* System Clarity Banner (Inline Helper Text) */}
        <div className="mb-10 flex items-center justify-center gap-2 text-slate-400">
          <InfoIcon className="w-4 h-4 shrink-0" />
          <p className="text-sm font-medium">
            The dataset activated here will be used across all analytics dashboards for both Students and Administrators.
          </p>
        </div>

        {/* Section A: Standard Samples */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-800 mb-4 px-1 border-b pb-2">
            Standard Samples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* OULAD Card */}
            <div className={`relative rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 ${
              isSampleActive("OULAD")
                ? "bg-emerald-50/40 border-2 border-emerald-500 shadow-sm" 
                : "bg-white border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-md"
            }`}>
              {isSampleActive("OULAD") && (
                <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <CheckIcon className="w-3 h-3" /> Active
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2">OULAD Dataset</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Open University Learning Analytics Dataset. Contains demographic, performance, and VLE interaction data.
                </p>
              </div>
              
              {isSampleActive("OULAD") ? (
                <div className="w-full py-2.5 font-medium text-sm flex justify-center items-center text-emerald-600/80 cursor-default opacity-80 mt-auto">
                  Currently Active
                </div>
              ) : (
                <button
                  disabled={isSwitching}
                  onClick={() => handleSelectSample("OULAD")}
                  className="w-full py-2.5 mt-auto rounded-xl font-semibold text-sm transition-all duration-200 bg-white border border-slate-300 text-slate-700 hover:bg-slate-800 hover:text-white hover:border-slate-800 shadow-sm flex justify-center items-center gap-2 disabled:opacity-60 disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed"
                >
                  {loadingId === "OULAD" ? (
                    <><div className="w-4 h-4 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin"></div> Activating...</>
                  ) : "Activate OULAD Dataset"}
                </button>
              )}
            </div>

            {/* UCI Card */}
            <div className={`relative rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 ${
              isSampleActive("UCI")
                ? "bg-emerald-50/40 border-2 border-emerald-500 shadow-sm" 
                : "bg-white border border-slate-200 shadow-sm hover:-translate-y-1 hover:shadow-md"
            }`}>
              {isSampleActive("UCI") && (
                <div className="absolute top-4 right-4 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <CheckIcon className="w-3 h-3" /> Active
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2">UCI Dataset</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  UCI Student Performance Dataset. Focuses on secondary education data with demographic and social features.
                </p>
              </div>
              
              {isSampleActive("UCI") ? (
                <div className="w-full py-2.5 font-medium text-sm flex justify-center items-center text-emerald-600/80 cursor-default opacity-80 mt-auto">
                  Currently Active
                </div>
              ) : (
                <button
                  disabled={isSwitching}
                  onClick={() => handleSelectSample("UCI")}
                  className="w-full py-2.5 mt-auto rounded-xl font-semibold text-sm transition-all duration-200 bg-white border border-slate-300 text-slate-700 hover:bg-slate-800 hover:text-white hover:border-slate-800 shadow-sm flex justify-center items-center gap-2 disabled:opacity-60 disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed"
                >
                  {loadingId === "UCI" ? (
                    <><div className="w-4 h-4 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin"></div> Activating...</>
                  ) : "Activate UCI Dataset"}
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Section B: Import History */}
        <section>
          <div className="flex items-center justify-between border-b pb-2 mb-4 px-1">
            <h2 className="text-xl font-bold text-slate-800">Import History</h2>
            {importHistory.length > 0 && (
              <button
                onClick={() => navigate("/import/upload")}
                className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-1"
              >
                <PlusIcon className="w-4 h-4" /> Import New
              </button>
            )}
          </div>

          <div className={`rounded-2xl transition-all ${importHistory.length > 0 ? "bg-white border border-slate-200 shadow-sm overflow-hidden" : ""}`}>
            {importHistory.length === 0 ? (
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-slate-400 mb-5">
                  <UploadCloudIcon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">No Custom Datasets Yet</h3>
                <p className="text-slate-500 max-w-sm mb-6 leading-relaxed">
                  Import your own educational data to analyze custom student cohorts and performance metrics.
                </p>
                <button 
                  onClick={() => navigate("/import/upload")}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors shadow-sm"
                >
                  <PlusIcon className="w-4 h-4" /> Import New Dataset
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-slate-100">
                {importHistory.map((item) => {
                  const isActive = activeDataset?.id === item.import_batch_id;
                  const isBeingRenamed = renamingId === item.import_batch_id;
                  
                  return (
                    <li key={item.import_batch_id} className={`p-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors ${isActive ? 'bg-emerald-50/20' : 'hover:bg-slate-50'}`}>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          {isBeingRenamed ? (
                            <div className="flex items-center gap-2">
                              <Input 
                                size="small" 
                                value={newName} 
                                onChange={(e) => setNewName(e.target.value)}
                                onPressEnter={() => handleRenameDataset(item.import_batch_id)}
                                disabled={isRenaming}
                                autoFocus
                              />
                              <Button size="small" type="primary" loading={isRenaming} onClick={() => handleRenameDataset(item.import_batch_id)}>Save</Button>
                              <Button size="small" disabled={isRenaming} onClick={() => setRenamingId(null)}>Cancel</Button>
                            </div>
                          ) : (
                            <>
                              <p className="text-sm font-bold text-slate-900 truncate">
                                {item.batch_name}
                              </p>
                              {isActive && (
                                <span className="bg-emerald-100 text-emerald-800 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full">
                                  Active
                                </span>
                              )}
                              <button onClick={() => startRenaming(item)} className="text-slate-400 hover:text-blue-600 transition-colors" title="Rename">
                                <PencilIcon className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                          <span className="flex items-center gap-1.5">
                            ID: <span className="font-mono text-[10px]">{item.import_batch_id}</span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            Source: <span className="font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">{item.source_dataset}</span>
                          </span>
                          <span className="flex items-center gap-1.5">
                            Rows: <span className="font-semibold text-slate-700">{item.row_count?.toLocaleString()}</span>
                          </span>
                          <span>
                            {new Date(item.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 shrink-0">
                        {isActive ? (
                          <div className="px-4 py-2 font-medium text-sm text-emerald-600/80 cursor-default opacity-80">
                            Currently Active
                          </div>
                        ) : (
                          <button
                            disabled={isSwitching || isDeleting}
                            onClick={() => handleSelectImported(item)}
                            className="px-5 py-2 rounded-xl font-semibold text-sm transition-all duration-200 bg-white border border-slate-300 text-slate-700 hover:bg-slate-800 hover:text-white hover:border-slate-800 shadow-sm flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            {loadingId === item.import_batch_id ? (
                              <><div className="w-3 h-3 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin"></div> Activating...</>
                            ) : "Activate"}
                          </button>
                        )}
                        
                        <Popconfirm
                          title="Delete Dataset"
                          description={
                            <>
                              Are you sure you want to delete this dataset?<br />
                              <span className="text-red-500 font-medium">This action cannot be undone.</span>
                            </>
                          }
                          onConfirm={() => handleDeleteDataset(item.import_batch_id)}
                          okText="Delete"
                          okButtonProps={{ danger: true, loading: isDeleting }}
                          cancelText="Cancel"
                          placement="topRight"
                        >
                          <button
                            disabled={isSwitching || isDeleting}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            title="Delete Dataset"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </button>
                        </Popconfirm>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/choose-role")}
            className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors inline-flex items-center gap-1"
          >
            ← Back to Role Selection
          </button>
        </div>
      </div>
    </div>
  );
}
