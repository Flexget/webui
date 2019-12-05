import { fork } from 'redux-saga/effects';
import serverSaga from './server/state/saga';
import tasksSaga from './tasks/state/saga';

export default function* rootSaga() {
  yield fork(serverSaga);
  yield fork(tasksSaga);
}
