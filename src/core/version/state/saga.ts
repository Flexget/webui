import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { requesting } from 'core/status/state/util';
import { get } from 'utils/fetch';
import actions, { Constants } from './actions';

export function* getVersion() {
  try {
    yield delay(500);
    const { data } = yield call(get, '/server/version');
    yield put(actions.getVersion.success(data));
  } catch (err) {
    yield put(actions.getVersion.failure(err));
  }
}

export default function* saga() {
  yield takeLatest(requesting(Constants.GET_VERSION), getVersion);
}
