const Budget = require("@models/budget");

module.exports = async (req, res) => {
  const { userId, amount, startDate } = req.body;
  
  try {
    const hasExisitingBudget = await Budget.findOne({ userId });
    if (hasExisitingBudget) {
      res.status(403).send({
        message: "User already has an exisiting budget.",
      });
      return;
    }

    const budget = new Budget({
      userId, amount, startDate,
    });
    await budget.save();

    res.status(200).send({
      message: "Budget created",
      data: budget,
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong. Please try again later."
    });
  }
}
