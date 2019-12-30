import { useEffect, useRef, useCallback, useState, useReducer } from 'react';
import { Method, APIResponse, request, StatusError, ErrorResponse, camelize } from 'utils/fetch';
import { AuthContainer } from 'core/auth/container';
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
    [method, setLoggedIn, url],
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
  Closed = EventSource.CLOSED,
  Connecting = EventSource.CONNECTING,
  Open = EventSource.OPEN,
}

export const useFlexgetStream = <Message>(url: string) => {
  const [readyState, setReadyState] = useState<ReadyState>(ReadyState.Connecting);

  const stream = useRef<Oboe>();
  const baseURI = useRef(uriParser(document.baseURI));
  const [messages, addMessage] = useReducer(
    (state: Message[], message: Message | 'clear') =>
      message !== 'clear' ? [message, ...state] : [],
    [],
  );

  const clear = useCallback(() => addMessage('clear'), []);

  const connect = useCallback(() => setReadyState(ReadyState.Connecting), []);

  const disconnect = useCallback(() => {
    stream.current?.abort();
    stream.current = undefined;
    setReadyState(ReadyState.Closed);
  }, []);

  useEffect(() => {
    if (stream.current) {
      disconnect();
      connect();
    }

    return disconnect;
  }, [connect, disconnect, url]);

  useEffect(() => {
    if (readyState === ReadyState.Connecting) {
      clear();
      stream.current = oboe({
        url: `${baseURI.current.pathname}api${url}`,
        method: Method.Get,
      })
        .start(() => setReadyState(ReadyState.Open))
        .node('{message task}', (message: Message) => addMessage(camelize(message)))
        .fail(() => setReadyState(ReadyState.Closed));
    }
  }, [clear, readyState, url]);

  return [
    { messages, readyState },
    { connect, disconnect, clear },
  ] as const;
};
