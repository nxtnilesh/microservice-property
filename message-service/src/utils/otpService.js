import nodemailer from "nodemailer";
import dotev from "dotenv";
dotev.config();


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate OTP
export const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP Email
export const sendOTPEmail = async (email, otp) => {
  await transporter.sendMail({
    from: `"Auth System" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}. It expires in 5 minutes.`,
  });
};
