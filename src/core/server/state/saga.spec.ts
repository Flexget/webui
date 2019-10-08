import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { post } from 'utils/fetch';
import { withMeta } from 'utils/actions';
import actions, { Operation } from './actions';
import { manageServer } from './saga';

describe('core/server/data/sage', () => {
  describe('manageServer', () => {
    describe('success', () => {
      const action = actions.serverOperation.request(Operation.Reload);

      it('should work', () =>
        expectSaga(manageServer, action)
          .provide([
            [call(post, '/server/manage', action.payload), { data: { message: 'message' } }],
          ])
          .call(post, '/server/manage', action.payload)
          .put(withMeta(actions.serverOperation.success(), { message: 'message' }))
          .run());
    });

    describe('failure', () => {
      const action = actions.serverOperation.request(Operation.Shutdown);

      it('should error', () =>
        expectSaga(manageServer, action)
          .provide({
            call() {
              throw new Error('ERROR');
            },
          })
          .call(post, '/server/manage', action.payload)
          .put(actions.serverOperation.failure(new Error('ERROR')))
          .run());
    });
  });
});
