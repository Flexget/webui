import reducer from './reducer';
import actions from './actions';
import { makeLogMessage } from './fixtures';

describe('plugins/log/data/reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual({ messages: [], connected: false });
  });

  it('should be connected on LOG_CONNECT', () => {
    expect(reducer(undefined, actions.connect.success()).connected).toBe(true);
  });

  it('should add the messages to the existing messages', () => {
    const message = makeLogMessage();
    const message2 = makeLogMessage();
    expect(
      reducer({ messages: [message], connected: true }, actions.message(message2)).messages,
    ).toEqual([message2, message]);
  });

  it('should be disconnected on LOG_DISCONNECT', () => {
    expect(reducer({ connected: true, messages: [] }, actions.disconnect()).connected).toBe(false);
  });

  it('should set lines on LOG_CLEAR', () => {
    expect(
      reducer({ messages: [makeLogMessage()], connected: true }, actions.clear()).messages,
    ).toHaveLength(0);
  });
});
