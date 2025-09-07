import express from "express";
import { uploadResume, getUserResumes } from "../controllers/resumeController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/upload", protect, upload.single("resume"), uploadResume);
router.get("/", protect, getUserResumes);

export default router;
