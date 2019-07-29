import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';
import * as fetch from 'utils/fetch';
import { action } from 'utils/actions';
import * as actions from './actions';
import { getLists, addList, removeList } from './saga';

describe('plugins/pending-list/data/sagas', () => {
  describe('getLists', () => {
    describe('success', () => {
      const it = sagaHelper(getLists({ payload: {} }));

      it('should call get /pending_list', (result) => {
        expect(result).toEqual(call(fetch.get, '/pending_list'));

        return { data: [{ id: 0, name: 'list' }] };
      });

      it('should put the success action', (result) => {
        expect(result).toEqual(put(action(actions.GET_LISTS, {
          lists: [{ id: 0, name: 'list' }],
        })));
      });
    });

    describe('failure', () => {
      const it = sagaHelper(getLists({ payload: {} }));

      it('should call get /pending_list', (result) => {
        expect(result).toEqual(call(fetch.get, '/pending_list'));

        return new Error('ERROR');
      });

      it('should put the failure action', (result) => {
        expect(result).toEqual(put(action(actions.GET_LISTS, new Error('ERROR'))));
      });
    });
  });

  describe('addList', () => {
    describe('success', () => {
      const resolve = jest.fn();
      const reject = jest.fn();
      const it = sagaHelper(addList({ payload: { data: { name: 'list' }, resolve, reject } }));

      it('should call post /pending_list', (result) => {
        expect(result).toEqual(call(fetch.post, '/pending_list', { name: 'list' }));

        return { data: { id: 0, name: 'list' } };
      });

      it('should put the success action', (result) => {
        expect(result).toEqual(put(action(actions.ADD_LIST, {
          list: { id: 0, name: 'list' },
        })));
      });

      it('should call the resolve', (result) => {
        expect(result).toEqual(call(resolve));
      });
    });

    describe('failure', () => {
      const resolve = jest.fn();
      const reject = jest.fn();
      const it = sagaHelper(addList({ payload: { data: {}, resolve, reject } }));

      it('should call post /pending_list', (result) => {
        expect(result).toEqual(call(fetch.post, '/pending_list', {}));

        return new Error('ERROR');
      });

      it('should put the failure action', (result) => {
        expect(result).toEqual(put(action(actions.ADD_LIST, new Error('ERROR'))));
      });

      it('should call the reject', (result) => {
        expect(result).toEqual(call(reject));
      });
    });
  });

  describe('removeList', () => {
    describe('success', () => {
      const it = sagaHelper(removeList({ payload: { id: 0 } }));

      it('should call del /pending_list/:id', (result) => {
        expect(result).toEqual(call(fetch.del, '/pending_list/0'));

        return { data: { } };
      });

      it('should put the success action', (result) => {
        expect(result).toEqual(put(action(actions.REMOVE_LIST, {
          id: 0,
        })));
      });
    });

    describe('failure', () => {
      const it = sagaHelper(removeList({ payload: { id: 0 } }));

      it('should call del /pending_list/:id', (result) => {
        expect(result).toEqual(call(fetch.del, '/pending_list/0'));

        return new Error('ERROR');
      });

      it('should put the failure action', (result) => {
        expect(result).toEqual(put(action(actions.REMOVE_LIST, new Error('ERROR'))));
      });
    });
  });
});
