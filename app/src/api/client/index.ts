import axios, { AxiosError, AxiosInstance } from 'axios';
import axiosRefresh from 'axios-auth-refresh';
import axiosRetry, { exponentialDelay } from 'axios-retry';
import { axiosAuth } from './auth';
import { axiosError } from './errors';

type RefreshHandlerFn = (token: string) => Promise<any>;
export class Client {
  private accessToken = '';
  private client: AxiosInstance;
  private refreshHandler: RefreshHandlerFn | null = null;
  private token = '';

  get: AxiosInstance['get'];
  delete: AxiosInstance['delete'];
  head: AxiosInstance['head'];
  options: AxiosInstance['options'];
  post: AxiosInstance['post'];
  put: AxiosInstance['put'];
  patch: AxiosInstance['patch'];

  constructor() {
    this.client = axios.create({ baseURL: APP_CONFIG.api.url });
    axiosAuth(this.client, this.getAccessToken);
    axiosRefresh(this.client, this.refreshToken, {
      skipWhileRefreshing: false,
    });
    axiosRetry(this.client, { retries: 4, retryDelay: exponentialDelay });
    axiosError(this.client);

    this.get = this.client.get;
    this.delete = this.client.delete;
    this.head = this.client.head;
    this.options = this.client.options;
    this.post = this.client.post;
    this.put = this.client.put;
    this.patch = this.client.patch;
  }

  getAccessToken = () => this.accessToken;
  getRefreshToken = () => this.token;

  setDefaultHeader = (header: string, value: string, type = 'common') => {
    this.client.defaults.headers[type][header] = value;
  };

  setAccessToken = (token: string) => {
    this.accessToken = token;
  };

  setRefreshToken = (token: string) => {
    this.token = token;
  };

  setRefreshHandler = (handler: RefreshHandlerFn | null) => {
    this.refreshHandler = handler;
  };

  refreshToken = (error?: AxiosError) => {
    if (
      error &&
      (error?.response?.data?.code !== 'InvalidCredentials' ||
        !error?.response?.data?.message?.includes?.('Expired'))
    ) {
      return Promise.reject(error);
    }

    return (
      this.refreshHandler?.(this.getRefreshToken()) || Promise.reject(error)
    );
  };
}

export const client = new Client();
export { ApiError, ApiErrorType } from './errors';
