import express from "express";
import { addProperty } from "../controllers/propertyController.js";

const router = express.Router();

router.post("/properties", addProperty);

export default router;
