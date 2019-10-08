import { stringify } from 'qs';
import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { get } from 'utils/fetch';
import { getHistory, defaultOptions } from './saga';
import actions from './actions';
import { makeHistory } from './fixtures';

describe('plugins/history/state/saga', () => {
  describe('getHistory', () => {
    describe('success', () => {
      it('gets history', () => {
        const history = makeHistory();
        const headers = new Headers({ 'total-count': '1' });
        return expectSaga(getHistory, actions.getHistory.request({}))
          .provide([
            [call(get, `/history?${stringify(defaultOptions)}`), { data: [history], headers }],
          ])
          .put(actions.getHistory.success([history], headers, true))
          .call(get, `/history?${stringify(defaultOptions)}`)
          .run();
      });
    });

    describe('failure', () => {
      it('should error if get /server/history errors', () => {
        return expectSaga(getHistory, actions.getHistory.request({}))
          .provide({
            call() {
              throw new Error('ERROR');
            },
          })
          .call(get, `/history?${stringify(defaultOptions)}`)
          .put(actions.getHistory.failure(new Error('ERROR')))
          .run();
      });
    });
  });
});
