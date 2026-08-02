import { RequestContext } from "./requestContext.ts";

interface User {
  id: number;
  name: string | null | undefined;
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
