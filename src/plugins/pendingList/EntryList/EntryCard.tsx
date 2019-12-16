import React, { FC, useCallback } from 'react';
import { css } from '@emotion/core';
import { Card, CardActionArea, CardActions, IconButton, Tooltip, Theme } from '@material-ui/core';
import { Check, Clear, Delete, Repeat, CheckCircle } from '@material-ui/icons';
import Entry from 'core/entry/cards';
import { RawEntry } from 'core/entry/types';
import { Operation, PendingListEntry } from '../types';
import { useEntryOperation, useRemoveEntry, useEntryBulkSelect } from '../hooks/entry';

interface Props {
  entry: PendingListEntry;
  setInjectEntry: SetState<RawEntry>;
}

const buffer = css`
  flex: 1;
`;

const card = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 100%;
  transition: ${theme.transitions.create('background-color')};
`;

const actionArea = css`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const entryCard = css`
  flex: 1;
`;

const selectedIconButton = (theme: Theme) => css`
  &:hover {
    background-color: ${theme.palette.action.selected};
  }
`;

const selectedCardActions = (theme: Theme) => css`
  background-color: ${theme.palette.action.hover};
`;

const circleIcon = (theme: Theme) => css`
  position: absolute;
  top: 0;
  right: 0;
  color: ${theme.palette.primary.main};
  margin: ${theme.typography.pxToRem(theme.spacing(1))};
  opacity: 0;
  transition: ${theme.transitions.create('opacity')};
`;

const circleIconVisible = css`
  opacity: 1;
`;

const EntryCard: FC<Props> = ({ entry, setInjectEntry }) => {
  const [{ loading: operationLoading }, doOperation] = useEntryOperation(entry.id);
  const [{ loading: removeLoading }, removeEntry] = useRemoveEntry(entry.id);
  const [selectedIds, { selectEntry, unselectEntry }] = useEntryBulkSelect();

  const handleInjectClick = () => setInjectEntry(entry);

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

  const selected = !!selectedIds[entry.id];

  const toggle = useCallback(() => (selected ? unselectEntry(entry.id) : selectEntry(entry.id)), [
    entry.id,
    selectEntry,
    selected,
    unselectEntry,
  ]);

  const actionAreaStyles = useCallback(
    (theme: Theme) => [actionArea, selected && selectedIconButton(theme)],
    [selected],
  );

  const checkCircleStyles = useCallback(
    (theme: Theme) => [circleIcon(theme), selected && circleIconVisible],
    [selected],
  );

  const cardStyles = useCallback(
    (theme: Theme) => [card(theme), selected && selectedCardActions(theme)],
    [selected],
  );

  return (
    <Card css={cardStyles}>
      <CardActionArea css={actionAreaStyles} onClick={toggle} aria-pressed={selected}>
        <CheckCircle css={checkCircleStyles} />
        <Entry entry={entry.entry} css={entryCard} />
      </CardActionArea>
      <CardActions>
        <span css={buffer} />
        <Tooltip title={title} placement="top">
          <IconButton
            aria-label={label}
            disabled={operationLoading}
            onClick={onClick}
            css={selectedIconButton}
          >
            <Icon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Remove" placement="top">
          <IconButton
            aria-label="remove"
            onClick={removeEntry}
            disabled={removeLoading}
            css={selectedIconButton}
          >
            <Delete />
          </IconButton>
        </Tooltip>
        <Tooltip title="Inject" placement="top">
          <IconButton aria-label="inject" onClick={handleInjectClick} css={selectedIconButton}>
            <Repeat />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default EntryCard;
