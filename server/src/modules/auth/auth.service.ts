import { ApiError } from "@/utils/ApiError.js";
import { comparePassword } from "@/utils/bcrypt.js";
import {
  createAccessToken,
  emailVerifyToken,
  generateRefreshToken,
  verifyToken,
} from "@/utils/jwt.util.js";
import sequelize from "../../configs/db.js";
import { sendVerificationEmail } from "../email/email.service.js";

import { env } from "@/configs/env.js";
import { Tenant, User } from "@/models/index.js";
import { getClientIp } from "@/utils/getClient.ip.js";
import {
  createRefreshToken,
  revokeRefreshToken,
} from "../refreshToken/refreshToken.service.js";
import { createTenantService } from "../tenant/tenant.service.js";
import { createAdminUserService } from "../user/user.service.js";
import { LoginPayload, RegisterPayload } from "./auth.interface.js";
import { findUserByEmail } from "./auth.repository.js";

export const register = async (payload: RegisterPayload) => {
  const exists = await findUserByEmail(payload.email);

  if (exists) {
    throw new ApiError(409, "User already exists");
  }

  let result: any;

  await sequelize.transaction(async (transaction) => {
    const user = await createAdminUserService(
      {
        ...payload,
      },
      transaction,
    );

    const tenant = await createTenantService(user.id, payload.messName);

    await user.update(
      {
        tenantId: tenant.id,
      },
      { transaction },
    );

    result = {
      tenant,
      user,
    };
  });

  // OUTSIDE TRANSACTION (IMPORTANT)
  const token = emailVerifyToken({
    userId: result?.user?.id,
    email: result?.user?.email,
    tenantId: result?.user?.tenantId,
  });
  const verifyLink = `${env.FRONTEND_URL}/verify-email/${token}`;

  await sendVerificationEmail(result?.user?.email, verifyLink);

  return {
    message: "Registration successful. Check email.",
    data: result,
  };
};

export const verify = async (token: any) => {
  if (!token) {
    throw new ApiError(400, "Verification token is required");
  }

  // 1. VERIFY TOKEN
  let decoded: any;

  try {
    decoded = verifyToken(token, env.VERIFY_TOKEN_SECRET);
  } catch (err) {
    console.log(err);
    throw new ApiError(401, "Invalid or expired verification token");
  }

  const { userId, email, tenantId } = decoded;

  // 2. FIND USER
  const user = await User.findOne({
    where: {
      id: userId,
      email,
      tenantId,
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // 3. CHECK ALREADY VERIFIED
  if (user.isVerified) {
    return {
      message: "Email already verified",
    };
  }

  // 4. UPDATE USER (TRANSACTION SAFE)
  await sequelize.transaction(async (transaction) => {
    await user.update(
      {
        isVerified: true,
        isActive: true,
      },
      { transaction },
    );
  });

  // 5. RESPONSE
  return {
    message: "Email verified successfully",
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      tenantId: user.tenantId,
      isVerified: true,
      isActive: true,
    },
  };
};

export const login = async (data: LoginPayload) => {
  const { email, password, tenantSlug, ip, userAgent } = data;

  // 1. tenant check
  const tenant = await Tenant.findOne({
    where: {
      slug: tenantSlug,
      isActive: true,
    },
  });

  if (!tenant) {
    throw new ApiError(404, "Invalid credentials");
  }

  // 2. user check
  const user = await User.findOne({
    where: {
      email,
      tenantId: tenant.id,
    },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  if (!user.isVerified) {
    throw new ApiError(403, "Please verify your email first");
  }

  if (!user.isActive) {
    throw new ApiError(403, "Account is deactivated");
  }

  // 3. password verify
  const passwordMatch = await comparePassword(password, user.password);

  if (!passwordMatch) {
    await user.increment("loginAttempts");
    throw new ApiError(401, "Invalid credentials");
  }

  // reset login attempts on success
  await user.update({ loginAttempts: 0 });

  // 4. create payload
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    tenantId: tenant.id,
  };

  // 5. access token
  const accessToken = createAccessToken(payload);

  // 6. refresh token
  const refreshToken = generateRefreshToken(payload);

  const userIp = getClientIp(ip);

  await createRefreshToken({
    userId: user.id,
    tenantId: tenant.id,
    token: refreshToken,
    ipAddress: userIp,
    userAgent,
  });

  return {
    message: "Login successfully",
    refreshToken,
    data: {
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      tenant: {
        id: tenant.id,
        name: tenant.messName,
        slug: tenant.slug,
      },
    },
  };
};

export const logout = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new ApiError(401, "Refresh token missing");
  }

  // 1. revoke token (DB update)
  await revokeRefreshToken(refreshToken);

  return {
    message: "Logout successful",
  };
};
