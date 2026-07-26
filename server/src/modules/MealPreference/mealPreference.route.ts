import { allAccess, managerAccess } from "@/helpers/permission.js";
import express from "express";
import { mealPreferenceController } from "./mealPreference.controller.js";

const router = express.Router();

router.post("/", ...allAccess, mealPreferenceController.upsert);
router.get("/me", ...allAccess, mealPreferenceController.getMyPreference);

export default router;