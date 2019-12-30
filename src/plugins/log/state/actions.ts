import { action, ActionsUnion } from 'utils/actions';
import statusActions from 'core/status/state/actions';
import { RequestsOfType as ROT } from 'core/status/state/types';
import { StatusError } from 'utils/fetch';
import { LogMessage } from '../types';

export const enum Constants {
  LOG_CONNECT = '@flexget/log/LOG_CONNECT',
  LOG_MESSAGE = '@flexget/log/LOG_MESSAGE',
  LOG_DISCONNECT = '@flexget/log/LOG_DISCONNECT',
  LOG_CLEAR = '@flexget/log/LOG_CLEAR',
}

interface ConnectParams {
  query: string;
  lines: string;
}

const actions = {
  connect: {
    request: (params: ConnectParams) => statusActions.load(Constants.LOG_CONNECT, params),
    success: () => action(Constants.LOG_CONNECT),
    failure: (err: StatusError) => statusActions.error(Constants.LOG_CONNECT, err),
  },
  message: (message: LogMessage) => action(Constants.LOG_MESSAGE, message),
  disconnect: () => action(Constants.LOG_DISCONNECT),
  clear: () => action(Constants.LOG_CLEAR),
};

export type ActionTypes = ActionsUnion<typeof actions>;
export type RequestsOfType<T extends Constants> = ROT<ActionTypes, T>;

export default actions;
