const Expense = require("@models/expense");
const Available = require("@models/available");
const db = require("@config/db");
const moment = require("moment");

module.exports = async (req, res) => {
  const user = res.locals.user;
  const { expenseId } = req.params;
  
  const session = await db.connection.startSession();
  
  try {
    session.startTransaction();

    const expense = await Expense.findByIdAndDelete(expenseId);
    if (!expense) {
      return res.status(400).send({
        message: "Expense not found!",
      });
    }
    
    const expenseDate = moment(expense.date).startOf("day");
    
    let available = await Available.aggregate([
      {
        $match: {
          userId: user._id,
          date: {
            $gte: expenseDate.toDate(),
            $lte: moment(expenseDate).endOf("day").toDate(),
          },
        },
      },
    ]);
    available = await Available.findById(available[0]._id);
    available.amount += expense.amount;

    await available.save();

    session.commitTransaction();

    res.status(200).send({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    session.abortTransaction();
    res.status(500).send({
      message: "Something went wrong! Please try again later."
    });
  }

  session.endSession();
}
