import { Router } from "express";

import {
    adminAndManagerAccess,
    allAccess,
    systemOwnerAccess,
} from "@/helpers/permission.js";

import { SubscriptionController } from "./subscription.controller.js";

const controller = new SubscriptionController();

const router = Router();

// Tenant buy plan
router.post("/", ...adminAndManagerAccess, controller.create);

// Get current active subscription
router.get("/current", ...allAccess, controller.getCurrent);

// Tenant subscription history
router.get("/my-subscriptions", ...allAccess, controller.getTenantSubscriptions);

// Get single subscription
router.get("/:id", ...allAccess, controller.getById);

// Activate subscription
// Payment gateway callback/webhook will use this
router.patch("/:id/activate", ...systemOwnerAccess, controller.activate);

// Cancel subscription
router.patch("/:id/cancel", ...adminAndManagerAccess, controller.cancel);

export default router;