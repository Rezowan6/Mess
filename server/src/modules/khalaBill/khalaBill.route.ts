import { allAccess, managerAccess } from "@/helpers/permission.js";
import express from "express";
import { khalaBillController } from "./khalaBill.controller.js";

const router = express.Router();

router.post("/", ...managerAccess, khalaBillController.create);

router.get("/", ...allAccess, khalaBillController.getMemberKhalaBills);

router.get("/:id", ...allAccess, khalaBillController.getById);

router.patch("/:id", ...managerAccess, khalaBillController.update);

router.delete("/:id", ...managerAccess, khalaBillController.delete);

export default router;
