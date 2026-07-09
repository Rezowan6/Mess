import { allAccess } from "@/helpers/permission.js";
import express from "express";
import { MealEntriesController } from "./mealEntry.controller.js";

const router = express.Router();

router.get("/my", ...allAccess, MealEntriesController.my);
// router.get("/daily", ...managerAccess, mealEntriesController.daily);
// router.get("/summary", ...managerAccess, mealEntriesController.summary);
// router.get("/member-summary", ...managerAccess, mealEntriesController.memberSummary);

export default router;
