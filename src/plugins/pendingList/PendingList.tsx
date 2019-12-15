import React, { FC, useReducer } from 'react';
import { hot } from 'react-hot-loader/root';
import { NoPaddingWrapper } from 'common/styles';
import TabList from 'plugins/pendingList/TabList';
import { Direction } from 'utils/query';
import { EntryContainer } from 'plugins/pendingList/hooks/entry';
import theme from 'theme';
import { css } from '@emotion/core';
import { useInjectPageTitle } from 'core/layout/Navbar/hooks';
import EntryList from './EntryList';
import EntryListHeader from './EntryListHeader';
import { Options, SortBy } from './types';
import { ListContainer } from './hooks/list';

export const content = css`
  flex: 1;
  overflow-y: auto;
  padding: ${theme.typography.pxToRem(theme.spacing(1))};

  ${theme.breakpoints.up('sm')} {
    padding: ${theme.typography.pxToRem(theme.spacing(2))};
  }
`;

const PendingList: FC<{}> = () => {
  useInjectPageTitle('Pending List');
  const reducer = (state: Options, partialState: Partial<Options>): Options => {
    return {
      ...state,
      ...partialState,
    };
  };
  const [options, dispatch] = useReducer(reducer, {
    page: 0,
    perPage: 30,
    sortBy: SortBy.Added,
    order: Direction.Desc,
  });

  return (
    <ListContainer.Provider>
      <NoPaddingWrapper>
        <TabList setPage={(n: number) => dispatch({ page: n })} />
        <div css={content}>
          <EntryContainer.Provider>
            <EntryListHeader setOptions={dispatch} options={options} />
            <EntryList options={options} />
          </EntryContainer.Provider>
        </div>
      </NoPaddingWrapper>
    </ListContainer.Provider>
  );
};

export default hot(PendingList);