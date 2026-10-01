import { allAccess, managerAccess } from "@/helpers/permission.js";
import express from "express";
import { riceController } from "./rice.controller.js";

const router = express.Router();

router.post("/", ...managerAccess, riceController.create);

router.post("/bulk-settle", ...managerAccess, riceController.bulkSettleDue);

router.get("/", ...allAccess, riceController.getAll);

router.get("/summary", ...allAccess, riceController.getSummary);

router.get("/:id", ...allAccess, riceController.getById);

router.get("/:id/due", ...allAccess, riceController.getRemainingDue);

router.patch("/:id", ...managerAccess, riceController.update);

router.delete("/:id", ...managerAccess, riceController.delete);

export default router;
