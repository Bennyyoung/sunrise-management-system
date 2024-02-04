import { NestLogger } from './nestLogger';
import { LoggerModuleOptions } from './types/logger-module.types';

export class InternalNestLogger extends NestLogger {
  constructor(options: LoggerModuleOptions = {}) {
    super(options);
    this.setInternalNestJsMode(true);
  }
}
