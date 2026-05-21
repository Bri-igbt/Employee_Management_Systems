import { Router } from 'express'
import { protect, protectAdmin } from '../middleware/auth.js';
import { createPayslip, getPayslip, getPayslipById } from '../controllers/payslipController.js';

const payslipRoutes = Router();

payslipRoutes.post("/", protect, protectAdmin, createPayslip);
payslipRoutes.get("/", protect, getPayslip);
payslipRoutes.get("/:id", protect, getPayslipById);

export default payslipRoutes;