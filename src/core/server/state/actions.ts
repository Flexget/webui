import { RequestsOfType as ROT } from 'core/request/state/types';
import { ActionsUnion } from 'utils/actions';
import { StatusError } from 'utils/fetch';
import { requestLoad, requestSuccess, requestError } from 'core/request/state/util';

export const enum Constants {
  SERVER_OPERATION = '@flexget/server/SERVER_OPERATION',
}

export const enum Operation {
  Reload = 'reload',
  Shutdown = 'shutdown',
}

const actions = {
  serverOperation: {
    request: (operation: Operation) => requestLoad(Constants.SERVER_OPERATION, { operation }),
    success: () => requestSuccess(Constants.SERVER_OPERATION),
    failure: (err: StatusError) => requestError(Constants.SERVER_OPERATION, err),
  },
};

export type ActionTypes = ActionsUnion<typeof actions>;
export type RequestsOfType<T extends Constants> = ROT<ActionTypes, T>;

export default actions;
