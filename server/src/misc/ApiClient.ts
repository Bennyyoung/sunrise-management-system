  import axios, { AxiosRequestConfig } from 'axios';
import { KeyValuePair } from './types/helperTypes';
import * as _ from 'lodash';
import { AxiosResponse } from 'axios';

export type ApiClientConfig = {
  baseUrl: string;
  headers?: KeyValuePair<string>;
  axiosConfig?: AxiosRequestConfig;

  getBearerToken?: (
    axiosConfig: AxiosRequestConfig,
    clientConfig?: ApiClientConfig,
  ) => Promise<string>;
  getDefaultHeaders?: (
    axiosConfig: AxiosRequestConfig,
    clientConfig?: ApiClientConfig,
  ) => Promise<KeyValuePair<string>>;
  transformRequest?: (
    axiosConfig: AxiosRequestConfig,
  ) => Promise<AxiosRequestConfig>;
  transformResponse?: (response: AxiosResponse) => Promise<AxiosResponse>;
};

export class ApiClient {
  private readonly apiClientConfig: ApiClientConfig | null = null;

  constructor(config: ApiClientConfig) {
    this.apiClientConfig = config;
  }

  getConfig() {
    return this.apiClientConfig;
  }

  getInstance(_config?: Partial<ApiClientConfig>) {
    if (!this.apiClientConfig) {
      throw 'Api not initialized';
    }

    const instanceConfig = _.merge(_.cloneDeep(this.apiClientConfig), _config);

    let axiosRequestConfig: AxiosRequestConfig = {
      baseURL: instanceConfig.baseUrl,
      withCredentials: true,
      timeout: 10000,
    };
    axiosRequestConfig = _.merge(
      axiosRequestConfig,
      instanceConfig.axiosConfig ?? {},
    );

    const axiosInstance = axios.create(axiosRequestConfig);

    // Pre-request handling
    axiosInstance.interceptors.request.use(async (config) => {
      if (config.headers === undefined) {
        config.headers = {};
      }
      if (config.data === undefined) {
        config.data = {};
      }

      /**
       *  Transform request here if needed
       */

      if (!this.apiClientConfig) {
        throw new axios.Cancel('Api not initialized');
      }

      const defaultBearerToken =
        (await instanceConfig.getBearerToken?.(config, instanceConfig)) ?? '';
      const defaultHeaders =
        (await instanceConfig.getDefaultHeaders?.(config, instanceConfig)) ??
        {};

      if (defaultBearerToken && defaultBearerToken.trim() != '') {
        config.headers['Authorization'] = `Bearer ${defaultBearerToken}`;
      }

      config.headers = {
        ...defaultHeaders,
        ...(instanceConfig.headers ?? {}),
        ...config.headers,
      };

      if (instanceConfig.transformRequest) {
        config = await instanceConfig.transformRequest?.(config);
      }

      return config;
    });

    // Post-response handling
    axiosInstance.interceptors.response.use(async (response) => {
      /**
       * Transform response here if needed
       */

      if (instanceConfig?.transformResponse) {
        response = await instanceConfig.transformResponse?.(response);
      }

      return response;
    });

    return axiosInstance;
  }
}
