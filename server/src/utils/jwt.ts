import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../configs/env.js";

interface JwtPayload {
  [key: string]: any;
}

export const accessToken = (payload: JwtPayload): string => {
  console.log("JWT FILE:", env);
  const expiresIn =
    (env.ACCESS_TOKEN_EXPIRE as jwt.SignOptions["expiresIn"]) ?? "15m";

  return jwt.sign(payload, env.ACCESS_TOKEN_SECRET as string, {
    expiresIn,
  });
};

export const refreshToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: env.REFRESH_TOKEN_EXPIRE as SignOptions["expiresIn"] ?? "15m",
  });
};

export const emailVerifyToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, env.VERIFY_TOKEN_SECRET as string, {
    expiresIn: env.VERIFY_TOKEN_EXPIRE as SignOptions["expiresIn"] ?? "15m",
  });
};

export const verifyToken = <T = JwtPayload>(
  token: string,
  secret: string,
): T => {
  return jwt.verify(token, secret) as T;
};
