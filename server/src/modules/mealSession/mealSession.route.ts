import { allAccess, managerAccess, mealSessionAdminAndManagerAccess, mealSessionAllAccess } from "@/helpers/permission.js";
import express from "express";
import { mealSessionController } from "./mealSession.controller.js";

const router = express.Router();

router.post("/", ...mealSessionAdminAndManagerAccess, mealSessionController.create);
router.get("/", ...allAccess, mealSessionController.getCurrentSession);
router.get("/history", ...managerAccess, mealSessionController.getAll);
router.get("/completed", ...mealSessionAllAccess, mealSessionController.getCompletedSessions);
router.patch("/:id/close", ...managerAccess, mealSessionController.close);

export default router;
