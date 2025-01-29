import logger from "../utils/logger.js";

const authenticateRequest = (req, res, next) => {
  try {
    const userId = req.headers["x-user-id"];
    if (!userId) {
      logger.warn("Authentication required");
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }
    req.user = { userId };
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Authentication required error",
    });
  }
};

export default  authenticateRequest;