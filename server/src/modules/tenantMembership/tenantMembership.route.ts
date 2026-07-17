import express from "express";

import { adminAccess, allAccess } from "@/helpers/permission.js";

import { MembershipController } from "./tenantMembership.controller.js";

const router = express.Router();

router.get("/", ...allAccess, MembershipController.getMembers);
router.patch("/:id/role", ...adminAccess, MembershipController.updateRole);
router.delete("/:id", ...adminAccess, MembershipController.deleteMember);

export default router;
