import { Router } from "express";

import { systemOwnerAccess } from "@/helpers/permission.js";
import { FeatureController } from "./feature.controller.js";

const controller = new FeatureController();

const router = Router();

router.post("/", ...systemOwnerAccess, controller.create);

router.get("/", controller.getAll);

router.get("/active", ...systemOwnerAccess, controller.getActiveFeatures);

router.get("/:id", ...systemOwnerAccess, controller.getById);

router.patch("/:id", ...systemOwnerAccess, controller.update);

router.delete("/:id", ...systemOwnerAccess, controller.delete);

export default router;
