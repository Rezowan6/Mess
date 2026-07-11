import { allAccess, managerAccess } from "@/helpers/permission.js";
import express from "express";
import { DepositController } from "./deposit.controller.js";

const router = express.Router();

router.post("/", ...managerAccess, DepositController.create);
router.get("/", ...allAccess, DepositController.getAll);
router.get("/:id", ...allAccess, DepositController.getById);

export default router;