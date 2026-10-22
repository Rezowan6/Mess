import { adminAndManagerTenantAccess, allTenantAccess } from "@/helpers/permission.js";
import express from "express";
import { currentBillController } from "./currentBill.controller.js";

const router = express.Router();

router.post("/", ...adminAndManagerTenantAccess, currentBillController.create);

router.get("/", ...allTenantAccess, currentBillController.getMemberCurrentBills);

router.get("/deleted", ...adminAndManagerTenantAccess,  currentBillController.getDeletedCurrentBills,);

router.get("/:id", ...allTenantAccess, currentBillController.getById);

router.patch("/:id", ...adminAndManagerTenantAccess, currentBillController.update);

router.delete("/:id", ...adminAndManagerTenantAccess, currentBillController.delete);

router.patch("/:id/restore", ...adminAndManagerTenantAccess,  currentBillController.restore,);

export default router;
