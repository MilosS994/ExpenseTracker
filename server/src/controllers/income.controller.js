import Income from "../models/income.model.js";
import xlsx from "xlsx";
import path from "path";
import fs from "fs";

// Add income
export const addIncome = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const { icon, source, amount, date } = req.body;

    // Validation
    if (!source || !amount) {
      const error = new Error("Source and Amount fields are required");
      error.statusCode = 400;
      throw error;
    }

    const parsedAmount = Number(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      const error = new Error("Amount must be a positive number");
      error.statusCode = 400;
      throw error;
    }

    const newIncome = await Income.create({
      userId,
      icon,
      source,
      amount,
      ...(date && { date: new Date(date) }),
    });

    res.status(201).json({
      success: true,
      message: "Income successfully created",
      newIncome,
    });
  } catch (error) {
    next(error);
  }
};

// Get all income
export const getAllIncome = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    res.status(200).json({ success: true, income });
  } catch (error) {
    next(error);
  }
};

// Delete income
export const deleteIncome = async (req, res, next) => {
  const userId = req.user.id;
  const id = req.params.id;

  try {
    const income = await Income.findOneAndDelete({ _id: id, userId });

    // If there is no income
    if (!income) {
      const error = new Error("Income not found or not authorized to delete");
      error.statusCode = 404;
      throw error;
    }

    res
      .status(200)
      .json({ success: true, message: "Income deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Download Excel income
export const downloadIncomeExcel = async (req, res, next) => {
  const userId = req.user.id;

  try {
    // Find all income from a user
    const income = await Income.find({ userId }).sort({ date: -1 });
    // If there is no income
    if (!income || income.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No income data available" });
    }
    // Prepare data for excel
    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));

    // Create a new workbook and a worksheet
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    // Append worksheet to the workbook
    xlsx.utils.book_append_sheet(wb, ws, "Income");
    // Create a unique file name to avoid conflicts
    const fileName = `income_details_${userId}_${Date.now()}.xlsx`;
    // Write the file to the server
    xlsx.writeFile(wb, fileName);
    // Download the file
    res.download(fileName);
  } catch (error) {
    next(error);
  }
};
