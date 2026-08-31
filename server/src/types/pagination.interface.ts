export interface IPaginationQuery {
  page?: number;

  limit?: number;

  search?: string;
}

export interface IPaginationMeta {
  page: number;

  limit: number;

  total: number;

  totalPages: number;
}

export interface IPaginatedResult<T> {
  data: T[];

  meta: IPaginationMeta;
}
