import { allAccess, managerAccess } from "@/helpers/permission.js";

import express from "express";

import { ricePaymentController } from "./ricePayment.controller.js";

const router = express.Router();

router.post("/", ...managerAccess, ricePaymentController.create);

router.get("/:riceId", ...allAccess, ricePaymentController.getAll);

router.get( "/:riceId/total-paid", ...allAccess, ricePaymentController.getTotalPaid,
);

router.get("/:riceId/due", ...allAccess, ricePaymentController.getRemainingDue);

router.get("/:riceId/:id", ...allAccess, ricePaymentController.getById);

router.patch("/:riceId/:id", ...managerAccess, ricePaymentController.update);

router.delete("/:riceId/:id", ...managerAccess, ricePaymentController.delete);

export default router;
