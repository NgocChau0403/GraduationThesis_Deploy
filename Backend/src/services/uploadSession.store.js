const uploadSessionStore = new Map();

function createSessionId() {
  return `session_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function createUploadSession(data) {
  const sessionId = createSessionId();

  uploadSessionStore.set(sessionId, {
    ...data,
    createdAt: new Date().toISOString()
  });

  return sessionId;
}

export function getUploadSession(sessionId) {
  return uploadSessionStore.get(sessionId) || null;
}

export function updateUploadSession(sessionId, patch) {
  const existing = uploadSessionStore.get(sessionId);

  if (!existing) {
    return null;
  }

  const updated = {
    ...existing,
    ...patch,
    updatedAt: new Date().toISOString()
  };

  uploadSessionStore.set(sessionId, updated);
  return updated;
}

export function deleteUploadSession(sessionId) {
  return uploadSessionStore.delete(sessionId);
}