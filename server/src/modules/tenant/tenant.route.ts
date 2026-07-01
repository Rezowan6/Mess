import express from "express";

import { createTenant, getTenant, getTenants } from "./tenant.controller.js";
import {auth, role} from "@/middlewares/index.js";

const router = express.Router();

const systemOwnerAccess = [auth, role("systemOwner")];

router.post("/", ...systemOwnerAccess, createTenant);
router.get("/", ...systemOwnerAccess, getTenants);
router.get("/:id", auth, getTenant);

export default router;
