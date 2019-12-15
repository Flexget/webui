import React, { FC } from 'react';
import { useInjectPageTitle } from 'core/layout/Navbar/hooks';
import Series from './Series';

const Wrapper: FC = () => {
  useInjectPageTitle('Series');

  return <Series />;
};

export default Wrapper;
