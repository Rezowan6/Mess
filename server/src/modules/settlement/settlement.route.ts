import { managerAccess } from "@/helpers/permission.js";
import express from "express";
import { settlementController } from "./settlement.controller.js";

const router = express.Router();

router.post("/", ...managerAccess, settlementController.create);

router.get("/", ...managerAccess, settlementController.getAll);

router.get("/:id", ...managerAccess, settlementController.getById);

router.patch("/:id", ...managerAccess, settlementController.update);

router.delete("/:id", ...managerAccess, settlementController.delete);

export default router;
