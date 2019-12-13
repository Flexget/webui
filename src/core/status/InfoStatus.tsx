import React, { FC } from 'react';
import StatusBar from './StatusBar';
import { actions, StatusContainer } from './hooks';

const InfoStatus: FC = () => {
  const [{ info }, dispatch] = StatusContainer.useContainer();
  const clearStatus = () => {
    dispatch(actions.popInfo());
  };

  return <StatusBar message={info[0]} clearStatus={clearStatus} />;
};

export default InfoStatus;
