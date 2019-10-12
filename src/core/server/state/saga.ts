import { call, put, takeEvery } from 'redux-saga/effects';
import { withMeta } from 'utils/actions';
import { requesting } from 'core/request/state/util';
import { post } from 'utils/fetch';
import actions, { Constants, RequestsOfType } from './actions';

export function* manageServer({ payload }: RequestsOfType<Constants.SERVER_OPERATION>) {
  try {
    const { data } = yield call(post, '/server/manage', payload);
    yield put(
      withMeta(actions.serverOperation.success(), {
        message: data.message,
      }),
    );
  } catch (err) {
    yield put(actions.serverOperation.failure(err));
  }
}

export default function* saga() {
  yield takeEvery(requesting(Constants.SERVER_OPERATION), manageServer);
}
