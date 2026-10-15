import { managerAccess } from "@/helpers/permission.js";
import express from "express";
import { paymentMethodController } from "./paymentMethod.controller.js";

const router = express.Router();

router.post("/", ...managerAccess, paymentMethodController.create);

router.get("/", ...managerAccess, paymentMethodController.getAll);

router.patch("/:id", ...managerAccess, paymentMethodController.update);

router.delete("/:id", ...managerAccess, paymentMethodController.delete);

export default router;
