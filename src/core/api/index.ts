import { Reducer, useReducer, useEffect, useRef, useCallback } from 'react';
import {
  Method,
  StatusError,
  APIResponse,
  request,
  TypedResponse,
  ErrorResponse,
} from 'utils/fetch';
import { Action } from 'utils/hooks/actions';
import { AuthContainter } from 'core/auth/container';

interface State<T> {
  loading: boolean;
  error?: StatusError;
  resp?: APIResponse<T>;
  data?: T;
}

const enum Constants {
  START = '@flexget/request/START',
  SUCCESS = '@flexget/request/SUCCESS',
  FAILURE = '@flexget/request/FAILURE',
}

type StartAction = Action<Constants.START>;
type SuccessAction<T> = Action<Constants.SUCCESS, TypedResponse<T>>;
type FailAction = Action<Constants.FAILURE, ErrorResponse>;
type Actions<T> = StartAction | SuccessAction<T> | FailAction;

export type ResponseMapper<I, O> = (s: State<I>) => O;

const dataFetchReducer = <T>(state: State<T>, action: Actions<T>): State<T> => {
  switch (action.type) {
    case Constants.START:
      return {
        ...state,
        loading: true,
      };
    case Constants.SUCCESS:
      return {
        loading: false,
        resp: action.payload,
        data: action.payload.data,
      };
    case Constants.FAILURE:
      return {
        loading: false,
        error: action.payload.error,
        resp: action.payload,
      };
    default:
      return state;
  }
};

export const useFlexgetAPI = <Res>(url: string) => {
  const [, setLoggedIn] = AuthContainter.useContainer();
  const [state, dispatch] = useReducer<Reducer<State<Res>, Actions<Res>>>(dataFetchReducer, {
    loading: false,
  });
  const cancelled = useRef(false);

  const requestFn = useCallback(
    <Req = undefined>(method: Method, body: Req) => {
      const fn = async () => {
        dispatch({ type: Constants.START });

        const payload = await request<Res, Req>(`/api${url}`, method, body);

        if (cancelled.current) {
          return undefined;
        }
        if ('error' in payload) {
          if (payload.status === 401) {
            setLoggedIn(false);
          }
          dispatch({ type: Constants.FAILURE, payload });
        } else {
          dispatch({ type: Constants.SUCCESS, payload });
        }
        return payload;
      };
      return fn();
    },
    [setLoggedIn, url],
  );

  useEffect(
    () => () => {
      cancelled.current = true;
    },
    [],
  );

  const req = {
    get: useCallback(() => requestFn(Method.Get, undefined), [requestFn]),
    post: useCallback(<T>(body?: T) => requestFn(Method.Post, body), [requestFn]),
    put: useCallback(<T>(body?: T) => requestFn(Method.Put, body), [requestFn]),
    patch: useCallback(<T>(body?: T) => requestFn(Method.Patch, body), [requestFn]),
    del: useCallback(() => requestFn(Method.Delete, undefined), [requestFn]),
  };

  return [state, req] as const;
};
