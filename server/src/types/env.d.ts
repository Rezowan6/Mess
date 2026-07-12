import {Tenant, User, MealSession} from "@/models/index.ts";

declare global {

  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;

      NODE_ENV: "development" | "production";
      FRONTEND_URL:string;
      BACKEND_URL:string;

      DATABASE_HOST: string;

      DATABASE_PORT: string;

      DATABASE_NAME: string;

      DATABASE_USER: string;

      DATABASE_PASSWORD: string;

      ACCESS_TOKEN_SECRET: string;

      ACCESS_TOKEN_EXPIRE: string;

      REFRESH_TOKEN_SECRET: string;

      REFRESH_TOKEN_EXPIRE: string;

      STRIPE_SECRET_KEY: string;
    }
  }
}

export {};
