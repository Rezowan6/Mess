import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, {
  Application,
  Request,
  Response,
  NextFunction,
} from "express";
import morgan from "morgan";

dotenv.config();

const app: Application = express();

// ------------------- GLOBAL MIDDLEWARE -------------------
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// ------------------- 404 HANDLER -------------------
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Route not found!",
  });
});

export default app;