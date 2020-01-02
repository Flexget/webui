import React, { FC, useCallback, useMemo } from 'react';
import { useParams, useHistory } from 'react-router';
import { Formik } from 'formik';
import { useInjectPageTitle, useSetAppBarIcon } from 'core/layout/AppBar/hooks';
import { Direction } from 'utils/query';
import { useMergeState } from 'utils/hooks';
import { ArrowBackIos } from '@material-ui/icons';
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

  const { push } = useHistory();

  const { show } = useGetShowDetail(showId);
  const title = show ? `${show.name} - Episodes` : 'Episodes';

  const onClick = useCallback(() => {
    push('/series');
  }, [push]);

  const icon = useMemo(
    () => ({
      Component: ArrowBackIos,
      onClick,
      label: 'go back'
    }),
    [onClick],
  );

  useInjectPageTitle(title);
  useSetAppBarIcon(icon);

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
