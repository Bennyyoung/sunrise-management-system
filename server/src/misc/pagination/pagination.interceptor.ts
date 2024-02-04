import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Optional,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';
import { expressUtils } from '../express/express.utils';
import { PaginationContext, PaginationOptions } from './pagination.dto';
import _ from 'lodash';
import { BadRequestException } from '@nestjs/common';
import chalk from 'chalk';
import { paginationConstants } from './pagination.constants';

/**
 * Pagination is a very common task that we will need to implement in a lot of endpoints
 *
 * We can use this interceptor to easily support pagination on any endpoint that we need
 *
 * We accept the pagination parameters from either the Headers, or the Query parameters - The Query parameters take precedence over the Header
 */
@Injectable()
export class PaginationInterceptor implements NestInterceptor {
  defaultOptions: PaginationOptions = {
    defaultTake: 20,
    defaultSkip: 0,
    maxTake: 20,
  };

  constructor(
    @Optional()
    private readonly options?: Partial<PaginationOptions>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req: Request = context.switchToHttp().getRequest();
    const res: Response = context.switchToHttp().getResponse();

    const options: PaginationOptions = _.merge(
      this.defaultOptions,
      this.options,
    );
    if (options.maxTake && options.maxTake < options.defaultTake) {
      options.defaultTake = options.maxTake;
    }

    const take = +(
      req.query[paginationConstants.requestQueryParams.take]?.toString() ??
      req.header(paginationConstants.requestHeaders['x_pagination_take']) ??
      options.defaultTake
    );
    const skip = +(
      req.query[paginationConstants.requestQueryParams.skip]?.toString() ??
      req.header(paginationConstants.requestHeaders['x_pagination_skip']) ??
      options.defaultSkip
    );

    if (options.maxTake && take > options.maxTake) {
      res.header(
        paginationConstants.responseHeaders['x_pagination_max_take'],
        options.maxTake.toString(),
      );
      throw new BadRequestException(
        `Cannot fetch more than ${options.maxTake} items in one request`,
      );
    }

    const paginationContext: PaginationContext = {
      take,
      skip,
    };
    expressUtils.mergeContext(req, {
      pagination: paginationContext,
    });

    return next.handle().pipe(
      tap(() => {
        const currentPageHeader = res.getHeader(
          paginationConstants.responseHeaders[
            'x_pagination_currentPage_returned'
          ],
        );
        const totalPageHeader = res.getHeader(
          paginationConstants.responseHeaders['x_pagination_totalPages'],
        );

        if (currentPageHeader === undefined || totalPageHeader === undefined) {
          console.warn(
            chalk.yellow(
              'WARNING: Endpoint did not set Pagination response headers',
            ),
          );
        }
      }),
    );
  }
}
