import { managerAccess } from "@/helpers/permission.js";
import express from "express";
import { mealSessionController } from "./mealSession.controller.js";

const router = express.Router();

router.post("/", ...managerAccess, mealSessionController.create);
router.get("/", ...managerAccess, mealSessionController.getCurrentSession);
router.get("/history", ...managerAccess, mealSessionController.getAll);
router.patch("/:id/close", ...managerAccess, mealSessionController.close);

export default router;
