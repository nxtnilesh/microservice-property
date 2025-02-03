import express from "express";
import { uploadMedia } from "../controllers/mediaController.js";
import { upload } from "../middleware/multerMiddleware.js";

const router = express.Router();

router.post("/upload", upload.array("images", 5), uploadMedia);

export default router;
