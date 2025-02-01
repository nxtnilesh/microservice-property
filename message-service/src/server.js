import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { consumeMessages, publishMessage } from "./utils/rabbitmq.js";
import { generateOTP, sendOTPEmail } from "./utils/otpService.js";
import logger from "../../identity-service/src/utils/logger.js";

const app = express();
app.use(express.json());

// Consume OTP request from identity service
consumeMessages("otp_request", async ({ email, requestId }) => {
  const otp = generateOTP();
  await sendOTPEmail(email, otp);
  await publishMessage("otp_response", { email, otp, requestId });

  logger.info(`[Message Service] OTP sent to ${email}`);
});
const PORT = process.env.PORT || 3003;
app.listen(5002, () => logger.info(`Running on port ${PORT}`));
