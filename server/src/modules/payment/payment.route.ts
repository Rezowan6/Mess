import { Router } from "express";

import { adminAndManagerAccess, allAccess, systemOwnerAccess } from "@/helpers/permission.js";
import { PaymentController } from "./payment.controller.js";

const router = Router();

const controller = new PaymentController();

/**
 * Tenant Routes
 */

router.post("/", ...adminAndManagerAccess, controller.create);

// router.post("/webhook/:gateway", controller.webhook);

router.post("/:id/verify", controller.verify);

router.get("/my-payments", ...adminAndManagerAccess, controller.getMyPayments);

router.get("/:id", ...adminAndManagerAccess, controller.getById);


/**
 * System Owner Routes
 * Temporary (development/testing)
 */

router.get(
  "/owner/pending",
  ...systemOwnerAccess,
  controller.getPendingPayments,
);

router.get(
  "/owner/processing",
  ...systemOwnerAccess,
  controller.getProcessingPayments,
);

router.patch("/:id/success", ...systemOwnerAccess, controller.markAsSuccess);

router.patch("/:id/failed", ...systemOwnerAccess, controller.markAsFailed);

router.patch(
  "/:id/cancelled",
  ...systemOwnerAccess,
  controller.markAsCancelled,
);

export default router;
