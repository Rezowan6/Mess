import { sendResendEmail } from "@/utils/sendResendEmail.js";

export const sendVerificationEmail = async (
  email: string,
  verifyLink: string,
) => {
  const html = `
    <div>
      <h2>Email Verification</h2>
      <p>Please verify your email:</p>
      <a href="${verifyLink}" target="_blank">Verify Email</a>
    </div>
  `;

  return await sendResendEmail(email, "Verify Your Email", html);
};
