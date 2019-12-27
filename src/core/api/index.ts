import { useEffect, useRef, useCallback, useState, useMemo } from 'react';
import { Method, APIResponse, request, StatusError, ErrorResponse } from 'utils/fetch';
import { AuthContainer } from 'core/auth/container';
import { uriParser } from 'utils';
import { useContainer } from 'unstated-next';
import is from 'utils/is';

export interface RequestState {
  error?: StatusError;
  loading: boolean;
}

type URLCreator = (...args: any[]) => string;

export type APIRequestCreator<T extends any[], Res = unknown, Req = unknown> = (
  ...args: T
) => APIRequest<Res, Req>;

export type APIRequest<Res = unknown, Req = unknown> = (body?: Req) => Promise<APIResponse<Res>>;

export type APIRequester<
  T extends URLCreator | string,
  Res = unknown,
  Req = unknown
> = T extends URLCreator ? APIRequestCreator<Parameters<T>, Res, Req> : APIRequest<Res, Req>;

export function useFlexgetAPI<Res, Req = unknown>(
  urlCreator: string,
  method?: Method,
): [RequestState, APIRequest<Res, Req>];
export function useFlexgetAPI<Res, T extends URLCreator, Req = unknown>(
  urlCreator: T,
  method?: Method,
): [RequestState, APIRequestCreator<Parameters<T>, Res, Req>];
export function useFlexgetAPI<Res>(
  urlCreator: URLCreator | string,
  method: Method = Method.Get,
): [RequestState, APIRequester<typeof urlCreator, Res>] {
  const [, setLoggedIn] = useContainer(AuthContainer);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<StatusError>();
  const controller = useRef(new AbortController());
  const baseURI = useRef(uriParser(document.baseURI));

  const requestFn = useCallback(
    async (url, body: unknown = undefined) => {
      try {
        setLoading(true);
        const payload: APIResponse<Res> = await request<Res, unknown>(
          `${baseURI.current.pathname}api${url}`,
          method,
          body,
          { signal: controller.current.signal },
        );

        if (payload.status === 401) {
          setLoggedIn(false);
        }
        setLoading(false);
        if (!payload.ok) {
          setError(payload.error);
        }
        return payload;
      } catch (err) {
        return { ok: false, error: err, data: err } as ErrorResponse;
      }
    },
    [method, setLoggedIn],
  );

  useEffect(
    () => () => {
      controller.current.abort();
    },
    [],
  );

  const state = { error, loading };
  const fn = useMemo(() => {
    if (is.string(urlCreator)) {
      return (body: unknown = undefined) => requestFn(urlCreator, body);
    }
    return (...args: Parameters<typeof urlCreator>) => (body: unknown = undefined) =>
      requestFn(urlCreator(...args), body);
  }, [requestFn, urlCreator]);

  return [state, fn];
}
