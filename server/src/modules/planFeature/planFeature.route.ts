import { Router } from "express";

import { adminAccess, adminAndManagerAccess } from "@/helpers/permission.js";
import { PlanFeatureController } from "./planFeature.controller.js";

const controller = new PlanFeatureController();

const router = Router();

router.post("/", ...adminAndManagerAccess, controller.create);

router.get("/", ...adminAndManagerAccess, controller.getAll);

router.get("/plan/:planId", ...adminAndManagerAccess, controller.getByPlanId);

router.get("/:id", ...adminAndManagerAccess, controller.getById);

router.patch("/:id", ...adminAndManagerAccess, controller.update);

router.delete("/:id", ...adminAndManagerAccess, controller.delete);

export default router;
