import Property from "../models/Property.js";
import logger from "../utils/logger.js";

const createProperty = async (req, res) => {
  logger.info("Creating post endpoint hit...");
  try {
    const { title, mediaIds } = req.body;
    const newProperty = new Property({
      user: req.user.userId,
      title,
      mediaIds: mediaIds || [],
    });
    await newProperty.save();
    res.status(201).json({
      success: true,
      message: "Property created sucessfully",
    });
  } catch (error) {
    logger.error("Error while creating property", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { createProperty };
