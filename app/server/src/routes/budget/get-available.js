const Budget = require("@models/budget");
const moment = require("moment");
const Available = require("@models/available");
const { dateDayDiff, dateEquals } = require("@utils");

module.exports = async (req, res) => {
  const user = res.locals.user;
  const today = moment().startOf("day");
  
  try {
    const budget = await Budget.findOne({
      userId: user._id,
      current: true,
    });
    if (!budget) {
      return res.status(404).send({
        message: "Budget not found!",
      });
    }
    let available = await Available.aggregate([
      {
        $match: {
          userId: user._id,
          date: {
            $gte: moment(budget.startDate).startOf("day").toDate(),
            $lte: moment(today).endOf("day").toDate(),
          },
        },
      },
    ]);
    const dateDiff = dateDayDiff(today, budget.startDate) + 1;
    let total = 0;
    [
      ...available,
      ...new Array(dateDiff - available.length).fill({ amount: budget.amount })
    ].forEach(a => {
      if (a.amount < 0 && !dateEquals(a.date, moment())) {
        return;
      }
      total += a.amount;
    });

    res.status(200).send({
      data: total,
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong. Please try again later."
    });
  }
}
