const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    currency: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  },
);

const Setting = mongoose.model("Setting", settingSchema);
module.exports = Setting;
