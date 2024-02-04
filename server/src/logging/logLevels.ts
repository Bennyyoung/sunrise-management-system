export const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
} as const;
export type LogLevel = keyof typeof logLevels;
export type LogLevelIndex = typeof logLevels[keyof typeof logLevels];

export const logLevelList = Object.keys(logLevels) as LogLevel[];
