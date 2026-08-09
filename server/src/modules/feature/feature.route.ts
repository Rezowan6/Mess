import { Router } from "express";

import { adminAndManagerAccess } from "@/helpers/permission.js";
import { FeatureController } from "./feature.controller.js";

const controller = new FeatureController();

const router = Router();

router.post("/", ...adminAndManagerAccess, controller.create);

router.get("/", ...adminAndManagerAccess, controller.getAll);

router.get("/active", ...adminAndManagerAccess, controller.getActiveFeatures);

router.get("/:id", ...adminAndManagerAccess, controller.getById);

router.patch("/:id", ...adminAndManagerAccess, controller.update);

router.delete("/:id", ...adminAndManagerAccess, controller.delete);

export default router;
