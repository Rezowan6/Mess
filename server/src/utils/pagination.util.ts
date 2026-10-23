import type { IPaginationQuery } from "@/types/pagination.interface.js";
import type { Request } from "express";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;
const MAX_SEARCH_LENGTH = 100;

const parsePositiveInteger = (value: unknown, fallback: number): number => {
  if (typeof value !== "string" || !/^\d+$/.test(value)) {
    return fallback;
  }

  const parsed = Number(value);

  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : fallback;
};

export const getPaginationQuery = (req: Request): IPaginationQuery => {
  const page = parsePositiveInteger(req.query.page, DEFAULT_PAGE);

  const limit = Math.min(
    parsePositiveInteger(req.query.limit, DEFAULT_LIMIT),
    MAX_LIMIT,
  );

  const search =
    typeof req.query.search === "string"
      ? req.query.search.trim().slice(0, MAX_SEARCH_LENGTH)
      : "";

  return {
    page,
    limit,
    ...(search ? { search } : {}),
  };
};
