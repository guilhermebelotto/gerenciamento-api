const express = require("express");
const router = express.Router();
const { Employee, validateEmployee } = require("../models/employees");

//POST: Cria employee
router.post("/employees/", async (req, res) => {
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

//Get todos os employees
router.get("/employees/", (req, res) => {
  Employee.find()
    .then((employees) => res.send(employees))
    .catch((error) => {
      res.status(500).send("Algo deu errado");
    });
});

//Get employee por Id
router.get("/employees/:employeeId", async (req, res) => {
  const employee = await Employee.findById(req.params.employeeId);
  if (!employee) res.status(404).send("Employee not found");
  res.send(employee);
});

//Relatório de Salários
router.get("/reports/employees/salary", async (req, res) => {
  const max = await Employee.findOne().sort({ salary: -1 });
  const min = await Employee.findOne().sort({ salary: 1 });
  const avg = await Employee.aggregate([
    { $group: { _id: null, salary: { $avg: "$salary" } } },
  ]);

  if (!max) res.status(404).send("Employee not found");
  if (!min) res.status(404).send("Employee not found");

  res.send({ highest: max, lowest: min, average: avg[0].salary });
});

//Relatório por Idade
router.get("/reports/employees/age", async (req, res) => {
  const max = await Employee.findOne().sort({ birth_date: -1 });
  const min = await Employee.findOne().sort({ birth_date: 1 });
  const avg = await Employee.aggregate([
    {
      $group: {
        _id: "$gender",
        average: {
          $avg: {
            $subtract: [{ $year: new Date() }, { $year: "$birth_date" }],
          },
        },
      },
    },
  ]);

  if (!max) res.status(404).send("Employee not found");
  if (!min) res.status(404).send("Employee not found");

  res.send({ younger: max, older: min, average: avg[0].average });
});

//Update por ID
router.put("/employees/:employeeId", async (req, res) => {
  const updatedEmployee = await Employee.findByIdAndUpdate(
    req.params.employeeId,
    {
      name: req.body.employeeName,
      email: req.body.employeeEmail,
      department: req.body.employeeDepartment,
      salary: req.body.employeeSalary,
      birth_date: req.body.employeeBirth_date,
    },
    { new: true }
  );
  if (!updatedEmployee) res.status(404).send("Employee not found");
  res.send(updatedEmployee);
});

//Delete por Id
router.delete("/employees/:employeeId", async (req, res) => {
  const employee = await Employee.findByIdAndDelete(req.params.employeeId);
  if (!employee) res.status(404).send("Employee not found");
  res.send(employee);
});

module.exports = router;
