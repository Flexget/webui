import { call, put } from 'redux-saga/effects';
import sagaHelper from 'redux-saga-testing';
import { post } from 'utils/fetch';
import { action } from 'utils/actions';
import { LOGIN, LOGOUT } from 'core/auth/data/actions';
import { login, logout } from 'core/auth/data/saga';

describe('core/auth/data/saga', () => {
  describe('login', () => {
    describe('success', () => {
      const it = sagaHelper(login({
        payload: {
          username: 'flexget',
          password: 'password',
        },
      }));

      it('should call /auth/login', (result) => {
        expect(result).toEqual(call(post, '/auth/login', {
          username: 'flexget',
          password: 'password',
        }));
      });

      it('should put the success action', (result) => {
        expect(result).toEqual(put(action(LOGIN)));
      });
    });

    describe('failure', () => {
      const it = sagaHelper(login({
        payload: {
          username: 'flexget',
          password: 'password',
        },
      }));

      it('should call /auth/login', (result) => {
        expect(result).toEqual(call(post, '/auth/login', {
          username: 'flexget',
          password: 'password',
        }));

        return new Error('ERROR');
      });

      it('should put the failure action', (result) => {
        expect(result).toEqual(put(action(LOGIN, new Error('ERROR'))));
      });
    });
  });

  describe('logout', () => {
    describe('success', () => {
      const it = sagaHelper(logout());

      it('should call /auth/logout', (result) => {
        expect(result).toEqual(call(post, '/auth/logout'));
      });

      it('should put the success action', (result) => {
        expect(result).toEqual(put(action(LOGOUT)));
      });
    });

    describe('failure', () => {
      const it = sagaHelper(logout());

      it('should call /auth/logout', (result) => {
        expect(result).toEqual(call(post, '/auth/logout'));

        return new Error('ERROR');
      });

      it('should put the failure action', (result) => {
        expect(result).toEqual(put(action(LOGOUT, new Error('ERROR'))));
      });
    });
  });
});
