import { createLogger, format, transports } from "winston";
const { combine, timestamp, json, colorize, errors } = format;

const consoleLogFormat = format.combine(
  format.colorize(),
  format.printf(({ level, message, timestamp, errors }) => {
    return `${level}: ${message}: ${timestamp}`;
  })
);

const logger = createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: combine(colorize(), timestamp(), json()),
  defaultMeta: { service: "identity-service" },
  transports: [
    new transports.Console({
      format: consoleLogFormat,
    }),
    new transports.File({ filename: "app.log" }),
  ],
});

export default logger;
