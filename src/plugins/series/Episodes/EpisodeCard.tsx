import React, { FC } from 'react';
import { useRouteMatch } from 'react-router';
import { css } from '@emotion/core';
import { Card, CardActionArea, CardActions, IconButton, Tooltip, Theme } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import Entry from 'core/entry/cards';
import { Link } from 'common/styles';
import { Show, Episode } from '../types';
import { episodeToEntry } from '../utils';

interface Props {
  show: Show;
  episode: Episode;
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

const EpisodeCard: FC<Props> = ({ show, episode, onRemoveClick }) => {
  const { url } = useRouteMatch();
  return (
    <Card css={cardCss}>
      <CardActionArea css={actionArea} component={Link} to={`${url}/episodes/${episode.id}`}>
        <Entry entry={episodeToEntry(show, episode)} css={entryCard} />
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

export default EpisodeCard;
