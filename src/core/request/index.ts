import { Reducer, useReducer, useEffect, useState } from 'react';
import { StatusError, get, APIResponse } from 'utils/fetch';

interface LoadingState<T> {
  isLoading: true;
  error?: StatusError;
  resp?: APIResponse<T>;
}

interface SuccessState<T> {
  isLoading: false;
  error?: never;
  resp: APIResponse<T>;
}

interface FailState {
  isLoading: false;
  error: StatusError;
}

type State<T> = LoadingState<T> | SuccessState<T> | FailState;

const enum Constants {
  START = '@flexget/request/START',
  SUCCESS = '@flexget/request/SUCCESS',
  FAILURE = '@flexget/request/FAILURE',
}

interface StartAction {
  type: Constants.START;
}

interface SuccessAction<T> {
  type: Constants.SUCCESS;
  payload: APIResponse<T>;
}

interface FailAction {
  type: Constants.FAILURE;
  payload: Error;
}

type Action<T> = StartAction | SuccessAction<T> | FailAction;

export type ResponseMapper<I, O> = (s: State<I>) => O;

const dataFetchReducer = <T>(state: State<T>, action: Action<T>): State<T> => {
  switch (action.type) {
    case Constants.START:
      return {
        ...state,
        isLoading: true,
      };
    case Constants.SUCCESS:
      return {
        isLoading: false,
        resp: action.payload,
      };
    case Constants.FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error();
  }
};

export const useFetchData = <T>(initialUrl: string) => {
  const [url, setUrl] = useState(initialUrl);
  const [state, dispatch] = useReducer<Reducer<State<T>, Action<T>>>(dataFetchReducer, {
    isLoading: false,
  });

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      dispatch({ type: Constants.START });

      try {
        const payload = await get<T>(url);

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
  }, [url]);

  return [state, setUrl] as const;
};
