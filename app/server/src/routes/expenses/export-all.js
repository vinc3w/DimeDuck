const Expense = require("@models/expense");
const moment = require("moment");
const { json2csv } = require("json-2-csv");

module.exports = async (req, res) => {
  const user = res.locals.user;

  try {
    const expenses = await Expense.find(
      { userId: user._id },
      "-_id name amount category date note"
    ).populate("category", "-_id name");
    const mappedExpenses = expenses.map(({ name, amount, category, date, note }, i) => {
      return {
        no: i + 1,
        name,
        amount,
        category: category.name || "",
        date: moment(date).format("DD/MM/YYYY"),
        note
      };
    });

    const csvContent = json2csv(mappedExpenses);
    
    res.status(200).send(csvContent);
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong! Please try again later."
    });
  }
}
