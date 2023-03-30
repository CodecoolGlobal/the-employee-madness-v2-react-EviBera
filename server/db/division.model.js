const mongoose = require("mongoose");

const { Schema } = mongoose;

//The division has a name, a boss, and a budget and a location. 
//The location has a city and a country. The boss field has to point to an employee.

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

const DivisionSchema = new Schema({
    name: String,
    boss: EmployeeSchema,
    budget: Number,
    location: {
        city: String,
        country: String,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Division", DivisionSchema);