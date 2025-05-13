const moment = require("moment");
const mongoose = require("mongoose");

const authTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expiresAt: {
      type: Date,
      default: moment().add(1, "M"),
      expires: 10, // This document will be deleted after 1 month of creation
    }
  },
  {
    timestamps: true,
  },
);

const AuthToken = mongoose.model("AuthToken", authTokenSchema);
module.exports = AuthToken;
