import Income from "../models/income.model.js";
import Expense from "../models/expense.model.js";
import { isValidObjectId, Types } from "mongoose";

// Dashboard data
export const getDashboardData = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    // Fetch total income
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    console.log("Total income: ", {
      totalIncome,
      userId: isValidObjectId(userId),
    });

    // Fetch total expense
    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    console.log("Total expense: ", {
      totalExpense,
      userId: isValidObjectId(userId),
    });

    // Get income transactions in the last 60 days
    const last60DaysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    // Get total income for the last 60 days
    const last60DaysTotalIncome = last60DaysIncomeTransactions.reduce(
      (sum, income) => sum + income.amount,
      0
    );

    // Fetch expense transactions in the last 30 days
    const last30DaysExpenseTransactions = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    // Get total expense for the last 30 days
    const last30DaysTotalExpense = last30DaysExpenseTransactions.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    // Fetch last 5 transactions (income + expense)
    const allTransactions = [
      ...(await Income.find({ userId }).sort({ date: -1 })).map((txn) => ({
        ...txn.toObject(),
        type: "income",
      })),
      ...(await Expense.find({ userId }).sort({ date: -1 })).map((txn) => ({
        ...txn.toObject(),
        type: "expense",
      })),
    ];

    allTransactions.sort((a, b) => b.date - a.date); // Sort by date, newest first
    const last5Transactions = allTransactions.slice(0, 5); //Take only last 5 transactions

    // Response
    res.status(200).json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last30DaysExpense: {
        total: last30DaysTotalExpense,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncome: {
        total: last60DaysTotalIncome,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransactions: last5Transactions,
    });
  } catch (error) {
    next(error);
  }
};
