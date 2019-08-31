import statusActions from 'core/status/state/actions';
import { StatusError } from 'utils/fetch';
import { action, ActionsUnion } from 'utils/actions';
import { RequestsOfType as ROT } from 'core/status/state/types';
import { GetHistoryOptions, History } from './types';

export const enum Constants {
  GET_HISTORY = '@flexget/history/GET_HISTORY',
}

const actions = {
  getHistory: {
    request: (data: GetHistoryOptions) => statusActions.load(Constants.GET_HISTORY, data),
    success: (data: History[], headers: Headers, refresh: boolean) =>
      action(Constants.GET_HISTORY, { data, headers, refresh }),
    failure: (err: StatusError) => statusActions.error(Constants.GET_HISTORY, err),
  },
};

export type ActionTypes = ActionsUnion<typeof actions>;
export type RequestsOfType<T extends Constants> = ROT<ActionTypes, T>;

export default actions;
