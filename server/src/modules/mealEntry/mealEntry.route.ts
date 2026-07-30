import { adminAndManagerAccess, allAccess, managerAccess } from "@/helpers/permission.js";
import express from "express";
import { mealEntryController } from "./mealEntry.controller.js";

const router = express.Router();

router.get("/my", ...allAccess, mealEntryController.my);

router.get("/daily", ...adminAndManagerAccess, mealEntryController.daily);

router.get("/daily-summary", ...adminAndManagerAccess, mealEntryController.dailySummary);

router.get("/members-meal-summary", ...adminAndManagerAccess, mealEntryController.getMemberMealSummary);

router.get("/summary", ...adminAndManagerAccess, mealEntryController.summary);

router.get("/member-summary", ...allAccess, mealEntryController.memberSummary);

export default router;
