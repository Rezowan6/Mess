import { adminAndManagerAccess, allAccess, managerAccess } from "@/helpers/permission.js";
import express from "express";
import { mealEntryController } from "./mealEntry.controller.js";

const router = express.Router();

router.get("/", ...allAccess, mealEntryController.getAllMembersMeal);

router.get("/my", ...allAccess, mealEntryController.my);

router.get("/today-meals", ...adminAndManagerAccess, mealEntryController.todayMealEntries);

router.get("/daily-summary", ...adminAndManagerAccess, mealEntryController.dailySummary);

router.get("/members-meal-summary", ...adminAndManagerAccess, mealEntryController.getMemberMealSummary);

router.get("/summary", ...adminAndManagerAccess, mealEntryController.summary);

router.get("/member-summary", ...allAccess, mealEntryController.memberSummary);

router.post("/", ...managerAccess, mealEntryController.create);

router.patch("/:id", ...managerAccess, mealEntryController.update);

router.delete("/:id", ...managerAccess, mealEntryController.delete);

export default router;
