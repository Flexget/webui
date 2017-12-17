import { call, put, select } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';
import { stringify } from 'qs';
import {
  getLists,
  addList,
  removeList,
  getEntries,
  getEntriesOptions,
  getCurrentPage,
  addEntry,
  removeEntry,
} from 'plugins/pending-list/data/saga';
import * as actions from 'plugins/pending-list/data/actions';
import * as fetch from 'utils/fetch';
import { action } from 'utils/actions';
import { Headers } from 'utils/tests';

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

  describe('getEntries', () => {
    describe('success', () => {
      const it = sagaHelper(getEntries({ payload: { listId: 0, params: {} } }));
      const headers = new Headers({ 'total-count': 1 });

      it('should call get /pending_list/:id/entries', (result) => {
        expect(result).toEqual(call(fetch.get, `/pending_list/0/entries?${stringify(getEntriesOptions)}`));

        return { data: { }, headers };
      });

      it('should put the success action', (result) => {
        expect(result).toEqual(put(action(actions.GET_ENTRIES, {
          entries: { },
          listId: 0,
          page: 1,
          headers,
        })));
      });
    });

    describe('failure', () => {
      const it = sagaHelper(getEntries({ payload: { listId: 0, params: {} } }));

      it('should call get /pending_list/:id/entries', (result) => {
        expect(result).toEqual(call(fetch.get, `/pending_list/0/entries?${stringify(getEntriesOptions)}`));

        return new Error('ERROR');
      });

      it('should put the failure action', (result) => {
        expect(result).toEqual(put(action(actions.GET_ENTRIES, new Error('ERROR'))));
      });
    });
  });

  describe('addEntry', () => {
    describe('success', () => {
      const resolve = jest.fn();
      const reject = jest.fn();
      const it = sagaHelper(addEntry({
        payload: {
          listId: 0,
          entry: {
            title: 'title',
            original_url: 'https://example.com',
          },
          resolve,
          reject,
        },
      }));
      const headers = new Headers({ 'total-count': 1 });

      it('should call post /pending_list/:id/entries', (result) => {
        expect(result).toEqual(call(fetch.post, '/pending_list/0/entries', {
          title: 'title',
          original_url: 'https://example.com',
        }));
      });

      it('should put the success action', (result) => {
        expect(result).toEqual(put(action(actions.ADD_ENTRY)));
      });

      it('should select the current page', (result) => {
        expect(result).toEqual(select(getCurrentPage));

        return 1;
      });

      it('should call get /pending_list/:id/entries', (result) => {
        expect(result).toEqual(call(fetch.get, `/pending_list/0/entries?${stringify(getEntriesOptions)}`));

        return { data: { }, headers };
      });

      it('should put the success action', (result) => {
        expect(result).toEqual(put(action(actions.GET_ENTRIES, {
          entries: { },
          listId: 0,
          page: 1,
          headers,
        })));
      });

      it('should call the resolve', (result) => {
        expect(result).toEqual(call(resolve));
      });
    });

    describe('failure', () => {
      const resolve = jest.fn();
      const reject = jest.fn();
      const it = sagaHelper(addEntry({
        payload: {
          listId: 0,
          entry: {
            title: 'title',
            original_url: 'https://example.com',
          },
          resolve,
          reject,
        },
      }));

      it('should call post /pending_list/:id/entries', (result) => {
        expect(result).toEqual(call(fetch.post, '/pending_list/0/entries', {
          title: 'title',
          original_url: 'https://example.com',
        }));

        return new Error('ERROR');
      });

      it('should put the failure action', (result) => {
        expect(result).toEqual(put(action(actions.ADD_ENTRY, new Error('ERROR'))));
      });

      it('should call the reject', (result) => {
        expect(result).toEqual(call(reject));
      });
    });
  });

  describe('removeEntry', () => {
    describe('success', () => {
      const it = sagaHelper(removeEntry({
        payload: {
          listId: 0,
          id: 1,
        },
      }));
      const headers = new Headers({ 'total-count': 1 });

      it('should call del /pending_list/:listId/entries/:id', (result) => {
        expect(result).toEqual(call(fetch.del, '/pending_list/0/entries/1'));
      });

      it('should put the success action', (result) => {
        expect(result).toEqual(put(action(actions.REMOVE_ENTRY)));
      });

      it('should select the current page', (result) => {
        expect(result).toEqual(select(getCurrentPage));

        return 1;
      });

      it('should call get /pending_list/:id/entries', (result) => {
        expect(result).toEqual(call(fetch.get, `/pending_list/0/entries?${stringify(getEntriesOptions)}`));

        return { data: { }, headers };
      });

      it('should put the success action', (result) => {
        expect(result).toEqual(put(action(actions.GET_ENTRIES, {
          entries: { },
          listId: 0,
          page: 1,
          headers,
        })));
      });
    });

    describe('failure', () => {
      const it = sagaHelper(removeEntry({
        payload: {
          listId: 0,
          id: 1,
        },
      }));

      it('should call post /pending_list/:id/entries', (result) => {
        expect(result).toEqual(call(fetch.del, '/pending_list/0/entries/1'));

        return new Error('ERROR');
      });

      it('should put the failure action', (result) => {
        expect(result).toEqual(put(action(actions.REMOVE_ENTRY, new Error('ERROR'))));
      });
    });
  });
});
