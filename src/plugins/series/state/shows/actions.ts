import { asyncAction, ActionsUnion, RequestsOfType as ROT } from 'core/request/state/util';
import { StatusError } from 'utils/fetch';

import { Show, GetShowOptions } from './types';

export const enum Constants {
  GET_SHOWS = '@flexget/series/shows/GET_SHOWS',
  CREATE_SHOW = '@flexget/series/shows/CREATE_SHOWS',
}

const actions = {
  getShows: {
    request: (data: GetShowOptions) => asyncAction.request(Constants.GET_SHOWS, data),
    success: (data: Show[], headers: Headers) =>
      asyncAction.success(Constants.GET_SHOWS, { data, headers }),
    failure: (err: StatusError) => asyncAction.failure(Constants.GET_SHOWS, err),
  },
};

export type ActionTypes = ActionsUnion<typeof actions>;
export type RequestsOfType<T extends Constants> = ROT<ActionTypes, T>;

export default actions;
