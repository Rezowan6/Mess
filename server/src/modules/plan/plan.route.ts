import { adminAndManagerAccess, allAccess } from "@/helpers/permission.js";
import { Router } from "express";

import { PlanController } from "./plan.controller.js";

const controller = new PlanController();

const router = Router();

router.post("/", ...adminAndManagerAccess, controller.create);

router.get("/", controller.getAll);

router.get("/active", ...allAccess, controller.getActivePlans);

router.get("/:id", ...allAccess, controller.getById);

router.patch("/:id", ...adminAndManagerAccess, controller.update);

router.delete("/:id", ...adminAndManagerAccess, controller.delete);

export default router;
