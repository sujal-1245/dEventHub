import express from "express";
import { getTotalUsers } from "../controllers/userController.js";

const router = express.Router();

// Get total users
router.get("/count", getTotalUsers);

export default router;
