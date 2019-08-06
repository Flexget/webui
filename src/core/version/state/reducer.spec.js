import reducer from 'core/version/state/reducer';
import { GET_VERSION } from 'core/version/state/actions';

describe('core/version/data/reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toMatchSnapshot();
  });

  it('should get version on GET_VERSION', () => {
    expect(
      reducer(undefined, {
        type: GET_VERSION,
        payload: {
          apiVersion: '1.1.2',
          flexgetVersion: '2.10.11',
          latestVersion: '2.10.60',
        },
      }),
    ).toMatchSnapshot();
  });
});
