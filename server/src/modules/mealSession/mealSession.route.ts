
import { managerAccess } from "@/helpers/permission.js";
import express from "express";
import {MealSessionController} from "./mealSession.controller.js";

const router = express.Router();

router.get("/", ...managerAccess, MealSessionController.getAll);
router.post("/create", ...managerAccess, MealSessionController.create);
router.get("/current", ...managerAccess, MealSessionController.getCurrent);
router.patch("/:id/close", ...managerAccess, MealSessionController.close);

export default router;
