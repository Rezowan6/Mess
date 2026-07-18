import { allAccess, managerAccess } from "@/helpers/permission.js";
import express from "express";
import { mealRequestController } from "./mealRequest.controller.js";

const router = express.Router();

router.post("/", ...allAccess, mealRequestController.create);
router.get("/pending/my", ...allAccess, mealRequestController.mypendingRequest);
router.get("/pending-all", ...allAccess, mealRequestController.getPendingRequests);
router.patch("/approve/:id", ...managerAccess, mealRequestController.approve);
router.patch("/approve-all", ...allAccess, mealRequestController.approveAll);
router.patch("/reject/:id", ...managerAccess, mealRequestController.reject);

export default router;
