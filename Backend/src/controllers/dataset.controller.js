import prisma from "../lib/prisma.js";
import { SAMPLE_BATCHES } from "../config/sampleBatches.js";
import { deleteImportBatch, renameImportBatch } from "../services/historyManager.service.js";

const SAMPLE_DATASETS = {
  OULAD: {
    requestKey: "OULAD",
    id: SAMPLE_BATCHES.OULAD.batch_id,
    name: SAMPLE_BATCHES.OULAD.batch_name,
    type: "sample",
    source: "OULAD",
    legacyIds: ["OULAD"]
  },
  UCI: {
    requestKey: "UCI",
    id: SAMPLE_BATCHES.UCI_MAT.batch_id,
    name: SAMPLE_BATCHES.UCI_MAT.batch_name,
    type: "sample",
    source: "UCI",
    legacyIds: ["UCI", SAMPLE_BATCHES.UCI_POR.batch_id]
  }
};

function getDefaultSampleDataset() {
  return SAMPLE_DATASETS.OULAD;
}

function getSampleDatasetByRequestKey(requestKey) {
  return SAMPLE_DATASETS[requestKey] || null;
}

function getSampleDatasetById(id) {
  return (
    Object.values(SAMPLE_DATASETS).find(
      (dataset) => dataset.id === id || dataset.legacyIds?.includes(id)
    ) || null
  );
}

