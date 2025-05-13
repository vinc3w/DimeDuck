const Category = require("@models/category");

module.exports = async (req, res) => {
  const user = res.locals.user;
  const { name, page, rowsPerPage, sortBy, order } = req.query;

  const filters = { userId: user._id };
  if (name) {
    filters.name = { $regex: `.*${name}.*` };
  }

  try {
    const expenses = await Category.find(filters)
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip(rowsPerPage * page)
      .limit(rowsPerPage);
    const total = await Category.countDocuments(filters);

    res.status(200).send({
      data: expenses,
      total,
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong. Please try again later."
    });
  }
}
