import { StatusError } from 'utils/fetch';
import {
  AsyncKeys,
  Action,
  InProgressMeta,
  SuccessMeta,
  ErrorMeta,
  RequestState,
  UnknownAction,
  AsyncAction,
  RequestMeta,
  ActionFromState,
  InProgressAction,
  SuccessAction,
  ErrorAction,
} from './types';


interface ActionFunc {
  <T extends symbol>(type: T): Action<T>;
  <T extends symbol, P, U = {}>(type: T, payload: P, meta?: U): Action<T, P, U>;
}

export const action: ActionFunc = (type, payload = undefined, meta = {}) => ({
  type,
  meta,
  ...(payload && { payload }),
});

export const withMeta = <T extends symbol, P, U>(act: Action<T, P>, meta: U): Action<T, P, U> => ({
  ...act,
  meta: {
    ...(act.meta || {}),
    ...meta,
  },
});

export const constantsCreator = (prefix: string) => (type: string) => ({
  [AsyncKeys.Request]: Symbol(`${prefix}/${type}_REQUESTED`),
  [AsyncKeys.Success]: Symbol(`${prefix}/${type}_SUCCESS`),
  [AsyncKeys.Failure]: Symbol(`${prefix}/${type}_FAILURE`),
});

interface RequestFunc {
  <T extends symbol, P>(type: T, payload: P, id?: string): Action<T, P, InProgressMeta>;
  <T extends symbol>(type: T): Action<T, undefined, InProgressMeta>;
}

interface SuccessFunc {
  <T extends symbol, P>(type: T, payload: P, messages?: string, id?: string): Action<
    T,
    P,
    SuccessMeta
  >;
  <T extends symbol>(type: T): Action<T, undefined, SuccessMeta>;
}

interface ErrorFunc {
  <T extends symbol, P>(type: T, err: StatusError, payload?: P, id?: string): Action<
    T,
    P,
    ErrorMeta
  >;
  <T extends symbol>(type: T, err: StatusError): Action<T, undefined, ErrorMeta>;
}

const requestAction: RequestFunc = (type, payload = undefined, id = undefined) =>
  action<typeof type, typeof payload, InProgressMeta>(type, payload, {
    ...(id && { id }),
    state: RequestState.InProgress,
  });

const successAction: SuccessFunc = (
  type,
  payload = undefined,
  message = undefined,
  id = undefined,
) =>
  action<typeof type, typeof payload, SuccessMeta>(type, payload, {
    ...(id && { id }),
    ...(message && { message }),
    state: RequestState.Success,
  });

export const errorAction: ErrorFunc = (type, err, payload = undefined, id = undefined) =>
  action<typeof type, typeof payload, ErrorMeta>(type, payload, {
    message: err.message,
    statusCode: err.status || 0,
    ...(id && { id }),
    state: RequestState.Error,
  });

export const isRequestAction = (act: UnknownAction): act is AsyncAction =>
  !!(act.meta && (act.meta as RequestMeta).state);

export default {
  [AsyncKeys.Request]: requestAction,
  [AsyncKeys.Success]: successAction,
  [AsyncKeys.Failure]: errorAction,
};

const isInStateHelper = <T extends symbol, U extends RequestState>(
  state: U,
  act: UnknownAction,
  type?: T,
): act is ActionFromState<typeof type extends undefined ? symbol : T, U> =>
  isRequestAction(act) && act.meta.state === state && (type ? act.type === type : true);

export const isInState = {
  [RequestState.InProgress]: <T extends symbol = symbol>(
    act: UnknownAction,
    type?: T,
  ): act is InProgressAction<T> => isInStateHelper(RequestState.InProgress, act, type),
  [RequestState.Success]: <T extends symbol = symbol>(
    act: UnknownAction,
    type?: T,
  ): act is SuccessAction<T> => isInStateHelper(RequestState.Success, act, type),
  [RequestState.Error]: <T extends symbol = symbol>(
    act: UnknownAction,
    type?: T,
  ): act is ErrorAction<T> => isInStateHelper(RequestState.Error, act, type),
};

export const requesting = <T extends symbol>(type: T) => (
  act: UnknownAction,
): act is InProgressAction<T> => isInState.inProgress(act, type);
