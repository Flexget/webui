import React, { FC } from 'react';
import { useContainer } from 'unstated-next';
import StatusBar from './StatusBar';
import { actions, StatusContainer } from './hooks';

const ErrorStatus: FC = () => {
  const [{ errors }, dispatch] = useContainer(StatusContainer);
  const clearStatus = () => {
    dispatch(actions.popError());
  };

  return <StatusBar message={errors[0]?.message} clearStatus={clearStatus} />;
};

export default ErrorStatus;
