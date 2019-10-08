import { LOCATION_CHANGE } from 'connected-react-router';
import { StatusError } from 'utils/fetch';
import actions from './actions';
import reducer from './reducer';

const TEST = 'TEST';
const OTHER = 'OTHER';

describe('core/status/data/reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual({
      loading: {},
    });
  });

  describe('LOADING_STATUS', () => {
    it('should set loading status when initially empty', () => {
      expect(reducer(undefined, actions.load(TEST))).toEqual({
        loading: {
          [TEST]: true,
        },
      });
    });

    it('should set loading status when not empty', () => {
      expect(
        reducer(
          {
            loading: {
              [TEST]: true,
            },
          },
          actions.load(OTHER),
        ),
      ).toEqual({
        loading: {
          [TEST]: true,
          [OTHER]: true,
        },
      });
    });
    it('should not change if already loading that action', () => {
      expect(
        reducer(
          {
            loading: {
              [TEST]: true,
            },
          },
          actions.load(TEST),
        ),
      ).toEqual({
        loading: {
          [TEST]: true,
        },
      });
    });
  });

  it('should handle ERROR_STATUS', () => {
    expect(reducer(undefined, actions.error(TEST, new StatusError('Unauthorized', 401)))).toEqual({
      loading: {},
      error: {
        statusCode: 401,
        type: TEST,
        message: 'Unauthorized',
      },
    });
  });

  it('should handle INFO_STATUS', () => {
    expect(reducer(undefined, actions.info(TEST, 'something'))).toEqual({
      loading: {},
      info: 'something',
    });
  });

  it('should clear state on CLOSE_STATUS', () => {
    expect(
      reducer(
        {
          loading: {
            [TEST]: true,
          },
          error: {
            status: 401,
            type: OTHER,
            message: 'Unauthorized',
          },
        },
        actions.clear(),
      ),
    ).toEqual({ loading: { [TEST]: true } });
  });

  it('should clear state on LOCATION_CHANGE', () => {
    expect(
      reducer(
        {
          loading: {
            [TEST]: true,
          },
          error: {
            status: 401,
            type: OTHER,
            message: 'Unauthorized',
          },
        },
        { type: LOCATION_CHANGE } as any,
      ),
    ).toEqual({ loading: { [TEST]: true } });
  });

  it('should handle loding done', () => {
    expect(
      reducer(
        {
          loading: {
            TEST: true,
          },
        },
        {
          type: TEST,
        } as any,
      ),
    ).toEqual({ loading: {} });
  });
});
