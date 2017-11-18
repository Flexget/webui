import { fork } from 'redux-saga/effects';
import showSaga from 'plugins/series/data/shows/saga';

export default function* seriesSaga() {
  yield fork(showSaga);
}
