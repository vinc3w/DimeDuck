const Category = require("@models/category");
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
    const categoryTotalAmountData = await Category.aggregate([
      {
        $match: {
          userId: user._id,
        },
      },
      {
        $lookup: {
          from: "expenses",
          localField: "_id",
          foreignField: "category",
          as: "expenses",
        }
      },
      {
        $unwind: {
          path: "$expenses",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          name: 1,
          expenses: {
            $cond: [
              {
                $and: [
                  { $gte: ["$expenses.date", moment(new Date(dateStart)).startOf("day").toDate()] },
                  { $lte: ["$expenses.date", moment(new Date(dateEnd)).endOf("day").toDate()] },
                ]
              },
              "$expenses",
              null,
            ]
          }
        }
      },
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          expenses: { $push: "$expenses" },
        },
      },
      {
        $project: {
          _id: 0,
          name: 1,
          totalExpenses: { $sum: "$expenses.amount" }
        }
      },
    ]);

    res.status(200).send({
      data: categoryTotalAmountData,
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong. Please try again later.",
    });
  }
};
