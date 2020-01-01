import React, { FC, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useContainer } from 'unstated-next';
import { Grid } from '@material-ui/core';
import RemoveDialog from '../RemoveDialog';
import { EpisodeContainer, useGetEpisodes, useRemoveEpisode } from '../hooks/episodes';
import { GetEpisodeOptions } from '../types';
import EpisodeCard from './EpisodeCard';

interface Props {
  options: GetEpisodeOptions;
}

interface Match {
  showId: string;
}

const EpisodeList: FC<Props> = ({ options }) => {
  const showId = parseInt(useParams<Match>().showId, 10);
  useGetEpisodes(showId, options);

  const [{ episodes }] = useContainer(EpisodeContainer);
  const [episodeId, setEpisodeId] = useState<number>();
  const handleClose = useCallback(() => setEpisodeId(undefined), []);

  const [state, request] = useRemoveEpisode(showId, episodeId);

  return (
    <>
      <Grid container spacing={2}>
        {episodes.map(episode => (
          <Grid item key={episode.id} xs={12} md={6} lg={4} />
        ))}
      </Grid>
      <RemoveDialog
        open={!!episodeId}
        onClose={handleClose}
        request={request}
        state={state}
        name="Episode"
      />
    </>
  );
};

export default EpisodeList;
