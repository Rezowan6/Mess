import { MemberRole } from "@/constans/index.js";
import { auth, contextMiddleware, role } from "@/middlewares/index.js";
import express from "express";
import { TenantMembershipController } from "./tenantMembership.controller.js";
import { adminAccess, allAccess } from "@/helpers/permission.js";

const router = express.Router();

const managerAccess = [auth, contextMiddleware, role(MemberRole.ADMIN)];

router.get("/", ...allAccess, TenantMembershipController.getMembers);
router.patch("/:id", ...managerAccess, TenantMembershipController.updateRole);
router.delete("/:id", ...managerAccess, TenantMembershipController.deleteMember);

export default router;
