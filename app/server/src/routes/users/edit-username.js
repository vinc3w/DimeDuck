const User = require("@models/user");

module.exports = async (req, res) => {
  const { newUsername } = req.body;

  try {
    if (!newUsername) {
      return res.status(400).send({
        message: "Username must not be empty!",
      });
    }
    if (newUsername.length < 5 || newUsername.length > 20) {
      return res.status(400).send({
        message: "Username must be between 5 and 20 characters long!",
      });
    }

    res.locals.user.username = newUsername;
    await res.locals.user.save();

    res.status(200).send({
      message: "Username updated successfully.",
      username: res.locals.user.username,
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong! Please try again later."
    });
  }
}
