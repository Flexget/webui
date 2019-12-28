import React from 'react';
import { hot } from 'react-hot-loader/root';
import { useInjectPageTitle } from 'core/layout/AppBar/hooks';
import InfoCard from './InfoCard';

const Home = () => {
  useInjectPageTitle('Flexget Manager');
  return <InfoCard />;
};

export default hot(Home);
