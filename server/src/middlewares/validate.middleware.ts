import type { NextFunction, Request, Response } from "express";
import type { ZodError, ZodType } from "zod";

import { ApiError } from "@/utils/ApiError.js";

interface ValidateSchemas {
  body?: ZodType;
  params?: ZodType;
}

const toApiError = (error: ZodError) => {
  const issue = error.issues[0];
  const path = issue?.path.join(".");

  return new ApiError(400, path ? `${path}: ${issue?.message}` : issue?.message);
};

export const validate =
  (schemas: ValidateSchemas) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (schemas.params) {
      const result = schemas.params.safeParse(req.params);
      if (!result.success) return next(toApiError(result.error));
    }

    if (schemas.body) {
      const result = schemas.body.safeParse(req.body);
      if (!result.success) return next(toApiError(result.error));

      // The service receives only the validated data
      req.body = result.data;
    }

    next();
  };
