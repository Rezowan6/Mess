import type { IPaginationMeta } from "@/types/pagination.interface.js";

export class ApiResponse<T = any> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T | null;
  meta?: IPaginationMeta | undefined;

  constructor(
    statusCode: number,
    message: string = "Success",
    data: T | null = null,
    meta?: IPaginationMeta,
    extra?: Record<string, unknown>,
  ) {
    // Extra fields are applied first, so they can never overwrite the core fields below
    if (extra) {
      Object.assign(this, extra);
    }

    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
    if (meta) {
      this.meta = meta;
    }
  }
}