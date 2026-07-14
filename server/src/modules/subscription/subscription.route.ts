import { Router } from "express";

import { allAccess, systemOwnerAccess } from "@/helpers/permission.js";
import { SubscriptionController } from "./subscription.controller.js";

const controller = new SubscriptionController();

const router = Router();

// All subscription routes require authentication
router.use(...allAccess);

// Tenant buy plan
router.post("/", controller.create);

// Get current active subscription
router.get("/current", controller.getCurrent);

// Tenant subscription history
router.get("/my-subscriptions", controller.getTenantSubscriptions);

// Get single subscription
router.get("/:id", controller.getById);

// Activate subscription
// Payment gateway callback/webhook will use this
router.patch("/:id/activate", ...systemOwnerAccess, controller.activate);

// Cancel subscription
router.patch("/:id/cancel", controller.cancel);

export default router;
