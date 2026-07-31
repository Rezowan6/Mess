import express from "express";

import { adminAccess } from "@/helpers/permission.js";
import { tenantController } from "./tenant.controller.js";

const router = express.Router();

router.post("/", ...adminAccess, tenantController.create);
// router.get("/", ...systemOwnerAccess, getTenants);
// router.get("/:id", auth, getTenant);

export default router;
