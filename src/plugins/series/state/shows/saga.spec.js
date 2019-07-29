import { delay } from 'redux-saga';
import { stringify } from 'qs';
import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';
import { get } from 'utils/fetch';
import { action } from 'utils/actions';
import { getShows, defaultOptions } from './saga';
import { GET_SHOWS } from './actions';

describe('plugins/series/data/shows/saga', () => {
  describe('getShows', () => {
    describe('success', () => {
      const it = sagaHelper(getShows());

      it('should call delay', (result) => {
        expect(result).toEqual(call(delay, 500));
      });

      it('should call get /series', (result) => {
        expect(result).toEqual(call(get, `/series?${stringify(defaultOptions)}`));

        return { data: { c: 'd' }, headers: { a: 'b' } };
      });

      it('should put the success action', (result) => {
        expect(result).toEqual(put(action(GET_SHOWS, {
          data: { c: 'd' },
          headers: { a: 'b' },
        })));
      });
    });

    describe('failure', () => {
      const it = sagaHelper(getShows());

      it('should call delay', (result) => {
        expect(result).toEqual(call(delay, 500));
      });

      it('should call get /series', (result) => {
        expect(result).toEqual(call(get, `/series?${stringify(defaultOptions)}`));

        return new Error('ERROR');
      });

      it('should put the failure action', (result) => {
        expect(result).toEqual(put(action(GET_SHOWS, new Error('ERROR'))));
      });
    });
  });
});
