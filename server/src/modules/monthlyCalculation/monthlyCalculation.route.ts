import { adminAccess, managerAccess } from "@/helpers/permission.js";
import express from "express";
import { MonthlyCalculationController } from "./monthlyCalculation.controller.js";

const router = express.Router();

router.get(
  "/current",
  ...adminAccess,
  MonthlyCalculationController.getCurrentMonthCalculation,
);

export default router;
