import dotenv from "dotenv";

dotenv.config();

import express from "express";
const router = express.Router();
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import requireLogin from "../middleware/requireLogin.js";
import { signupController, loginController } from "../controllers/authController.js";

router.post("/signup", signupController);

router.post("/signin", loginController);

export default router;