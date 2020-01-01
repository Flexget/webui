import React, { FC, useCallback } from 'react';
import { useInjectPageTitle } from 'core/layout/AppBar/hooks';
import { Direction } from 'utils/query';
import { useMergeState } from 'utils/hooks';
import { Formik } from 'formik';
import { ShowContainer } from '../hooks/shows';
import ShowList from './ShowList';
import { GetShowOptions, SortByShow, ConfigState } from '../types';
import Header from './Header';

const ShowPage: FC = () => {
  useInjectPageTitle('Series');

  const [options, setOptions] = useMergeState<GetShowOptions>({
    page: 0,
    perPage: 30,
    sortBy: SortByShow.ShowName,
    order: Direction.Desc,
    inConfig: ConfigState.All,
  });

  const handleSubmit = useCallback(values => setOptions(values), [setOptions]);

  return (
    <ShowContainer.Provider>
      <Formik initialValues={options} onSubmit={handleSubmit}>
        <Header options={options} />
      </Formik>
      <ShowList options={options} />
    </ShowContainer.Provider>
  );
};

export default ShowPage;
