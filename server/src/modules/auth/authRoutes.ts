import express from "express";

import * as AuthController from "./authController.js";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/verify-email/:token", AuthController.verify);
router.post("/login", AuthController.login);

export default router;