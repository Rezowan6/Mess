import express from "express";

import { allAccess } from "@/helpers/permission.js";

import { notificationController } from "./notification.controller.js";

const router = express.Router();

router.get("/", ...allAccess, notificationController.getAll);

router.get("/unread-count", ...allAccess, notificationController.getUnreadCount);

router.patch("/:id/read", ...allAccess, notificationController.markAsRead);

router.patch("/read-all", ...allAccess, notificationController.markAllAsRead);

router.delete("/:id", ...allAccess, notificationController.delete);

export default router;
