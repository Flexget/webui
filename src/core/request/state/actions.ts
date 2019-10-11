import { action, ActionsUnion, Action, withMeta } from 'utils/actions';
import { StatusError } from 'utils/fetch';
import { InProgressRequest, RequestState, ErrorRequest, SuccessRequest } from './types';

export const enum Constants {
  CLEAR_REQUESTS = 'CLEAR_REQUESTS',
}

function load<T extends string, P>(
  type: T,
  payload: P,
  id?: string,
): Action<T, P, InProgressRequest>;
function load<T extends string>(type: T): Action<T, undefined, InProgressRequest>;
function load<T extends string>(type: T, payload = undefined, id = undefined) {
  return action<T, typeof payload, InProgressRequest>(type, payload, {
    id,
    state: RequestState.InProgress,
  });
}

function success<T extends string>(type: T): Action<T, undefined, SuccessRequest>;
function success<T extends string, P>(
  type: T,
  payload: P,
  message?: string,
  id?: string,
): Action<T, P, SuccessRequest>;
function success<T extends string>(
  type: T,
  payload = undefined,
  message = undefined,
  id = undefined,
) {
  return action<T, typeof payload, SuccessRequest>(type, payload, {
    id,
    state: RequestState.Success,
    message,
  });
}

const actions = {
  load,
  success,
  error: <T extends string>(type: T, err: StatusError, id?: string) =>
    withMeta<T, undefined, ErrorRequest>(action(type), {
      message: err.message,
      statusCode: err.status || 0,
      id,
      state: RequestState.Error,
    }),
  clear: () => action(Constants.CLEAR_REQUESTS),
};

export type ActionTypes = ActionsUnion<typeof actions>;

export default actions;
