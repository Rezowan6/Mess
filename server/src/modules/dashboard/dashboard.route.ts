import { Router } from "express";

import { allAccess, managerAccess } from "@/helpers/permission.js";
import { dashboardController } from "./dashboard.controller.js";

const router = Router();

router.get("/today", ...managerAccess, dashboardController.getTodayDashboard); // not use

router.get("/stats", ...allAccess, dashboardController.getDashboardStats);

router.get("/meal-trend", ...allAccess, dashboardController.getMealTrend);

export default router;
