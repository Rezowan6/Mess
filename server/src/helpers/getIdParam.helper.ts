import { Request } from "express";

import { ApiError } from "@/utils/ApiError.js";

export const getIdParam = (req: Request, param: string = "id"): number => {
  const id = Number(req.params[param]);

  if (!Number.isInteger(id) || id <= 0) {
    throw new ApiError(400, `Invalid ${param}.`);
  }

  return id;
};
