import React, { FC } from 'react';
import { useInjectPageTitle } from 'core/layout/AppBar/hooks';
import { Direction } from 'utils/query';
import { useMergeState } from 'utils/hooks';
import { ShowContainer } from '../hooks/shows';
import ShowList from './ShowList';
import { GetShowOptions, SortByShow, ConfigState } from '../types';

const ShowPage: FC = () => {
  useInjectPageTitle('Series');

  const [options] = useMergeState<GetShowOptions>({
    page: 0,
    perPage: 30,
    sortBy: SortByShow.ShowName,
    order: Direction.Desc,
    // inConfig: ConfigState.All,
  });

  return (
    <ShowContainer.Provider>
      <ShowList options={options} />
    </ShowContainer.Provider>
  );
};

export default ShowPage;
