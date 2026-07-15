import { env } from "@/configs/env.js";

export const bkashConfig = {
  baseUrl: env.BKASH_BASE_URL ?? "https://tokenized.sandbox.bka.sh",

  username: env.BKASH_USERNAME!,

  password: env.BKASH_PASSWORD!,

  appKey: env.BKASH_APP_KEY!,

  appSecret: env.BKASH_APP_SECRET!,
};
