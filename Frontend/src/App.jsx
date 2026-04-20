import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
// If you have a MainLayout (with Sidebar/Navbar), import it here
// import MainLayout from "./layouts/MainLayout";

// Pages
import ImportPage from "./pages/ImportPage";
import UploadStep from "./pages/import-steps/UploadStep";
import ReviewStep from "./pages/import-steps/ReviewStep";
import ConfirmStep from "./pages/import-steps/ConfirmStep";
import CompleteStep from "./pages/import-steps/CompleteStep";

/**
 * Main Application Component
 * Managed with React Router v6
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Root Redirection */}
        <Route path="/" element={<Navigate to="/import/upload" replace />} />

        {/* 2. Import Workspace - Multi-step Flow */}
        <Route path="/import" element={<ImportPage />}>
          {/* Default to step 1 when hitting /import */}
          <Route index element={<Navigate to="upload" replace />} />
          
          <Route path="upload" element={<UploadStep />} />
          <Route path="review" element={<ReviewStep />} />
          <Route path="confirm" element={<ConfirmStep />} />
          <Route path="complete" element={<CompleteStep />} />
        </Route>

        {/* 3. Placeholder for future pages (Optional for now) */}
        {/* <Route path="/dashboard" element={<DashboardPage />} /> */}

        {/* 4. Catch-all: Redirect to home or first step */}
        <Route path="*" element={<Navigate to="/import/upload" replace />} />
      </Routes>
    </BrowserRouter>
  );
}