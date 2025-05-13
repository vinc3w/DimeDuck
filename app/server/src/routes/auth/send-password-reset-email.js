const PasswordResetToken = require("@models/password-reset-token");
const sendPasswordResetEmail = require("@utils/send-password-reset-email");

module.exports = async (req, res) => {
  const { email } = req.body;

  try {
    const token = new PasswordResetToken({ email });
    await token.save();
    
    sendPasswordResetEmail(email, token._id);
    
    res.status(200).send({ message: "Email sent." });
  } catch (error) {
    res.status(500).send({
      message: "Something went wrong! Please try again later."
    });
  }
}
