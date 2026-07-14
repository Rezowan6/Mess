import { adminAccess, allAccess, systemOwnerAccess } from "@/helpers/permission.js";
import { Router } from "express";

import { PlanController } from "./plan.controller.js";

const controller = new PlanController();

const router = Router();

router.post("/", ...adminAccess, controller.create);
router.get("/", ...allAccess, controller.getAll);
router.get("/active", ...allAccess, controller.getActivePlans);
router.get("/:id", ...allAccess, controller.getById);
router.patch("/:id", ...adminAccess, controller.update);
router.delete("/:id", ...adminAccess, controller.delete);

export default router;
