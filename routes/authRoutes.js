import express from "express";
import { signup, login, logout, validateSignup, validateLogin } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", validateSignup, signup);
router.post("/login", validateLogin, login);
router.post("/logout", logout);

export default router;
