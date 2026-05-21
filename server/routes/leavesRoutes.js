import { Router } from 'express'
import { protect, protectAdmin } from '../middleware/auth.js';
import { createLeaves, getLeaves, updateLeavesStatus } from '../controllers/leaveController.js';

const leaveRoutes = Router();

leaveRoutes.post("/", protect, createLeaves);
leaveRoutes.get("/", protect, getLeaves);
leaveRoutes.patch("/:id", protect, protectAdmin, updateLeavesStatus);

export default leaveRoutes;