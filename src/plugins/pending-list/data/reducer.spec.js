import reducer from 'plugins/pending-list/data/reducer';
import * as actions from 'plugins/pending-list/data/actions';

describe('plugins/pending-list/data/reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ lists: [], entries: {} });
  });

  it('should return lists on GET_LISTS', () => {
    expect(reducer(undefined, {
      type: actions.GET_LISTS,
      payload: {
        lists: [{ id: 0, name: 'list' }],
      },
    })).toEqual({ lists: [{ id: 0, name: 'list' }], entries: {} });
  });

  it('should add list on ADD_LIST', () => {
    expect(reducer({ lists: [], entries: {} }, {
      type: actions.ADD_LIST,
      payload: {
        list: { id: 0, name: 'list' },
      },
    })).toEqual({ lists: [{ id: 0, name: 'list' }], entries: {} });
  });

  it('should remove list on REMOVE_LIST', () => {
    expect(reducer({
      lists: [{ id: 0, name: 'list' }, { id: 1, name: 'other list' }],
      entries: {},
    }, {
      type: actions.REMOVE_LIST,
      payload: {
        id: 1,
      },
    })).toEqual({ lists: [{ id: 0, name: 'list' }], entries: {} });
  });
});
