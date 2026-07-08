import { MemberRole } from "@/constans/index.js";
import { auth, contextMiddleware, role } from "@/middlewares/index.js";
import express from "express";
import { TenantMembershipController } from "./tenantMembership.controller.js";

const router = express.Router();

const managerAccess = [auth, contextMiddleware, role(MemberRole.ADMIN)];

router.get("/members", ...managerAccess, TenantMembershipController.getMembers);
router.patch("/members/:id", ...managerAccess, TenantMembershipController.updateRole);
router.delete("/members/:id", ...managerAccess, TenantMembershipController.deleteMember);

export default router;
