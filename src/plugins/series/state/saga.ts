import { fork } from 'redux-saga/effects';
import showSaga from './shows/saga';

export default function* seriesSaga() {
  yield fork(showSaga);
}
