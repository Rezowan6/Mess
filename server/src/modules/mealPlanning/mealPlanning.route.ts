import { Router } from "express";

import { allAccess, managerAccess } from "@/helpers/permission.js";
import { mealPlanningController } from "./mealPlanning.controller.js";


const router = Router();

router.get("/daily", ...allAccess, mealPlanningController.getDailyMealPlanning);

router.patch("/:userId/reject", ...managerAccess, mealPlanningController.rejectMeal);

export default router;