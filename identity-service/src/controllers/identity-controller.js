import { log } from "winston";
import User from "../models/User.js";
import logger from "../utils/logger.js";
import validateRegistration from "../utils/validation.js";
import generateTokens from "../utils/generateToken.js";

// User Registration
const registerUser = async (req, res) => {
  try {
    // validate the schema
    const { error } = validateRegistration(req.body);
    if (error) {
      logger.error("Validation error", error.details[0].message);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    // check in database
    const { email, password, username } = req.body;
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      logger.info("User exists", user.email);
      return res.status(400).json({
        success: false,
        message: "User exists",
      });
    }
    user = new User({
      email,
      password,
      username,
    });
    await user.save();
    logger.info("User saved", user._id);

    // generating access and refresh token
    const { accessToken, refreshToken } = await generateTokens(user);
    logger.info("User created");
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    logger.error("Some internal error");
    return res.status(500).json({ success: false, message: error });
  }
};

export { registerUser };
