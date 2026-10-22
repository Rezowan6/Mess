import { adminAndManagerTenantAccess, allTenantAccess } from "@/helpers/permission.js";
import express from "express";
import { khalaBillController } from "./khalaBill.controller.js";

const router = express.Router();

router.post("/", ...adminAndManagerTenantAccess, khalaBillController.create);

router.get("/", ...allTenantAccess, khalaBillController.getMemberKhalaBills);

router.get("/:id", ...allTenantAccess, khalaBillController.getById);

router.patch("/:id", ...adminAndManagerTenantAccess, khalaBillController.update);

router.delete("/:id", ...adminAndManagerTenantAccess, khalaBillController.delete);

export default router;
