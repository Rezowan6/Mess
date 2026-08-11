import { Router } from "express";

import { mealPlanningController } from "./mealPlanning.controller.js";
import { allAccess } from "@/helpers/permission.js";


const router = Router();

router.get("/daily", ...allAccess, mealPlanningController.getDailyMealPlanning);

export default router;