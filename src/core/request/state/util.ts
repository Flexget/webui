import { createSelector } from 'reselect';
import { Action } from 'utils/actions';
import {
  InProgressAction,
  SuccessAction,
  ErrorAction,
  RequestAction,
  RequestState,
  Requests,
  Request,
} from './types';
import { RequestState as State } from './reducer';

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

export function isInState<T extends string>(
  act: RequestAction,
  state: RequestState.InProgress,
): act is InProgressAction<T>;
export function isInState<T extends string>(
  act: RequestAction,
  state: RequestState.Error,
): act is ErrorAction<T>;
export function isInState<T extends string>(
  act: RequestAction,
  state: RequestState.Success,
): act is SuccessAction<T>;
export function isInState(act, state) {
  return act.meta.state === state;
}

export const requesting = <T extends string>(type: T) => (
  act: RequestAction,
): act is InProgressAction<T> => act.type === type && isInState(act, RequestState.InProgress);

export function checkState<T extends string>(
  act: RequestAction,
  state: RequestState.InProgress,
): (type: T) => boolean;
export function checkState<T extends string>(
  act: RequestAction,
  state: RequestState.Error,
): (type: T) => boolean;
export function checkState<T extends string>(
  act: RequestAction,
  state: RequestState.Success,
): (type: T) => boolean;
export function checkState<T extends string>(act, state) {
  return (type: T) => act.type === type && isInState(act, state);
}

export const isRequestAction = (act: Action<string, unknown>): act is RequestAction =>
  !!(act.meta && (act.meta as Request).state);
