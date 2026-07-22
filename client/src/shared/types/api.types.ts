import type { IPaginationMeta } from "./pagination.types";

export interface ApiResponse<T = unknown> {
  success: boolean;

  message: string;

  data: T;

  meta?: IPaginationMeta;
}
