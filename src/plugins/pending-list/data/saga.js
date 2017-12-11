import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { action, requesting } from 'utils/actions';
import * as fetch from 'utils/fetch';
import * as actions from './actions';

export function* getLists() {
  try {
    const { data } = yield call(fetch.get, '/pending_list');
    yield put(action(actions.GET_LISTS, { lists: data }));
  } catch (err) {
    yield put(action(actions.GET_LISTS), err);
  }
}

export function* addList({ payload }) {
  try {
    const { data } = yield call(fetch.post, '/pending_list', payload);
    yield put(action(actions.ADD_LIST, { list: data }));
  } catch (err) {
    yield put(action(actions.ADD_LIST, err));
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

export function* getEntries({ payload }) {
  const { listId } = payload;

  try {
    const { data } = yield call(fetch.get, `/pending_list/${listId}/entries`);
    yield put(action(actions.GET_ENTRIES, { listId, entries: data }));
  } catch (err) {
    yield put(action(actions.GET_ENTRIES, err));
  }
}

export function* addEntry({ payload }) {
  const { listId } = payload;

  try {
    const { data } = yield call(fetch.post, `/pending_list/${listId}/entries`, payload);
    yield put(action(actions.ADD_ENTRY, { entry: data, listId }));
  } catch (err) {
    yield put(action(actions.ADD_ENTRY, err));
  }
}

export function* removeEntry({ payload }) {
  const { id, listId } = payload;

  try {
    yield call(fetch.del, `/pending_list/${listId}/entries/${id}`);
    yield put(action(actions.REMOVE_ENTRY, { id, listId }));
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
  yield takeEvery(requesting(actions.ADD_ENTRY, addEntry));
  yield takeEvery(requesting(actions.REMOVE_ENTRY, removeEntry));
  yield takeEvery(requesting(actions.APPROVE_ENTRY, approveEntry));
  yield takeEvery(requesting(actions.REJECT_ENTRY, rejectEntry));
}
