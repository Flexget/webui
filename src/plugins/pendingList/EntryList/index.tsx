import React, { FC, useState } from 'react';
import { Grid } from '@material-ui/core';
import { RawEntry } from 'core/entry/types';
import { EntryContainer, useGetEntries } from '../hooks/entry';
import EntryCard from '../EntryCard';
import { Options } from '../types';
import InjectEntryDialog from '../InjectEntryDialog';

interface Props {
  options: Options;
}

const EntryList: FC<Props> = ({ options }) => {
  const [{ entries }] = EntryContainer.useContainer();
  useGetEntries(options);
  const [injectEntry, setInjectEntry] = useState<RawEntry | undefined>();
  const handleClose = () => setInjectEntry(undefined);

  return (
    <>
      <Grid container spacing={2}>
        {entries.map(entry => (
          <Grid item key={entry.id} xs={12} md={6} lg={4}>
            <EntryCard entry={entry} setInjectEntry={setInjectEntry} />
          </Grid>
        ))}
      </Grid>
      <InjectEntryDialog entry={injectEntry} onClose={handleClose} />
    </>
  );
};

export default EntryList;
