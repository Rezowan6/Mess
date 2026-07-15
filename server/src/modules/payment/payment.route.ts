import { Router } from "express";

import { allAccess, systemOwnerAccess } from "@/helpers/permission.js";
import { PaymentController } from "./payment.controller.js";

const router = Router();

const controller = new PaymentController();

router.use(...allAccess);

/**
 * Tenant Routes
 */

router.post("/", controller.create);

router.post("/:id/verify", controller.verify);

router.get("/my-payments", controller.getMyPayments);

router.get("/:id", controller.getById);

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
