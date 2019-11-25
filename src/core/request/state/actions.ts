import { action, ActionsUnion } from './util';

export const enum Constants {
  CLEAR_ALL_REQUESTS = '@flexget/request/CLEAR_ALL_REQUESTS',
  CLEAR_REQUEST = '@flexget/request/CLEAR_REQUEST',
}

const actions = {
  clearAll: () => action(Constants.CLEAR_ALL_REQUESTS),
  clear: (requestActions: string[]) => action(Constants.CLEAR_REQUEST, { requestActions }),
};

export type ActionTypes = ActionsUnion<typeof actions>;

export default actions;
