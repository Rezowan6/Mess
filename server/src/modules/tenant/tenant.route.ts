import express from "express";

import { adminAccess, allAccess } from "@/helpers/permission.js";
import { tenantController } from "./tenant.controller.js";

const router = express.Router();

router.post("/", ...allAccess, tenantController.create);
// router.get("/", ...systemOwnerAccess, getTenants);
// router.get("/:id", auth, getTenant);

export default router;
