import { BaseCustomLogger, BaseCustomLoggerOptions } from './BaseCustomLogger';
import { LogData } from '../logging.types';
import { LogLevel, logLevels } from '../logLevels';
import _ from 'lodash';
import * as winston from 'winston';

export type WinstonLoggerOptions = Partial<winston.LoggerOptions> &
  Partial<BaseCustomLoggerOptions>;

export class WinstonLogger extends BaseCustomLogger {
  private static globalOptions: Partial<WinstonLoggerOptions> = {};

  winstonLogger: winston.Logger;

  constructor(origin = '', options: Partial<WinstonLoggerOptions> = {}) {
    super(origin, _.merge(WinstonLogger.globalOptions, options));

    const defaultOptions: WinstonLoggerOptions = {
      format: winston.format.json(),
      transports: [
        new winston.transports.Console({
          format: options.writeMessageOnly
            ? winston.format.cli()
            : winston.format.json(),
        }),
      ],
      levels: logLevels,
    };
    this.winstonLogger = winston.createLogger(
      _.merge(WinstonLogger.globalOptions, defaultOptions, options),
    );
  }

  static configure(options: Partial<WinstonLoggerOptions>) {
    WinstonLogger.globalOptions = options;
  }

  protected writeLog(logData: LogData): void {
    this.winstonLogger.log(logData);
  }

  protected writeLogMessage(level: LogLevel, message: string): void {
    this.winstonLogger.log({
      level,
      message,
    });
  }
}
