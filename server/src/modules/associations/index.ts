import { initUserAssociations } from "../user/user.association.js";
import { initTenantAssociations } from "../tenant/tenant.association.js";
import { initAuthAssociations } from "../auth/auth.association.js";

export const initAssociations = () => {
  initUserAssociations();
  initTenantAssociations();
  initAuthAssociations();
};