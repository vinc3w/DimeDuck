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
    const data = await Expense.aggregate([
      {
        $match: {
          userId: user._id,
          date: {
            $gte: moment(new Date(dateStart)).startOf("day").toDate(),
            $lte: moment(new Date(dateEnd)).endOf("day").toDate(),
          },
        },
      },
      { $sort: { amount: 1 } }, // TODO: check correctness
      { $limit: 5 },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category"
        }
      },
      { $unwind: "$category" },
    ]);

    res.status(200).send({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong! Please try again later."
    });
  }
}
