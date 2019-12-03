import * as React from 'react';
import { css } from '@emotion/core';
import { Link } from 'react-router-dom';
import theme from 'theme';
import headerImage from 'images/header.png';

const logo = css`
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
    <div css={[logo, openCss(sidebarOpen)]} />
  </Link>
);

export default Logo;
