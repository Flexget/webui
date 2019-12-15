import React, { FC } from 'react';
import { useContainer } from 'unstated-next';
import StatusBar from './StatusBar';
import { actions, StatusContainer } from './hooks';

const InfoStatus: FC = () => {
  const [{ info }, dispatch] = useContainer(StatusContainer);
  const clearStatus = () => {
    dispatch(actions.popInfo());
  };

  return <StatusBar message={info[0]} clearStatus={clearStatus} />;
};

export default InfoStatus;
