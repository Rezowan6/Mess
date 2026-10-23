import { env } from "@/configs/env.js";
import crypto from "crypto";

const ENCRYPTION_KEY = Buffer.from(env.ACCOUNT_ENCRYPTION_KEY!, "hex");

export const encrypt = (value: string): string => {
  const iv = crypto.randomBytes(12);

  const cipher = crypto.createCipheriv("aes-256-gcm", ENCRYPTION_KEY, iv);

  const encrypted = Buffer.concat([
    cipher.update(value, "utf8"),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  return [
    iv.toString("hex"),
    authTag.toString("hex"),
    encrypted.toString("hex"),
  ].join(":");
};
