import React from 'react';
import { useInjectPageTitle } from 'core/layout/Navbar/hooks';
import InfoCard from './InfoCard';

const Home = () => {
  useInjectPageTitle('Flexget Manager');
  return <InfoCard />;
};

export default Home;
