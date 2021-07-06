const mongoose = require("mongoose");
const yup = require("yup");

//Employee schema
const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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

const validateEmployee = (employee) => {
  const schema = yup.object().shape({
    employeeName: yup.string().required(),
    employeeEmail: yup.string().required(),
    employeeDepartment: yup.string().required(),
    employeeSalary: yup.number().required(),
    employeeBirth_date: yup.string().required(),
  });
  return schema
    .validate(employee)
    .then((employee) => employee)
    .catch((error) => {
      return {
        message: error.message,
      };
    });
};

exports.Employee = new mongoose.model("Employee", EmployeeSchema);
exports.validateEmployee = validateEmployee;
