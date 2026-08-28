import { Router } from "express";

import { systemOwner } from "@/middlewares/systemOwner.middleware.js";
import { PlanFeatureController } from "./planFeature.controller.js";
import { systemWonerAccess } from "@/helpers/permission.js";

const controller = new PlanFeatureController();

const router = Router();

router.post("/", ...systemWonerAccess, controller.create);

router.get("/", controller.getAll);

router.get("/plan/:planId", ...systemWonerAccess, controller.getByPlanId);

router.get("/:id", ...systemWonerAccess, controller.getById);

router.patch("/:id", ...systemWonerAccess, controller.update);

router.delete("/:id", ...systemWonerAccess, controller.delete);

export default router;
