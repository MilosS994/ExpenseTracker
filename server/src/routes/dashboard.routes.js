import express from "express";

// Dashboard controller
import { getDashboardData } from "../controllers/dashboard.controller.js";

// Auth middleware
import authenticateUser from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authenticateUser, getDashboardData);

export default router;
