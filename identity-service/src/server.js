import express from "express";
import morgan from "morgan";
import connect from "./db/index.js";
import dotenv from "dotenv";
import helment from "helmet";
import cors from "cors";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { rateLimit } from "express-rate-limit";
import logger from "./utils/logger.js";
import errorHandler from "./middleware/errorHandler.js";
dotenv.config();

const app = express();

// MongoDb connection
connect();

// const morganFormat = ":method :url :status :response-time ms";
// app.use(
//   morgan(morganFormat, {
//     stream: {
//       write: (message) => {
//         const logObject = {
//           method: message.split(" ")[0],
//           url: message.split(" ")[1],
//           status: message.split(" ")[2],
//           responseTime: message.split(" ")[3],
//         };
//         logger.info(JSON.stringify(logObject));
//         logger.info(JSON.stringify(message));
//       },
//     },
//   })
// );
app.use(helment());
app.use(cors());
app.use(express.json());

// Middleware for dedug
// app.use((req, _, next) => {
//   logger.info(`Received ${req.method} request to ${req.url}`);
//   logger.info(`Received body ${req.body}`);
//   next();
// });

// Protection from DDoS and brute force attacks
const rateLimiter = new RateLimiterMemory({
  points: 6,
  duration: 1,
});
app.use((req, res, next) => {
  rateLimiter
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      logger.info(`IP based Rate limit exceeded for IP ${req.ip}`);
      res.status(429).json({
        success: false,
        message: "To many requests",
      });
    });
});

// IP based Rate limiter for sensitive endpoints / routes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  handler: (req, res) => {
    logger.info(`Rate limit exceeded for IP ${req.ip} for endpoints`);
    res.status(429).json({
      success: false,
      message: "To many requests",
    });
  },
});

// Appy limiter to this routes
app.use("/api/auth/register", limiter);

// Routes
import authRoute from "./routes/identity-service.js";
import { storeOTP } from "./utils/verifyOTP.js";
import { consumeMessages } from "./utils/rabbitmq.js";
app.use("/api/auth", authRoute);

// ErrorHanlder
app.use(errorHandler);

// Consume OTP responses from message service
consumeMessages("otp_response", ({ email, otp, requestId }) => {
  storeOTP(requestId, otp);
  console.log(`[Identity Service] OTP received for ${email}: ${otp}`);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  logger.info(`Identity service runnig on PORT ${PORT}`);
});

// Unhandled promise rejection
process.on("unhandledRejection", (reason, promise) => {
  logger.error(`Unhandled Rejection at ${promise} reason:${reason}`);
});
