import { useFetch, Options } from 'use-http';
import { isError, prepareRequest, Method, camelize } from 'utils/fetch';
import { AuthContainter } from 'core/auth/container';

export const useFlexgetAPI = <PayloadType>(url: string, onMount = false) => {
  const [, { logout }] = AuthContainter.useContainer();

  const options: Options = {
    interceptors: {
      request: (opts: Options) => ({
        ...opts,
        ...prepareRequest(opts.method as Method, opts.body && JSON.parse(opts.body as string)),
      }),
      response: response => {
        if (response.status === 401) {
          logout();
        }

        if (!isError(response.data, response.status)) {
          response.data = camelize<PayloadType>(response.data);
        }

        return response;
      },
    },
  };

  return useFetch<PayloadType>(`/api/${url}`, options, onMount ? [] : undefined);
};
