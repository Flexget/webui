import React, { FC } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import { useInjectPageTitle } from 'core/layout/AppBar/hooks';
import Shows from './Shows';
import Seasons from './Seasons';
import Episodes from './Episodes';
import Releases from './Releases';

const Series: FC = () => {
  useInjectPageTitle('Series');
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} component={Shows} />
      <Route exact path={`${path}/:showId`} component={Seasons} />
      <Route exact path={`${path}/:showId/seasons/:season`} component={Episodes} />
      <Route
        exact
        path={`${path}/:showId/seasons/:season/epsiodes/:episode`}
        component={Releases}
      />
    </Switch>
  );
};

export default Series;
