import { IPaginationQuery } from "@/types/pagination.interface.js";

export const getSearchQuery = (query: IPaginationQuery): string | undefined => {
  const search = query.search?.trim();
  return search || undefined;
};
