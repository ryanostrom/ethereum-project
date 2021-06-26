import type { AxiosError, AxiosInstance } from 'axios';

export enum ApiErrorType {
  Client = 'CLIENT',
  Internal = 'INTERNAL',
  Network = 'NETWORK',
  Server = 'SERVER',
}

export class ApiError extends Error {
  static Types = ApiErrorType;

  constructor(
    public type: ApiErrorType,
    public status: number = 0,
    public data: Record<string, unknown> = {},
    public code = '',
  ) {
    super(`API ERROR - ${type}`);

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export function axiosError(client: AxiosInstance) {
  return client.interceptors.response.use(undefined, (error: AxiosError) => {
    if (error.response) {
      const type =
        error.response.status >= 500
          ? ApiErrorType.Server
          : ApiErrorType.Client;

      return Promise.reject(
        new ApiError(
          type,
          error.response.status,
          error.response.data,
          error.response.data?.code,
        ),
      );
    }

    if (error instanceof ApiError) {
      return Promise.reject(error);
    }

    if (error.request) {
      return Promise.reject(new ApiError(ApiErrorType.Network));
    }

    return Promise.reject(new ApiError(ApiErrorType.Internal));
  });
}
