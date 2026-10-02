import { adminAndManagerAccess, allAccess, managerAccess } from "@/helpers/permission.js";
import express from "express";
import { mealRequestController } from "./mealRequest.controller.js";

const router = express.Router();

router.post("/", ...allAccess, mealRequestController.create);

router.post("/create-by-date", ...allAccess, mealRequestController.createByDate);

router.get("/approves", ...allAccess, mealRequestController.getApproves);

router.get("/pending/my", ...allAccess, mealRequestController.mypendingRequest);

router.get("/pending-all", ...managerAccess, mealRequestController.getPendingRequests);

router.patch("/approve/:id", ...managerAccess, mealRequestController.approve);

router.patch("/approve-all", ...allAccess, mealRequestController.approveAll);

router.patch("/approve-range", ...adminAndManagerAccess, mealRequestController.approveRange,);

router.patch("/reject/:id", ...managerAccess, mealRequestController.reject);

router.get("/rejects", ...managerAccess, mealRequestController.getRejectMeals);

router.delete("/:id", ...allAccess, mealRequestController.parmanetDelete);

export default router;
