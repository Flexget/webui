import React, { FC, useCallback } from 'react';
import { useParams } from 'react-router';
import { Formik } from 'formik';
import { useInjectPageTitle } from 'core/layout/AppBar/hooks';
import { Direction } from 'utils/query';
import { useMergeState } from 'utils/hooks';
import { EpisodeContainer } from '../hooks/episodes';
import { GetEpisodeOptions } from '../types';
import Header from './Header';
import EpisodeList from './EpisodeList';
import { useGetShowDetail } from '../hooks/shows';

interface Match {
  showId: string;
}

const EpisodesPage: FC = () => {
  const showId = parseInt(useParams<Match>().showId, 10);

  const { show } = useGetShowDetail(showId);

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
      <EpisodeList show={show} options={options} />
    </EpisodeContainer.Provider>
  );
};

export default EpisodesPage;
