import React, { FC, useState, useReducer } from 'react';
import { NoPaddingWrapper } from 'common/styles';
import TabList from 'plugins/pendingList/TabList';
import { Direction } from 'utils/query';
import { EntryContainter } from 'plugins/pendingList/hooks/entry';
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
          <EntryContainter.Provider initialState={{ options, page }}>
            <EntryList />
            <Pagination onPageUpdate={setPage} perPage={options.perPage} />
          </EntryContainter.Provider>
        </Content>
      </NoPaddingWrapper>
    </ListContiner.Provider>
  );
};

export default PendingList;
