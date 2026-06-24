import Tenant from "@/modules/tenant/tenant.model.js";
import { IUser } from "@/modules/user/user.interface.js";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;

      tenant?: Tenant;
    }
  }

  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;

      NODE_ENV: "development" | "production";

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
