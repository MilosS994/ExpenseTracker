import express from "express";

// Income controllers
import {
  addIncome,
  getAllIncome,
  deleteIncome,
  downloadIncomeExcel,
} from "../controllers/income.controller.js";

// Auth middleware
import authenticateUser from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add", authenticateUser, addIncome);
router.get("/get", authenticateUser, getAllIncome);
router.get("/downloadexcel", authenticateUser, downloadIncomeExcel);
router.delete("/:id", authenticateUser, deleteIncome);

export default router;
