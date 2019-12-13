import React, { FC } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { StatusContainer } from './hooks';

const isLoading = (obj: Record<string, boolean>) =>
  Object.values(obj).reduce((agg, loading) => agg || loading, false);

const LoadingBar: FC = () => {
  const [{ loading }] = StatusContainer.useContainer();

  if (isLoading(loading)) {
    return <LinearProgress variant="query" color="secondary" />;
  }
  return null;
};
export default LoadingBar;
