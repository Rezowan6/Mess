import { env } from "@/configs/env.js";
import { Resend } from "resend";
import { ApiError } from "./ApiError.js";

const resend = new Resend(env.RESEND_API_KEY);

export const sendResendEmail = async (
  to: string,
  subject: string,
  html: string,
): Promise<void> => {
  try {
    const { error } = await resend.emails.send({
      from: env.EMAIL_FROM,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Resend email error:", error);

      throw new ApiError(
        500,
        "Email could not be sent. Please try again later.",
      );
    }

    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email error:", error);

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(
      500,
      "Email could not be sent. Please try again later.",
    );
  }
};