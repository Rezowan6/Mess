import type { PaginationMeta } from "./pagination.types";

export interface ApiResponse<T = unknown> {
  success: boolean;

  message: string;

  data: T;

  meta?: PaginationMeta;
}
