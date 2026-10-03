import type { IPaginationMeta } from "@/types/pagination.interface.js";
import { Response } from "express";

import { ApiResponse } from "./index.js";

interface ISendResponseOptions<T> {
  statusCode: number;
  message?: string;
  data?: T;
  meta?: IPaginationMeta;
  /** Extra top-level fields, e.g. { dueSummary } */
  extra?: Record<string, unknown>;
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
    extra,
  } = options;

  return res
    .status(statusCode)
    .json(new ApiResponse(statusCode, message, data, meta, extra));
};
