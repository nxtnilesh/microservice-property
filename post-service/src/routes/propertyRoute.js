import express from "express";
import { createProperty } from "../controllers/propertyController.js";
import authenticateRequest from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authenticateRequest);
router.post("/property", createProperty);

export default router;
