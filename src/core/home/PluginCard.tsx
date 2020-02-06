import React, { FC } from 'react';
import { css } from '@emotion/core';
import { Card, CardActionArea, Avatar, Theme, Typography } from '@material-ui/core';
import { Link } from 'common/styles';
import { CardInfo } from './types';

interface Props {
  card: CardInfo;
}

const header = (theme: Theme) => css`
  display: flex;
  align-items: center;
  padding: ${theme.typography.pxToRem(theme.spacing(2))};
  padding-bottom: 0;
`;

const avatar = (theme: Theme) => css`
  color: ${theme.palette.primary.contrastText};
  background-color: ${theme.palette.primary.main};
  margin-right: ${theme.typography.pxToRem(theme.spacing(1))};
`;

const PluginCard: FC<Props> = ({ card: { Component, Icon, path, name } }) => (
  <Card>
    <CardActionArea component={Link} to={path}>
      <div css={header}>
        <Avatar css={avatar}>
          <Icon />
        </Avatar>
        <Typography variant="h5">{name}</Typography>
      </div>
      <Component />
    </CardActionArea>
  </Card>
);

export default PluginCard;
