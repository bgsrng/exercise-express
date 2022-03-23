const { employeeDB } = require("../database");

const employeeControllers = {
  getAllEmployees: (req, res) => {
    if (!employeeDB.length) {
      res.status(404).json({
        message: "No employees found",
      });
      return;
    }

    res.status(200).json({
      message: "Get employees",
      result: employeeDB,
    });
  },
  getEmployeeById: (req, res) => {
    const employeeId = req.params.id;

    const findIndex = employeeDB.findIndex((val) => {
      return val.id == employeeId;
    });

    if (findIndex == -1) {
      res.status(404).json({
        message: "Employee not found",
      });
      return;
    }

    const foundEmployee = employeeDB[findIndex];

    res.status(200).json({
      message: "Employee found",
      result: foundEmployee,
    });
  },
  createNewEmployee: (req, res) => {
    const newEmployeeData = req.body;

    if (!newEmployeeData) {
      res.status(400).json({
        message: "Employee data is required",
      });
      return;
    }

    if (!newEmployeeData.full_name) {
      res.status(400).json({
        message: "Employee full name is required",
      });
      return;
    }

    if (!newEmployeeData.occupation) {
      res.status(400).json({
        message: "Employee occupation is required",
      });
      return;
    }

    if (!newEmployeeData.gender) {
      res.status(400).json({
        message: "Employee gender is required",
      });
      return;
    }

    newEmployeeData.id = nanoid();

    employeeDB.push(newEmployeeData);

    res.status(201).json({
      message: "Created employee",
      result: newEmployeeData,
    });
  },
  editEmployeeById: (req, res) => {
    const employeeId = req.params.id;
    const editEmployeeData = req.body;

    const findIndex = employeeDB.findIndex((val) => {
      return val.id == employeeId;
    });

    if (findIndex == -1) {
      res.status(404).json({
        message: "Employee not found",
      });
      return;
    }

    employeeDB[findIndex] = {
      ...employeeDB[findIndex],
      ...editEmployeeData,
    };

    res.status(200).json({
      message: "Edited employee",
      result: employeeDB[findIndex],
    });
  },
  deleteEmployeeById: (req, res) => {
    const employeeId = req.params.id;

    const findIndex = employeeDB.findIndex((val) => {
      return val.id == employeeId;
    });

    if (findIndex == -1) {
      res.status(404).json({
        message: "Employee not found",
      });
      return;
    }

    employeeDB.splice(findIndex, 1);

    res.status(200).json({
      message: "Deleted employee",
    });
  },

  deleteEmployeeMoreThanOneId: (req, res) => {
    const employeesId = req.query.id;

    console.log(employeesId);

    for (let i = 0; i < employeesId.length; i++) {
      const findIdx = employeeDB.findIndex((val) => {
        return val.id == employeesId[i];
      });

      if (findIdx == -1) {
        res.status(404).json({
          message: "Employee not found",
        });
        return;
      }
      employeeDB.splice(findIdx, 1);
    }

    res.status(200).json({
      message: "Deleted employee",
    });
  },

  editEmployees: (req, res) => {
    const employeesId = req.query.id;
    const data = req.body;
    const arr = employeesId.split(",");

    for (let i = 0; i < arr.length; i++) {
      const findIndex = employeeDB.findIndex((val) => {
        return val.id == arr[i];
      });

      if (findIndex == -1) {
        res.status(404).json({
          message: "Employee not found",
        });
        return;
      } else if (data.length == 1) {
        employeeDB[findIndex] = {
          ...employeeDB[findIndex],
          ...data[i],
        };
        return;
      } else {
        employeeDB[findIndex] = {
          ...employeeDB[findIndex],
          ...data,
        };
      }

      res.status(200).json({
        message: "sukses",
      });
    }
  },
};

module.exports = employeeControllers;
