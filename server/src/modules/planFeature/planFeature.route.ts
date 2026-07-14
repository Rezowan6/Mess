import { Router } from "express";

import { adminAccess } from "@/helpers/permission.js";
import { PlanFeatureController } from "./planFeature.controller.js";

const controller = new PlanFeatureController();

const router = Router();

router.post("/", ...adminAccess, controller.create);

router.get("/", ...adminAccess, controller.getAll);

router.get("/plan/:planId", ...adminAccess, controller.getByPlanId);

router.get("/:id", ...adminAccess, controller.getById);

router.patch("/:id", ...adminAccess, controller.update);

router.delete("/:id", ...adminAccess, controller.delete);

export default router;
