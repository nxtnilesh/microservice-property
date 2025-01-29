import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import errorHandler from "./middleware/errorHandler.js";
dotenv.config();

// mongoDb connection
connect()

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(errorHandler);

import propertyRoute from "./routes/propertyRoute.js";
import logger from "./utils/logger.js";
import connect from "./db/index.js";

app.use("/api/posts",propertyRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  logger.info(`Post service runnig on PORT ${PORT}`);
});

// Unhandled promise rejection
process.on("unhandledRejection", (reason, promise) => {
  logger.error(`Unhandled Rejection at ${promise} reason:${reason}`);
});
