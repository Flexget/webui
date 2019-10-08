import reducer from 'core/version/state/reducer';
import actions from 'core/version/state/actions';

describe('core/version/state/reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual({});
  });

  it('should get version on GET_VERSION', () => {
    expect(
      reducer(
        undefined,
        actions.getVersion.success({
          apiVersion: '1.1.2',
          flexgetVersion: '2.10.11',
          latestVersion: '2.10.60',
        }),
      ),
    ).toEqual({
      api: '1.1.2',
      flexget: '2.10.11',
      latest: '2.10.60',
    });
  });
});
