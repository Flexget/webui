import { useEffect, useRef, useCallback, useState } from 'react';
import { Method, APIResponse, request, StatusError, ErrorResponse } from 'utils/fetch';
import { AuthContainer } from 'core/auth/container';
import { uriParser } from 'utils';

export const useFlexgetAPI = <Res>(url: string, method: Method = Method.Get) => {
  const [, setLoggedIn] = AuthContainer.useContainer();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<StatusError | undefined>();
  const controller = useRef(new AbortController());
  const baseURI = useRef(uriParser(document.baseURI));

  const requestFn = useCallback(
    async (body: unknown = undefined) => {
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
    [method, setLoggedIn, url],
  );

  useEffect(
    () => () => {
      controller.current.abort();
    },
    [],
  );

  return [{ error, loading }, requestFn] as const;
};
