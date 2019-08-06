import { delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';
import { get } from 'utils/fetch';
import { action } from 'utils/actions';
import { getVersion } from './saga';
import { GET_VERSION } from './actions';

describe('core/version/data/saga', () => {
  describe('getVersion', () => {
    describe('success', () => {
      const it = sagaHelper(getVersion());

      it('should delay for 500 ms', result => {
        expect(result).toEqual(call(delay, 500));
      });

      it('should call get /server/version', result => {
        expect(result).toEqual(call(get, '/server/version'));

        return { data: { c: 'd' } };
      });

      it('should put the success action', result => {
        expect(result).toEqual(
          put(
            action(GET_VERSION, {
              c: 'd',
            }),
          ),
        );
      });
    });

    describe('failure', () => {
      const it = sagaHelper(getVersion());

      it('should delay for 500 ms', result => {
        expect(result).toEqual(call(delay, 500));
      });

      it('should call get /server/version', result => {
        expect(result).toEqual(call(get, '/server/version'));

        return new Error('ERROR');
      });

      it('should put the failure action', result => {
        expect(result).toEqual(put(action(GET_VERSION, new Error('ERROR'))));
      });
    });
  });
});
