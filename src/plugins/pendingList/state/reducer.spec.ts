import reducer from './reducer';
import actions from './actions';
import { makeList } from './fixtures';

describe('plugins/pendingList/data/reducer', () => {
  const entries = {
    items: [],
    page: 0,
    totalCount: 0,
  };
  it('should return the initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual({
      lists: [],
      entries,
    });
  });

  it('should return lists on GET_LISTS', () => {
    const list = makeList();
    expect(reducer(undefined, actions.getLists.success([list]))).toEqual({
      lists: [list],
      entries,
      selected: list.id,
    });
  });

  it('should add list on ADD_LIST', () => {
    const lists = [makeList()];
    const list = makeList();
    expect(reducer({ lists, entries, selected: 0 }, actions.addList.success(list))).toEqual({
      lists: [...lists, list],
      entries,
      selected: 0,
    });
  });

  it('should remove list on REMOVE_LIST', () => {
    const lists = [makeList(), makeList()];
    expect(reducer({ lists, entries }, actions.removeList.success(lists[1].id))).toEqual({
      lists: [lists[0]],
      entries,
    });
  });

  it('should return entries on GET_ENTRIES', () => {
    const lists = [makeList(), makeList()];
    expect(
      reducer(
        { lists, entries },
        actions.getEntries.success(
          [{ an: 'object', id: 12 }] as any,
          1,
          new Headers({ 'total-count': '1' }),
        ),
      ),
    ).toEqual({
      lists,
      entries: {
        totalCount: 1,
        page: 1,
        items: [{ an: 'object', id: 12 }],
      },
    });
  });
});
