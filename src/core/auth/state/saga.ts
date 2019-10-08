import { call, put, takeLatest } from 'redux-saga/effects';
import { post } from 'utils/fetch';
import { requesting } from 'core/status/state/util';
import actions, { Constants, RequestsOfType } from './actions';

export function* login({ payload }: RequestsOfType<Constants.LOGIN>) {
  try {
    yield call(post, '/auth/login', payload);
    yield put(actions.login.success());
  } catch (err) {
    yield put(actions.login.failure(err));
  }
}

export function* logout() {
  try {
    yield call(post, '/auth/logout', {});
    yield put(actions.logout.success());
  } catch (err) {
    yield put(actions.logout.failure(err));
  }
}

export default function* saga() {
  yield takeLatest(requesting(Constants.LOGIN), login);
  yield takeLatest(requesting(Constants.LOGOUT), logout);
}
