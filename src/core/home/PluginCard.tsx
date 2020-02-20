import React, { FC } from 'react';
import { css } from '@emotion/core';
import { Card, Avatar, Theme, Typography, CardActions, Button } from '@material-ui/core';
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

const button = () => css`
  margin-left: auto;
`;

const card = () => css`
  min-height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PluginCard: FC<Props> = ({ card: { Component, Icon, path, name } }) => (
  <Card css={card}>
    <div css={header}>
      <Avatar css={avatar}>
        <Icon />
      </Avatar>
      <Typography variant="h5">{name}</Typography>
    </div>
    <Component />
    {path && (
      <CardActions>
        <Button css={button} color="primary" component={Link} to={path}>
          See More
        </Button>
      </CardActions>
    )}
  </Card>
);

export default PluginCard;
