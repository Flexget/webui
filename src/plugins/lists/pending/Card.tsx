import React, { FC } from 'react';
import { Typography, Tooltip, IconButton } from '@material-ui/core';
import { Check, Clear } from '@material-ui/icons';
import { PendingListEntry, Operation } from './types';
import { useEntryOperation } from './hooks';

interface Props {
  entry: PendingListEntry;
}

export const ActionsLeft: FC<Props> = ({ entry }) =>
  entry.approved ? (
    <Typography variant="overline" color="primary">
      Approved
    </Typography>
  ) : null;

export const Actions: FC<Props> = ({ entry }) => {
  const [{ loading }, doOperation] = useEntryOperation(entry.id);
  const { title, label, Icon, onClick } = entry.approved
    ? {
        title: 'Reject',
        label: 'reject',
        Icon: Clear,
        onClick: () => doOperation(Operation.Reject),
      }
    : {
        title: 'Approve',
        label: 'approve',
        Icon: Check,
        onClick: () => doOperation(Operation.Approve),
      };

  return (
    <Tooltip title={title} placement="top">
      <IconButton aria-label={label} disabled={loading} onClick={onClick}>
        <Icon />
      </IconButton>
    </Tooltip>
  );
};
