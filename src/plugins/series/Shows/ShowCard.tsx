import React, { FC } from 'react';
import { css } from '@emotion/core';
import { Card, CardActionArea, CardActions, IconButton, Tooltip, Theme } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import Entry from 'core/entry/cards';
import { Show } from '../types';

interface Props {
  show: Show;
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

const ShowCard: FC<Props> = ({ show, onRemoveClick }) => {
  return (
    <Card css={cardCss}>
      <CardActionArea css={actionArea} component="div">
        <Entry entry={showToEntry(show)} css={entryCard} />
      </CardActionArea>
      <CardActions css={cardActions}>
        <span />
        <span>
          <Tooltip title="Remove" placement="top">
            <IconButton aria-label="remove" onClick={onRemoveClick}>
              <Delete />
            </IconButton>
          </Tooltip>
        </span>
      </CardActions>
    </Card>
  );
};

export default ShowCard;
