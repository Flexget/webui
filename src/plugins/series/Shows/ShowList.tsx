import React, { FC, useState, useCallback } from 'react';
import { useContainer } from 'unstated-next';
import { Grid } from '@material-ui/core';
import RemoveDialog from '../RemoveDialog';
import { useGetShows, ShowContainer, useRemoveShow } from '../hooks/shows';
import { GetShowOptions } from '../types';
import ShowCard from './ShowCard';

interface Props {
  options: GetShowOptions;
}

const ShowList: FC<Props> = ({ options }) => {
  useGetShows(options);

  const [{ shows }] = useContainer(ShowContainer);
  const [showId, setShowId] = useState<number>();
  const handleClose = useCallback(() => setShowId(undefined), []);

  const [state, request] = useRemoveShow(showId);

  return (
    <>
      <Grid container spacing={2}>
        {shows.map(show => (
          <Grid item key={show.id} xs={12} md={6} lg={4}>
            <ShowCard show={show} onRemoveClick={() => setShowId(showId)} />
          </Grid>
        ))}
      </Grid>
      <RemoveDialog
        open={!!showId}
        onClose={handleClose}
        request={request}
        state={state}
        name="Show"
      />
    </>
  );
};

export default ShowList;
