// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  startingDate: {
    type: String,
    default: "01/01/1001",
  },
  currentSalary: Number,
  desiredSalary: Number,
  favColor: {
    type: String,
    default: "white"
  },
  division: {
    type: Schema.Types.ObjectId, 
    ref: 'Division'
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema, "employees");
