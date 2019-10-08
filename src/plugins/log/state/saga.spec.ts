import { eventChannel } from 'redux-saga';
import { createMockTask } from '@redux-saga/testing-utils';
import { testSaga } from 'redux-saga-test-plan';
import { takeRequest } from 'utils/tests';
import actions, { Constants } from './actions';
import saga, { log, logStream } from './saga';
import { makeLogMessage } from './fixtures';

describe('plugins/log/data/saga', () => {
  describe('saga', () => {
    const mainSaga = testSaga(saga);
    const mockTask = createMockTask();
    const action = actions.connect.request({ lines: '200', query: '' });

    it('should take a LOG_CONNECT request', () => {
      mainSaga.next().inspect(takeRequest(action));
    });

    it('should fork the log stream task', () => {
      mainSaga.next(action).fork(log, action);
    });

    it('should take a LOG_DISCONNECT request', () => {
      mainSaga.next(mockTask).take(Constants.LOG_DISCONNECT);
    });

    it('should cancel the logStreamTask', () => {
      mainSaga.next().cancel(mockTask);
    });
  });

  describe('log', () => {
    const connectAction = actions.connect.request({ lines: '200', query: '' });
    const messageAction = actions.message(makeLogMessage());
    const mainSaga = testSaga(log, connectAction);
    const fn = jest.fn();

    const channel = eventChannel(emit => {
      emit(connectAction);
      emit(messageAction);

      return () => fn();
    });

    it('should yield a call to the channel', () => {
      mainSaga.next().call(logStream, connectAction);
    });

    it('should take from the channel', () => {
      mainSaga.next(channel).take(channel);
    });

    it('should put the connect action', () => {
      mainSaga.next(connectAction).put(connectAction);
    });

    it('should take from the channel', () => {
      mainSaga.next().take(channel);
    });

    it('should put the message action', () => {
      mainSaga.next(messageAction).put(messageAction);
    });

    it('should check cancelled', () => {
      mainSaga.throw(new Error('ERROR')).cancelled();
    });

    it('should close the channel and put disconnect', () => {
      mainSaga.next(true).put(actions.disconnect());

      expect(fn).toHaveBeenCalled();

      mainSaga.next().isDone();
    });
  });
});
