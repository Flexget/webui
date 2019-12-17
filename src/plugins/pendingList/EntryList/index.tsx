import React, { FC, useState, useEffect, useMemo } from 'react';
import { Grid } from '@material-ui/core';
import { Repeat, DoneAll, ClearAll, Delete } from '@material-ui/icons';
import { useContainer } from 'unstated-next';
import { RawEntry } from 'core/entry/types';
import { useContextualAppBar, ContextualProps } from 'core/layout/AppBar/hooks';
import {
  EntryContainer,
  useGetEntries,
  useEntryBulkSelect,
  useEntryBulkOperation,
} from '../hooks/entry';
import EntryCard from './EntryCard';
import { Options, Operation } from '../types';
import InjectEntryDialog from './InjectEntryDialog';

interface Props {
  options: Options;
}

const EntryList: FC<Props> = ({ options }) => {
  const [{ entries }] = useContainer(EntryContainer);
  const [selectedIds, { clearSelected }] = useEntryBulkSelect();
  useGetEntries(options);
  const [injectEntry, setInjectEntry] = useState<RawEntry>();
  const handleClose = () => setInjectEntry(undefined);
  const [{ loading }, doBulkOperation] = useEntryBulkOperation();

  const count = selectedIds.size;
  const contextualProps: ContextualProps = useMemo(
    () => ({
      icons: [
        {
          name: 'Inject All',
          onClick: () => {},
          Icon: Repeat,
        },
        {
          name: 'Approve All',
          onClick: () => doBulkOperation(Operation.Approve),
          Icon: DoneAll,
          disabled: loading,
        },
        {
          name: 'Reject All',
          onClick: () => doBulkOperation(Operation.Reject),
          Icon: ClearAll,
          disabled: loading,
        },
        {
          name: 'Remove All',
          onClick: () => {},
          Icon: Delete,
        },
      ],
      title: `${count} selected`,
      onClose: clearSelected,
    }),
    [clearSelected, count, doBulkOperation, loading],
  );
  const { setContextual } = useContextualAppBar(contextualProps);

  useEffect(() => {
    setContextual(count !== 0);
  }, [count, setContextual]);

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
