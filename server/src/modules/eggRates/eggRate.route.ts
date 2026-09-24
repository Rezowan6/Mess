import { allAccess, managerAccess } from "@/helpers/permission.js";
import express from "express";
import { eggRateController } from "./eggRate.controller.js";

const router = express.Router();

router.post("/", ...managerAccess, eggRateController.create);

router.get("/", ...allAccess, eggRateController.get);

router.patch("/", ...managerAccess, eggRateController.update);

router.delete("/", ...managerAccess, eggRateController.delete);

export default router;
