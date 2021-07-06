const mongoose = require("mongoose");

//Employee schema
const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  birth_date: {
    type: String,
    required: true,
  },
});

module.exports = new mongoose.model("Employee", EmployeeSchema);
