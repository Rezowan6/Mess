import { allAccess, managerAccess } from "@/helpers/permission.js";
import express from "express";
import { ExpensesController } from "./expenses.controller.js";

const router = express.Router();

router.post("/create", ...managerAccess, ExpensesController.create);
router.get("/", ...allAccess, ExpensesController.getAll);
// router.get("/:id", ...managerAccess, ExpensesController.create);
// router.patch("/:id", ...managerAccess, ExpensesController.create);
// router.delete("/:id", ...managerAccess, ExpensesController.create);

export default router;