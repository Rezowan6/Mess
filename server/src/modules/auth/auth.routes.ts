import express from "express";

import { auth } from "@/middlewares/auth.middleware.js";
import { authController } from "./auth.controller.js";

const router = express.Router();

router.post("/register", authController.register);

router.post("/verify-email/:token", authController.verify);

router.get("/me", auth, authController.me);

router.post("/login", authController.login);

router.post("/refresh", authController.refreshToken);

router.post("/logout", authController.logout);

export default router;
