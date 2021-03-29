export interface Paginator<T> {
  total: number;
  page: number;
  perPage: number;
  data: T[];
}

export interface BasePaginateProps {
  page: number;
  perPage: number;
}
