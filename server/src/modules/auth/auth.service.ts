import { env } from "@/configs/index.js";
import { RefreshToken, User } from "@/models/index.js";
import { ApiError } from "@/utils/ApiError.js";
import { comparePassword } from "@/utils/bcrypt.js";
import { getClientIp } from "@/utils/getClient.ip.js";
import { hashToken } from "@/utils/hash.util.js";
import {
  createAccessToken,
  emailVerifyToken,
  generateRefreshToken,
  verifyToken,
} from "@/utils/jwt.util.js";
import { sendVerificationEmail } from "../email/email.service.js";
import {
  createRefreshToken,
  revokeRefreshToken,
} from "../refreshToken/refreshToken.service.js";
import { userRepository } from "../user/user.repository.js";
import { userService } from "../user/user.service.js";
import {
  IRegisterPayload,
  LoginPayload,
  LoginResponse,
} from "./auth.interface.js";
import { authRepository } from "./auth.repository.js";

class AuthService {
  register = async (payload: IRegisterPayload) => {
    const exists = await authRepository.findOne({ email: payload.email });

    if (exists) {
      throw new ApiError(409, "User already exists");
    }

    const user = await userService.create({
      ...payload,
    });

    // OUTSIDE TRANSACTION (IMPORTANT)
    const token = emailVerifyToken({
      userId: user?.id,
      email: user?.email,
    });
    const verifyLink = `${env.FRONTEND_URL}/verify-email/${token}`;

    await sendVerificationEmail(user?.email, verifyLink);

    const saveUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      isVerified: user.isVerified,
      status: user.status,
    };

    return saveUser;
  };

  verify = async (token: any) => {
    if (!token) {
      throw new ApiError(400, "Verification token is required");
    }

    let decoded: any;

    try {
      decoded = verifyToken(token, env.VERIFY_TOKEN_SECRET);
    } catch (err) {
      throw new ApiError(401, "Invalid or expired verification token");
    }

    const { userId, email } = decoded;

    // 2. FIND USER
    const user = await User.findOne({
      where: {
        id: userId,
        email,
      },
    });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    if (user.isVerified) {
      return {
        message: "Email already verified",
      };
    }

    await userRepository.update(
      { email: token.email },
      {
        isVerified: true,
      },
    );

    return null;
  };

  getMe = async (userId: number) => {
    const user = await authRepository.getMeById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return user;
  };

  login = async (data: LoginPayload): Promise<LoginResponse> => {
    const { email, password, ip, userAgent } = data;

    // 2. user check
    const user = await authRepository.findOne({ email });

    if (!user) {
      throw new ApiError(401, "Invalid credentials");
    }

    if (!user.isVerified) {
      throw new ApiError(403, "Please verify your email first");
    }

    // 3. password verify
    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      throw new ApiError(401, "Invalid credentials");
    }

    // 4. create payload
    const payload = {
      id: user.id,
      email: user.email,
    };

    // 5. access token
    const accessToken = createAccessToken(payload);

    // 6. refresh token
    const refreshToken = generateRefreshToken(payload);

    const userIp = getClientIp(ip);

    await createRefreshToken({
      userId: user.id,
      token: refreshToken,
      ipAddress: userIp,
      userAgent,
    });

    const saveUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    return {
      message: "Login successfully",
      refreshToken,
      data: {
        accessToken,
        user: saveUser || null,
      },
    };
  };

  refreshToken = async (token: string) => {
    if (!token) {
      throw new ApiError(401, "Refresh token missing");
    }

    const decoded = verifyToken(token, env.REFRESH_TOKEN_SECRET);

    const storedToken = await RefreshToken.findOne({
      where: {
        tokenHash: hashToken(token),
      },
    });

    if (!storedToken) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (storedToken.expiresAt < new Date()) {
      throw new ApiError(401, "Refresh token expired");
    }

    const accessToken = createAccessToken({
      id: decoded.id,
      email: decoded.email,
    });

    return {
      accessToken,
    };
  };

  logout = async (refreshToken: string) => {
    if (!refreshToken) {
      throw new ApiError(401, "Refresh token missing");
    }
    if (!refreshToken) {
      throw new ApiError(401, "Refresh token missing");
    }

    // 1. revoke token (DB update)
    await revokeRefreshToken(refreshToken);

    return {
      message: "Logout successful",
    };
  };
}

export const authService = new AuthService();
