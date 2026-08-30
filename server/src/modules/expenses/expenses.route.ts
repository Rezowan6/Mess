import { allAccess, managerAccess } from "@/helpers/permission.js";
import express from "express";
import { expenseController } from "./expenses.controller.js";

const router = express.Router();
// const expenseFeatureAccess = subscriptionGuard(FeatureCode.EXPENSE_MANAGEMENT);

router.post("/", ...managerAccess, expenseController.create);

router.get("/summary", ...managerAccess, expenseController.summary);

router.get("/", ...allAccess, expenseController.getAll);

router.get("/:id", ...managerAccess, expenseController.getById);

router.patch("/:id", ...managerAccess, expenseController.update);

router.delete("/:id", ...managerAccess, expenseController.delete);

export default router;
