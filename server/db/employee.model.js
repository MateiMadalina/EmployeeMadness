// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  present:Boolean,
  equipment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Equipments"
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brands"
  },
  color: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Colors"
  },
  salary: Number,
  readBooks:[{name:String,author:String}],
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
