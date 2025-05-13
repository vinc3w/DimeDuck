const Expense = require("@models/expense");
const moment = require("moment");

module.exports = async (req, res) => {
  const user = res.locals.user;
  const { dateStart, dateEnd } = req.query;

  if (!dateStart || !dateEnd) {
    return res.status(400).send({
      message: "Date range must not be empty!",
    })
  }

  try {
    let total = await Expense.aggregate([
      {
        $match: {
          userId: user._id,
          date: {
            $gte: moment(new Date(dateStart)).startOf("day").toDate(),
            $lte: moment(new Date(dateEnd)).endOf("day").toDate(),
          },
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 }
        }
      },
    ]);
    total = total[0]?.count || 0;

    res.status(200).send({ total });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong. Please try again later.",
    });
  }
};
