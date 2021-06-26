import type { AxiosInstance } from 'axios';

export function axiosAuth(client: AxiosInstance, accessToken: () => string) {
  return client.interceptors.request.use((request) => {
    if (!request.url?.includes('/oauth') && !!accessToken()) {
      request.headers.Authorization = `Bearer ${accessToken()}`;
    }

    return request;
  });
}
