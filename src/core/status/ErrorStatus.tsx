import React, { FC } from 'react';
import { useStore, useDispatch } from 'react-redux';
import StatusBar from './StatusBar';
import actions from './state/actions';
import { StatusContainer } from './hooks';

const ErrorStatus: FC = () => {
  const store = useStore();
  const { status } = store.getState();
  const dispatch = useDispatch();
  const [{ error }, { setError }] = StatusContainer.useContainer();
  const clearStatus = () => {
    setError(undefined);
    dispatch(actions.clear());
  };

  return <StatusBar message={error ?? status.error?.message} clearStatus={clearStatus} />;
};

export default ErrorStatus;
