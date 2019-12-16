import React, { FC } from 'react';
import { useInjectPageTitle } from 'core/layout/AppBar/hooks';
import History from './History';

const Wrapper: FC = () => {
  useInjectPageTitle('History');

  return <History />;
};

export default Wrapper;
