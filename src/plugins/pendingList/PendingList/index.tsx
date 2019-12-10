import React, { FC, useState, useReducer } from 'react';
import { hot } from 'react-hot-loader/root';
import { NoPaddingWrapper } from 'common/styles';
import TabList from 'plugins/pendingList/TabList';
import { Direction } from 'utils/query';
import { EntryContainer } from 'plugins/pendingList/hooks/entry';
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
  const [options, dispatch] = useReducer(reducer, {
    perPage: 50,
    sortBy: SortBy.Added,
    sortOrder: Direction.Desc,
  });

  return (
    <ListContiner.Provider>
      <NoPaddingWrapper>
        <TabList />
        <Content>
          <SortList onSortUpdate={dispatch} {...options} />
          <EntryContainer.Provider>
            <EntryList options={options} page={page} />
            <Pagination onPageUpdate={setPage} perPage={options.perPage} />
          </EntryContainer.Provider>
        </Content>
      </NoPaddingWrapper>
    </ListContiner.Provider>
  );
};

export default hot(PendingList);
