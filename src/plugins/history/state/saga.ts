import { stringify } from 'qs';
import { call, put, takeLatest } from 'redux-saga/effects';
import { requesting } from 'core/request/state/util';
import { get } from 'utils/fetch';
import { Direction } from 'utils/query';
import actions, { Constants, RequestsOfType } from './actions';

export const defaultOptions = {
  page: 1,
  sortBy: 'time',
  order: Direction.Desc,
};

export function* getHistory({ payload }: RequestsOfType<Constants.GET_HISTORY>) {
  const query = { ...defaultOptions, ...payload };
  const refresh = query.page === 1;

  try {
    const { data, headers } = yield call(get, `/history?${stringify(query)}`);
    yield put(actions.getHistory.success(data, headers, refresh));
  } catch (err) {
    yield put(actions.getHistory.failure(err));
  }
}

export default function* saga() {
  yield takeLatest(requesting(Constants.GET_HISTORY), getHistory);
}
