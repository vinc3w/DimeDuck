const emailValidator = require("email-validator");
const User = require("@models/user");
const AuthToken = require("@models/auth-token");
const bcrypt = require("bcryptjs");

module.exports = async (req, res) => {
  const { email, password } = req.body;
  
  try {
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
    
    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).send({
        message: "Email or password is incorrect!",
      });
    }

    const authToken = new AuthToken({
      userId: user._id,
    });
    await authToken.save();
    res.status(200).send({
      message: "Logged in successfully!",
      token: authToken._id,
    });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong! Please try again later."
    });
  }
}
