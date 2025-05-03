import express from "express";

// Expense controllers
import {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpenseExcel,
} from "../controllers/expense.controller.js";

// Auth middleware
import authenticateUser from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add", authenticateUser, addExpense);
router.get("/get", authenticateUser, getAllExpense);
router.get("/downloadexcel", authenticateUser, downloadExpenseExcel);
router.delete("/:id", authenticateUser, deleteExpense);

export default router;
