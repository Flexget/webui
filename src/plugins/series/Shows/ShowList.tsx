import React, { FC } from 'react';
import { useContainer } from 'unstated-next';
import { Grid } from '@material-ui/core';
import { useGetShows, ShowContainer } from '../hooks/shows';
import { GetShowOptions } from '../types/shows';
import ShowCard from './ShowCard';

interface Props {
  options: GetShowOptions;
}

const ShowList: FC<Props> = ({ options }) => {
  useGetShows(options);

  const [{ shows }] = useContainer(ShowContainer);

  return (
    <Grid container spacing={2}>
      {shows.map(show => (
        <Grid item key={show.id} xs={12} md={6} lg={4}>
          <ShowCard show={show} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ShowList;
