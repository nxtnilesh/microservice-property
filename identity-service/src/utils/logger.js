// import { createLogger, format, transports } from "winston";
// const { combine, timestamp, json, colorize, errors } = format;

// const consoleLogFormat = format.combine(
//   format.colorize(),
//   format.printf(({ level, message, timestamp, errors }) => {
//     return `${level}: ${message}: ${timestamp}`;
//   })
// );

// const logger = createLogger({
//   level: process.env.NODE_ENV === "production" ? "info" : "debug",
//   format: combine(colorize(), timestamp(), json()),
//   defaultMeta: { service: "identity-service" },
//   transports: [
//     new transports.Console({
//       format: consoleLogFormat,
//     }),
//     new transports.File({ filename: "app.log" }),
//   ],
// });

import winston from "winston";
const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
  ),
  defaultMeta: { service: "identity-service" },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

export default logger;
