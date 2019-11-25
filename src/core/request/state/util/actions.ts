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
  <T extends string>(type: T): Action<T>;
  <T extends string, P, U = {}>(type: T, payload: P, meta?: U): Action<T, P, U>;
}

export const action: ActionFunc = (type, payload = undefined, meta = {}) => ({
  type,
  meta,
  ...(payload && { payload }),
});

export const withMeta = <T extends string, P, U>(act: Action<T, P>, meta: U): Action<T, P, U> => ({
  ...act,
  meta: {
    ...(act.meta || {}),
    ...meta,
  },
});

// export const constantsCreator = (prefix: string) => (type: string) => ({
// [AsyncKeys.Request]: string(`${prefix}/${type}_REQUESTED`),
// [AsyncKeys.Success]: string(`${prefix}/${type}_SUCCESS`),
// [AsyncKeys.Failure]: string(`${prefix}/${type}_FAILURE`),
// });

interface RequestFunc {
  <T extends string, P>(type: T, payload: P, id?: string): Action<T, P, InProgressMeta>;
  <T extends string>(type: T): Action<T, undefined, InProgressMeta>;
}

interface SuccessFunc {
  <T extends string, P>(type: T, payload: P, messages?: string, id?: string): Action<
    T,
    P,
    SuccessMeta
  >;
  <T extends string>(type: T): Action<T, undefined, SuccessMeta>;
}

interface ErrorFunc {
  <T extends string, P>(type: T, err: StatusError, payload?: P, id?: string): Action<
    T,
    P,
    ErrorMeta
  >;
  <T extends string>(type: T, err: StatusError): Action<T, undefined, ErrorMeta>;
}

export const requestAction: RequestFunc = (type, payload = undefined, id = undefined) =>
  action<typeof type, typeof payload, InProgressMeta>(type, payload, {
    ...(id && { id }),
    state: RequestState.InProgress,
  });

export const successAction: SuccessFunc = (
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

export const asyncAction = {
  [AsyncKeys.Request]: requestAction,
  [AsyncKeys.Success]: successAction,
  [AsyncKeys.Failure]: errorAction,
};

const isInStateHelper = <
  ActionUnion extends UnknownAction,
  T extends string,
  U extends RequestState
>(
  state: U,
  act: ActionUnion,
  type?: T,
): act is ActionFromState<ActionUnion, typeof type extends undefined ? string : T, U> =>
  isRequestAction(act) && act.meta.state === state && (type ? act.type === type : true);

export const isInState = {
  [RequestState.InProgress]: <
    ActionUnion extends UnknownAction = UnknownAction,
    ActionType extends string = string
  >(
    act: ActionUnion,
    type?: ActionType,
  ): act is InProgressAction<ActionUnion, ActionType> =>
    isInStateHelper(RequestState.InProgress, act, type),
  [RequestState.Success]: <
    ActionUnion extends UnknownAction = UnknownAction,
    ActionType extends string = string
  >(
    act: ActionUnion,
    type?: ActionType,
  ): act is SuccessAction<ActionUnion, ActionType> =>
    isInStateHelper(RequestState.Success, act, type),
  [RequestState.Error]: <
    ActionUnion extends UnknownAction = UnknownAction,
    ActionType extends string = string
  >(
    act: ActionUnion,
    type?: ActionType,
  ): act is ErrorAction<ActionUnion, ActionType> => isInStateHelper(RequestState.Error, act, type),
};

export const requesting = <T extends string>(type: T) => (
  act: UnknownAction,
): act is InProgressAction<T> => isInState.inProgress(act, type);
