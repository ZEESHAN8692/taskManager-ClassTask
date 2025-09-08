import express from 'express';
import adminController from '../controller/adminController.js';
import { authCheck } from '../middleware/authCheck.js';
const router = express.Router();


router.get("/dashboard", authCheck, adminController.dashboard)
// Create Project
router.post("/project/create", authCheck, adminController.createProject);
// Assign Project to User
router.post("/project/assign", authCheck, adminController.assignProject);

router.post("/project/status", authCheck, adminController.updateProjectStatus);

export default router;