import { AxiosResponse } from 'axios';
import { ApiClient, ApiClientConfig } from '../../misc/ApiClient';
import { LogData } from '../logging.types';

export type BaseCustomLoggerApiClientConfigs = ApiClientConfig;

export abstract class BaseCustomLoggerApiClient extends ApiClient {
  constructor(configs: BaseCustomLoggerApiClientConfigs) {
    super(configs);
  }

  public abstract postLog(
    logData: Partial<LogData>,
    customConfigs?: Partial<BaseCustomLoggerApiClientConfigs>,
  ): Promise<AxiosResponse<any, any>> | undefined | null;
}
