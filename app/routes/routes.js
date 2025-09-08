import express from 'express';
import userController from '../controller/userController.js';
import { authCheck } from '../middleware/authCheck.js';
const router = express.Router();

router.get('/',(req, res) => {
  res.render('user/index');
});
// router.get("/dashboard", authCheck, userController.dashboard );

router.get("/login",userController.loginGet  )
router.get("/user-register",userController.registerUserGet )
router.get("/admin-register",userController.registerAdminGet )
router.get("/dashboard",authCheck, userController.userDashboard )
router.get("/logout",userController.logout)

router.post("/register-user",userController.registerUser)
router.post("/register-admin",userController.registerAdmin)
router.post("/login",userController.login)
export default router;