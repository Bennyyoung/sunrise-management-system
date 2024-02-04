import { LogLevel } from './logLevels';

export type LogData = {
  app: LogDataAppInfo;
  timestamp: string;
  level: LogLevel;
  event: string;
  message: string;
  origin: string;
  trackingId?: string;
  exception?: unknown;
  properties?: unknown;
  context?: unknown;
};

export type LogDataAppInfo = {
  id: string;
  version: string;
  environment: string;
  customInfo?: unknown;
};
