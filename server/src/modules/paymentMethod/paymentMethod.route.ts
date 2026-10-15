import { managerAccess } from "@/helpers/permission.js";
import express from "express";
import { paymentMethodController } from "./paymentMethod.controller.js";

const router = express.Router();

router.post("/", ...managerAccess, paymentMethodController.create);

export default router;
