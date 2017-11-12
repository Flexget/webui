import { GET_SHOWS } from 'plugins/series/data/shows/actions';
import reducer from 'plugins/series/data/shows/reducer';
import { Headers } from 'utils/tests';

describe('plugins/series/data/shows/reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ totalCount: 0, items: [] });
  });

  it('should add shows on GET_SHOWS', () => {
    expect(reducer(undefined, {
      type: GET_SHOWS,
      payload: {
        headers: new Headers({ 'total-count': 1 }),
        data: [{ item: 'an item' }],
      },
    })).toEqual({ totalCount: 1, items: [{ item: 'an item' }] });
  });
});
