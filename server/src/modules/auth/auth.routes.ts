import express from "express";

import * as AuthController from "./auth.controller.js";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/verify-email/:token", AuthController.verify);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);

export default router;