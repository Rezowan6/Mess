import { managerAccess } from "@/helpers/permission.js";
import express from "express";
import { DepositController } from "./deposit.controller.js";

const router = express.Router();

router.post("/", ...managerAccess, DepositController.create);

export default router;