import User from "../models/User.js";
import logger from "../utils/logger.js";
import { validateRegistration, validateLogin } from "../utils/validation.js";
import generateTokens from "../utils/generateToken.js";
import RefreshToken from "../models/RefreshToken.js";

// User Registration
const registerUser = async (req, res) => {
  logger.info("Registration endpoint hit...");
  try {
    //validate the schema
    const { error } = validateRegistration(req.body);
    if (error) {
      logger.warn("Validation error", error.details[0].message);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const { email, password, username } = req.body;

    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      logger.warn("User already exists");
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    user = new User({ username, email, password });
    await user.save();
    logger.warn("User saved successfully", user._id);

    const { accessToken, refreshToken } = await generateTokens(user);

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      accessToken,
      refreshToken,
    });
  } catch (e) {
    logger.error("Registration error occured", e);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// User Login
const loginUser = async (req, res) => {
  logger.info("Login endpoint hit...", req.body);
  try {
    const { error } = validateLogin(req.body);
    if (error) {
      logger.warn("Validation error", error.details[0].message);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      logger.warn("Invalid user");
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // user valid password or not
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      logger.warn("Invalid password");
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const { accessToken, refreshToken } = await generateTokens(user);

    res.json({
      accessToken,
      refreshToken,
      userId: user._id,
    });
  } catch (error) {
    logger.error("Login error occured", e);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Refresh token
const refreshTokenForUser = async (req, res) => {
  logger.info("RefreshingTokenForUser endpoint hit...");
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      logger.warn("Invalid access token");
      res.status(400).json({
        success: false,
        message: "Invalid access token",
      });
    }
    const saveToken = await RefreshToken.findOne({ token: refreshToken });
    if (!saveToken || saveToken.expiresAt > new Date()) {
      logger.warn("Expired access token");
      res.status(401).json({
        success: false,
        message: "Expired access token",
      });
    }

    const user = await User.findOne(saveToken.user);
    if (!user) {
      logger.warn("User not found");
      res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const { refreshToken: newrefreshToken, accessToken: newaccessToken } =
      await generateTokens();
      
    // delete old token
    await RefreshToken.deleteOne({ _id: saveToken._id });
    res.status(201).json({
      success: true,
      message: "New Refresh token ",
      accessToken: newaccessToken,
      refreshToken: newrefreshToken,
    });
  } catch (error) {
    logger.error("Refreshing token error occured", e);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { registerUser, loginUser, refreshTokenForUser };
