import { Membership, Tenant, User } from "@/models/index.js";

export interface RequestContext {
  user: User;
  membership: Membership;
  tenant: Tenant;
}