import { allAccess, managerAccess } from "@/helpers/permission.js";
import express from "express";
import { MealEntriesController } from "./mealEntry.controller.js";

const router = express.Router();

router.get("/my", ...allAccess, MealEntriesController.my);
router.get("/daily", ...managerAccess, MealEntriesController.daily);
router.get("/daily-summary", ...managerAccess, MealEntriesController.dailySummary);
router.get("/summary", ...managerAccess, MealEntriesController.summary);
router.get("/member-summary", ...allAccess, MealEntriesController.memberSummary);

export default router;
