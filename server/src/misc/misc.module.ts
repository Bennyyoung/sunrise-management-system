import { Global, Module } from '@nestjs/common';
import { PaginationInterceptor } from './pagination/pagination.interceptor';

@Global()
@Module({
  providers: [PaginationInterceptor],
  exports: [PaginationInterceptor],
})
export class MiscModule {}
