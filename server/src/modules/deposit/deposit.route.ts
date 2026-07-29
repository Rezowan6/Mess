import { allAccess, managerAccess } from "@/helpers/permission.js";
import express from "express";
import { depositController } from "./deposit.controller.js";

const router = express.Router();

router.post("/", ...managerAccess, depositController.create);

router.get("/summary", ...managerAccess, depositController.summary);

router.get("/member/:memberId", ...allAccess, depositController.getMemberDeposits);

router.get("/", ...allAccess, depositController.getDeposits);

router.get("/:id", ...managerAccess, depositController.getById);

router.patch("/:id", ...managerAccess, depositController.update);

router.delete("/:id", ...managerAccess, depositController.delete);

export default router;