// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const ColorSchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Colors", ColorSchema);