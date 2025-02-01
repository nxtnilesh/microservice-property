import express from "express";
import {
  forgotPassword,
  loginUser,
  refreshTokenForUser,
  registerUser,
  resetPassword,
  updateUser,
  verifyOTPRequest,
} from "../controllers/identity-controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify-otp", verifyOTPRequest);
router.post("/login", loginUser);
router.post("/refresh-token", refreshTokenForUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.put("/update-user", updateUser);
export default router;
