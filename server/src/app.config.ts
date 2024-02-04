import { LoggerModuleOptions } from './logging/loggers/nestLogger/types/logger-module.types';
import { loggerUtils } from './logging/loggerUtils';
import { logLevelList } from './logging/logLevels';

export enum ServerMode {
  dev = 'dev',
  prod = 'prod',
}

export const appConfig = {
  mode: process.env.MODE as ServerMode,
  environment: process.env.ENVIRONMENT,
  appName: process.env.APP_NAME,

  get isDev() {
    return appConfig.mode === ServerMode.dev;
  },

  http: {
    port: +(process.env.HTTP_PORT ?? '5000'),
    cors: {
      whitelist: process.env.CORS_WHITELIST?.split(' ') ?? [],
      allowWithoutOrigin: process.env.CORS_ALLOW_WITHOUT_ORIGIN,
    },
    get fakeDelayTime() {
      if (appConfig.isDev) {
        return +(process.env.FAKE_DELAY_TIME ?? '0');
      }

      return 0;
    },
    fakeDelayOrigins: process.env.FAKE_DELAY_ORIGINS?.split(' ') ?? [],
    requestLimit: {
      windowMins: +(process.env.REQUEST_LIMIT_WINDOW_MINS ?? '15'),
      max: +(process.env.REQUEST_LIMIT_MAX ?? '0'),
    },
  },
  baseUrl: process.env.BASE_URL,
  databaseUrl: process.env.DATABASE_URL,
  devKey: process.env.DEV_KEY,
  storage: {
    basePath: './storage',
    get tempPath() {
      return `${appConfig.storage.basePath}/temp`;
    },
  },

  spaces: {
    accessKey: process.env.SPACES_ACCESS_KEY,
    secretKey: process.env.SPACES_SECRET_KEY,
    originEndpoint: process.env.SPACES_ORIGIN_ENDPOINT ?? '',
    cdnEndpoint: process.env.SPACES_CDN_ENDPOINT ?? '',
    defaultBucket: process.env.SPACES_DEFAULT_BUCKET ?? '',
  },

  logging: {
    get options() {
      const options: LoggerModuleOptions = {
        logLevels: appConfig.isDev
          ? logLevelList
          : loggerUtils.getLogLevelsUpto('info'),
        appInfo: {
          id: 'sunrise-system-management-system-server',
          version: '1.0.0',
          environment: appConfig.environment ?? 'unknown',
        },
        writeMessageOnly: appConfig.isDev,
      };
      return options;
    },
  },
  jwtAccessToken: {
    secret: process.env.JWT_ACCESS_TOKEN_SECRET,
    expiresIn: process.env.ACCESS_TOKEN_JWT_EXPIRES_IN,
  },
  jwtRefreshToken: {
    secret: process.env.JWT_REFRESH_TOKEN_SECRET,
    expiresIn: process.env.REFRESH_TOKEN_JWT_EXPIRES_IN,
  },
  otpSecret: {
    TOTP: process.env.TOTP_SECRET,
    ENCODE: process.env.ENCODE_DATA_SECRET,
  },
};
