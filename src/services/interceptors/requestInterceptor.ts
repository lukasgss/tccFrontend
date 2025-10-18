import { InternalAxiosRequestConfig } from "axios";

export default function requestInterceptor(config: InternalAxiosRequestConfig) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { urlParams = {} } = config as { urlParams: { [key: string]: string } };

  Object.entries(urlParams).forEach(([key, value]) => {
    // eslint-disable-next-line no-param-reassign
    config.url = config.url?.replace(`:${key}`, encodeURIComponent(value));
  });

  return config;
}
