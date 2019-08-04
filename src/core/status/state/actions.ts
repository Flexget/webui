import { action, ActionsUnion } from 'utils/actions';
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

const actions = {
  load: <T extends string, P>(type: T, payload?: P) =>
    action(Constants.LOADING_STATUS, payload, { type }),
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
