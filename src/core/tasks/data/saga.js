import { call, put, takeLatest } from 'redux-saga/effects';
import { action, requesting } from 'utils/actions';
import { GET_TASKS } from 'core/tasks/data/actions';
import * as fetch from 'utils/fetch';

export function* getTasks() {
  try {
    const { data } = yield call(fetch.get, '/tasks');
    yield put(action(GET_TASKS, { tasks: data }));
  } catch (err) {
    yield put(action(GET_TASKS, err));
  }
}

export default function* saga() {
  yield takeLatest(requesting(GET_TASKS), getTasks, 'reload');
}
