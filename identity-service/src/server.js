import express from "express";
import morgan from "morgan";
import connect from "./db/index.js";
import dotenv from "dotenv";
import helment from "helmet";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import logger from "./utils/logger.js";

dotenv.config();

const app = express();

// MongoDb connection
connect();

const morganFormat = ":method :url :status :response-time ms";
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);
app.use(helment());
app.use(cors());
app.use(express.json());

// Middleware for dedug
app.use((req, _, next) => {
  logger.info(`Received ${req.method} request to ${req.url}`);
  logger.info(`Received body ${req.body}`);
  next();
});

// Protection from DDoS and brute force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});
app.use(limiter);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  logger.info(`Runnig PORT is ${PORT}`);
});
