import { LOCATION_CHANGE } from 'connected-react-router';
import { StatusError } from 'utils/fetch';
import actions from './actions';
import reducer from './reducer';
import { RequestState } from './types';
import { requestLoad, requestSuccess, requestError } from './util';

const TEST = 'TEST';
const OTHER = 'OTHER';

const testActions = {
  test: {
    request: () => requestLoad(TEST),
    success: () => requestSuccess(TEST),
    failure: (err: StatusError) => requestError(TEST, err),
  },
  other: {
    request: (param: string) => requestLoad(OTHER, { param }),
    success: (val: string) => requestSuccess(OTHER, undefined, val),
    failure: (err: StatusError) => requestError(OTHER, err),
  },
};

describe('core/request/data/reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual({
      requests: {},
    });
  });

  it('should set loading status when initially empty', () => {
    expect(reducer(undefined, testActions.test.request())).toEqual({
      requests: {
        [TEST]: {
          state: RequestState.InProgress,
        },
      },
    });
  });

  it('should set loading status when not empty', () => {
    expect(
      reducer(
        {
          requests: {
            [TEST]: {
              state: RequestState.InProgress,
            },
          },
        },
        testActions.other.request('test'),
      ),
    ).toEqual({
      requests: {
        [TEST]: {
          state: RequestState.InProgress,
        },
        [OTHER]: {
          state: RequestState.InProgress,
        },
      },
    });
  });
  it('should not change if already loading that action', () => {
    expect(
      reducer(
        {
          requests: {
            [TEST]: {
              state: RequestState.InProgress,
            },
          },
        },
        testActions.test.request(),
      ),
    ).toEqual({
      requests: {
        [TEST]: {
          state: RequestState.InProgress,
        },
      },
    });
  });

  it('should handle errors', () => {
    expect(
      reducer(undefined, testActions.test.failure(new StatusError('Unauthorized', 401))),
    ).toEqual({
      requests: {
        [TEST]: {
          state: RequestState.Error,
          statusCode: 401,
          message: 'Unauthorized',
        },
      },
    });
  });

  it('should handle info', () => {
    expect(reducer(undefined, testActions.test.success())).toEqual({
      requests: {
        [TEST]: {
          state: RequestState.Success,
        },
      },
    });
  });

  it('should handle info with message', () => {
    expect(reducer(undefined, testActions.other.success('something'))).toEqual({
      requests: {
        [OTHER]: {
          state: RequestState.Success,
          message: 'something',
        },
      },
    });
  });

  it('should clear state on CLEAR_ALL_REQUESTS', () => {
    expect(
      reducer(
        {
          requests: {
            [TEST]: {
              state: RequestState.InProgress,
            },
            [OTHER]: {
              statusCode: 401,
              state: RequestState.Error,
              message: 'Unauthorized',
            },
          },
        },
        actions.clearAll(),
      ),
    ).toEqual({ requests: {} });
  });

  it('should clear state on LOCATION_CHANGE', () => {
    expect(
      reducer(
        {
          requests: {
            [TEST]: {
              state: RequestState.InProgress,
            },
            [OTHER]: {
              statusCode: 401,
              state: RequestState.Error,
              message: 'Unauthorized',
            },
          },
        },
        { type: LOCATION_CHANGE } as any,
      ),
    ).toEqual({ requests: {} });
  });

  it('should clear partial state on CLEAR_REQUESTS', () => {
    expect(
      reducer(
        {
          requests: {
            [TEST]: {
              state: RequestState.InProgress,
            },
            [OTHER]: {
              statusCode: 401,
              state: RequestState.Error,
              message: 'Unauthorized',
            },
          },
        },
        actions.clear([TEST]),
      ),
    ).toEqual({
      requests: {
        [OTHER]: {
          statusCode: 401,
          state: RequestState.Error,
          message: 'Unauthorized',
        },
      },
    });
  });
});
