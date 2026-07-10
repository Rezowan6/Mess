import { managerAccess } from "@/helpers/permission.js";
import express from "express";
import { ExpensesController } from "./expenses.controller.js";

const router = express.Router();

router.post("/create", ...managerAccess, ExpensesController.create);

export default router;