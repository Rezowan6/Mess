import { allAccess, managerAccess } from "@/helpers/permission.js";
import express from "express";
import { eggController } from "./egg.controller.js";

const router = express.Router();

router.post("/", ...managerAccess, eggController.create);

router.get("/member/:memberId", ...allAccess, eggController.getMemberEggs);

router.get("/", ...allAccess, eggController.getAllEggs);

router.patch("/:id", ...managerAccess, eggController.update);

router.delete("/:id", ...managerAccess, eggController.delete);

export default router;
