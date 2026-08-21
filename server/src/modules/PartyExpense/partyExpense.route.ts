import { allAccess, managerAccess } from "@/helpers/permission.js";
import express from "express";
import { partyExpenseController } from "./partyExpense.controller.js";

const router = express.Router();

router.post("/", ...managerAccess, partyExpenseController.create);

router.get("/", ...allAccess, partyExpenseController.getAll);

export default router;
