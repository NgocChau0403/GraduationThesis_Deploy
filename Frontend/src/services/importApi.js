
// Lấy URL từ file .env, nếu không có thì mới dùng localhost làm mặc định
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api/import";

/**
 * Helper to handle JSON responses and errors
 */
async function handleJsonResponse(response) {
  let data;
  try {
    data = await response.json();
  } catch (e) {
    throw new Error("Invalid JSON response from server");
  }

  if (!response.ok) {
    // Log lỗi chi tiết ra console để dễ debug
    console.error(`[API Error] ${response.status}:`, data);
    
    const error = new Error(data?.message || data?.error || "API request failed");
    error.response = data;
    error.status = response.status;
    throw error;
  }

  return data;
}

/**
 * 1. Profile Uploaded Files
 */
export async function profileImport({ files, datasetName, sourceDataset }) {
  const formData = new FormData();

  files.forEach((file) => formData.append("files", file));
  if (datasetName) formData.append("datasetName", datasetName);
  if (sourceDataset) formData.append("sourceDataset", sourceDataset);

  console.log(`[API] Profiling ${files.length} files...`);

  const response = await fetch(`${API_BASE_URL}/profile`, {
    method: "POST",
    body: formData,
    // Không set Content-Type header khi dùng FormData, fetch sẽ tự làm việc đó kèm boundary
  });

  return handleJsonResponse(response);
}

/**
 * 2. Confirm Mapping for a specific file
 */
export async function confirmMapping({ sessionId, fileId, mappingConfig }) {
  console.log(`[API] Confirming mapping for file: ${fileId}`);

  const response = await fetch(`${API_BASE_URL}/confirm-mapping`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, fileId, mappingConfig })
  });

  return handleJsonResponse(response);
}

/**
 * 3. Run Pipeline execution
 */
export async function runImport({ sessionId, options, fileIds }) {
  console.log(`[API] Triggering pipeline run for session: ${sessionId}`);

  const response = await fetch(`${API_BASE_URL}/run`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, fileIds, options })
  });

  return handleJsonResponse(response);
}