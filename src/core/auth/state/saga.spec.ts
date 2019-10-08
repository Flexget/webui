import { call } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { post } from 'utils/fetch';
import actions from './actions';
import { login, logout } from './saga';

describe('core/auth/data/saga', () => {
  describe('login', () => {
    describe('success', () => {
      it('should work', () => {
        const payload = {
          username: 'flexget',
          password: 'password',
        };
        return expectSaga(login, actions.login.request(payload.username, payload.password))
          .provide([[call(post, '/auth/login', payload), {}]])
          .call(post, '/auth/login', payload)
          .put(actions.login.success())
          .run();
      });
    });

    describe('failure', () => {
      it('should error', () => {
        const payload = {
          username: 'flexget',
          password: 'password',
        };
        return expectSaga(login, actions.login.request(payload.username, payload.password))
          .provide({
            call() {
              throw new Error('Error');
            },
          })
          .call(post, '/auth/login', payload)
          .put(actions.login.failure(new Error('Error')))
          .run();
      });
    });
  });

  describe('logout', () => {
    describe('success', () => {
      it('should work', () =>
        expectSaga(logout)
          .provide([[call(post, '/auth/logout', {}), {}]])
          .call(post, '/auth/logout', {})
          .put(actions.logout.success())
          .run());
    });

    describe('failure', () => {
      it('should error', () =>
        expectSaga(logout)
          .provide({
            call() {
              throw new Error('Error');
            },
          })
          .call(post, '/auth/logout', {})
          .put(actions.logout.failure(new Error('Error')))
          .run());
    });
  });
});
