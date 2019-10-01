import reducer from './reducer';
import actions from './actions';
import makeHistory from './util/test';

describe('plugins/history/data/reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual({ items: [] });
  });

  it('should store history on GET_HISTORY', () => {
    const headers = new Headers();
    headers.set('total-count', '1');
    const data = [makeHistory()];
    expect(reducer(undefined, actions.getHistory.success(data, headers))).toEqual({
      items: data,
      totalCount: 1,
    });
  });
});
