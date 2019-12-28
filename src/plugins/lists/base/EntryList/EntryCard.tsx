import React, { useCallback, FC } from 'react';
import { css } from '@emotion/core';
import { Card, CardActionArea, CardActions, IconButton, Tooltip, Theme } from '@material-ui/core';
import { Repeat, CheckCircle, Delete } from '@material-ui/icons';
import Entry from 'core/entry/cards';
import { usePluginContainer } from '../hooks/api';
import { Entry as EntryType } from '../types';
import { useEntryBulkSelect } from '../hooks/entry';

interface Props {
  entry: EntryType;
  onInjectClick: () => void;
  onRemoveClick: () => void;
}

const cardCss = css`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: 100%;
`;

const actionArea = css`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const entryCard = css`
  flex: 1;
  width: 100%;
`;

const cardActions = (theme: Theme) => css`
  padding-left: ${theme.typography.pxToRem(theme.spacing(3))};
  justify-content: space-between;
`;

const overlay = (theme: Theme) => css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: ${theme.transitions.create('background-color')};
  z-index: 1;
  pointer-events: none;
`;

const overlaySelected = (theme: Theme) => css`
  background-color: ${theme.palette.action.disabled};
`;

const circleIcon = (theme: Theme) => css`
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
  margin: ${theme.typography.pxToRem(theme.spacing(2))};
  opacity: 0;
  transition: ${theme.transitions.create('opacity')};
  z-index: 2;
  pointer-events: none;
`;

const circleIconVisible = css`
  opacity: 1;
`;

const EntryCard: FC<Props> = ({ entry, onInjectClick, onRemoveClick }) => {
  const [selectedIds, { selectEntry, unselectEntry }] = useEntryBulkSelect();
  const { card = {} } = usePluginContainer();
  const { Actions, ActionsLeft } = card;

  const selected = selectedIds.has(entry.id);

  const toggle = useCallback(() => (selected ? unselectEntry(entry.id) : selectEntry(entry.id)), [
    entry.id,
    selectEntry,
    selected,
    unselectEntry,
  ]);

  const checkCircleStyles = useCallback(
    (theme: Theme) => [circleIcon(theme), selected && circleIconVisible],
    [selected],
  );

  const overlayStyles = useCallback(
    (theme: Theme) => [overlay(theme), selected && overlaySelected(theme)],
    [selected],
  );

  return (
    <Card css={cardCss}>
      <div css={overlayStyles} />
      <CheckCircle css={checkCircleStyles} />
      <CardActionArea css={actionArea} onClick={toggle} aria-pressed={selected} component="div">
        <Entry entry={entry.entry} css={entryCard} />
      </CardActionArea>
      <CardActions css={cardActions}>
        <span>{ActionsLeft && <ActionsLeft entry={entry} />}</span>
        <span>
          {Actions && <Actions entry={entry} />}
          <Tooltip title="Remove" placement="top">
            <IconButton aria-label="remove" onClick={onRemoveClick}>
              <Delete />
            </IconButton>
          </Tooltip>
          <Tooltip title="Inject" placement="top">
            <IconButton aria-label="inject" onClick={onInjectClick}>
              <Repeat />
            </IconButton>
          </Tooltip>
        </span>
      </CardActions>
    </Card>
  );
};

export default EntryCard;
