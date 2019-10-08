import { RouteConfig } from 'core/registry/types';
import { action, ActionsUnion } from 'utils/actions';

export const enum Constants {
  ADD_ROUTE = '@flexget/routes/ADD_ROUTE',
}

const actions = {
  addRoute: (cfg: RouteConfig) => action(Constants.ADD_ROUTE, cfg),
};

export type ActionTypes = ActionsUnion<typeof actions>;

export default actions;
