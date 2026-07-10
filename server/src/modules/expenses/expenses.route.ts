import { allAccess, managerAccess } from "@/helpers/permission.js";
import express from "express";
import { ExpensesController } from "./expenses.controller.js";

const router = express.Router();

router.post("/", ...managerAccess, ExpensesController.create);
router.get("/summary", ...managerAccess, ExpensesController.summary);
router.get("/", ...allAccess, ExpensesController.getAll);
router.get("/:id", ...managerAccess, ExpensesController.getById);
router.patch("/:id", ...managerAccess, ExpensesController.update);
router.delete("/:id", ...managerAccess, ExpensesController.delete);

export default router;