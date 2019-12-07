import { useEffect, useRef, useCallback, useState } from 'react';
import { Method, APIResponse, request, isError, StatusError } from 'utils/fetch';
import { AuthContainter } from 'core/auth/container';
import { uriParser } from 'utils';

export const useFlexgetAPI = <Res>(url: string, method: Method = Method.Get) => {
  const [, setLoggedIn] = AuthContainter.useContainer();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<StatusError | undefined>();
  const cancelled = useRef(false);
  const baseURI = useRef(uriParser(document.baseURI));

  const requestFn = useCallback(
    async (body: unknown = undefined) => {
      setLoading(true);
      const payload: APIResponse<Res> = await request<Res, unknown>(
        `${baseURI.current.pathname}api${url}`,
        method,
        body,
      );

      if (cancelled.current) {
        return undefined;
      }
      if (payload.status === 401) {
        setLoggedIn(false);
      }
      setLoading(false);
      if (isError(payload)) {
        setError(payload.error);
        return undefined;
      }
      return payload;
    },
    [method, setLoggedIn, url],
  );

  useEffect(
    () => () => {
      cancelled.current = true;
    },
    [],
  );

  return [{ error, loading }, requestFn] as const;
};
