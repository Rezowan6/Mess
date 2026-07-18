import { RequestContext } from "./requestContext.ts";

interface User {
  id: number;
  name: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user: User;
      context: RequestContext;
    }
  }
}
