import express from "express";

import { adminAndManagerAccess, allAccess } from "@/helpers/permission.js";
import { mealSettingController } from "./mealSetting.controller.js";

const router = express.Router();

router.post("/", ...adminAndManagerAccess, mealSettingController.create);

router.get("/", ...allAccess, mealSettingController.getMySetting);

router.patch("/", ...adminAndManagerAccess, mealSettingController.update);

export default router;
