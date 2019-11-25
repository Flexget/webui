import { stringify } from 'qs';
import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { requesting } from 'core/request/state/util';
import { get } from 'utils/fetch';
import { Direction } from 'utils/query';
import actions, { Constants, RequestsOfType } from './actions';
import { GetShowOptions } from './types';

export const defaultOptions: GetShowOptions = {
  perPage: 10,
  lookup: 'tvdb',
  order: Direction.Asc,
  sortBy: 'show_name',
};

export function* getShows({ payload }: RequestsOfType<Constants.GET_SHOWS>) {
  const query = { ...defaultOptions, ...payload };

  yield delay(500);

  try {
    const { data, headers } = yield call(get, `/series?${stringify(query)}`);
    yield put(actions.getShows.success(data, headers));
  } catch (err) {
    yield put(actions.getShows.failure(err));
  }
}

export default function* saga() {
  yield takeLatest(requesting(Constants.GET_SHOWS), getShows);
}
