import RefreshToken from "../models/RefreshToken.js";
import User from "../models/User.js";
import generateTokens from "../utils/generateToken.js";
import logger from "../utils/logger.js";
import { publishMessage } from "../utils/rabbitmq.js";
import { validateLogin, validateRegistration } from "../utils/validation.js";
import { storeOTP, verifyOTP } from "../utils/verifyOTP.js";

// **User Registration - Request OTP**
export const registerUser = async (req, res) => {
  logger.info("Registering user...");
  try {
    const { error } = validateRegistration(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { email, username, password } = req.body;
    let userExists = await User.findOne({ $or: [{ email }, { username }] });

    if (userExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const requestId = Date.now().toString();
    await publishMessage("otp_request", { email, requestId });
    storeOTP(requestId, password, username, email); // Store data until OTP verification

    res.json({ success: true, message: "OTP request sent", requestId });
  } catch (e) {
    logger.error("Registration error:", e);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// **Verify OTP & Create User**
export const verifyOTPRequest = async (req, res) => {
  const { requestId, otp } = req.body;
  const storedData = verifyOTP(requestId, otp);

  if (!storedData) {
    return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
  }

  const { email, username, password } = storedData;
  let user = new User({ username, email, password });
  await user.save();
  
  logger.info(`User registered successfully: ${user._id}`);
  const { accessToken, refreshToken } = await generateTokens(user);

  res.status(201).json({ success: true, message: "User registered successfully", accessToken, refreshToken });
};

// **User Login**
export const loginUser = async (req, res) => {
  logger.info("User login...");
  try {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = await generateTokens(user);
    res.json({ success: true, accessToken, refreshToken, userId: user._id });
  } catch (e) {
    logger.error("Login error:", e);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// **Forgot Password (Request OTP)**
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ success: false, message: "Email not found" });
  }

  const requestId = Date.now().toString();
  await publishMessage("otp_request", { email, requestId });
  storeOTP(requestId, null, null, email); 

  res.json({ success: true, message: "OTP sent for password reset", requestId });
};

// **Reset Password**
export const resetPassword = async (req, res) => {
  const { requestId, otp, newPassword } = req.body;
  const storedData = verifyOTP(requestId, otp);

  if (!storedData) {
    return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
  }

  const user = await User.findOne({ email: storedData.email });
  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }

  user.password = newPassword;
  await user.save();

  res.json({ success: true, message: "Password reset successfully" });
};

// **User Update**
export const updateUser = async (req, res) => {
  const { userId, username, email } = req.body;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  if (username) user.username = username;
  if (email) user.email = email;
  await user.save();

  res.json({ success: true, message: "User updated successfully" });
};

// **Refresh Token**
export const refreshTokenForUser = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ success: false, message: "Invalid access token" });

  const saveToken = await RefreshToken.findOne({ token: refreshToken });
  if (!saveToken || saveToken.expiresAt < new Date()) {
    return res.status(401).json({ success: false, message: "Expired access token" });
  }

  const user = await User.findById(saveToken.user);
  if (!user) return res.status(401).json({ success: false, message: "User not found" });

  const { refreshToken: newRefreshToken, accessToken: newAccessToken } = await generateTokens(user);
  await RefreshToken.deleteOne({ _id: saveToken._id });

  res.json({ success: true, accessToken: newAccessToken, refreshToken: newRefreshToken });
};
