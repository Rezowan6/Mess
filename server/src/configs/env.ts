import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.string(),
  
  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASS: z.string(),
  DB_HOST: z.string(),
  DB_PORT: z.string(),


  PORT: z.string(),

  ACCESS_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_EXPIRE: z.string(),

  REFRESH_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_EXPIRE: z.string(),

  VERIFY_TOKEN_SECRET: z.string(),
  VERIFY_TOKEN_EXPIRE: z.string(),

  FRONTEND_URL: z.string(),
  // BACKEND_URL: z.string(),
  APP_URL: z.string(),

  EMAIL_SECRET: z.string(),
  SMTP_HOST: z.string(),
  SMTP_PORT: z.string(),
  SMTP_EMAIL: z.string(),
  SMTP_PASS: z.string(),

  BKASH_BASE_URL: z.string(),
  BKASH_USERNAME: z.string(),
  BKASH_PASSWORD: z.string(),
  BKASH_APP_KEY: z.string(),
  BKASH_APP_SECRET: z.string(),
});

export type Env = z.infer<typeof envSchema>;

export function loadEnv() {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error(parsed.error.flatten().fieldErrors);

    throw new Error("Invalid environment variables");
  }

  return parsed.data;
}

let cachedEnv: Env | null = null;

export function getEnv() {
  if (!cachedEnv) {
    cachedEnv = loadEnv();
  }

  return cachedEnv;
}

export const env = getEnv();
