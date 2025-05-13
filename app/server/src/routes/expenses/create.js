const Expense = require("@models/expense");
const Category = require("@models/category");
const Budget = require("@models/budget");
const Available = require("@models/available");
const moment = require("moment");
const mongoose = require("mongoose");
const db = require("@config/db");

module.exports = async (req, res) => {
  const { userId, name, amount, categoryId, date, note } = req.body;
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
    if (categoryId !== "none") {
      category = await Category.findById(categoryId);
      if (categoryId && !category) {
        return res.status(404).send({
          message: "Category not found!",
        });
      }
    }

    const expense = new Expense({
      userId, name, amount, date, note,
      category: category?._id || null,
    });

    let available = await Available.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          date: {
            $gte: moment(date).startOf("day"),
            $lte: moment(date).endOf("day"),
          },
        },
      },
    ]);
    if (!available[0]) {
      const budget = await Budget.findOne({
        userId,
        current: true,
      });
      if (!budget) {
        return res.status(404).send({
          message: "Budget not found!",
        });
      }
      available = new Available({
        userId,
        date,
        amount: budget.amount - amount,
      });
    } else {
      available = available[0];
      available = await Available.findById(available._id);
      available.amount -= amount;
    }
    
    await available.save();
    await expense.save();

    session.commitTransaction();

    res.status(200).send({
      message: "Expense created successfully",
      category,
    })
  } catch (error) {
    session.abortTransaction();
    res.status(500).send({
      message: "Something went wrong! Please try again later."
    });
  }
}
