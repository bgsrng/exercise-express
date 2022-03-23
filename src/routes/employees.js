const express = require("express");
const router = express.Router();

const { employeeControllers } = require("../controllers");

router.get("/", employeeControllers.getAllEmployees);
router.get("/:id", employeeControllers.getEmployeeById);
router.post("/", employeeControllers.createNewEmployee);
router.patch("/:id", employeeControllers.editEmployeeById);
router.delete("/:id", employeeControllers.deleteEmployeeById);
router.delete("/", employeeControllers.deleteEmployees);
router.patch("/", employeeControllers.editEmployees);

module.exports = router;
