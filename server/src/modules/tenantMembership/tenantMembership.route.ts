import express from "express";

import { adminAccess, allAccess } from "@/helpers/permission.js";

import { membershipController } from "./tenantMembership.controller.js";

const router = express.Router();

router.get("/", ...allAccess, membershipController.getMembers);
router.patch("/:id/role", ...adminAccess, membershipController.updateRole);
router.delete("/:id", ...adminAccess, membershipController.deleteMember);

export default router;
