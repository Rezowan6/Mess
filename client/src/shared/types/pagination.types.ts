export interface IPaginationMeta {
  page: number;

  limit: number;

  total: number;

  totalPages: number;
}

export interface IPaginationParams {
  page: number;
  limit: number;
  search?: string;
}
