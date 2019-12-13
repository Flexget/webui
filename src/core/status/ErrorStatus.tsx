import React, { FC } from 'react';
import StatusBar from './StatusBar';
import { actions, StatusContainer } from './hooks';

const ErrorStatus: FC = () => {
  const [{ errors }, dispatch] = StatusContainer.useContainer();
  const clearStatus = () => {
    dispatch(actions.popError());
  };

  return <StatusBar message={errors[0]?.message} clearStatus={clearStatus} />;
};

export default ErrorStatus;
