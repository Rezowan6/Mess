import { ApiError } from "./index.js";

export const getParamString = (value: string | string[] | undefined): string => {
  if (!value || Array.isArray(value)) {
    throw new ApiError(400, "Invalid parameter");
  }
  return value;
};