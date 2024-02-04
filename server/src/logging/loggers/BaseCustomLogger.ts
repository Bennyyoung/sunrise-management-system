import { LogLevel, logLevelList } from '../logLevels';
import { LogData, LogDataAppInfo } from '../logging.types';
import moment from 'moment';
import _ from 'lodash';
import { BaseCustomLoggerApiClient } from '../loggerApiClients/BaseCustomLoggerApiClient';
import { helperUtils } from '../../misc/helperUtils';

export type BaseCustomLoggerOptions = {
  /**
   * Enabled log levels
   *
   * Only the enabled log levels will be emitted
   */
  logLevels: LogLevel[];

  /**
   * Application info
   *
   * Will be emitted with every log
   */
  appInfo: LogDataAppInfo;

  /**
   * Use Global Tracking ID
   */
  useGlobalTrackingId?: boolean;

  /**
   * Option to write message only. Useful during local development
   */
  writeMessageOnly?: boolean;
};

export abstract class BaseCustomLogger {
  private static TRACKING_ID = helperUtils.uuid.getUniqueId();

  private origin: string;
  private baseOptions: BaseCustomLoggerOptions;
  private apiClient: BaseCustomLoggerApiClient | null = null;

  protected abstract writeLog(logData: LogData): void;
  protected abstract writeLogMessage(level: LogLevel, message: string): void;

  constructor(origin: string, options: Partial<BaseCustomLoggerOptions>) {
    this.origin = origin;
    const defaultOptions: BaseCustomLoggerOptions = {
      logLevels: options.logLevels ?? (logLevelList as LogLevel[]),
      appInfo: {
        id: 'unknown',
        version: '0.0.0',
        environment: 'unknown',
      },
    };
    this.baseOptions = _.merge(defaultOptions, options);
  }

  private createDefaultLogData(
    level: LogLevel,
    event: string,
    message: string,
  ): LogData {
    return {
      app: this.baseOptions.appInfo,
      trackingId: this.baseOptions.useGlobalTrackingId
        ? BaseCustomLogger.TRACKING_ID
        : '',
      timestamp: moment().utc().toISOString(),
      level: level,
      event: event,
      message: message,
      origin: this.origin,
    };
  }

  /**
   * Write a log
   */
  log(
    level: LogLevel,
    event: string,
    message: string,
    logData: Partial<LogData> = {},
  ) {
    if (!this.isLevelEnabled(level)) {
      return;
    }

    const defaultLogData = this.createDefaultLogData(level, event, message);
    const mergedLogData = _.merge(defaultLogData, logData);

    if (this.baseOptions.writeMessageOnly) {
      const localTime = moment(mergedLogData.timestamp)
        .local()
        .format('Y-M-D HH:mm:ss');
      let formattedMessage = `${localTime} - `;
      if (mergedLogData.event) {
        formattedMessage += `${mergedLogData.event} - `;
      }
      formattedMessage += mergedLogData.message;
      this.writeLogMessage(mergedLogData.level, formattedMessage.trim());

      if (mergedLogData.exception) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const exceptionStr =
          (mergedLogData.exception as any).stack || mergedLogData.exception;
        this.writeLogMessage(mergedLogData.level, exceptionStr);
      }
    } else {
      this.writeLog(mergedLogData);
    }

    if (this.apiClient) {
      this.apiClient?.postLog(mergedLogData);
    }
  }

  /**
   * Write a 'fatal' level log.
   */
  fatal(
    event: string,
    message: string,
    exception?: unknown,
    logData: Partial<LogData> = {},
  ) {
    logData.exception = logData.exception ?? exception;
    this.log('fatal', event, message, logData);
  }

  /**
   * Write an 'error' level log.
   */
  error(
    event: string,
    message: string,
    exception?: unknown,
    logData: Partial<LogData> = {},
  ) {
    logData.exception = logData.exception ?? exception;
    this.log('error', event, message, logData);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(event: string, message: string, logData: Partial<LogData> = {}) {
    this.log('warn', event, message, logData);
  }

  /**
   * Write an 'info' level log.
   */
  info(event: string, message: string, logData: Partial<LogData> = {}) {
    this.log('info', event, message, logData);
  }

  /**
   * Write a 'debug' level log.
   */
  debug(event: string, message: string, logData: Partial<LogData> = {}) {
    this.log('debug', event, message, logData);
  }

  /**
   * Write a 'trace' level log.
   */
  trace(event: string, message: string, logData: Partial<LogData> = {}) {
    this.log('trace', event, message, logData);
  }

  /**
   * Set logger origin
   * @param origin origin
   */
  setOrigin(origin: string) {
    this.origin = origin;
  }

  /**
   * Set log levels
   * @param levels log levels
   */
  setLogLevels(levels: LogLevel[]) {
    this.baseOptions.logLevels = levels;
  }

  isLevelEnabled(level: LogLevel) {
    return this.baseOptions.logLevels.includes(level);
  }

  static resetTrackingId() {
    BaseCustomLogger.TRACKING_ID = helperUtils.uuid.getUniqueId();
  }
}
