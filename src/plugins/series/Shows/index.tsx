import React, { FC } from 'react';
import { useInjectPageTitle } from 'core/layout/AppBar/hooks';
import { Direction } from 'utils/query';
import { useMergeState } from 'utils/hooks';
import { ShowContainer } from '../hooks/shows';
import ShowList from './ShowList';
import { GetShowOptions, SortBy } from '../types/shows';

const ShowPage: FC = () => {
  useInjectPageTitle('Series');

  const [options, setOptions] = useMergeState<GetShowOptions>({
    page: 0,
    perPage: 30,
    sortBy: SortBy.ShowName,
    order: Direction.Desc,
  });

  return (
    <ShowContainer.Provider>
      <ShowList options={options} />
    </ShowContainer.Provider>
  );
};

export default ShowPage;
