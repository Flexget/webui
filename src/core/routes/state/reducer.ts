import { Constants, ActionTypes } from './actions';
import { Route } from './types';

export interface State {
  [k: string]: Route;
}

const initState: State = {};

export default function reducer(state = initState, action: ActionTypes): State {
  switch (action.type) {
    case Constants.ADD_ROUTE: {
      const { payload } = action;
      return {
        ...state,
        [payload.path]: {
          component: payload.component,
          name: payload.routeDisplayName,
          Icon: payload.routeIcon,
          path: payload.children ? undefined : payload.path,
          children:
            payload.children &&
            payload.children.map(child => ({
              component: child.component,
              name: child.routeDisplayName,
              Icon: child.routeIcon,
              path: `${payload.path}/${child.name}`,
            })),
        },
      };
    }
    default:
      return state;
  }
}
