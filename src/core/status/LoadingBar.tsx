import React, { FC } from 'react';
import { useStore } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import { StatusContainer } from './hooks';

const LoadingBar: FC = () => {
  const store = useStore();
  const { status } = store.getState();
  const [{ loading }] = StatusContainer.useContainer();
  if (Object.values(loading).reduce((agg, l) => agg || l, false) || status.loading) {
    return <LinearProgress variant="query" color="secondary" />;
  }
  return null;
};
export default LoadingBar;
