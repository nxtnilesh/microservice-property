import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
dotenv.config();
import proxy from "express-http-proxy";
import logger from "./utils/logger.js";
import errorHandler from "./middleware/errorHandler.js";
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(errorHandler);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
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
app.use(limiter);

const proxyOptions = {
  proxyReqPathResolver: (req) => {
    return req.originalUrl.replace(/^\/v1/, "/api");
  },
  proxyErrorHanlder: (err, res, next) => {
    console.log(`Proxy error : ${err.message}`);
    res.status(500).json({
      success: false,
      message: `Internal server error `,
      err: err.message,
    });
  },
};

// Proxy for auth service
app.use(
  "/v1/auth",
  proxy(process.env.IDENTITY_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers["Content-Type"] = "application/json";
      return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      logger.info(
        `Response received from Identity service: ${proxyRes.statusCode}`
      );

      return proxyResData;
    },
  })
);

// Proxy for post service
app.use(
  "/v1/posts",
  proxy(process.env.POST_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers["Content-Type"] = "application/json";
      proxyReqOpts.headers["x-user-id"] = srcReq.user.userId;
      return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      logger.info(
        `Response received from Post service: ${proxyRes.statusCode}`
      );

      return proxyResData;
    },
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Api-gateway service runnig on PORT ${PORT}`);
  logger.info(
    `Identity service runnig on PORT ${process.env.IDENTITY_SERVICE_URL}`
  );
  logger.info(`Post service runnig on PORT ${process.env.POST_SERVICE_URL}`);
});

// Unhandled promise rejection
process.on("unhandledRejection", (reason, promise) => {
  logger.error(`Unhandled Rejection at ${promise} reason:${reason}`);
});
