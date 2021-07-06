const express = require("express");
const router = express.Router();
const { Employee, validateEmployee } = require("../models/employees");

//POST: Cria employee
router.post("/", async (req, res) => {
  const error = await validateEmployee(req.body);
  if (error.message) res.status(400).send(error.message);
  employee = new Employee({
    name: req.body.employeeName,
    email: req.body.employeeEmail,
    department: req.body.employeeDepartment,
    salary: req.body.employeeSalary,
    birth_date: req.body.employeeBirth_date,
  });

  employee
    .save()
    .then((employee) => {
      res.send(employee);
    })
    .catch((error) => {
      res.status(500).send("Employee not stored in db");
    });
});

module.exports = router;
