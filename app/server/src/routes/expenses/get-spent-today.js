const Expense = require("@models/expense");
const moment = require("moment");

module.exports = async (req, res) => {
  const user = res.locals.user;
  const today = moment().startOf("day");
  
  try {
    const response = await Expense.aggregate([
      {
        $match: {
          userId: user._id,
          date: {
            $gte: today.toDate(),
            $lte: moment(today).endOf("day").toDate(),
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);

    let data = response[0] || {
      totalAmount: 0,
    };

    res.status(200).send({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong! Please try again later."
    });
  }
}
