import statusActions from 'core/status/state/actions';
import { RequestsOfType as ROT } from 'core/status/state/types';
import { action, ActionsUnion } from 'utils/actions';
import { StatusError } from 'utils/fetch';

export const enum Constants {
  SERVER_OPERATION = '@flexget/server/SERVER_OPERATION',
}

export const enum Operation {
  Reload = 'reload',
  Shutdown = 'shutdown',
}

const actions = {
  serverOperation: {
    request: (operation: Operation) =>
      statusActions.load(Constants.SERVER_OPERATION, { operation }),
    success: () => action(Constants.SERVER_OPERATION),
    failure: (err: StatusError) => statusActions.error(Constants.SERVER_OPERATION, err),
  },
};

export type ActionTypes = ActionsUnion<typeof actions>;
export type RequestsOfType<T extends Constants> = ROT<ActionTypes, T>;

export default actions;
