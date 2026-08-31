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
  ) {
    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
    if (meta) {
      this.meta = meta;
    }
  }
}
