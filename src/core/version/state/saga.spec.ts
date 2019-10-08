import { expectSaga } from 'redux-saga-test-plan';
import { get } from 'utils/fetch';
import { delay, call } from 'redux-saga/effects';
import { getVersion } from './saga';
import actions from './actions';

describe('core/version/data/saga', () => {
  describe('getVersion', () => {
    describe('success', () => {
      it('should work', () => {
        const version = {
          apiVersion: '1.1.1',
          flexgetVersion: '1.2.1',
          latestVersion: '1.3.1',
        };
        return expectSaga(getVersion)
          .provide([[call(get, '/server/version'), { data: version }], [delay(500), {}]])
          .delay(500)
          .call(get, '/server/version')
          .put(actions.getVersion.success(version))
          .run();
      });
    });

    describe('failure', () => {
      it('should error', () => {
        return expectSaga(getVersion)
          .provide({
            call(effect, next) {
              if (effect.fn === get) {
                throw new Error('ERROR');
              }
              next();
            },
          })
          .delay(500)
          .call(get, '/server/version')
          .put(actions.getVersion.failure(new Error('ERROR')))
          .run();
      });
    });
  });
});
