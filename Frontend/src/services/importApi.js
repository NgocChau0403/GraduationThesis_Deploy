const API_BASE_URL = "http://localhost:4000/api/import";

async function handleJsonResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data?.message || "API request failed");
    error.response = data;
    throw error;
  }

  return data;
}

export async function profileImport({ files, datasetName, sourceDataset }) {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  if (datasetName) {
    formData.append("datasetName", datasetName);
  }

  if (sourceDataset) {
    formData.append("sourceDataset", sourceDataset);
  }

  const response = await fetch(`${API_BASE_URL}/profile`, {
    method: "POST",
    body: formData
  });

  return handleJsonResponse(response);
}

export async function confirmMapping({ sessionId, fileId, mappingConfig }) {
  const response = await fetch(`${API_BASE_URL}/confirm-mapping`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      sessionId,
      fileId,
      mappingConfig
    })
  });

  return handleJsonResponse(response);
}

export async function runImport({ sessionId, options, fileIds }) {
  const response = await fetch(`${API_BASE_URL}/run`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      sessionId,
      fileIds,
      options
    })
  });

  return handleJsonResponse(response);
}