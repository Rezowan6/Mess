import express from "express";
import { MealRequestController } from "./mealRequest.controller.js";
import { allAccess } from "@/helpers/permission.js";

const router = express.Router();

router.post("/create", ...allAccess, MealRequestController.create);

export default router;