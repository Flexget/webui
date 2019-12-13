import React, { FC } from 'react';
import { useStore, useDispatch } from 'react-redux';
import StatusBar from './StatusBar';
import actions from './state/actions';
import { StatusContainer } from './hooks';

const InfoStatus: FC = () => {
  const store = useStore();
  const { status } = store.getState();
  const dispatch = useDispatch();
  const [{ info }, { setInfo }] = StatusContainer.useContainer();
  const clearStatus = () => {
    setInfo(undefined);
    dispatch(actions.clear());
  };

  return <StatusBar message={info ?? status.info} clearStatus={clearStatus} />;
};

export default InfoStatus;
