import express from "express";

import { managerAccess, adminAndManagerAccess } from "@/helpers/permission.js";
import { mealSettingController } from "./mealSetting.controller.js";

const router = express.Router();

router.post("/", ...adminAndManagerAccess, mealSettingController.create);

router.get("/", ...adminAndManagerAccess, mealSettingController.getMySetting);

router.patch("/", ...adminAndManagerAccess, mealSettingController.update);

router.delete("/", ...adminAndManagerAccess, mealSettingController.delete);

export default router;
