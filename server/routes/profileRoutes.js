import { Router } from 'express'
import { getProfile, updateProfile } from '../controllers/profileController.js';
import { protect } from '../middleware/auth.js';

const profileRoutes = Router();

profileRoutes.get("/", protect, getProfile);
profileRoutes.post("/", protect, updateProfile);

export default profileRoutes;