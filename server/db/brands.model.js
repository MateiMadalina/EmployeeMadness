// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const BrandSchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Brands", BrandSchema);