import { Request, Response, NextFunction } from "express";

interface ApiErrorShape extends Error {
  statusCode?: number;
  errors?: any[];
}

export const globalErrorHandler = (
  err: ApiErrorShape,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error!";

  res.status(statusCode).json({
    message,
    success: false,
    status: statusCode,
    errors: err.errors || [],
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};