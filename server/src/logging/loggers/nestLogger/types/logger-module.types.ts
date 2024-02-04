import { WinstonLoggerOptions } from '../../WinstonLogger';

export type LoggerModuleOptions = {
  behindProxy?: boolean;
} & WinstonLoggerOptions;
