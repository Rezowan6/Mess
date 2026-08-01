import { adminAndManagerAccess } from "@/helpers/permission.js";
import express from "express";
import { monthlyCalculationController } from "./monthlyCalculation.controller.js";

const router = express.Router();

router.get(
  "/current",
  ...adminAndManagerAccess,
  monthlyCalculationController.getCurrentMonthCalculation,
);

export default router;
