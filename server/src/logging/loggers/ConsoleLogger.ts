import _ from 'lodash';
import { BaseCustomLogger, BaseCustomLoggerOptions } from './BaseCustomLogger';
import { LogData } from '../logging.types';
import { LogLevel } from '../logLevels';

export type ConsoleLoggerOptions = {
  stringifyJson?: boolean;
} & Partial<BaseCustomLoggerOptions>;

export class ConsoleLogger extends BaseCustomLogger {
  private static globalOptions: Partial<ConsoleLoggerOptions> = {};

  private consoleOptions: ConsoleLoggerOptions;
  constructor(origin = '', options: Partial<ConsoleLoggerOptions> = {}) {
    super(origin, _.merge(ConsoleLogger.globalOptions, options));

    const defaultOptions: ConsoleLoggerOptions = {
      stringifyJson: true,
    };
    this.consoleOptions = _.merge(
      ConsoleLogger.globalOptions,
      defaultOptions,
      options,
    );
  }

  static configure(options: Partial<ConsoleLoggerOptions>) {
    ConsoleLogger.globalOptions = options;
  }

  protected override writeLog(logData: LogData): void {
    const consoleLogLevel: keyof typeof console =
      this.mapLogLevelToConsoleLogLevel(logData.level);
    const logFunc = console[consoleLogLevel];

    if (this.consoleOptions.stringifyJson) {
      logFunc?.(JSON.stringify(logData));
    } else {
      logFunc?.(logData);
    }
  }

  protected override writeLogMessage(level: LogLevel, message: string): void {
    const consoleLogLevel: keyof typeof console =
      this.mapLogLevelToConsoleLogLevel(level);
    const logFunc = console[consoleLogLevel];
    logFunc?.(message);
  }

  private mapLogLevelToConsoleLogLevel(level: LogLevel) {
    switch (level) {
      case 'fatal':
        return 'error';
    }

    return level;
  }
}
