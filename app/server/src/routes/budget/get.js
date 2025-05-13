const Budget = require("@models/budget");

module.exports = async (req, res) => {
  const user = res.locals.user;
  
  try {
    const budget = await Budget.findOne({
      userId: user._id,
      current: true,
    });
    if (budget) {
      res.status(200).send({
        data: budget,
      });
    } else {
      res.status(404).send({
        message: "Budget not found!",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong. Please try again later."
    });
  }
}
