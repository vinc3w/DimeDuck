const Setting = require("@models/setting");

module.exports = async (req, res) => {
  const user = res.locals.user;
  
  try {
    const settings = await Setting.findOne({ userId: user._id });
    if (settings) {
      res.status(200).send({
        settings,
      });
    } else {
      res.status(404).send({
        message: "Settings not found!",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong. Please try again later."
    });
  }
}
