import React, { FC } from 'react';
import { Card, CardHeader, CardActionArea } from '@material-ui/core';
import { Link } from 'common/styles';
import { CardInfo } from './types';

interface Props {
  card: CardInfo;
}

const PluginCard: FC<Props> = ({ card: { Component, path, name } }) => (
  <Card>
    <CardActionArea component={Link} to={path}>
      <CardHeader title={name} />
      <Component />
    </CardActionArea>
  </Card>
);

export default PluginCard;
