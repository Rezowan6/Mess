import express from "express";

import * as invitesController from "./invite.controller.js";
import { auth } from "@/middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", auth, invitesController.invite);

export default router;
