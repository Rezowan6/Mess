import { adminAndManagerAccess } from "@/helpers/permission.js";
import express from "express";
import { MonthlyCalculationController } from "./monthlyCalculation.controller.js";

const router = express.Router();

router.get(
  "/current",
  ...adminAndManagerAccess,
  MonthlyCalculationController.getCurrentMonthCalculation,
);

export default router;
