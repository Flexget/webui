import { stringify } from 'qs';
import { call, put, takeLatest, takeEvery, select } from 'redux-saga/effects';
import { withMeta } from 'utils/actions';
import { requesting } from 'core/status/state/util';

import FlexGetEntry from 'common/FlexGetEntry';
import * as fetch from 'utils/fetch';
import { State } from './reducer';
import actions, { Constants, RequestsOfType } from './actions';

export function* getLists() {
  try {
    const { data } = yield call(fetch.get, '/pending_list');
    yield put(actions.getLists.success(data));
  } catch (err) {
    yield put(actions.getLists.failure(err));
  }
}

export function* addList({ payload }: RequestsOfType<Constants.ADD_LIST>) {
  try {
    const { data } = yield call(fetch.post, '/pending_list', payload.data);
    yield put(
      withMeta(actions.addList.success(data), {
        message: 'Successfully added list.',
      }),
    );
    // yield call(payload.resolve);
  } catch (err) {
    yield put(actions.addList.failure(err));
    // yield call(payload.reject);
  }
}

export function* removeList({ payload }: RequestsOfType<Constants.REMOVE_LIST>) {
  const { id } = payload;

  try {
    yield call(fetch.del, `/pending_list/${id}`);
    yield put(
      withMeta(actions.removeList.success(id), {
        message: 'Successfully removed list.',
      }),
    );
    // yield call(payload.resolve);
  } catch (err) {
    yield put(actions.removeList.failure(err));
    // yield call(payload.reject);
  }
}

export const getEntriesOptions = {
  page: 1,
  sortBy: 'added',
  order: 'desc',
};

export function* getEntries({ payload }: RequestsOfType<Constants.GET_ENTRIES>) {
  const { listId, params } = payload;
  const query = { ...getEntriesOptions, ...params };

  try {
    const { data, headers } = yield call(
      fetch.get,
      `/pending_list/${listId}/entries?${stringify(query)}`,
    );
    const entries = data.map(e => new FlexGetEntry(e));
    yield put(actions.getEntries.success(entries, query.page, headers));
  } catch (err) {
    yield put(actions.getEntries.failure(err));
  }
}

export const getCurrentPage = (listId: number) => ({ pendingList }: Record<'pendingList', State>) =>
  pendingList.entries[listId].page;

export function* addEntry({ payload }: RequestsOfType<Constants.ADD_ENTRY>) {
  const { listId, entry } = payload;

  try {
    yield call(fetch.post, `/pending_list/${listId}/entries`, entry);
    const page = yield select(getCurrentPage);
    yield* getEntries(actions.getEntries.request(listId, page));
    yield put(
      withMeta(actions.addEntry.success(), {
        message: 'Successfully added entry.',
      }),
    );
    // yield call(resolve);
  } catch (err) {
    yield put(actions.addEntry.failure(err));
    // yield call(reject);
  }
}

export function* removeEntry({ payload }: RequestsOfType<Constants.REMOVE_ENTRY>) {
  const { entry } = payload;
  const { id, listId } = entry;

  try {
    yield call(fetch.del, `/pending_list/${listId}/entries/${id}`);
    yield put(
      withMeta(actions.removeEntry.success(entry), {
        message: 'Successfully removed entry.',
      }),
    );
  } catch (err) {
    yield put(actions.removeEntry.failure(err));
  }
}

export function* injectEntry({ payload }: RequestsOfType<Constants.INJECT_ENTRY>) {
  const { entry, task } = payload;
  const { url, title, fields, listId, id } = entry;

  try {
    yield call(fetch.post, '/inject', { tasks: [task.name], inject: [{ url, title, fields }] });
    yield call(fetch.del, `/pending_list/${listId}/entries/${id}`);
    yield put(
      withMeta(actions.injectEntry.success(entry), {
        message: `Successfully injected entry into ${task.name}.`,
      }),
    );
  } catch (err) {
    yield put(actions.injectEntry.failure(err));
  }
}

export function* approveEntry({ payload }: RequestsOfType<Constants.APPROVE_ENTRY>) {
  const {
    entry: { id, listId },
  } = payload;

  try {
    const { data } = yield call(fetch.put, `/pending_list/${listId}/entries/${id}`, {
      operation: 'approve',
    });
    yield put(actions.approveEntry.success(new FlexGetEntry(data)));
  } catch (err) {
    yield put(actions.approveEntry.failure(err));
  }
}

export function* rejectEntry({ payload }: RequestsOfType<Constants.REJECT_ENTRY>) {
  const {
    entry: { id, listId },
  } = payload;

  try {
    const { data } = yield call(fetch.put, `/pending_list/${listId}/entries/${id}`, {
      operation: 'reject',
    });
    yield put(actions.rejectEntry.success(new FlexGetEntry(data)));
  } catch (err) {
    yield put(actions.rejectEntry.failure(err));
  }
}

export default function* saga() {
  yield takeLatest(requesting(Constants.GET_LISTS), getLists);
  yield takeEvery(requesting(Constants.ADD_LIST), addList);
  yield takeEvery(requesting(Constants.REMOVE_LIST), removeList);
  yield takeLatest(requesting(Constants.GET_ENTRIES), getEntries);
  yield takeEvery(requesting(Constants.ADD_ENTRY), addEntry);
  yield takeEvery(requesting(Constants.INJECT_ENTRY), injectEntry);
  yield takeEvery(requesting(Constants.REMOVE_ENTRY), removeEntry);
  yield takeEvery(requesting(Constants.APPROVE_ENTRY), approveEntry);
  yield takeEvery(requesting(Constants.REJECT_ENTRY), rejectEntry);
}
