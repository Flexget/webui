import { stringify } from 'qs';
import { call, put, takeLatest, takeEvery, select } from 'redux-saga/effects';
import { action, requesting } from 'utils/actions';
import * as fetch from 'utils/fetch';
import * as actions from './actions';

export function* getLists() {
  try {
    const { data } = yield call(fetch.get, '/pending_list');
    yield put(action(actions.GET_LISTS, { lists: data }));
  } catch (err) {
    yield put(action(actions.GET_LISTS, err));
  }
}

export function* addList({ payload }) {
  try {
    const { data } = yield call(fetch.post, '/pending_list', payload.data);
    yield put(action(actions.ADD_LIST, { list: data }));
    yield call(payload.resolve);
  } catch (err) {
    yield put(action(actions.ADD_LIST, err));
    yield call(payload.reject);
  }
}

export function* removeList({ payload }) {
  const { id } = payload;

  try {
    yield call(fetch.del, `/pending_list/${id}`);
    yield put(action(actions.REMOVE_LIST, { id }));
  } catch (err) {
    yield put(action(actions.REMOVE_LIST, err));
  }
}

export const getEntriesOptions = {
  page: 1,
  sort_by: 'added',
  order: 'desc',
};

export function* getEntries({ payload }) {
  const { listId, params } = payload;
  const query = { ...getEntriesOptions, ...params };

  try {
    const { data, headers } = yield call(fetch.get, `/pending_list/${listId}/entries?${stringify(query)}`);
    yield put(action(actions.GET_ENTRIES, { listId, entries: data, page: query.page, headers }));
  } catch (err) {
    yield put(action(actions.GET_ENTRIES, err));
  }
}

export const getCurrentPage = listId => ({ pendingList }) => pendingList.entries[listId].page;

export function* addEntry({ payload }) {
  const { listId, entry, resolve, reject } = payload;

  try {
    yield call(fetch.post, `/pending_list/${listId}/entries`, entry);
    yield put(action(actions.ADD_ENTRY));
    const page = yield select(getCurrentPage);
    yield* getEntries({ payload: { listId, params: { page } } });
    yield call(resolve);
  } catch (err) {
    yield put(action(actions.ADD_ENTRY, err));
    yield call(reject);
  }
}

export function* removeEntry({ payload }) {
  const { id, listId } = payload;

  try {
    yield call(fetch.del, `/pending_list/${listId}/entries/${id}`);
    yield put(action(actions.REMOVE_ENTRY));
    const page = yield select(getCurrentPage);
    yield* getEntries({ payload: { listId, params: { page } } });
  } catch (err) {
    yield put(action(actions.REMOVE_ENTRY, err));
  }
}

export function* approveEntry({ payload }) {
  const { id, listId } = payload;

  try {
    yield call(fetch.put, `/pending_list/${listId}/entries/${id}`, { operation: 'approve' });
    yield put(action(actions.APPROVE_ENTRY, { id, listId }));
  } catch (err) {
    yield put(action(actions.APPROVE_ENTRY, err));
  }
}

export function* rejectEntry({ payload }) {
  const { id, listId } = payload;

  try {
    yield call(fetch.put, `/pending_list/${listId}/entries/${id}`, { operation: 'reject' });
    yield put(action(actions.REJECT_ENTRY, { id, listId }));
  } catch (err) {
    yield put(action(actions.REJECT_ENTRY, err));
  }
}

export default function* saga() {
  yield takeLatest(requesting(actions.GET_LISTS), getLists);
  yield takeEvery(requesting(actions.ADD_LIST), addList);
  yield takeEvery(requesting(actions.REMOVE_LIST), removeList);
  yield takeLatest(requesting(actions.GET_ENTRIES), getEntries);
  yield takeEvery(requesting(actions.ADD_ENTRY), addEntry);
  yield takeEvery(requesting(actions.REMOVE_ENTRY), removeEntry);
  yield takeEvery(requesting(actions.APPROVE_ENTRY), approveEntry);
  yield takeEvery(requesting(actions.REJECT_ENTRY), rejectEntry);
}
