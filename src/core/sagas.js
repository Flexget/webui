import { fork } from 'redux-saga/effects';
import authSaga from './auth/state/saga';
import serverSaga from './server/state/saga';
import versionSaga from './version/state/saga';

export default function* rootSaga() {
  yield fork(authSaga);
  yield fork(serverSaga);
  yield fork(versionSaga);
}
