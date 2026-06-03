import { IUser } from "../models/users/UserModel.ts";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}


declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    MONGO_URL: string;
    NODE_ENV: "development" | "production";
  }
}