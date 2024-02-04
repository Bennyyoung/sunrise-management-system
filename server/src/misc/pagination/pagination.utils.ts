import { Response } from 'express';
import { PaginatedResult } from './pagination.dto';

export const paginationUtils = {
  sendPaginatedResponse<T>(
    response: Response,
    result: PaginatedResult<T>,
    skip: number,
    take: number,
  ) {
    const currentPage = skip + 1;
    const totalPage = Math.ceil(result.total / take);
    const { data } = result;
    this.setPaginationResponseHeaders(
      response,
      currentPage,
      totalPage,
      result.total,
    ).send({ currentPage, totalPage, data });

    return {
      currentPage,
      totalPage,
      data,
    };
  },

  // set skip to current page
  // get total page based on take

  setPaginationResponseHeaders(
    response: Response,
    currentPage: number,
    totalPage: number,
    total: number,
  ) {
    return response
      .header('x_pagination_currentPage_returned', currentPage.toString())
      .header('x_pagination_totalPages', totalPage.toString())
      .header('x_pagination_total', total.toString());
  },
};
