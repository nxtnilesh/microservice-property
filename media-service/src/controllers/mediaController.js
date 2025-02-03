import {  uploadOnCloudinary } from "../utils/cloudinary.js";
import logger from "../utils/logger.js";
import fs from "fs";
// import { uploadMediaStream } from "../utils/cloudinary.js";

const uploadMedia = async (req, res) => {
  logger.info("UploadMedia endpoint hit ..");
  try {
    console.log("Media", req.files);
    // setTimeout(() => {
    //   console.log("Time out");

    //   for (const file of req.files) {
    //     fs.unlinkSync(file?.path);
    //   }
    // }, 1000);

    const result = await uploadOnCloudinary(req.files[0]);
    console.log("Result", result);

    return res.json({ upload: "Upload" });
  } catch (error) {
    logger.error(error);
  }
};

export { uploadMedia };
