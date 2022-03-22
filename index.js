// 1. Employee database
//    a. full_name
//    b. occupation
//    c. gender
//    d. id
// 2. Route untuk get semua employee
// 3. Route untuk get employee by ID
// 4. Route untuk tambah employee
// 5. Route untuk edit employee
// 6. Route untuk delete employee

const express = require("express");
const app = express();

const { nanoid } = require("nanoid");

const PORT = 2000;

app.use(express.json());

const employee = [
  {
    name: "seto",
    occupation: "kang judi",
    gender: "male",
    id: 1,
  },
  {
    name: "mark",
    occupation: "kang bengkel",
    gender: "male",
    id: 2,
  },

  {
    name: "bill",
    occupation: "kang buah",
    gender: "male",
    id: 3,
  },
  {
    name: "steve",
    occupation: "kang parkir",
    gender: "male",
    id: 4,
  },
];

app.get("/employee", (req, res) => {
  res.status(200).json({
    message: "fetch success",
    result: employee,
  });
});

app.get("/employee/:id", (req, res) => {
  const employeeId = req.params.id;

  const findEmployee = employee.find((val) => {
    return val.id == employeeId;
  });

  if (!findEmployee) {
    res.status(404).json({
      message: "employee not found",
    });
    return;
  }

  res.status(200).json({
    message: "fetch success",
    result: findEmployee,
  });
});

app.post("/employee", (req, res) => {
  const data = {
    ...req.body,
    id: nanoid(),
  };
  if (!data.name || !data.occupation || !data.gender) {
    res.status(400).json({
      message: "employee data is required",
    });
    return;
  }
  employee.push(data);
  res.status(201).json({
    message: "added employee",
    result: data,
  });
});

app.patch("/employee/:id", (req, res) => {
  const editEmployeeData = req.body;
  const employeeID = req.params.id;

  const findEmployee = employee.findIndex((val) => {
    return val.id == employeeID;
  });

  if (findEmployee == -1) {
    res.status(404).send("employee not found");
  }

  employee[findEmployee] = {
    ...employee[findEmployee],
    ...editEmployeeData,
  };

  res.status(201).json({
    message: `employee with id: ${employeeID} have beed edited`,
    result: employee[findEmployee],
  });
});

app.delete("/employee/:id", (req, res) => {
  const employeeID = req.params.id;

  const findEmployee = employee.findIndex((val) => {
    return val.id == employeeID;
  });

  if (findEmployee == -1) {
    res.status(404).send("users not found");
  }

  employee.splice(findEmployee, 1);

  res.status(200).json({
    message: "User deleted",
  });
});

app.listen(PORT, () => {
  console.log("server running in port", PORT);
});
