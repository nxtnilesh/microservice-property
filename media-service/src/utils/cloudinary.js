import  {v2 as cloudinary}  from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
import logger from "./logger.js";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadMediaStream = (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          logger.error("Error while uploading media to Cloudinary", error);
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
    uploadStream.end(file.buffer);
  });
};

const deleteMediaFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    logger.info("Media deleted");
    return result;
  } catch (error) {
    logger.error("Error while deleting from cloudinary", error);
    throw error;
  }
};

const uploadOnCloudinary = async (localFilePath) => {
  try {
      if (!localFilePath) return null
      const response = await cloudinary.uploader.upload(localFilePath, {
          resource_type: "auto"
      })
      console.log("file is uploaded on cloudinary ", response.url);
      fs.unlinkSync(localFilePath)
      return response;

  } catch (error) {
      fs.unlinkSync(localFilePath)
      return null;
  }
}
export {uploadOnCloudinary,  uploadMediaStream, deleteMediaFromCloudinary };
