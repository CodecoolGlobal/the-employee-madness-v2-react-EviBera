const mongoose = require("mongoose");

const { Schema } = mongoose;

//The division has a name, a boss, and a budget and a location. 
//The location has a city and a country. The boss field has to point to an employee.

const DivisionSchema = new Schema({
    name: String,
    boss: { 
        type: Schema.Types.ObjectId, 
        ref: 'Employee' },
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