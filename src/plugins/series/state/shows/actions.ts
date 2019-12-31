import statusActions from 'core/status/state/actions';
import { action, ActionsUnion } from 'utils/actions';
import { StatusError } from 'utils/fetch';
import { RequestsOfType as ROT } from 'core/status/state/types';
import { Show, GetShowOptions } from '../../types';

export const enum Constants {
  GET_SHOWS = '@flexget/series/shows/GET_SHOWS',
  CREATE_SHOW = '@flexget/series/shows/CREATE_SHOWS',
}

const actions = {
  getShows: {
    request: (data: GetShowOptions) => statusActions.load(Constants.GET_SHOWS, data),
    success: (data: Show[], headers: Headers) => action(Constants.GET_SHOWS, { data, headers }),
    failure: (err: StatusError) => statusActions.error(Constants.GET_SHOWS, err),
  },
};

export type ActionTypes = ActionsUnion<typeof actions>;
export type RequestsOfType<T extends Constants> = ROT<ActionTypes, T>;

export default actions;
