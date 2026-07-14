import { Router } from "express";

import { adminAccess } from "@/helpers/permission.js";
import { FeatureController } from "./feature.controller.js";

const controller = new FeatureController();

const router = Router();

router.post("/", ...adminAccess, controller.create);

router.get("/", ...adminAccess, controller.getAll);

router.get("/active", ...adminAccess, controller.getActiveFeatures);

router.get("/:id", ...adminAccess, controller.getById);

router.patch("/:id", ...adminAccess, controller.update);

router.delete("/:id", ...adminAccess, controller.delete);

export default router;
