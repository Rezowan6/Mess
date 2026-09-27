import { allAccess, managerAccess } from "@/helpers/permission.js";

import express from "express";

import { soldProductController } from "./soldProduct.controller.js";

const router = express.Router();

router.post("/", ...managerAccess, soldProductController.create);

router.get("/", ...allAccess, soldProductController.get);

router.patch("/", ...managerAccess, soldProductController.update);

router.delete("/", ...managerAccess, soldProductController.delete);

export default router;
