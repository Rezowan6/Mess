import { allAccess } from "@/helpers/permission.js";
import express from "express";
import { myProfileController } from "./myProfile.controller.js";

const router = express.Router();

router.get("/", ...allAccess, myProfileController.getMyProfile);

export default router;
