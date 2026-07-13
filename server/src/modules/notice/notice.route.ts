import { adminAccess, allAccess, managerAccess } from "@/helpers/permission.js";
import express from "express";
import { NoticeController } from "./notice.controller.js";

const router = express.Router();

const controller = new NoticeController();

router.post("/", ...adminAccess, controller.create);

router.get("/", ...allAccess, controller.getAll);

router.get("/:id", ...allAccess, controller.getById);

router.patch("/:id", ...managerAccess, controller.update);

router.delete("/:id", ...managerAccess, controller.delete);

export default router;
