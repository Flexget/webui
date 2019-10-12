import { requestLoad, requestError, requestSuccess } from 'core/request/state/util';
import { RequestsOfType as ROT } from 'core/request/state/types';
import { ActionsUnion } from 'utils/actions';
import { StatusError } from 'utils/fetch';

export const enum Constants {
  LOGIN = '@flexget/auth/LOGIN',
  LOGOUT = '@flexget/auth/LOGOUT',
}

const actions = {
  login: {
    request: (username: string, password: string) =>
      requestLoad(Constants.LOGIN, { username, password }),
    success: () => requestSuccess(Constants.LOGIN),
    failure: (err: StatusError) => requestError(Constants.LOGIN, err),
  },
  logout: {
    request: () => requestLoad(Constants.LOGOUT),
    success: () => requestSuccess(Constants.LOGOUT),
    failure: (err: StatusError) => requestError(Constants.LOGOUT, err),
  },
};

export type ActionTypes = ActionsUnion<typeof actions>;
export type RequestsOfType<T extends Constants> = ROT<ActionTypes, T>;

export default actions;
