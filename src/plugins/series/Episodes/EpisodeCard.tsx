import React, { FC } from 'react';
import { css } from '@emotion/core';
import { Card, CardActions, Theme, Collapse, Button } from '@material-ui/core';
import Entry from 'core/entry/cards';
import ExpandButton from 'common/ExpandButton';
import { useOverlayState } from 'utils/hooks';
import RemoveDialog from 'plugins/series/RemoveDialog';
import Releases from './Releases';
import { Show, Episode } from '../types';
import { episodeToEntry } from '../utils';
import { useUpdateReleases, useRemoveReleases } from '../hooks/releases';

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

const entryCard = css`
  flex: 1;
  width: 100%;
`;

const cardActions = (theme: Theme) => css`
  padding-left: ${theme.typography.pxToRem(theme.spacing(3))};
  justify-content: space-between;
`;

const EpisodeCard: FC<Props> = ({ show, episode, onRemoveClick }) => {
  const [expanded, { toggle }] = useOverlayState();
  const [isRemoveOpen, { open: removeOpen, close: removeClose }] = useOverlayState();
  const [removeState, removeReleases] = useRemoveReleases(show.id, episode.id);
  const [{ loading: updateLoading }, updateReleases] = useUpdateReleases(show.id, episode.id);

  return (
    <Card css={cardCss}>
      <Entry entry={episodeToEntry(show, episode)} css={entryCard} />
      <CardActions css={cardActions}>
        <span>
          <Button onClick={removeOpen} color="primary" size="small">
            Delete Releases
          </Button>
          <Button onClick={updateReleases} disabled={updateLoading} size="small" color="primary">
            Reset Releases
          </Button>
        </span>
        <span>
          <Button onClick={onRemoveClick} color="primary" size="small">
            Delete Episode
          </Button>
          <ExpandButton open={expanded} onClick={toggle} />
        </span>
      </CardActions>
      <Collapse in={expanded} timeout="auto" mountOnEnter>
        <Releases show={show} episode={episode} />
      </Collapse>
      <RemoveDialog
        open={isRemoveOpen}
        onClose={removeClose}
        state={removeState}
        request={removeReleases}
        name="Releases"
      />
    </Card>
  );
};

export default EpisodeCard;
