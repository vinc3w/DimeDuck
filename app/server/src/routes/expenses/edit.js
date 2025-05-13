const Expense = require("@models/expense");
const Category = require("@models/category");
const Budget = require("@models/budget");
const Available = require("@models/available");
const mongoose = require("mongoose");
const { dateEquals } = require("@utils");
const moment = require("moment");
const db = require("@config/db");

module.exports = async (req, res) => {
  const { userId, expenseId, name, amount, categoryId, date, note } = req.body;
  const session = await db.connection.startSession();

  if (!name) {
    return res.status(400).send({
      message: "Name must not be empty!",
    });
  }
  if (name.length < 1 || name.length > 100) {
    return res.status(400).send({
      message: "Name must be between 1 and 100 characters long!",
    });
  }
  
  if (!amount) {
    return res.status(400).send({
      message: "Amount must not be empty!",
    });
  }
  if (amount <= 0) {
    return res.status(400).send({
      message: "Amount must be more than 0!",
    });
  }
  if (amount > 1_000_000) {
    return res.status(400).send({
      message: "Amount must be less than 1,000,000!",
    });
  }
  
  if (!categoryId) {
    return res.status(400).send({
      message: "Category must not be empty!",
    });
  }
  
  if (!date) {
    return res.status(400).send({
      message: "Date must not be empty!",
    });
  }
  
  if (note.length > 500) {
    return res.status(400).send({
      message: "Note must be at most 500 characters long!",
    });
  }
  
  try {
    session.startTransaction();

    let category = null;
    if (category && categoryId !== "none") {
      category = await Category.findById(categoryId);
      if (categoryId && !category) {
        return res.status(404).send({
          message: "Category not found!",
        });
      }
    }

    const expense = await Expense.findById(expenseId);
    if (!expense) {
      return res.status(400).send({
        message: "Expense not found!",
      });
    }

    const expenseDate = moment(expense.date).startOf("day");
    const targetedDate = moment(date).startOf("day");
    let available;
    let targetedAvailable;

    if (!dateEquals(expense.date, date)) {
      available = await Available.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
            date: {
              $gte: expenseDate.toDate(),
              $lte: moment(expenseDate).endOf("day").toDate(),
            },
          },
        },
      ]);
      available = await Available.findById(available[0]._id);
      available.amount += expense.amount;
      
      targetedAvailable = await Available.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
            date: {
              $gte: targetedDate.toDate(),
              $lte: moment(targetedDate).endOf("day").toDate(),
            },
          },
        },
      ]);
      if (!targetedAvailable[0]) {
        const budget = await Budget.findOne({
          userId,
          current: true,
        });
        if (!budget) {
          return res.status(404).send({
            message: "Budget not found!",
          });
        }
        targetedAvailable = new Available({
          userId,
          amount: budget.amount - amount,
          date: targetedDate.toDate(),
        });
      } else {
        targetedAvailable = targetedAvailable[0];
        targetedAvailable = await Available.findById(targetedAvailable._id);
        targetedAvailable.amount -= amount;
      }
    } else if (expense.amount !== amount) {
      available = await Available.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(userId),
            date: {
              $gte: expenseDate.toDate(),
              $lte: moment(expenseDate).endOf("day").toDate(),
            },
          },
        },
      ]);
      available = await Available.findById(available[0]._id);
      available.amount += expense.amount;
      available.amount -= amount;
    }

    expense.name = name;
    expense.amount = amount;
    expense.category = categoryId === "none" ? null : categoryId;
    expense.date = date;
    expense.note = note;

    if (available) await available.save();
    if (targetedAvailable) await targetedAvailable.save();
    await expense.save();

    session.commitTransaction();

    res.status(200).send({
      message: "Expense edited successfully",
      expense,
    });
  } catch (error) {
    session.abortTransaction();
    res.status(500).send({
      message: "Something went wrong! Please try again later."
    });
  }
}
