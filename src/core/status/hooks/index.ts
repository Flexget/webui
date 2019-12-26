import { useCallback, useReducer, useEffect, Reducer, useRef } from 'react';
import { createContainer, useContainer } from 'unstated-next';
import uuid from 'uuid/v4';
import { action } from 'utils/hooks/actions';

const enum Constants {
  SET_LOADING = '@flexget/status/SET_LOADING',
  PUSH_ERROR = '@flexget/status/PUSH_ERROR',
  POP_ERROR = '@flexget/status/POP_ERROR',
  PUSH_INFO = '@flexget/status/PUSH_INFO',
  POP_INFO = '@flexget/status/POP_INFO',
  CLEAR = '@flexget/status/CLEAR',
}

export const actions = {
  setLoading: (id: string, loading: boolean) => action(Constants.SET_LOADING, { [id]: loading }),
  pushError: (error: Error) => action(Constants.PUSH_ERROR, error),
  popError: () => action(Constants.POP_ERROR),
  pushInfo: (message: string) => action(Constants.PUSH_INFO, message),
  popInfo: () => action(Constants.POP_INFO),
  clear: () => action(Constants.CLEAR),
};

type Actions = PropReturnType<typeof actions>;

export interface State {
  loading: Record<string, boolean>;
  info: string[];
  errors: Error[];
}

const initState: State = {
  loading: {},
  info: [],
  errors: [],
};

const statusReducer: Reducer<State, Actions> = (state, act) => {
  switch (act.type) {
    case Constants.SET_LOADING:
      return {
        ...state,
        loading: {
          ...state.loading,
          ...act.payload,
        },
      };
    case Constants.PUSH_ERROR:
      return {
        ...state,
        errors: [...state.errors, act.payload],
      };
    case Constants.POP_ERROR:
      return {
        ...state,
        errors: state.errors.slice(1),
      };
    case Constants.PUSH_INFO:
      return {
        ...state,
        info: [...state.info, act.payload],
      };
    case Constants.POP_INFO:
      return {
        ...state,
        info: state.info.slice(1),
      };
    case Constants.CLEAR:
      return initState;
    default:
      return state;
  }
};

export const StatusContainer = createContainer(() => {
  return useReducer(statusReducer, initState);
});

export const useGlobalStatus = (loading: boolean, error?: Error) => {
  const id = useRef(uuid());
  const [, dispatch] = useContainer(StatusContainer);

  useEffect(() => {
    if (error) {
      dispatch(actions.pushError(error));
    }
    dispatch(actions.setLoading(id.current, loading));
  }, [dispatch, error, loading]);
};

export const useGlobalInfo = () => {
  const [, dispatch] = useContainer(StatusContainer);
  return useCallback((message: string) => dispatch(actions.pushInfo(message)), [dispatch]);
};
