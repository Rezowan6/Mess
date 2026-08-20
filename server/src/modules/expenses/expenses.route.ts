import { FeatureCode } from "@/constans/index.js";
import { allAccess, managerAccess } from "@/helpers/permission.js";
import { subscriptionGuard } from "@/middlewares/subscription.middleware.js";
import express from "express";
import { expenseController } from "./expenses.controller.js";

const router = express.Router();
const expenseFeatureAccess = subscriptionGuard(FeatureCode.EXPENSE_MANAGEMENT);

router.post("/", ...managerAccess, expenseFeatureAccess, expenseController.create);

router.get("/summary", ...managerAccess, expenseFeatureAccess, expenseController.summary);

router.get("/", ...allAccess, expenseFeatureAccess, expenseController.getAll);

router.get("/:id", ...managerAccess, expenseFeatureAccess, expenseController.getById);

router.patch("/:id", ...managerAccess, expenseFeatureAccess, expenseController.update);

router.delete("/:id", ...managerAccess, expenseFeatureAccess, expenseController.delete);

export default router;
