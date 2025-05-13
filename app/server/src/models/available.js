const moment = require("moment");
const mongoose = require("mongoose");

const availableSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: moment(),
    },
  },
  {
    timestamps: true,
  },
);

const Available = mongoose.model("Available", availableSchema);
module.exports = Available;