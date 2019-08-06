import { GET_VERSION } from './actions';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_VERSION: {
      const { apiVersion: api, flexgetVersion: flexget, latestVersion: latest } = action.payload;

      return { api, flexget, latest };
    }
    default:
      return state;
  }
}
