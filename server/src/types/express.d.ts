import { RequestContext } from "./requestContext.ts";

declare global {
  namespace Express {
    interface Request {
      context: RequestContext;
    }
  }
}
