import { ADD_ROUTE } from './actions';

export default function reducer(state = {}, { type, payload }) {
  switch (type) {
    case ADD_ROUTE:
      return {
        ...state,
        [payload.path]: {
          component: payload.component,
          name: payload.routeDisplayName,
          icon: payload.routeIcon,
          path: payload.path,
        },
      };
    default: // eslint-disable-line no-fallthrough
      return state;
  }
}
