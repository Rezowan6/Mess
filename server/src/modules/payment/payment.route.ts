import { Router } from "express";

import {
  adminAndManagerAccess,
  systemOwnerAccess,
} from "@/helpers/permission.js";

import { PaymentController } from "./payment.controller.js";

const router = Router();

const controller = new PaymentController();

/**
 * Tenant Routes
 */

// Create payment
router.post("/", ...adminAndManagerAccess, controller.create);

// Verify payment
router.post("/:id/verify", ...adminAndManagerAccess, controller.verify);

// Payment history
router.get("/my-payments", ...adminAndManagerAccess, controller.getMyPayments);

// Payment details
router.get("/:id", ...adminAndManagerAccess, controller.getById);

/**
 * Gateway Webhook
 *
 * Webhook must NOT use tenant authentication.
 * Gateway verification is handled inside the service.
 */
router.post("/webhook/:gateway", controller.webhook);

/**
 * System Owner Routes
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
