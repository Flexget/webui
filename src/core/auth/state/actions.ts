import { asyncAction, ActionsUnion, RequestsOfType as ROT } from 'core/request/state/util';

import { StatusError } from 'utils/fetch';

export const enum Constants {
  LOGIN = '@flexget/auth/LOGIN',
  LOGOUT = '@flexget/auth/LOGOUT',
}

const asyncActions = {
  login: {
    request: (username: string, password: string) =>
      asyncAction.request(Constants.LOGIN, { username, password }),
    success: () => asyncAction.success(Constants.LOGIN),
    failure: (err: StatusError) => asyncAction.failure(Constants.LOGIN, err),
  },
  logout: {
    request: () => asyncAction.request(Constants.LOGOUT),
    success: () => asyncAction.success(Constants.LOGOUT),
    failure: (err: StatusError) => asyncAction.failure(Constants.LOGOUT, err),
  },
};

export type ActionTypes = ActionsUnion<typeof asyncActions>;
export type RequestsOfType<T extends Constants> = ROT<ActionTypes, T>;

export default asyncActions;
