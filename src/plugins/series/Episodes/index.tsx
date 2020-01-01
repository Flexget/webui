import React, { FC, useCallback } from 'react';
import { useInjectPageTitle } from 'core/layout/AppBar/hooks';
import { Formik } from 'formik';
import { Direction } from 'utils/query';
import { useMergeState } from 'utils/hooks';
import { EpisodeContainer } from '../hooks/episodes';
import { GetEpisodeOptions } from '../types';
import Header from './Header';
import EpisodeList from './EpisodeList';

const EpisodesPage: FC = () => {
  useInjectPageTitle('Episodes');

  const [options, setOptions] = useMergeState<GetEpisodeOptions>({
    page: 0,
    perPage: 30,
    order: Direction.Desc,
  });

  const handleSubmit = useCallback(values => setOptions(values), [setOptions]);

  return (
    <EpisodeContainer.Provider>
      <Formik initialValues={options} onSubmit={handleSubmit}>
        <Header options={options} />
      </Formik>
      <EpisodeList options={options} />
    </EpisodeContainer.Provider>
  );
};

export default EpisodesPage;
