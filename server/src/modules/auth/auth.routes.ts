import express from "express";

import * as AuthController from "./auth.controller.js";
import { auth } from "@/middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/verify-email/:token", AuthController.verify);
router.post("/login", AuthController.login);
router.post("/refresh", AuthController.refreshToken);
router.post("/logout", AuthController.logout);
router.get("/me", auth, AuthController.me);

export default router;
