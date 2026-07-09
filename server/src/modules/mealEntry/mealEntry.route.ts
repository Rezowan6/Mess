import { allAccess, managerAccess } from "@/helpers/permission.js";
import express from "express";
import { MealEntriesController } from "./mealEntry.controller.js";

const router = express.Router();

router.get("/my", ...allAccess, MealEntriesController.my);
router.get("/daily", ...managerAccess, MealEntriesController.daily);
// router.get("/summary", ...managerAccess, mealEntriesController.summary);
// router.get("/member-summary", ...managerAccess, mealEntriesController.memberSummary);

export default router;
