import { allAccess, managerAccess } from "@/helpers/permission.js";
import express from "express";
import { currentBillController } from "./currentBill.controller.js";

const router = express.Router();

router.post("/", ...managerAccess, currentBillController.create);

router.get("/", ...allAccess, currentBillController.getMemberCurrentBills);

router.get("/:id", ...allAccess, currentBillController.getById);

router.patch("/:id", ...managerAccess, currentBillController.update);

router.delete("/:id", ...managerAccess, currentBillController.delete);

export default router;
