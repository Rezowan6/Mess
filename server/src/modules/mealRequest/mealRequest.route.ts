import express from "express";
import { MealRequestController } from "./mealRequest.controller.js";
import { allAccess, managerAccess } from "@/helpers/permission.js";

const router = express.Router();

router.post("/", ...allAccess, MealRequestController.create);
router.get("/pending/my", ...allAccess, MealRequestController.my);
router.get("/pending", ...allAccess, MealRequestController.getPendingRequests);
router.patch("/approve", ...managerAccess, MealRequestController.approve);
router.patch("/approve-all", ...allAccess, MealRequestController.approveAll);
router.patch("/reject", ...managerAccess, MealRequestController.reject);

export default router;