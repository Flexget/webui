import React, { FC, useState, useReducer } from 'react';
import { NoPaddingWrapper } from 'common/styles';
import TabList from 'plugins/pendingList/TabList';
import { Direction } from 'utils/query';
import Pagination from '../Pagination';
import EntryList from '../EntryList';
import SortList from '../SortList';
import { Options, SortBy } from '../types';
import { Content } from './styles';
import { ListContiner } from '../hooks/list';

const PendingList: FC<{}> = () => {
  const [page, setPage] = useState(1);
  const reducer = (state: Options, partialState: Partial<Options>): Options => {
    return {
      ...state,
      ...partialState,
    };
  };
  const [{ perPage, sortBy, sortOrder }, dispatch] = useReducer(reducer, {
    perPage: 50,
    sortBy: SortBy.Added,
    sortOrder: Direction.Desc,
  });

  return (
    <ListContiner.Provider>
      <NoPaddingWrapper>
        <TabList />
        <Content>
          <SortList
            onSortUpdate={dispatch}
            sortBy={sortBy}
            sortOrder={sortOrder}
            perPage={perPage}
          />
          <EntryList sortBy={sortBy} sortOrder={sortOrder} page={page} perPage={perPage} />
        </Content>
        <Pagination onPageUpdate={setPage} perPage={perPage} />
      </NoPaddingWrapper>
    </ListContiner.Provider>
  );
};

export default PendingList;
