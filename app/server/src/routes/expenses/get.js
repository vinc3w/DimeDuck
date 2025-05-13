const Expense = require("@models/expense");
const moment = require("moment");

module.exports = async (req, res) => {
  const user = res.locals.user;
  const {
    name,
    minAmount,
    maxAmount,
    categories,
    dateStart,
    dateEnd,
    page,
    rowsPerPage,
    sortBy,
    order,
  } = req.query;

  const filters = { userId: user._id };
  if (name) {
    filters.name = { $regex: `.*${name}.*` };
  }
  if (minAmount === 0 || minAmount) {
    filters.amount = { ...filters.amount, $gte: minAmount };
  }
  if (maxAmount === 0 || maxAmount) {
    filters.amount = { ...filters.amount, $lte: maxAmount };
  }
  if (categories) {
    filters.$or = [
      ...filters.$or,
      ...categories.split(",").map((c) => ({ category: c })),
    ];
  }
  if (dateStart !== "null" && dateStart) {
    filters.date = { ...filters.date, $gte: dateStart };
  }
  if (dateEnd !== "null" && dateEnd) {
    filters.date = {
      ...filters.date,
      $lte: moment(new Date(dateEnd)).add(1, "d").toLocaleString(),
    };
  }

  try {
    const expenses = await Expense.find(filters)
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip(rowsPerPage * page)
      .limit(rowsPerPage)
      .populate("category");
    const total = await Expense.countDocuments(filters);

    res.status(200).send({
      data: expenses,
      total,
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong. Please try again later.",
    });
  }
};
