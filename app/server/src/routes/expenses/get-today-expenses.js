const Expense = require("@models/expense");
const moment = require("moment");

module.exports = async (req, res) => {
  const user = res.locals.user;
  const today = moment().startOf("day");
  
  try {
    const data = await Expense.aggregate([
      {
        $match: {
          userId: user._id,
          date: {
            $gte: today.toDate(),
            $lte: moment(today).endOf("day").toDate(),
          },
        },
      },
      { $limit: 5 },
    ]);
    await Expense.populate(data, { path: "category" })

    res.status(200).send({
      data,
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong! Please try again later."
    });
  }
}
