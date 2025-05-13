const emailValidator = require("email-validator");
const User = require("@models/user");
const Setting = require("@models/setting");
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
  const { username, email, password, confirmPassword, currency } = req.body;
  
  try {
    if (!username) {
      return res.status(400).send({
        message: "Username must not be empty!",
      });
    }
    if (username.length < 5 || username.length > 20) {
      return res.status(400).send({
        message: "Username must be between 5 and 20 characters long!",
      });
    }

    if (!email) {
      return res.status(400).send({
        message: "Email must not be empty!",
      });
    }
    if (!emailValidator.validate(email)) {
      return res.status(400).send({
        message: "Invalid email format!",
      });
    }
    const userWithThisEmail = await User.findOne({ email }).exec();
    if (userWithThisEmail) {
      return res.status(400).send({
        message: "User with this email already exists",
      });
    }

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

    if (!currency) {
      return res.status(400).send({
        message: "Currency must not be empty!",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = new User({
      username, email,
      password: hashedPassword,
    });
    const setting = new Setting({
      userId: user._id,
      currency: currency,
    })

    await user.save();
    await setting.save();
    res.status(200).send({ message: "User registered." });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong! Please try again later."
    });
  }
}
