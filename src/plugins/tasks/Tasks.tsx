import React, { FC } from 'react';
import { hot } from 'react-hot-loader/root';
import { useRouteMatch, Switch, Route } from 'react-router';
import Latest from './Latest';
import TaskExecutions from './TaskExecutions';

const Task: FC = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path} component={Latest} />
      <Route exact path={`${path}/:taskId`} component={TaskExecutions} />
    </Switch>
  );
};

export default hot(Task);
