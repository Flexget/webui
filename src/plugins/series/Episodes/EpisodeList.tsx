import React, { FC, useState, useCallback } from 'react';
import { useContainer } from 'unstated-next';
import { Grid } from '@material-ui/core';
import RemoveDialog from '../RemoveDialog';
import { EpisodeContainer, useGetEpisodes, useRemoveEpisode } from '../hooks/episodes';
import { GetEpisodeOptions, Show } from '../types';
import EpisodeCard from './EpisodeCard';
import { ReleaseContainer } from '../hooks/releases';

interface Props {
  show?: Show;
  options: GetEpisodeOptions;
}

const EpisodeList: FC<Props> = ({ show, options }) => {
  useGetEpisodes(show?.id, options);

  const [{ episodes }] = useContainer(EpisodeContainer);
  const [episodeId, setEpisodeId] = useState<number>();
  const handleClose = useCallback(() => setEpisodeId(undefined), []);

  const [state, request] = useRemoveEpisode(show?.id, episodeId);

  if (!show) {
    return null;
  }

  return (
    <>
      <Grid container spacing={2}>
        {episodes.map(episode => (
          <Grid item key={episode.id} xs={12} md={6} lg={4}>
            <ReleaseContainer.Provider>
              <EpisodeCard
                show={show}
                episode={episode}
                onRemoveClick={() => setEpisodeId(episode.id)}
              />
            </ReleaseContainer.Provider>
          </Grid>
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
