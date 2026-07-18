import { allAccess, managerAccess } from "@/helpers/permission.js";
import express from "express";
import { mealEntryController } from "./mealEntry.controller.js";

const router = express.Router();

router.get("/my", ...allAccess, mealEntryController.my);

router.get("/daily", ...managerAccess, mealEntryController.daily);

router.get("/daily-summary", ...managerAccess, mealEntryController.dailySummary);

router.get("/summary", ...managerAccess, mealEntryController.summary);

router.get("/member-summary", ...allAccess, mealEntryController.memberSummary);

export default router;
