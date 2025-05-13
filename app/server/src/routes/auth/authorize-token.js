const User = require("@models/user");
const AuthToken = require("@models/auth-token");
const Setting = require("@models/setting");

module.exports = async (req, res) => {
  const { token } = req.body;

  try {
    const authToken = await AuthToken.findById(token);
    if (authToken) {
      const user = await User.findById(authToken.userId, "username email pfp createdAt updatedAt");
      if (!user) {
        return res.status(404).send({
          message: "User not found!",
        });
      }
      const settings = await Setting.findOne({ userId: authToken.userId });
      if (!settings) {
        return res.status(404).send({
          message: "Settings not found!",
        });
      }
      res.status(200).send({
        message: "Token authorized.",
        authorized: true,
        user,
        settings,
      });
    } else {
      return res.status(404).send({
        message: "Token not found!",
        authorized: false,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong! Please try again later."
    });
  }
}
