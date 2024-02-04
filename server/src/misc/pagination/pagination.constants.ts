export const paginationConstants = {
  requestQueryParams: {
    take: 'take',
    skip: 'skip',
  },
  requestHeaders: {
    x_pagination_take: 'x_pagination_take',
    x_pagination_skip: 'x_pagination_skip',
  },
  responseHeaders: {
    x_pagination_currentPage_returned: 'x_pagination_currentPage_returned',
    x_pagination_totalPages: 'x_pagination_totalPages',
    x_pagination_total: 'x_pagination_total',
    x_pagination_max_take: 'x_pagination_max_take',
  },
};
