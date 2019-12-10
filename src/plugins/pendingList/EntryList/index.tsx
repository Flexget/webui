import React, { FC } from 'react';
import { Grid } from '@material-ui/core';
import { EntryContainer, useGetEntries } from '../hooks/entry';
import EntryCard from '../EntryCard';
import { Options } from '../types';

interface Props {
  options: Options;
  page: number;
}

const EntryList: FC<Props> = ({ options, page }) => {
  const [{ entries }] = EntryContainer.useContainer();
  useGetEntries(options, page);

  return (
    <Grid container spacing={2}>
      {entries.map(entry => (
        <Grid item key={entry.id} xs={12} md={6}>
          <EntryCard entry={entry} />
        </Grid>
      ))}
    </Grid>
  );
};

export default EntryList;
