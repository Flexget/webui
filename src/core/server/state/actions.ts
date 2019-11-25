import { StatusError } from 'utils/fetch';
import {
  requestAction,
  successAction,
  errorAction,
  ActionsUnion,
  RequestsOfType as ROT,
} from 'core/request/state/util';

export const enum Constants {
  SERVER_OPERATION = '@flexget/server/SERVER_OPERATION',
}

export const enum Operation {
  Reload = 'reload',
  Shutdown = 'shutdown',
}

const actions = {
  serverOperation: {
    request: (operation: Operation) => requestAction(Constants.SERVER_OPERATION, { operation }),
    success: () => successAction(Constants.SERVER_OPERATION),
    failure: (err: StatusError) => errorAction(Constants.SERVER_OPERATION, err),
  },
};

export type ActionTypes = ActionsUnion<typeof actions>;
export type RequestsOfType<T extends Constants> = ROT<ActionTypes, T>;

export default actions;
