import { asyncAction, ActionsUnion, RequestsOfType as ROT } from 'core/request/state/util';
import { StatusError } from 'utils/fetch';

import { GetHistoryOptions, History } from './types';

export const enum Constants {
  GET_HISTORY = '@flexget/history/GET_HISTORY',
}

const actions = {
  getHistory: {
    request: (data: GetHistoryOptions) => asyncAction.request(Constants.GET_HISTORY, data),
    success: (data: History[], headers: Headers, refresh?: boolean) =>
      asyncAction.success(Constants.GET_HISTORY, { data, headers, refresh }),
    failure: (err: StatusError) => asyncAction.failure(Constants.GET_HISTORY, err),
  },
};

export type ActionTypes = ActionsUnion<typeof actions>;
export type RequestsOfType<T extends Constants> = ROT<ActionTypes, T>;

export default actions;
