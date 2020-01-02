import React, { FC } from 'react';
import { useRouteMatch } from 'react-router';
import { css } from '@emotion/core';
import {
  Card,
  CardActionArea,
  CardActions,
  IconButton,
  Tooltip,
  Theme,
  Collapse,
  CardContent,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import Entry from 'core/entry/cards';
import { Link } from 'common/styles';
import ExpandButton from 'common/ExpandButton';
import { useOverlayState } from 'utils/hooks';
import Releases from './Releases';
import { Show, Episode } from '../types';
import { episodeToEntry } from '../utils';
import { ReleaseContainer } from '../hooks/releases';

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

  const [expanded, { toggle }] = useOverlayState();

  return (
    <Card css={cardCss}>
      <CardActionArea css={actionArea} component={Link} to={`${url}/episodes/${episode.id}`}>
        <Entry entry={episodeToEntry(show, episode)} css={entryCard} />
      </CardActionArea>
      <CardActions css={cardActions}>
        <span>
          <Tooltip title="Remove" placement="top">
            <IconButton edge="start" aria-label="remove" onClick={onRemoveClick}>
              <Delete />
            </IconButton>
          </Tooltip>
        </span>
        <span>
          <ExpandButton dedge="end" open={expanded} onClick={toggle} />
        </span>
      </CardActions>
      <ReleaseContainer.Provider>
        <Collapse in={expanded} timeout="auto" mountOnEnter>
          <Releases show={show} episode={episode} />
        </Collapse>
      </ReleaseContainer.Provider>
    </Card>
  );
};

export default EpisodeCard;
