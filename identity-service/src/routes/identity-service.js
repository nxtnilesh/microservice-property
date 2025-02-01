import express from "express";
import { loginUser, registerUser, requestOTP, verifyOTPRequest } from "../controllers/identity-controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post('/register-otp', requestOTP);
router.post('/verify-otp', verifyOTPRequest);

export default router;
