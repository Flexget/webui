import React, { useState, useEffect, useMemo, useCallback, FC } from 'react';
import { Grid } from '@material-ui/core';
import { Repeat, Delete } from '@material-ui/icons';
import { useContainer } from 'unstated-next';
import { useContextualAppBar, ContextualProps } from 'core/layout/AppBar/hooks';
import { usePluginContainer } from '../hooks/api';
import { EntryContainer, useGetEntries, useEntryBulkSelect } from '../hooks/entry';
import EntryCard from './EntryCard';
import { Options } from '../types';

import InjectEntryDialog from './InjectEntryDialog';
import RemoveEntryDialog from './RemoveEntryDialog';

interface Props {
  options: Options;
}

interface EntryPromptStates {
  type?: 'inject' | 'remove';
  open: boolean;
  entryId?: number;
}

const EntryList: FC<Props> = ({ options }) => {
  const [{ entries }] = useContainer(EntryContainer);
  const [selectedIds, { clearSelected }] = useEntryBulkSelect();
  useGetEntries(options);
  const [{ entryId, open, type }, setEntryPrompt] = useState<EntryPromptStates>({ open: false });

  const defaultValue = useMemo(() => [], []);

  const { useMenuProps = () => defaultValue } = usePluginContainer();
  const menuProps = useMenuProps();

  const count = selectedIds.size;
  const contextualProps: ContextualProps = useMemo(
    () => ({
      menuItems: [
        ...menuProps,
        {
          name: 'Inject All',
          onClick: () => setEntryPrompt({ open: true, type: 'inject' }),
          Icon: Repeat,
        },
        {
          name: 'Remove All',
          onClick: () => setEntryPrompt({ open: true, type: 'remove' }),
          Icon: Delete,
        },
      ],
      title: `${count} selected`,
      onClose: clearSelected,
    }),
    [clearSelected, count, menuProps],
  );
  const { setContextual } = useContextualAppBar(contextualProps);

  useEffect(() => {
    setContextual(count !== 0);
  }, [count, setContextual]);

  const handleClose = useCallback(() => setEntryPrompt({ open: false }), []);

  return (
    <>
      <Grid container spacing={2}>
        {entries.map(entry => (
          <Grid item key={entry.id} xs={12} md={6} lg={4}>
            <EntryCard
              entry={entry}
              onInjectClick={() =>
                setEntryPrompt({ open: true, type: 'inject', entryId: entry.id })
              }
              onRemoveClick={() =>
                setEntryPrompt({ open: true, type: 'remove', entryId: entry.id })
              }
            />
          </Grid>
        ))}
      </Grid>
      <InjectEntryDialog entryId={entryId} open={open && type === 'inject'} onClose={handleClose} />
      <RemoveEntryDialog entryId={entryId} open={open && type === 'remove'} onClose={handleClose} />
    </>
  );
};

export default EntryList;
