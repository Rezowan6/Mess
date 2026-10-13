import type { IPaginationMeta } from "@/shared/types/pagination.types";

export interface INotice {
  id: number;
  mealSessionId: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface INoticeQuery {
  page?: number;
  limit?: number;
  search?: string;
}

export interface INoticeListResponse {
  statusCode: number;
  success: boolean;
  message: string;
  data: INotice[];
  meta: IPaginationMeta;
}

export interface ICreateNoticeDto {
  title: string;
  description: string;
}

export interface IUpdateNoticeDto {
  title: string;
  description: string;
}
