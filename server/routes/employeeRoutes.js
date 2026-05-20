import { Router } from 'express'
import { createEmployees, deleteEmployees, getEmployees, updateEmployees } from '../controllers/employeesController.js';
import { protect, protectAdmin } from '../middleware/auth.js';

const employeeRoutes = Router();

employeeRoutes.get("/", protect, protectAdmin, getEmployees);
employeeRoutes.post("/", protect, protectAdmin, createEmployees);
employeeRoutes.put("/:id", protect, protectAdmin, updateEmployees);
employeeRoutes.delete("/:id", protect, protectAdmin, deleteEmployees);

export default employeeRoutes;