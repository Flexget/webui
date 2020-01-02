import React, { FC } from 'react';
import { useContainer } from 'unstated-next';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { useMergeState } from 'utils/hooks';
import { Direction } from 'utils/query';
import { ReleaseContainer, useGetReleases } from '../hooks/releases';
import { Episode, Show, GetReleaseOptions, SortByRelease } from '../types';

interface Props {
  show: Show;
  episode: Episode;
}

const Releases: FC<Props> = ({ show, episode }) => {
  const [{ releases }] = useContainer(ReleaseContainer);
  const [options] = useMergeState<GetReleaseOptions>({
    page: 0,
    perPage: 50,
    order: Direction.Desc,
    sortBy: SortByRelease.FirstSeen,
  });

  useGetReleases(show.id, episode.id, options);

  return (
    <List dense>
      {releases.map(({ title, id, quality }) => (
        <ListItem key={id}>
          <ListItemText primary={title} secondary={quality} />
        </ListItem>
      ))}
    </List>
  );
};

export default Releases;
