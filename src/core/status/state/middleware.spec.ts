import configureMockStore from 'redux-mock-store';
import { action, withMeta } from 'utils/actions';
import statusMiddleware from './middleware';
import actions from './actions';

const ACTION = 'ACTION';
const mockStore = configureMockStore([statusMiddleware]);
const store = mockStore({});

describe('core/status/data/middleware', () => {
  afterEach(() => store.clearActions());

  it('should dispatch INFO_STATUS and the original action if message is set', () => {
    const message = 'A message';
    const act = withMeta(action(ACTION), { message });
    store.dispatch(act);
    expect(store.getActions()).toEqual([actions.info(ACTION, message), act]);
  });
});
