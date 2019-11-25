import {
  RequestsOfType as ROT,
  ActionsUnion,
  requestAction,
  errorAction,
  successAction,
} from 'core/request/state/util';

import { StatusError } from 'utils/fetch';

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
    request: () => requestAction(Constants.GET_VERSION),
    success: (data: Version) => successAction(Constants.GET_VERSION, data),
    failure: (err: StatusError) => errorAction(Constants.GET_VERSION, err),
  },
};

export type ActionTypes = ActionsUnion<typeof actions>;
export type RequestsOfType<T extends Constants> = ROT<ActionTypes, T>;

export default actions;
