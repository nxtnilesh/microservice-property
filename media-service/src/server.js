import express from "express";
import dotenv from "dotenv";
dotenv.config();

import logger from "../../identity-service/src/utils/logger.js";

const app = express();
app.use(express.json());

import mediaRoute from "./routes/mediaRoute.js";
app.use("/api/media", mediaRoute);


const PORT = process.env.PORT || 3003;
app.listen(PORT, () => logger.info(`Running on port ${PORT}`));
