import { allAccess, systemOwnerAccess } from "@/helpers/permission.js";
import { Router } from "express";

import { PlanController } from "./plan.controller.js";

const controller = new PlanController();

const router = Router();

router.post("/", ...systemOwnerAccess, controller.create);

router.get("/", controller.getAll);

router.get("/active", ...allAccess, controller.getActivePlans);

router.get("/:id", ...allAccess, controller.getById);

router.patch("/:id", ...systemOwnerAccess, controller.update);

router.delete("/:id", ...systemOwnerAccess, controller.delete);

export default router;
