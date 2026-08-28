import { Router } from "express";

import { systemWonerAccess } from "@/helpers/permission.js";
import { FeatureController } from "./feature.controller.js";

const controller = new FeatureController();

const router = Router();

router.post("/", ...systemWonerAccess, controller.create);

router.get("/", controller.getAll);

router.get("/active", ...systemWonerAccess, controller.getActiveFeatures);

router.get("/:id", ...systemWonerAccess, controller.getById);

router.patch("/:id", ...systemWonerAccess, controller.update);

router.delete("/:id", ...systemWonerAccess, controller.delete);

export default router;
