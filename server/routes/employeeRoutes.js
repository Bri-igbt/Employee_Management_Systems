import { Router } from 'express'
import { createEmployees, deleteEmployees, getEmployees, updateEmployees } from '../controllers/employeesController.js';

const employeeRoutes = Router();

employeeRoutes.get("/", getEmployees);
employeeRoutes.post("/", createEmployees);
employeeRoutes.put("/:id", updateEmployees);
employeeRoutes.delete("/:id", deleteEmployees);