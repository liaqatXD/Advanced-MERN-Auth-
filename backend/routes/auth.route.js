import express from "express";
import { signup, login, logout, verifyEmail, forgotPassword } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup", signup);

router.post("/verify-email", verifyEmail)

router.post("/login", login);

router.post("/forgot-password", forgotPassword)

router.post("/logout", logout);



export default router;


