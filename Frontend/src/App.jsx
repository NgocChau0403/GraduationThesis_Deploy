import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ImportPage from "./pages/ImportPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/import" element={<ImportPage />} />
        <Route path="*" element={<Navigate to="/import" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
