import express from "express";

import * as TenantController from "./tenant.controller.js";
import {auth, role} from "@/middlewares/index.js";
import { MemberRole } from "@/constans/index.js";

const router = express.Router();

const managerAccess = [auth, role(MemberRole.MANAGER)]

router.post("/create", auth, TenantController.create);
// router.get("/", ...systemOwnerAccess, getTenants);
// router.get("/:id", auth, getTenant);

export default router;
