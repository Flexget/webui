import * as oboe from 'oboe';
import { eventChannel } from 'redux-saga';
import { call, take, put, cancel, cancelled, fork } from 'redux-saga/effects';
import { requesting } from 'core/request/state/util';
import { StatusError } from 'utils/fetch';
import actions, { Constants, RequestsOfType } from './actions';
import { LogMessage } from './types';

export function logStream({ payload }: RequestsOfType<Constants.LOG_CONNECT>) {
  const { lines, query } = payload;
  return eventChannel(emit => {
    const stream = oboe({
      url: `api/server/log?lines=${lines}&search=${query}`,
      method: 'GET',
    });

    stream
      .start(() => emit(actions.connect.success()))
      .node('{message task}', (message: LogMessage) => emit(actions.message(message)))
      .fail(
        err =>
          err.jsonBody &&
          emit(
            actions.connect.failure(new StatusError((err.jsonBody as StatusError).message, 500)),
          ),
      );

    return () => stream.abort();
  });
}

export function* log(action: RequestsOfType<Constants.LOG_CONNECT>) {
  const chan = yield call(logStream, action);

  try {
    while (true) {
      const logAction = yield take(chan);
      yield put(logAction);
    }
  } catch {
    //
  } finally {
    if (yield cancelled()) {
      chan.close();
      yield put(actions.disconnect());
    }
  }
}

export default function* saga() {
  while (true) {
    const connectAction = yield take(requesting(Constants.LOG_CONNECT));
    const logStreamTask = yield fork(log, connectAction);

    yield take(Constants.LOG_DISCONNECT);
    yield cancel(logStreamTask);
  }
}
