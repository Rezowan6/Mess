import { adminAndManagerTenantAccess, allTenantAccess } from "@/helpers/permission.js";
import express from "express";
import { currentBillController } from "./currentBill.controller.js";
import { createCurrentBillSchema, currentBillIdParamSchema, updateCurrentBillSchema } from "./currentBill.validation.js";
import { validate } from "@/middlewares/validate.middleware.js";

const router = express.Router();

// The access middleware runs first, so unauthorized users never reach validation
router.post("/", ...adminAndManagerTenantAccess, validate({ body: createCurrentBillSchema }), currentBillController.create);

router.get("/", ...allTenantAccess, currentBillController.getMemberCurrentBills);

// Must stay above "/:id", otherwise "deleted" is read as an id
router.get("/deleted", ...adminAndManagerTenantAccess,  currentBillController.getDeletedCurrentBills,);

router.get("/:id", ...allTenantAccess, validate({ params: currentBillIdParamSchema }), currentBillController.getById);

router.patch("/:id", ...adminAndManagerTenantAccess, validate({ params: currentBillIdParamSchema, body: updateCurrentBillSchema }), currentBillController.update);

router.delete("/:id", ...adminAndManagerTenantAccess,validate({ params: currentBillIdParamSchema }), currentBillController.delete);

router.patch("/:id/restore", ...adminAndManagerTenantAccess, validate({ params: currentBillIdParamSchema }),  currentBillController.restore,);

export default router;
