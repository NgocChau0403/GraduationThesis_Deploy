import express from "express";
import multer from "multer";
import {
  profileImportController,
  confirmMappingController,
  previewMappingController,
  runImportController
} from "../controllers/import.controller.js";

const router = express.Router();

const upload = multer({
  dest: "uploads/",
  limits: {
    files: 20,
    fileSize: 1024 * 1024 * 1024 // 1GB limit for large datasets like OULAD
  },
  fileFilter: (req, file, cb) => {
    const isCsv =
      file.mimetype === "text/csv" ||
      file.originalname.toLowerCase().endsWith(".csv");

    if (!isCsv) {
      return cb(new Error("Only CSV files are allowed."));
    }

    cb(null, true);
  }
});

router.post("/profile", upload.array("files"), profileImportController);
router.post("/confirm-mapping", express.json(), confirmMappingController);
router.post("/preview", express.json(), previewMappingController);
router.post("/run", express.json(), runImportController);

export default router;