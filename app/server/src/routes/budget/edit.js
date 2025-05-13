const Budget = require("@models/budget");
const { dateEquals } = require("@utils");

module.exports = async (req, res) => {
  const { userId, amount, startDate } = req.body;
  
  try {
    const budget = await Budget.findOne({
      userId,
      current: true,
    });
    if (!budget) {
      return res.status(404).send({
        message: "Budget not found!",
      });
    }
    if (budget.amount === amount && dateEquals(budget.startDate, startDate)) {
      return res.status(404).send({
        message: "Budget amount cannot be the same!",
      });
    }
    
    budget.current = false;
    await budget.save();

    const newBudget = new Budget({
      userId, amount, startDate,
    });
    await newBudget.save();

    res.status(200).send({
      message: "Budget edited successfully.",
      data: newBudget,
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong. Please try again later."
    });
  }
}
