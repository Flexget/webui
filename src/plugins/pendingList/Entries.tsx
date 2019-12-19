import React, { FC, useCallback, useMemo } from 'react';
import { useContainer } from 'unstated-next';
import { Tabs, Tab } from '@material-ui/core';
import { Direction } from 'utils/query';
import { useInjectContent } from 'core/layout/AppBar/hooks';
import { useMergeState } from 'utils/hooks';
import EntryList from './EntryList';
import EntryListHeader from './EntryListHeader';
import { Options, SortBy } from './types';
import { ListContainer, useGetLists, actions } from './hooks/list';
import { EntryContainer } from './hooks/entry';
import AddFab from './AddFab';

const useInjectTabs = (setPage: SetState<number>) => {
  const [{ lists, listId }, dispatch] = useContainer(ListContainer);

  const handleChange = useCallback(
    (_, selected: number) => {
      dispatch(actions.selectList(selected));
      return setPage(0);
    },
    [dispatch, setPage],
  );

  useGetLists();

  const content = useMemo(
    () => (
      <Tabs value={listId} variant="scrollable" scrollButtons="on" onChange={handleChange}>
        {lists.map(({ name, id }) => (
          <Tab label={name} value={id} key={id} />
        ))}
      </Tabs>
    ),
    [handleChange, listId, lists],
  );

  useInjectContent(content);
};

const Entries: FC<{}> = () => {
  const [options, dispatch] = useMergeState<Options>({
    page: 0,
    perPage: 30,
    sortBy: SortBy.Added,
    order: Direction.Desc,
  });

  const setPage = useCallback((n: number) => dispatch({ page: n }), [dispatch]);
  useInjectTabs(setPage);

  return (
    <EntryContainer.Provider>
      <EntryListHeader setOptions={dispatch} options={options} />
      <EntryList options={options} />
      <AddFab />
    </EntryContainer.Provider>
  );
};

export default Entries;
