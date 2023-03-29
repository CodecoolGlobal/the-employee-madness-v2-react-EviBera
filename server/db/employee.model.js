// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  startingDate: {
    type: Date,
    default: Date.now,
  },
  currentSalary: Number,
  desiredSalary: Number,
  favColor: {
    type: String,
    default: "white"
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
