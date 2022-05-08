import express from "express";
const router = express.Router();

import { loginUser, registerUser } from "../controllers/authController.js";
import { adminRoutes } from "../middleware/authMiddleware.js";
import adminProfile from "../controllers/adminController.js";

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
//Protected Routes:
router.route("/admin").get(adminRoutes, adminProfile);

export default router;
