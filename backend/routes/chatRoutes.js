import express from "express";
import { chatController } from "../controllers/chatController.js";

const router = express.Router();

// POST /api/chat
router.post("/", chatController);

export default router;
