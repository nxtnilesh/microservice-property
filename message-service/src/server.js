import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { consumeMessages, publishMessage } from "./utils/rabbitmq.js";
import { generateOTP, sendOTPEmail } from "./utils/otpService.js";

const app = express();
app.use(express.json());

// Consume OTP request from identity service
consumeMessages("otp_request", async ({ email, requestId }) => {
  const otp = generateOTP();
  await sendOTPEmail(email, otp);
  await publishMessage("otp_response", { email, otp, requestId });

  console.log(`[Message Service] OTP sent to ${email}`);
});

app.listen(5002, () => console.log("[Message Service] Running on port 5002"));
