import { Response } from "express";
import { ApiResponse } from "./index.js";

interface SendResponseOptions<T> {
  statusCode: number;
  message?: string;
  data?: T;
}

export const sendResponse = <T>(
  res: Response,
  options: SendResponseOptions<T>,
) => {
  const { statusCode, message = "Success", data = null } = options;
  return res
    .status(statusCode)
    .json(new ApiResponse(statusCode, message, data));
};
