import { createSelector } from 'reselect';
import { Action, action } from 'utils/actions';
import { StatusError } from 'utils/fetch';
import {
  InProgressAction,
  InProgressRequest,
  SuccessRequest,
  RequestAction,
  RequestState,
  Requests,
  Request,
  ActionFromState,
  ErrorRequest,
} from './types';
import { State } from './reducer';

export const generateRequestSelector = (actions: string[]) =>
  createSelector<{ request: State; id?: string }, Requests, string | undefined, Requests>(
    ({ request }) => request.requests,
    ({ id }) => id,
    (requests, id) =>
      Object.entries(requests)
        .filter(
          ([requestAction, payload]) =>
            actions.includes(requestAction) && (!id || payload.id === id),
        )
        .reduce((acc, [requestAction, payload]) => ({ ...acc, [requestAction]: payload }), {}),
  );

export const getErrors = (requests: Requests) =>
  Object.values(requests).filter(req => req.state === RequestState.Error);

export const getInfo = (requests: Requests) =>
  Object.values(requests).filter(req => req.state === RequestState.Success);

export const anyInState = (requests: Requests, state: RequestState) =>
  Object.values(requests).some(request => request.state === state);

export const isInState = <T extends string, U extends RequestState>(
  act: RequestAction,
  state: U,
): act is ActionFromState<T, U> => act.meta.state === state;

export const requesting = <T extends string>(type: T) => (
  act: RequestAction,
): act is InProgressAction<T> => act.type === type && isInState(act, RequestState.InProgress);

export const checkState = <T extends string, U extends RequestState>(
  act: RequestAction,
  state: U,
) => (type: T) => act.type === type && isInState<T, U>(act, state);

export const isRequestAction = (act: Action<string, unknown, unknown>): act is RequestAction =>
  !!(act.meta && (act.meta as Request).state);

interface LoadFunc {
  <T extends string, P>(type: T, payload: P, id?: string): Action<T, P, InProgressRequest>;
  <T extends string>(type: T): Action<T, undefined, InProgressRequest>;
}

interface SuccessFunc {
  <T extends string, P>(type: T, payload: P, messages?: string, id?: string): Action<
    T,
    P,
    SuccessRequest
  >;
  <T extends string>(type: T): Action<T, undefined, SuccessRequest>;
}

interface ErrorFunc {
  <T extends string, P>(type: T, err: StatusError, payload: P, id?: string): Action<
    T,
    P,
    ErrorRequest
  >;
  <T extends string>(type: T, err: StatusError): Action<T, undefined, ErrorRequest>;
}

export const requestLoad: LoadFunc = (type, payload = undefined, id = undefined) =>
  action<typeof type, typeof payload, InProgressRequest>(type, payload, {
    ...(id && { id }),
    state: RequestState.InProgress,
  });

export const requestSuccess: SuccessFunc = (
  type,
  payload = undefined,
  message = undefined,
  id = undefined,
) =>
  action<typeof type, typeof payload, SuccessRequest>(type, payload, {
    ...(id && { id }),
    ...(message && { message }),
    state: RequestState.Success,
  });

export const requestError: ErrorFunc = (type, err, payload = undefined, id = undefined) =>
  action<typeof type, typeof payload, ErrorRequest>(type, payload, {
    message: err.message,
    statusCode: err.status || 0,
    ...(id && { id }),
    state: RequestState.Error,
  });
