const AuthToken = require("@models/auth-token");

module.exports = async (req, res) => {
  const { token } = req.body;

  try {
    const authToken = await AuthToken.findById(token);
    if (!authToken) {
      res.status(404).send({
        message: "Token not found!",
      });
    }
    await AuthToken.findByIdAndDelete(token);
    res.status(200).send({ message: "Logged out successfully." });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong! Please try again later."
    });
  }
}
