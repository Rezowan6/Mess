import User from "@/models/users/UserModel.js";
import { ApiError } from "@/utils/ApiError.js";
import { hashPassword } from "@/utils/bcrypt.js";
import { emailVerifyToken } from "@/utils/jwt.js";
import { sendEmail } from "@/utils/sendEmail.js";
import { env } from "@/configs/env.js";

interface RegisterBody {
  name: string;
  email: string;
  password: string;
}

export const register = async ({ name, email, password }: RegisterBody) => {
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError(409, "User already exists! Place login.");
  }

  const hashedPassword = await hashPassword(password);

  const user = new User({ name, email, password: hashedPassword });
  user.role = "admin";
  user.isActive = true;
  user.inviteStatus = "verified";
  user.adminId = null;

  const saveUser = await user.save({ validateBeforeSave: false });

  const token  = emailVerifyToken(saveUser);

  const verifyLink = `${env.FRONTEND_URL}/verify-email/${token}`;

  const html = `<h2>Email Verification</h2>
                <p>Click the link below to verify:</p>
                <a href="${verifyLink}">Verify Email</a>`;

  try {
    await sendEmail(email, "Verify Your Email", html);
  } catch (error) {
    // Rollback OTP if email fails
    await User.findByIdAndDelete(saveUser._id);

    throw new ApiError(500, "Email sending failed, registration aborted");
  }

  return "User registered. Please verify email!";
};