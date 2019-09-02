import statusActions from 'core/status/state/actions';
import { RequestsOfType as ROT } from 'core/status/state/types';
import { action, ActionsUnion } from 'utils/actions';
import { StatusError } from 'utils/fetch';

export const enum Constants {
  GET_VERSION = '@flexget/version/GET_VERSION',
}

export interface Version {
  apiVersion: string;
  flexgetVersion: string;
  latestVersion: string;
}

const actions = {
  getVersion: {
    request: () => statusActions.load(Constants.GET_VERSION),
    success: (data: Version) => action(Constants.GET_VERSION, data),
    failure: (err: StatusError) => statusActions.error(Constants.GET_VERSION, err),
  },
};

export type ActionTypes = ActionsUnion<typeof actions>;
export type RequestsOfType<T extends Constants> = ROT<ActionTypes, T>;

export default actions;
