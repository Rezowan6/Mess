import express from "express";

import { allAccess } from "@/helpers/permission.js";
import { tenantController } from "./tenant.controller.js";
import { auth } from "@/middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", auth, tenantController.create);
// router.get("/", ...systemOwnerAccess, getTenants);
// router.get("/:id", auth, getTenant);

export default router;
