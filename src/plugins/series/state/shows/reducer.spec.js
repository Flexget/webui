import { Headers } from 'utils/tests';
import { GET_SHOWS } from './actions';
import reducer from './reducer';

describe('plugins/series/data/shows/reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ totalCount: 0, items: [] });
  });

  it('should add shows on GET_SHOWS', () => {
    expect(
      reducer(undefined, {
        type: GET_SHOWS,
        payload: {
          headers: new Headers({ 'total-count': 1 }),
          data: [{ item: 'an item' }],
        },
      }),
    ).toEqual({ totalCount: 1, items: [{ item: 'an item' }] });
  });
});
