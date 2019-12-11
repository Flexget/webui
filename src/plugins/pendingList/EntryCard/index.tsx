import React, { FC } from 'react';
import { css } from '@emotion/core';
import { Card, CardActionArea, CardActions, IconButton, Tooltip } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import DeleteIcon from '@material-ui/icons/Delete';
import RepeatIcon from '@material-ui/icons/Repeat';
import Entry from 'common/Entry';
import { RawEntry } from 'common/Entry/types';
import { Operation, PendingListEntry } from '../types';
import { useEntryOperation, useRemoveEntry } from '../hooks/entry';

interface Props {
  entry: PendingListEntry;
  setInjectEntry: SetState<RawEntry | undefined>;
}

const buffer = css`
  flex: 1;
`;

const EntryCard: FC<Props> = ({ entry, setInjectEntry }) => {
  const [{ loading: operationLoading }, doOperation] = useEntryOperation(entry.id);
  const [{ loading: removeLoading }, removeEntry] = useRemoveEntry(entry.id);

  const handleInjectClick = () => setInjectEntry(entry);

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
        <Entry entry={entry.entry} />
      </CardActionArea>
      <CardActions>
        <span css={buffer} />
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
          <IconButton aria-label="inject" onClick={handleInjectClick}>
            <RepeatIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default EntryCard;
