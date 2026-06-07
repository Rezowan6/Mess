import { env } from "@/configs/env.js";
import nodemailer from "nodemailer";
import { ApiError } from "./ApiError.js";

export const sendEmail = async (
  to: string,
  subject: string,
  html: string,
): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      host: env.SMTP_HOST as string,
      port: Number(env.SMTP_PORT),
      secure: false,

      auth: {
        user: env.SMTP_EMAIL as string,
        pass: env.SMTP_PASS as string,
      },
    });

    await transporter.sendMail({
      from: `"My App" <${env.SMTP_EMAIL}>`,
      to,
      subject,
      html,
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email error:", error);

    throw new ApiError(500, "Email could not be sent. Please try again later.");
  }
};
