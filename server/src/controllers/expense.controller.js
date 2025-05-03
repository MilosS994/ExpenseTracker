import Expense from "../models/expense.model.js";
import xlsx from "xlsx";

// Add expense
export const addExpense = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const { icon, category, amount, date } = req.body;

    // Validation
    if (!category || !amount) {
      const error = new Error("Category and Amount fields are required");
      error.statusCode = 400;
      throw error;
    }

    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      const error = new Error("Amount must be a positive number");
      error.statusCode = 400;
      throw error;
    }

    const newExpense = await Expense.create({
      userId,
      icon,
      category,
      amount,
      ...(date && { date: new Date(date) }),
    });

    res.status(201).json({
      success: true,
      message: "Expense created successfully",
      newExpense,
    });
  } catch (error) {
    next(error);
  }
};

// Get all expenses
export const getAllExpense = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.status(200).json({ success: true, expense });
  } catch (error) {
    next(error);
  }
};

// Delete expense
export const deleteExpense = async (req, res, next) => {
  const userId = req.user.id;
  const id = req.params.id;

  try {
    const expense = await Expense.findOneAndDelete({ _id: id, userId });

    // If there is no expense
    if (!expense) {
      const error = new Error("Expense not found or not authorized to delete");
      error.statusCode = 404;
      throw error;
    }

    res
      .status(200)
      .json({ success: true, message: "Expense deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Download excel expense
export const downloadExpenseExcel = async (req, res, next) => {
  const userId = req.user.id;

  try {
    // Find all expense from the user
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    // If there is no expense
    if (!expense || expense.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No expense data available" });
    }

    // Prepare data for excel
    const data = expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date,
    }));

    // Create a new workbook and a worksheet
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    // Append worksheet to the workbook
    xlsx.utils.book_append_sheet(wb, ws, "Expense");
    // Create a unique file name to avoid conflicts
    const fileName = `expense_details_${userId}_${Date.now()}.xlsx`;
    // Write the file to the server
    xlsx.writeFile(wb, fileName);
    // Download the file
    res.download(fileName);
  } catch (error) {
    next(error);
  }
};
