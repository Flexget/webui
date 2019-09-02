import statusActions from 'core/status/state/actions';
import { RequestsOfType as ROT } from 'core/status/state/types';
import { action, ActionsUnion } from 'utils/actions';
import { StatusError } from 'utils/fetch';

export const enum Constants {
  LOGIN = '@flexget/auth/LOGIN',
  LOGOUT = '@flexget/auth/LOGOUT',
}

const actions = {
  login: {
    request: (username: string, password: string) =>
      statusActions.load(Constants.LOGIN, { username, password }),
    success: () => action(Constants.LOGIN),
    failure: (err: StatusError) => statusActions.error(Constants.LOGIN, err),
  },
  logout: {
    request: () => statusActions.load(Constants.LOGOUT),
    success: () => action(Constants.LOGOUT),
    failure: (err: StatusError) => statusActions.error(Constants.LOGOUT, err),
  },
};

export type ActionTypes = ActionsUnion<typeof actions>;
export type RequestsOfType<T extends Constants> = ROT<ActionTypes, T>;

export default actions;
