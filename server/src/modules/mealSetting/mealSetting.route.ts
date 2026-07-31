import express from "express";

import { adminAndManagerAccess } from "@/helpers/permission.js";
import { mealSettingController } from "./mealSetting.controller.js";

const router = express.Router();

router.post("/", ...adminAndManagerAccess, mealSettingController.create);

router.get("/", ...adminAndManagerAccess, mealSettingController.getMySetting);

router.patch("/", ...adminAndManagerAccess, mealSettingController.update);

export default router;
