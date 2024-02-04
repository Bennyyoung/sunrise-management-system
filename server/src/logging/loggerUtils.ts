import { LogLevel, logLevelList } from './logLevels';

/**
 * @Deprecated
 */
let globalMaxLogLevel: LogLevel = 'info';

export const loggerUtils = {
  getLogLevelIndex(level: LogLevel) {
    return logLevelList.indexOf(level);
  },

  getLogLevelsUpto(maxLevel: LogLevel) {
    const maxLevelIndex = loggerUtils.getLogLevelIndex(maxLevel);
    return logLevelList.filter((_, i) => {
      return i <= maxLevelIndex;
    });
  },

  /**
   * @Deprecated
   */
  canLog(level: LogLevel, maxLevel: LogLevel) {
    const levelIndex = this.getLogLevelIndex(level);
    const maxLevelIndex = this.getLogLevelIndex(maxLevel);

    if (levelIndex <= maxLevelIndex) {
      return true;
    }

    return false;
  },

  /**
   * @Deprecated
   */
  log(msg: any, level: LogLevel = 'info', overrideMaxLevel?: LogLevel) {
    overrideMaxLevel ??= globalMaxLogLevel;

    if (!loggerUtils.canLog(level, overrideMaxLevel)) {
      return;
    }

    const consoleLogLevel: keyof typeof console =
      loggerUtils.mapLogLevelToConsoleLogLevel(level);
    console[consoleLogLevel]?.(msg);
  },

  /**
   * @Deprecated
   */
  error(msg: any) {
    this.log(msg, 'error');
  },

  /**
   * @Deprecated
   */
  warn(msg: any) {
    this.log(msg, 'warn');
  },

  /**
   * @Deprecated
   */
  info(msg: any) {
    this.log(msg, 'info');
  },

  /**
   * @Deprecated
   */
  debug(msg: any) {
    this.log(msg, 'debug');
  },

  /**
   * @Deprecated
   */
  trace(msg: any) {
    this.log(msg, 'trace');
  },

  mapLogLevelToConsoleLogLevel(level: LogLevel) {
    switch (level) {
      case 'fatal':
        return 'error';
    }

    return level;
  },

  /**
   * @Deprecated
   */
  getGlobalMaxLogLevel() {
    return globalMaxLogLevel;
  },

  /**
   * @Deprecated
   */
  setGlobalMaxLogLevel(level: LogLevel) {
    globalMaxLogLevel = level;
  },
};
