import User from "../models/User.js";
import logger from "../utils/logger.js";
import validateRegistration from "../utils/validation.js";
import generateTokens from "../utils/generateToken.js";

// User Registration
const registerUser = async (req, res) => {
  logger.info("Registration endpoint hit...",req.body);
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
    // return res.status(200).json({message: "Reactch"});
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

export { registerUser };
