import React from 'react';
import styled from '@emotion/styled';
import WaveSpinner from 'common/WaveSpinner';
import headerImage from 'images/header.png';
import theme from 'theme';

export const Logo = styled.div`
  background: transparent url(${headerImage}) no-repeat center;
  min-height: 9rem;
  background-size: 100% auto;
  margin: 0 1rem;
  ${theme.breakpoints.up('sm')} {
    background-size: auto;
  }
`;

const SplashScreen = () => (
  <div>
    <Logo />
    <WaveSpinner />
  </div>
);

export default SplashScreen;
