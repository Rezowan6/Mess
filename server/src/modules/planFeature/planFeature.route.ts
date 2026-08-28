import { Router } from "express";

import { systemOwner } from "@/middlewares/systemOwner.middleware.js";
import { PlanFeatureController } from "./planFeature.controller.js";
import { systemOwnerAccess } from "@/helpers/permission.js";

const controller = new PlanFeatureController();

const router = Router();

router.post("/", ...systemOwnerAccess, controller.create);

router.get("/", controller.getAll);

router.get("/plan/:planId", ...systemOwnerAccess, controller.getByPlanId);

router.get("/:id", ...systemOwnerAccess, controller.getById);

router.patch("/:id", ...systemOwnerAccess, controller.update);

router.delete("/:id", ...systemOwnerAccess, controller.delete);

export default router;
