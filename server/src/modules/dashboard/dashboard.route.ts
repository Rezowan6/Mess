import { Router } from "express";

import { managerAccess } from "@/helpers/permission.js";
import { dashboardController } from "./dashboard.controller.js";

const router = Router();

router.get("/today", ...managerAccess, dashboardController.getTodayDashboard);

export default router;