// ==========================================
// 1. GET /api/datasets/active
// ==========================================
export async function getActiveDatasetController(req, res) {
  try {
    const appState = await prisma.appState.findUnique({
      where: { id: 1 }
    });

    if (!appState || !appState.active_dataset_id) {
      return res.json({
        success: true,
        activeDataset: {
          ...getDefaultSampleDataset(),
          setAt: null
        }
      });
    }

    const sampleDataset = getSampleDatasetById(appState.active_dataset_id);

    return res.json({
      success: true,
      activeDataset: {
        id: appState.active_dataset_id,
        name: appState.active_dataset_name || sampleDataset?.name || null,
        type: appState.active_dataset_type || sampleDataset?.type || null,
        source: appState.active_dataset_source || sampleDataset?.source || null,
        setAt: appState.active_dataset_set_at
      }
    });
  } catch (error) {
    console.error("Failed to get active dataset:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  }
}

// ==========================================
// 2. POST /api/datasets/set-active
// ==========================================
export async function setActiveDatasetController(req, res) {
  try {
    const { id, name, type, source } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "Dataset ID is required." });
    }

    let activeName = name;
    let activeType = type;
    let activeSource = source;

    // If it's not a sample, try to fetch its real info from the ImportBatch table
    if (type !== "sample") {
      const batch = await prisma.importBatch.findUnique({
        where: { batch_id: id }
      });
      
      if (!batch) {
        return res.status(404).json({ success: false, message: "Dataset not found in database." });
      }

      activeName = batch.batch_name;
      activeType = "custom";
      activeSource = batch.source_dataset;

      // Ensure old active datasets have is_active set to false
      await prisma.importBatch.updateMany({
        where: { is_active: true },
        data: { is_active: false }
      });

      // Set this one to active
      await prisma.importBatch.update({
        where: { batch_id: id },
        data: { is_active: true }
      });
    }

    // Upsert app_state (id=1), set is_first_use=false
    const setAt = new Date();
    await prisma.appState.upsert({
      where: { id: 1 },
      update: {
        active_dataset_id: id,
        active_dataset_name: activeName || null,
        active_dataset_type: activeType || null,
        active_dataset_source: activeSource || null,
        active_dataset_set_at: setAt,
        is_first_use: false
      },
      create: {
        id: 1,
        active_dataset_id: id,
        active_dataset_name: activeName || null,
        active_dataset_type: activeType || null,
        active_dataset_source: activeSource || null,
        active_dataset_set_at: setAt,
        is_first_use: false
      }
    });

    return res.json({
      success: true,
      activeDataset: {
        id,
        name: activeName,
        type: activeType,
        source: activeSource,
        setAt: setAt.toISOString()
      }
    });
  } catch (error) {
    console.error("Failed to set active dataset:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  }
}

// ==========================================
// 3. GET /api/datasets/history
// ==========================================
export async function getImportHistoryController(req, res) {
  try {
    const history = await prisma.importBatch.findMany({
      orderBy: { imported_at: 'desc' }
    });

    return res.json({
      success: true,
      history: history.map(item => ({
        import_batch_id: item.batch_id,
        batch_name: item.batch_name,
        source_dataset: item.source_dataset,
        row_count: item.row_count,
        created_at: item.imported_at,
        learning_mode: item.learning_mode,
        is_sample: item.is_sample,
        is_active: item.is_active,
        status: item.status
      }))
    });
  } catch (error) {
    console.error("Failed to get import history:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  }
}

// ==========================================
// 4. POST /api/datasets/switch-sample
// ==========================================
export async function switchSampleDatasetController(req, res) {
  try {
    const { dataset } = req.body;

    const targetDataset = getSampleDatasetByRequestKey(dataset);

    if (!targetDataset) {
      return res.status(400).json({ success: false, message: "Invalid sample dataset." });
    }
    const setAt = new Date();

    await prisma.appState.upsert({
      where: { id: 1 },
      update: {
        active_dataset_id: targetDataset.id,
        active_dataset_name: targetDataset.name,
        active_dataset_type: targetDataset.type,
        active_dataset_source: targetDataset.source,
        active_dataset_set_at: setAt,
        is_first_use: false
      },
      create: {
        id: 1,
        active_dataset_id: targetDataset.id,
        active_dataset_name: targetDataset.name,
        active_dataset_type: targetDataset.type,
        active_dataset_source: targetDataset.source,
        active_dataset_set_at: setAt,
        is_first_use: false
      }
    });

    return res.json({
      success: true,
      activeDataset: {
        ...targetDataset,
        setAt: setAt.toISOString()
      }
    });
  } catch (error) {
    console.error("Failed to switch sample dataset:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  }
}

// ==========================================
// 5. DELETE /api/datasets/:id
// ==========================================
export async function deleteDatasetController(req, res) {
  try {
    const batchId = req.params.id;

    if (!batchId) {
      return res.status(400).json({ success: false, message: "Dataset ID is required." });
    }

    // Attempt to delete (this will cascade delete all related tables)
    await deleteImportBatch(batchId);

    // Check if the deleted dataset was the active one
    const appState = await prisma.appState.findUnique({
      where: { id: 1 }
    });

    if (appState && appState.active_dataset_id === batchId) {
      // Fallback to default OULAD sample
      const fallbackDataset = getDefaultSampleDataset();
      const setAt = new Date();

      await prisma.appState.update({
        where: { id: 1 },
        data: {
          active_dataset_id: fallbackDataset.id,
          active_dataset_name: fallbackDataset.name,
          active_dataset_type: fallbackDataset.type,
          active_dataset_source: fallbackDataset.source,
          active_dataset_set_at: setAt
        }
      });
      
      return res.json({
        success: true,
        message: "Dataset deleted successfully. Active dataset reset to OULAD Sample.",
        wasActive: true,
        newActiveDataset: {
          ...fallbackDataset,
          setAt: setAt.toISOString()
        }
      });
    }

    return res.json({
      success: true,
      message: "Dataset deleted successfully.",
      wasActive: false
    });
  } catch (error) {
    console.error("Failed to delete dataset:", error);
    
    if (error.code === "BATCH_NOT_FOUND") {
      return res.status(404).json({ success: false, message: error.message });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  }
}

// ==========================================
// 6. PATCH /api/datasets/:id/rename
// ==========================================
export async function renameDatasetController(req, res) {
  try {
    const batchId = req.params.id;
    const { newName } = req.body;

    if (!batchId) {
      return res.status(400).json({ success: false, message: "Dataset ID is required." });
    }

    if (!newName || typeof newName !== "string" || newName.trim() === "") {
      return res.status(400).json({ success: false, message: "A valid newName is required." });
    }

    const result = await renameImportBatch(batchId, newName.trim());

    return res.json({
      success: true,
      message: "Dataset renamed successfully.",
      dataset: result
    });
  } catch (error) {
    console.error("Failed to rename dataset:", error);
    
    if (error.code === "BATCH_NOT_FOUND") {
      return res.status(404).json({ success: false, message: error.message });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  }
}
