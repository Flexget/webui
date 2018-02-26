import { stringify } from 'qs';
import { call, put, takeLatest, takeEvery, select } from 'redux-saga/effects';
import { action, requesting } from 'utils/actions';

import FlexGetEntry from 'common/FlexGetEntry';
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
    yield put(action(actions.ADD_LIST, { list: data }, {
      message: 'Successfully added list.',
    }));
    yield call(payload.resolve);
  } catch (err) {
    yield put(action(actions.ADD_LIST, err));
    yield call(payload.reject);
  }
}

export function* removeList({ payload }) {
  const { id, resolve, reject } = payload;

  try {
    yield call(fetch.del, `/pending_list/${id}`);
    yield put(action(actions.REMOVE_LIST, { id }, {
      message: 'Successfully removed list.',
    }));
    yield call(resolve);
  } catch (err) {
    yield put(action(actions.REMOVE_LIST, err));
    yield call(reject);
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
    const entries = data.map(e => new FlexGetEntry(e));
    yield put(action(actions.GET_ENTRIES, { entries, page: query.page, headers }));
  } catch (err) {
    yield put(action(actions.GET_ENTRIES, err));
  }
}

export const getCurrentPage = listId => ({ pendingList }) => pendingList.entries[listId].page;

export function* addEntry({ payload }) {
  const { listId, entry, resolve, reject } = payload;

  try {
    yield call(fetch.post, `/pending_list/${listId}/entries`, entry);
    const page = yield select(getCurrentPage);
    yield* getEntries({ payload: { listId, params: { page } } });
    yield put(action(actions.ADD_ENTRY, {}, {
      message: 'Successfully added entry.',
    }));
    yield call(resolve);
  } catch (err) {
    yield put(action(actions.ADD_ENTRY, err));
    yield call(reject);
  }
}

export function* removeEntry({ payload }) {
  const { entry } = payload;
  const { id, listId } = entry;

  try {
    yield call(fetch.del, `/pending_list/${listId}/entries/${id}`);
    yield put(action(actions.REMOVE_ENTRY, { entry }, {
      message: 'Successfully removed entry.',
    }));
  } catch (err) {
    yield put(action(actions.REMOVE_ENTRY, err));
  }
}

export function* injectEntry({ payload }) {
  const { entry, task } = payload;
  const { url, title, fields, listId, id } = entry;

  try {
    yield call(fetch.post, '/inject', { tasks: [task.name], inject: [{ url, title, fields }] });
    yield call(fetch.del, `/pending_list/${listId}/entries/${id}`);
    yield put(action(actions.INJECT_ENTRY, { entry }, {
      message: `Successfully injected entry into ${task.name}.`,
    }));
  } catch (err) {
    yield put(action(actions.INJECT_ENTRY, err));
  }
}

export function* approveEntry({ payload }) {
  const { entry: { id, listId } } = payload;

  try {
    const { data } = yield call(fetch.put, `/pending_list/${listId}/entries/${id}`, { operation: 'approve' });
    yield put(action(actions.APPROVE_ENTRY, { entry: new FlexGetEntry(data) }));
  } catch (err) {
    yield put(action(actions.APPROVE_ENTRY, err));
  }
}

export function* rejectEntry({ payload }) {
  const { entry: { id, listId } } = payload;

  try {
    const { data } = yield call(fetch.put, `/pending_list/${listId}/entries/${id}`, { operation: 'reject' });
    yield put(action(actions.REJECT_ENTRY, { entry: new FlexGetEntry(data) }));
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
  yield takeEvery(requesting(actions.INJECT_ENTRY), injectEntry);
  yield takeEvery(requesting(actions.REMOVE_ENTRY), removeEntry);
  yield takeEvery(requesting(actions.APPROVE_ENTRY), approveEntry);
  yield takeEvery(requesting(actions.REJECT_ENTRY), rejectEntry);
}
