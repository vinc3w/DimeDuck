const User = require("@models/user");
const PasswordResetToken = require("@models/password-reset-token");
const db = require("@config/db");
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
  const { token, password, confirmPassword } = req.body;
  const session = await db.connection.startSession();

  if (!password) {
    return res.status(400).send({
      message: "Password must not be empty!",
    });
  }
  if (password.length < 8) {
    return res.status(400).send({
      message: "Password must be at least 8 characters long!",
    });
  }
  if (password.length > 50) {
    return res.status(400).send({
      message: "Password must be at most 50 characters long!",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).send({
      message: "Passwords does not match!",
    });
  }

  try {
    session.startTransaction();

    const passwordResetToken = await PasswordResetToken.findByIdAndDelete(token);
    if (!passwordResetToken) {
      session.abortTransaction();
      return res.status(404).send({
        message: "Token invalid!",
      });
    }

    const user = await User.findOne({
      email: passwordResetToken.email,
    });
    if (!user) {
      session.abortTransaction();
      return res.status(404).send({
        message: "User not found!",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    user.password = hashedPassword;
    await user.save();

    session.commitTransaction();

    res.status(200).send({ message: "Password updated successfully." });
  } catch (error) {
    session.abortTransaction();
    res.status(500).send({
      message: "Something went wrong! Please try again later."
    });
  }
}
