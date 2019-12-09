import { fork } from 'redux-saga/effects';
import serverSaga from './server/state/saga';

export default function* rootSaga() {
  yield fork(serverSaga);
}
