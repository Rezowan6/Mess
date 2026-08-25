import { allAccess, managerAccess } from "@/helpers/permission.js";
import express from "express";
import { partyExpenseController } from "./partyExpense.controller.js";

const router = express.Router();

router.post("/", ...managerAccess, partyExpenseController.create);

router.get("/", ...allAccess, partyExpenseController.getAll);

router.patch("/:id", ...managerAccess, partyExpenseController.update);

router.delete("/:id", ...managerAccess, partyExpenseController.delete);

export default router;
