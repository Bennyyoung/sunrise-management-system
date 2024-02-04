export type PaginationContext = {
  take: number;
  skip: number;
};

export type PaginationOptions = {
  defaultTake: number;
  defaultSkip: number;
  maxTake: number;
};

export type PaginatedResult<T> = {
  data: T[];
  total: number;
};

export type PaginationResultMetadata = {
  returned: number;
  total: number;
};
