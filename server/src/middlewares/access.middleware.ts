import { MemberRole } from "@/constans/index.js";
import { auth, contextMiddleware, role } from "@/middlewares/index.js";

type MemberRoleType = (typeof MemberRole)[keyof typeof MemberRole];

interface AccessOptions {
  roles?: MemberRoleType[];

  requireTenant?: boolean;

  requireMealSession?: boolean;

  features?: string[];
}

export const access = ({
  roles = [],
  requireTenant = true,
  requireMealSession = true,
}: AccessOptions = {}) => {
  const middlewares: any = [auth];

  if (requireTenant) {
    middlewares.push(
      contextMiddleware({
        requireMealSession,
      }),
    );
  }

  if (roles.length) {
    middlewares.push(role(...roles));
  }

  return middlewares;
};
