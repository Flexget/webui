import { FC, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import { useInjectPageTitle, useSetAppBarIcon } from 'core/layout/AppBar/hooks';
import { Direction } from 'utils/query';
import { useMergeState } from 'utils/hooks';
import { ArrowBackIos } from '@mui/icons-material';
import { EpisodeContainer } from '../hooks/episodes';
import { GetEpisodeOptions } from '../types';
import Header from './Header';
import EpisodeList from './EpisodeList';
import { useGetShowDetail } from '../hooks/shows';

const EpisodesPage: FC = () => {
  const showId = parseInt(useParams().showId!, 10);

  const navigate = useNavigate();

  const { show } = useGetShowDetail(showId);
  const title = show ? `${show.name} - Episodes` : 'Episodes';

  const onClick = useCallback(() => {
    navigate('/series');
  }, [navigate]);

  const icon = useMemo(
    () => ({
      Component: ArrowBackIos,
      onClick,
      label: 'go back',
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
