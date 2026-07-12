import { allAccess, managerAccess } from "@/helpers/permission.js";
import express from "express";
import { DepositController } from "./deposit.controller.js";

const router = express.Router();

router.post("/", ...managerAccess, DepositController.create);
router.get("/summary", ...managerAccess, DepositController.summary);
router.get("/member/:memberId", ...allAccess, DepositController.getMemberDeposits);
router.get("/", ...allAccess, DepositController.getAll);
router.get("/:id", ...managerAccess, DepositController.getById);
router.patch("/:id", ...managerAccess, DepositController.update);
router.delete("/:id", ...managerAccess, DepositController.delete);

export default router;