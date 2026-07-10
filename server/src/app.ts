import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { env } from "./configs/env.js";

// internal import
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";

import authRouter from "@/modules/auth/auth.routes.js";
import invitesRouter from "@/modules/invite/invite.route.js";
import mealEntriesRouter from "@/modules/mealEntry/mealEntry.route.js";
import mealRequestRouter from "@/modules/mealRequest/mealRequest.route.js";
import mealSessionRouter from "@/modules/mealSession/mealSession.route.js";
import tenantRoute from "@/modules/tenant/tenant.route.js";
import tenantMembershipRouter from "@/modules/tenantMembership/tenantMembership.route.js";
import expensesRouter from "@/modules/expenses/expenses.route.js";

const app: Application = express();

// ------------------- GLOBAL MIDDLEWARE -------------------
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Logging middleware
if (env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// CORS
app.use(
  cors({
    origin: env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// ------------- router -------------
app.use("/api/auth", authRouter);
app.use("/api/tenant", tenantRoute);
app.use("/api/invite", invitesRouter);
app.use("/api/tenant-membership", tenantMembershipRouter);
app.use("/api/meal-session", mealSessionRouter);
app.use("/api/meal-request", mealRequestRouter);
app.use("/api/meal-entries", mealEntriesRouter);
app.use("/api/expenses", expensesRouter);

// ------------------- 404 HANDLER -------------------
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Route not found!",
  });
});

// ------------------- 500 GLOBAL ERROR HANDLER -------------------
app.use(globalErrorHandler);
export default app;

// “Create Mess after login” = ✅ correct SaaS design
// 🎯 Final SaaS Flow
// Register
//    ↓
// Verify Email
//    ↓
// Login
//    ↓
// Create Tenant (Mess)
//    ↓
// Auto Membership (Admin)
