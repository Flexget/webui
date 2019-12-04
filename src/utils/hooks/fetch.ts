import { Reducer, useReducer, useEffect, useState, Dispatch, SetStateAction } from 'react';
import request, { Method, StatusError, APIResponse } from 'utils/fetch';
import { Action } from 'utils/hooks/actions';

interface LoadingState<T> {
  loading: boolean;
  error?: StatusError;
  resp: Response;
  resp?: APIResponse<T>;
}

interface SuccessState<T> {
  loading: false;
  error?: never;
  resp: APIResponse<T>;
}

interface FailState {
  loading: false;
  error: StatusError;
}

type State<T> = LoadingState<T> | SuccessState<T> | FailState;

const enum Constants {
  START = '@flexget/request/START',
  SUCCESS = '@flexget/request/SUCCESS',
  FAILURE = '@flexget/request/FAILURE',
}

type StartAction = Action<Constants.START>;
type SuccessAction<T> = Action<Constants.SUCCESS, APIResponse<T>>;
type FailAction = Action<Constants.FAILURE, StatusError>;

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
      };
    case Constants.FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

interface UseFetch {
  <Res>(method: Method, url: string): readonly [State<Res>, Dispatch<SetStateAction<undefined>>];
  <Req, Res>(method: Method, url: string, initialBody: Req): readonly [
    State<Res>,
    Dispatch<SetStateAction<Req>>,
  ];
}

export const useFetch = <Req, Res>(url: string, dependencies?: any[] ) => {
  const [state, dispatch] = useReducer<Reducer<State<Res>, Actions<Res>>>(dataFetchReducer, {
    loading: false,
  });

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      dispatch({ type: Constants.START });

      try {
        let payload: APIResponse<Res>;
        if (method !== Method.Get && method !== Method.Delete) {
          payload = await request[method]<Req | undefined, Res>(url, body);
        } else {
          payload = await request[method]<Res>(url);
        }

        if (!cancelled) {
          dispatch({ type: Constants.SUCCESS, payload });
        }
      } catch (error) {
        if (!cancelled) {
          // TODO: once we have auth hook, logout if status is 401;
          dispatch({ type: Constants.FAILURE, payload: error });
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, [body, method, url]);

  return [state, setBody] as const;
};
