import { fork } from 'redux-saga/effects';
import authSaga from './auth/data/saga';
import serverSaga from './server/data/saga';
import versionSaga from './version/data/saga';

export default function* rootSaga() {
  yield fork(authSaga);
  yield fork(serverSaga);
  yield fork(versionSaga);
}
