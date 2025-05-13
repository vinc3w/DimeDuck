const Expense = require("@models/expense");
const moment = require("moment");
const dateRange = require("../../utils/date-range");

module.exports = async (req, res) => {
  const user = res.locals.user;
  const { dateStart, dateEnd } = req.query;

  if (!dateStart || !dateEnd) {
    return res.status(400).send({
      message: "Date range must not be empty!",
    })
  }

  try {
    const expenses = await Expense.aggregate([
      {
        $match: {
          userId: user._id,
          date: {
            $gte: moment(new Date(dateStart)).startOf("day").toDate(),
            $lte: moment(new Date(dateEnd)).endOf("day").toDate(),
          },
        },
      },
    ]);
    const data = {};
    dateRange(dateStart, dateEnd).map(d => {
      data[d] = 0;
    });

    expenses.forEach(e => {
      data[moment(e.date).format("YYYY-MM-DD")] += e.amount;
    });

    res.status(200).send({
      data: data,
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong. Please try again later.",
    });
  }
};
