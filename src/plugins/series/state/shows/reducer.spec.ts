import actions from './actions';
import reducer from './reducer';

describe('plugins/series/data/shows/reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual({ totalCount: 0, items: [] });
  });

  it('should add shows on GET_SHOWS', () => {
    expect(
      reducer(
        undefined,
        actions.getShows.success(
          [{ name: 'show', lookup: {} }],
          new Headers({ 'total-count': '1' }),
        ),
      ),
    ).toEqual({ totalCount: 1, items: [{ name: 'show', lookup: {} }] });
  });
});
