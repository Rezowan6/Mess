import type { IPaginationMeta } from "@/common/types/pagination.interface.js";
import { Response } from "express";

import { ApiResponse } from "./index.js";

interface ISendResponseOptions<T> {
  statusCode: number;
  message?: string;
  data?: T;
  meta?: IPaginationMeta;
}

export const sendResponse = <T>(
  res: Response,
  options: ISendResponseOptions<T>,
) => {
  const {
    statusCode,
    message = "Success",
    data = null,
    meta = undefined,
  } = options;
  return res
    .status(statusCode)
    .json(new ApiResponse(statusCode, message, data, meta));
};
