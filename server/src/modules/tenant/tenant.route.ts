import express from "express";

import { createTenant, getTenant, getTenants } from "./tenant.controller.js";

import { auth } from "@/middlewares/auth.middleware.js";

import { role } from "@/middlewares/role.middleware.js";

const router = express.Router();

router.post("/", auth, role("systemOwner"), createTenant);

router.get("/", auth, role("systemOwner"), getTenants);

router.get("/:id", auth, getTenant);

export default router;
