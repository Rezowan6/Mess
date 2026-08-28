import { allAccess, systemWonerAccess } from "@/helpers/permission.js";
import { Router } from "express";

import { PlanController } from "./plan.controller.js";

const controller = new PlanController();

const router = Router();

router.post("/", ...systemWonerAccess, controller.create);

router.get("/", controller.getAll);

router.get("/active", ...allAccess, controller.getActivePlans);

router.get("/:id", ...allAccess, controller.getById);

router.patch("/:id", ...systemWonerAccess, controller.update);

router.delete("/:id", ...systemWonerAccess, controller.delete);

export default router;
