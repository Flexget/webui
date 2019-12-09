import React, { FC } from 'react';
import { Card, CardActionArea, CardActions, IconButton, Tooltip } from '@material-ui/core';
import FlexGetEntry from 'common/FlexGetEntry';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import RepeatIcon from '@material-ui/icons/Repeat';

import { Operation } from 'plugins/pendingList/types';
import { useEntryOperation, useRemoveEntry } from '../hooks/entry';

interface Props {
  entry: FlexGetEntry;
}

const EntryCard: FC<Props> = ({ entry }) => {
  const [{ loading: operationLoading }, doOperation] = useEntryOperation(entry.id);
  const [{ loading: removeLoading }, removeEntry] = useRemoveEntry(entry.id);

  const { title, label, Icon, onClick } = entry.approved
    ? {
        title: 'Reject',
        label: 'reject',
        Icon: ClearIcon,
        onClick: () => doOperation(Operation.Reject),
      }
    : {
        title: 'Approved',
        label: 'approved',
        Icon: CheckIcon,
        onClick: () => doOperation(Operation.Approve),
      };

  return (
    <Card>
    <CardActionArea>
    </CardActionArea>
      <CardActions>
        <Tooltip title={title}>
          <IconButton aria-label={label} disabled={operationLoading} onClick={onClick}>
            <Icon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Remove">
          <IconButton aria-label="remove" onClick={removeEntry} disabled={removeLoading}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Inject">
          <IconButton aria-label="inject">
            <RepeatIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default EntryCard;
