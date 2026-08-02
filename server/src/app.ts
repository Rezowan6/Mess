import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
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
  mealPreferenceRouter,
  mealRequestRouter,
  mealSessionRouter,
  mealSettingRouter,
  monthlyCalculationRouter,
  myProfileRouter,
  noticesRouter,
  notificationRouter,
  paymentRouter,
  planFeatureRouter,
  planRouter,
  subscriptionRouter,
  tenantMembershipRouter,
  tenantRoute,
} from "@/routes/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    allowedHeaders: ["Content-Type", "Authorization", "X-Tenant-ID"],
  }),
);

// ------------- router -------------
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/tenants", tenantRoute);
app.use("/api/v1/invites", invitesRouter);
app.use("/api/v1/tenant-memberships", tenantMembershipRouter);
app.use("/api/v1/meal-sessions", mealSessionRouter);
app.use("/api/v1/meal-requests", mealRequestRouter);
app.use("/api/v1/meal-entries", mealEntriesRouter);
app.use("/api/v1/expenses", expensesRouter);
app.use("/api/v1/deposits", depositRouter);
app.use("/api/v1/monthly-calculations", monthlyCalculationRouter);
app.use("/api/v1/dashboards", dashboardRouter);
app.use("/api/v1/notices", noticesRouter);
app.use("/api/v1/plans", planRouter);
app.use("/api/v1/features", featureRouter);
app.use("/api/v1/plan-features", planFeatureRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/payments", paymentRouter);
app.use("/api/v1/notifications", notificationRouter);
app.use("/api/v1/meal-settings", mealSettingRouter);
app.use("/api/v1/meal-preferences", mealPreferenceRouter);
app.use("/api/v1/my-profile", myProfileRouter);

// app.get("/api/test/socket", (req, res) => {
//   const io = getIO();

//   console.log(io.sockets.adapter.rooms);
//   socketService.emitToUser(8, "love", {
//     message: "I Love Allah, I Love Muhammad sol. ﷺ",
//   });

//   res.json({
//     success: true,
//     message: "Socket event emitted.",
//   });
// });

// frontend serve last
app.use(express.static(path.join(__dirname, "../public")));

app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next();
  }

  res.sendFile(path.join(__dirname, "../public/index.html"));
});

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
