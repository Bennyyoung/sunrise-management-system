import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { PaginationInterceptor } from './pagination.interceptor';
import { PaginationOptions } from './pagination.dto';
import {
  ApiBadRequestResponse,
  ApiDefaultResponse,
  ApiHeader,
  ApiQuery,
} from '@nestjs/swagger';
import { paginationConstants } from './pagination.constants';

/**
 * Shorthand decorator for using the PaginationInterceptor
 *
 * Use this to add Pagination support to an endpoint
 *
 * Make sure to use the paginationUtils to send the response with the appropriate pagination headers
 */
export const Pagination = (options?: Partial<PaginationOptions>) =>
  applyDecorators(
    ApiQuery({
      name: paginationConstants.requestQueryParams.take,
      type: 'number',
      required: false,
    }),
    ApiQuery({
      name: paginationConstants.requestQueryParams.skip,
      type: 'number',
      required: false,
    }),
    ApiHeader({
      name: paginationConstants.requestHeaders['x_pagination_take'],
      required: false,
    }),
    ApiHeader({
      name: paginationConstants.requestHeaders['x_pagination_skip'],
      required: false,
    }),
    ApiDefaultResponse({
      headers: {
        [paginationConstants.responseHeaders[
          'x_pagination_currentPage_returned'
        ]]: {
          required: true,
          description: 'current page returned in the response',
          schema: {
            type: 'number',
          },
        },
        [paginationConstants.responseHeaders['x_pagination_totalPages']]: {
          required: true,
          description: 'Total no. of pages available to fetch',
          schema: {
            type: 'number',
          },
        },
        [paginationConstants.responseHeaders['x_pagination_total']]: {
          required: true,
          description: 'Total no. of items available to fetch',
          schema: {
            type: 'number',
          },
        },
      },
    }),
    ApiBadRequestResponse({
      description: 'Attempting to fetch too many items',
      headers: {
        [paginationConstants.responseHeaders['x_pagination_max_take']]: {
          required: true,
          description: 'Max items that can be fetched at once',
          schema: {
            type: 'number',
          },
        },
      },
    }),
    UseInterceptors(new PaginationInterceptor(options)),
  );
