import User from "@/modules/user/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      role: string,
      tenant?: any;
    }
  }
}
