import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import importRoutes from "./routes/import.routes.js";
import datasetRoutes from "./routes/dataset.routes.js";
import taskRoutes from "./routes/task.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import studentsRoutes from "./routes/students.routes.js";
import classesRoutes from "./routes/classes.routes.js";

import { seedSampleDatasets } from "./services/sampleSeeder.service.js";
import { clearExpiredUploadSessions } from "./services/uploadSession.store.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  }),
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/api/import", importRoutes);
app.use("/api/datasets", datasetRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/students", studentsRoutes);
app.use("/api/classes", classesRoutes);


app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend is running",
  });
});

app.listen(PORT, async () => {
  await seedSampleDatasets();
  await clearExpiredUploadSessions();
  console.log(`Server running at http://localhost:${PORT}`);
});
