const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const Population = new Schema(
  {
    month: {
      type: String,
      required: true,
    },
    deaths: {
      type: Number,
      required: true,
    },
    births: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Population", Population);
