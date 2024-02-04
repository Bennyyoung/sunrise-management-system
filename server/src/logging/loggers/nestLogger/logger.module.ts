import { Module, Global, DynamicModule } from '@nestjs/common';
import { NestLogger } from './nestLogger';
import { LoggerModuleOptions } from './types/logger-module.types';
import { LoggerOptionsProviderToken } from './logger-options-provider';

@Global()
@Module({})
export class LoggerModule {
  static register(options: LoggerModuleOptions): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        {
          provide: LoggerOptionsProviderToken,
          useValue: options,
        },
        NestLogger,
      ],
      exports: [NestLogger],
    };
  }
}
