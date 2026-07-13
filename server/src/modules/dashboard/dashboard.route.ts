import { Router } from "express";

import { adminAccess, managerAccess } from "@/helpers/permission.js";
import { DashboardController } from "./dashboard.controller.js";

const router = Router();

router.get(
  "/manager",
  ...adminAccess,
  DashboardController.getManagerDashboard,
);

export default router;
