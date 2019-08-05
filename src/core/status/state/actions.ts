import { action, ActionsUnion, Action } from 'utils/actions';
import { StatusError } from 'utils/fetch';

export const enum Constants {
  LOADING_STATUS = 'LOADING_STATUS',
  ERROR_STATUS = 'ERROR_STATUS',
  CLOSE_STATUS = 'CLOSE_STATUS',
  INFO_STATUS = 'INFO_STATUS',
}

export function clearStatus() {
  return {
    type: Constants.CLOSE_STATUS,
  };
}

function load<T extends string, P>(type: T, payload: P): Action<Constants.LOADING_STATUS, P, T>;
function load<T extends string>(type: T): Action<Constants.LOADING_STATUS, undefined, T>;
function load(type: any, payload = undefined) {
  return action(Constants.LOADING_STATUS, payload, {
    type,
  });
}

const actions = {
  load,
  error: <T extends string>(type: T, err: StatusError) =>
    action(Constants.ERROR_STATUS, {
      message: err.message,
      statusCode: err.status,
      type,
    }),
  clearStatus: () => action(Constants.CLOSE_STATUS),
};

export type ActionTypes = ActionsUnion<typeof actions>;

export default actions;
