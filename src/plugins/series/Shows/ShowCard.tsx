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
  Typography,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import Entry from 'core/entry/cards';
import { Link } from 'common/styles';
import { Show } from '../types';
import { showToEntry } from '../utils';

interface Props {
  show: Show;
  onRemoveClick: () => void;
}

const heading = css`
  font-weight: 500;
`;

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
  const { url } = useRouteMatch();
  return (
    <Card css={cardCss}>
      <CardActionArea css={actionArea} component={Link} to={`${url}/${show.id}`}>
        <Entry entry={showToEntry(show)} css={entryCard}>
          {!!show.beginEpisode && (
            <Typography variant="body2" color="textSecondary">
              <Typography variant="body2" css={heading} color="textPrimary" component="span">
                Begin Episode:
              </Typography>{' '}
              {show.beginEpisode.identifier}
            </Typography>
          )}
          {!!show.latestEntity && (
            <Typography variant="body2" color="textSecondary">
              <Typography variant="body2" color="textPrimary" component="span" css={heading}>
                Latest Release:
              </Typography>{' '}
              {show.latestEntity.identifier} ({show.latestEntity.latestRelease?.quality})
            </Typography>
          )}
        </Entry>
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
