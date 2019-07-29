import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';
import { post } from 'utils/fetch';
import { action, request } from 'utils/actions';
import { manageServer } from 'core/server/state/saga';
import { GET_TASKS } from './actions';

describe('core/server/data/sage', () => {
  describe('manageServer', () => {
    describe('success', () => {
      const it = sagaHelper(manageServer('reload', request(SERVER_RELOAD)));

      it('should call /server/manage', (result) => {
        expect(result).toEqual(call(post, '/server/manage', {
          operation: 'reload',
        }));

        return { data: { message: 'message' } };
      });

      it('should put the success action', (result) => {
        expect(result).toEqual(put(action(SERVER_RELOAD, {}, { message: 'message' })));
      });
    });

    describe('failure', () => {
      const it = sagaHelper(manageServer('shutdown', request(SERVER_SHUTDOWN)));

      it('should call /server/manage', (result) => {
        expect(result).toEqual(call(post, '/server/manage', {
          operation: 'shutdown',
        }));

        return new Error('ERROR');
      });

      it('should put the failure action', (result) => {
        expect(result).toEqual(put(action(SERVER_SHUTDOWN, new Error('ERROR'))));
      });
    });
  });
});
