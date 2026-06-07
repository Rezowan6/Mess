import express from "express";

import * as AuthController from "./authController.js";
console.log(AuthController);

const router = express.Router();

router.post("/register", AuthController.register);

export default router;