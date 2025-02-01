import express from "express";
import { postProperty } from "../controllers/propertyController.js";

const router = express.Router();

// Create Property
router.post("/", postProperty);

export default router;
