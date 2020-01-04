import React, { FC } from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Switch, useRouteMatch } from 'react-router';
import Shows from './Shows';
import Episodes from './Episodes';

const Series: FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} component={Shows} />
      <Route exact path={`${path}/:showId`} component={Episodes} />
    </Switch>
  );
};

export default hot(Series);
