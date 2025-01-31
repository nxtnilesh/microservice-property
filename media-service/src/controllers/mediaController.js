import logger from "../utils/logger";
import { uploadMediaStream } from "../utils/cloudinary.js";

// const uploadMedia = async (req, res) => {
//   logger.info("UploadMedia endpoint hit ..");
//   try {
//     if (!req.file) {
//       logger.info("Please upload file");
//       return res.status(400).json({
//         success: false,
//         message: "Please upload file",
//       });
//     }
//     const { originalName, mimeType, buffer } = req.file;
//     const userId = req.user.userId;
//     logger.info(`File detail : ${originalName} starting upload...`);

//     const cloudinaryResult = await uploadMediaStream(req.file);
//     logger.info("Uploaded media url", cloudinaryResult.public_id);
//   } catch (error) {}
// };

