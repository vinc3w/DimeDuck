const mongoose = require("mongoose");

const passwordResetTokenSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const PasswordResetToken = mongoose.model("PasswordResetToken", passwordResetTokenSchema);
module.exports = PasswordResetToken;
