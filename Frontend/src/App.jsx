import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages

import HomePage from "./pages/HomePage";
import RoleSelectionPage from "./pages/RoleSelectionPage";
import ImportPage from "./pages/ImportPage";
import UploadStep from "./pages/import-steps/UploadStep";
import ReviewStep from "./pages/import-steps/ReviewStep";
import ConfirmStep from "./pages/import-steps/ConfirmStep";
import CompleteStep from "./pages/import-steps/CompleteStep";

import DataSelectionPage from "./pages/DataSelectionPage";
import StudentDashboardPage from "./pages/StudentDashboardPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

/**
 * Main Application Component
 * Managed with React Router v6
 *
 * Flow: / (Home) → /choose-role → /import/upload → /import/review → /import/confirm → /import/complete
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Homepage — Landing page */}
        <Route path="/" element={<HomePage />} />

        {/* 2. Choose Role */}
        <Route path="/choose-role" element={<RoleSelectionPage />} />

        {/* 3. Data Selection (Admin Only) */}
        <Route path="/data-selection" element={<DataSelectionPage />} />

        {/* 4. Dashboards */}
        <Route path="/student/dashboard" element={<StudentDashboardPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />

        {/* 5. Import Workspace — Multi-step Flow */}
        <Route path="/import" element={<ImportPage />}>
          <Route index element={<Navigate to="upload" replace />} />
          <Route path="upload" element={<UploadStep />} />
          <Route path="review" element={<ReviewStep />} />
          <Route path="confirm" element={<ConfirmStep />} />
          <Route path="complete" element={<CompleteStep />} />
        </Route>

        {/* 4. Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
