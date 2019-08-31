import { action, ActionsUnion, Action, Meta } from 'utils/actions';
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

export interface TypeMeta<T extends string> extends Meta<string> {
  readonly type: T;
}

function load<T extends string, P>(
  type: T,
  payload: P,
): Action<Constants.LOADING_STATUS, P, TypeMeta<T>>;
function load<T extends string>(type: T): Action<Constants.LOADING_STATUS, undefined, TypeMeta<T>>;
function load<T extends string>(type: T, payload = undefined) {
  return action<
    Constants.LOADING_STATUS,
    typeof payload extends infer P ? P : undefined,
    TypeMeta<T>
  >(Constants.LOADING_STATUS, payload, {
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
  clear: () => action(Constants.CLOSE_STATUS),
  info: <T extends string>(type: T, message: string) =>
    action(Constants.INFO_STATUS, { type, message }),
};

export type ActionTypes = ActionsUnion<typeof actions>;

export default actions;
