import { useEffect, useRef, useCallback, useState, useReducer } from 'react';
import { Method, APIResponse, request, StatusError, ErrorResponse, camelize } from 'utils/fetch';
import { AuthContainer } from 'core/auth/hooks';
import { uriParser } from 'utils';
import { useContainer } from 'unstated-next';
import oboe, { Oboe } from 'oboe';

export interface RequestState {
  error?: StatusError;
  loading: boolean;
}

export type APIRequest<Response = unknown, Request = unknown> = (
  body?: Request,
) => Promise<APIResponse<Response>>;

export function useFlexgetAPI<Response>(
  url: string,
  method: Method = Method.Get,
  skipCamelize = false,
): [RequestState, APIRequest<Response>] {
  const [, setLoggedIn] = useContainer(AuthContainer);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<StatusError>();
  const controller = useRef(new AbortController());
  const baseURI = useRef(uriParser(document.baseURI));

  const requestFn = useCallback(
    async (body: unknown = undefined) => {
      try {
        setLoading(true);
        const payload: APIResponse<Response> = await request<Response, unknown>(
          `${baseURI.current.pathname}api${url}`,
          method,
          body,
          { signal: controller.current.signal },
          skipCamelize,
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
    [method, setLoggedIn, skipCamelize, url],
  );

  useEffect(
    () => () => {
      controller.current.abort();
    },
    [],
  );

  return [{ loading, error }, requestFn];
}

export enum ReadyState {
  Closed,
  Connecting,
  Open,
}

export const useFlexgetStream = (url: string) => {
  const [readyState, setReadyState] = useState<ReadyState>(ReadyState.Connecting);

  const [stream, setStream] = useState<Oboe>();
  const baseURI = useRef(uriParser(document.baseURI));

  const connect = useCallback(() => setReadyState(ReadyState.Connecting), []);

  const disconnect = useCallback(() => setReadyState(ReadyState.Closed), []);

  useEffect(() => {
    if (readyState === ReadyState.Connecting) {
      setStream(s => {
        s?.abort();

        return oboe({
          url: `${baseURI.current.pathname}api${url}`,
          method: Method.Get,
        })
          .start(() => setReadyState(ReadyState.Open))
          .fail(() => setReadyState(ReadyState.Closed));
      });
    } else if (readyState === ReadyState.Closed) {
      setStream(s => {
        s?.abort();
        return undefined;
      });
    }
  }, [readyState, url]);

  return [
    { stream, readyState },
    { connect, disconnect },
  ] as const;
};
