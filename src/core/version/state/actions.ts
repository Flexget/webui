import { RequestsOfType as ROT } from 'core/status/state/types';
import { ActionsUnion } from 'utils/actions';
import { StatusError } from 'utils/fetch';
import { requestLoad, requestError, requestSuccess } from 'core/request/state/util';

export enum Constants {
  GET_VERSION = '@flexget/version/GET_VERSION',
}

export interface Version {
  apiVersion: string;
  flexgetVersion: string;
  latestVersion: string;
}

const actions = {
  getVersion: {
    request: () => requestLoad(Constants.GET_VERSION),
    success: (data: Version) => requestSuccess(Constants.GET_VERSION, data),
    failure: (err: StatusError) => requestError(Constants.GET_VERSION, err),
  },
};

export type ActionTypes = ActionsUnion<typeof actions>;
export type RequestsOfType<T extends Constants> = ROT<ActionTypes, T>;

export default actions;
