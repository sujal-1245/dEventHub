import express from "express";
import { recommendEvents, analyzeResume, chatbotResponse } from "../controllers/mlController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/recommend", protect, recommendEvents);
router.post("/resume", protect, analyzeResume);
router.post("/chatbot", protect, chatbotResponse);

export default router;
