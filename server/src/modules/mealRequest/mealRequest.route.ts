import express from "express";
import { MealRequestController } from "./mealRequest.controller.js";
import { allAccess } from "@/helpers/permission.js";

const router = express.Router();

router.post("/create", ...allAccess, MealRequestController.create);
router.get("/my", ...allAccess, MealRequestController.my);
router.get("/pending", ...allAccess, MealRequestController.getPendingRequests);
// router.patch("/:id/approve", ...allAccess, MealRequestController.approve);
// router.patch("/:id/reject", ...allAccess, MealRequestController.reject);

export default router;