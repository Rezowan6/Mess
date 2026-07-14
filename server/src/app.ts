import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { env } from "./configs/env.js";

// internal import
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";

// router:
import {
  authRouter,
  dashboardRouter,
  depositRouter,
  expensesRouter,
  featureRouter,
  invitesRouter,
  mealEntriesRouter,
  mealRequestRouter,
  mealSessionRouter,
  monthlyCalculationRouter,
  noticesRouter,
  planFeatureRouter,
  planRouter,
  tenantMembershipRouter,
  tenantRoute,
} from "@/routes/index.js";

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
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tenant", tenantRoute);
app.use("/api/v1/invite", invitesRouter);
app.use("/api/v1/tenant-membership", tenantMembershipRouter);
app.use("/api/v1/meal-session", mealSessionRouter);
app.use("/api/v1/meal-request", mealRequestRouter);
app.use("/api/v1/meal-entries", mealEntriesRouter);
app.use("/api/v1/expense", expensesRouter);
app.use("/api/v1/deposit", depositRouter);
app.use("/api/v1/monthly-calculation", monthlyCalculationRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/notices", noticesRouter);
app.use("/api/v1/plan", planRouter);
app.use("/api/v1/feature", featureRouter);
app.use("/api/v1/plan-feature", planFeatureRouter);

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
