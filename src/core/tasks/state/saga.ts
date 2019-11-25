import { call, put, takeLatest } from 'redux-saga/effects';
import { requesting } from 'core/request/state/util';
import * as fetch from 'utils/fetch';
import actions, { Constants } from './actions';

export function* getTasks() {
  try {
    const { data } = yield call(fetch.get, '/tasks');
    yield put(actions.getTasks.success(data));
  } catch (err) {
    yield put(actions.getTasks.failure(err));
  }
}

export default function* saga() {
  yield takeLatest(requesting(Constants.GET_TASKS), getTasks);
}
