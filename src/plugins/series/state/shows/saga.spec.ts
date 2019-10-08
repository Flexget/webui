import { stringify } from 'qs';
import { call, delay } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { get } from 'utils/fetch';
import { getShows, defaultOptions } from './saga';
import actions from './actions';

describe('plugins/series/data/shows/saga', () => {
  describe('getShows', () => {
    describe('success', () => {
      it('should work', () => {
        const headers = new Headers({ 'total-count': '1' });
        const show = { name: 'show', lookup: {} };
        return expectSaga(getShows, actions.getShows.request({}))
          .provide([
            [call(get, `/series?${stringify(defaultOptions)}`), { data: [show], headers }],
            [delay(500), {}],
          ])
          .call(get, `/series?${stringify(defaultOptions)}`)
          .put(actions.getShows.success([show], headers))
          .delay(500)
          .run();
      });
    });

    describe('failure', () => {
      it('should error', () =>
        expectSaga(getShows, actions.getShows.request({}))
          .provide({
            call(effect, next) {
              if (effect.fn === get) {
                throw new Error('ERROR');
              }
              next();
            },
          })
          .delay(500)
          .call(get, `/series?${stringify(defaultOptions)}`)
          .put(actions.getShows.failure(new Error('ERROR')))
          .run());
    });
  });
});
