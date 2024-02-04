import {
  Injectable,
  LoggerService,
  Scope,
  LogLevel as NestLogLevel,
  Inject,
} from '@nestjs/common';
import { LogData } from '../../logging.types';
import { WinstonLogger } from '../WinstonLogger';
import { LogLevel } from '../../logLevels';
import { LoggerModuleOptions } from './types/logger-module.types';
import { LoggerOptionsProviderToken } from './logger-options-provider';
import { RequestContext } from '../../../misc/express/index';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NestLoggerRequestContext {
  //
}

@Injectable({ scope: Scope.TRANSIENT })
export class NestLogger implements LoggerService {
  /**
   * By default, when NestJS calls the logger for any default logging,
   * it passes the message first, and then the scenario.
   *
   * But in our logger, we accept event first, and then the message.
   *
   * Therefore, when creating a logger that will be used by NestJS internally, we should set this to true
   *
   * @seeAlso setInternalNestJsMode
   */
  private internalNestJsMode = false;

  private winstonLogger: WinstonLogger;

  constructor(
    @Inject(LoggerOptionsProviderToken)
    private readonly options: LoggerModuleOptions,
  ) {
    this.winstonLogger = new WinstonLogger('', options);
  }

  logWithRequestContext(
    level: LogLevel,
    event: string,
    message: string,
    requestContext?: RequestContext | null,
    logData: Partial<LogData> = {},
  ) {
    logData.trackingId = requestContext?.trackingId ?? logData.trackingId;
    logData.context = requestContext?.loggerContext ?? logData.context;

    if (this.internalNestJsMode) {
      switch (level) {
        case 'error':
          if (requestContext) {
            logData.exception = message;
            logData.origin = requestContext as any as string;
          } else {
            logData.origin = message;
          }
          break;
        default:
          logData.origin = message;
          break;
      }

      message = event;
      event = '';
    }

    this.winstonLogger.log(level, event, message, logData);
  }

  /**
   * Write a 'fatal' level log.
   */
  fatal(
    event: string,
    message: string,
    requestContext?: RequestContext | null,
    exception?: unknown,
    logData: Partial<LogData> = {},
  ) {
    logData.exception = logData.exception ?? exception;
    this.logWithRequestContext(
      'fatal',
      event,
      message,
      requestContext,
      logData,
    );
  }

  /**
   * Write an 'error' level log.
   */
  error(
    event: string,
    message: string,
    requestContext?: RequestContext | null,
    exception?: unknown,
    logData: Partial<LogData> = {},
  ) {
    logData.exception = logData.exception ?? exception;
    this.logWithRequestContext(
      'error',
      event,
      message,
      requestContext,
      logData,
    );
  }

  /**
   * Write a 'warn' level log.
   */
  warn(
    event: string,
    message: string,
    requestContext?: RequestContext | null,
    logData: Partial<LogData> = {},
  ) {
    this.logWithRequestContext('warn', event, message, requestContext, logData);
  }

  /**
   * Write an 'info' level log.
   *
   * For compatibility with Nest
   */
  log(
    event: string,
    message: string,
    requestContext?: RequestContext | null,
    logData: Partial<LogData> = {},
  ) {
    this.logWithRequestContext('info', event, message, requestContext, logData);
  }

  /**
   * Write an 'info' level log.
   */
  info(
    event: string,
    message: string,
    requestContext?: RequestContext | null,
    logData: Partial<LogData> = {},
  ) {
    this.logWithRequestContext('info', event, message, requestContext, logData);
  }

  /**
   * Write a 'debug' level log.
   */
  debug(
    event: string,
    message: string,
    requestContext?: RequestContext | null,
    logData: Partial<LogData> = {},
  ) {
    this.logWithRequestContext(
      'debug',
      event,
      message,
      requestContext,
      logData,
    );
  }

  /**
   * Write a 'trace' level log.
   */
  trace(
    event: string,
    message: string,
    requestContext?: RequestContext | null,
    logData: Partial<LogData> = {},
  ) {
    this.logWithRequestContext(
      'trace',
      event,
      message,
      requestContext,
      logData,
    );
  }

  setOrigin(origin: string) {
    this.winstonLogger.setOrigin(origin);
  }

  /**
   * Switches logger to use default NestJS Logger parameter ordering
   *
   * By default, when NestJS calls the logger for any default logging,
   * it passes the message first, and then the scenario.
   *
   * But in our logger, we accept event first, and then the message.
   *
   * Therefore, when creating a logger that will be used by NestJS internally, set this to true
   *
   * @param internalNestJsMode boolean
   */
  setInternalNestJsMode(internalNestJsMode: boolean) {
    this.internalNestJsMode = internalNestJsMode;
  }

  /**
   * Set log levels
   * @param levels log levels
   */
  setAllowedLogLevels(levels: LogLevel[]) {
    this.winstonLogger.setLogLevels(levels);
  }

  /**
   * @Deprecated
   *
   * Use setAllowedLogLevels instead
   *
   * Set nest log levels
   * @param levels nest log levels
   */
  public setLogLevels(levels: NestLogLevel[]) {
    this.warn(
      'nest-logger-invalid-usage',
      'Avoid using setLogLevel! Use setAllowedLogLevels instead!',
      null,
    );

    const logLevels: LogLevel[] = levels.map((l) => {
      switch (l) {
        case 'log':
          return 'info';
        case 'verbose':
          return 'trace';
      }
      return l;
    });
    this.winstonLogger.setLogLevels(logLevels);
  }
}
