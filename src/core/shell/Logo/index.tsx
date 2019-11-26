import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Link } from 'react-router-dom';
import theme from 'theme';
import headerImage from 'images/header.png';

const BaseLogo = styled.div`
  background: ${theme.palette.secondary[900]} url(${headerImage}) no-repeat center;
  background-size: 17.5rem;
  height: 100%;
  transition: ${theme.transitions.create(['width', 'background-size'])};
`;

const openCss = (open: boolean) => css`
  ${theme.breakpoints.up('sm')} {
    width: ${open ? '19rem' : '6rem'};
    background-size: ${open ? '17.5rem' : '25rem'};
  }
`;

interface Props {
  sidebarOpen: boolean;
}

const Logo: React.FC<Props> = ({ sidebarOpen }) => (
  <Link to="/">
    <BaseLogo css={openCss(sidebarOpen)} />
  </Link>
);

export default Logo;
