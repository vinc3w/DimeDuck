const Setting = require("@models/setting");

module.exports = async (req, res) => {
  const { userId, currency } = req.body;
  
  try {
    const settings = await Setting.findOne({ userId });
    if (!settings) {
      return res.status(400).send({
        message: "Settings not found!",
      });
    }

    settings.currency = currency;

    await settings.save();

    res.status(200).send({
      message: "Currency edited successfully",
      currency: settings.currency,
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong! Please try again later."
    });
  }
}
