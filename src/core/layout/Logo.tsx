import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/core';
import { Theme } from '@material-ui/core';
import headerImage from 'images/header.png';

const logo = (theme: Theme) => css`
  background: ${theme.palette.secondary.main} url(${headerImage}) no-repeat center;
  background-size: 17.5rem;
  height: 100%;
  min-height: ${theme.mixins.toolbar.minHeight};

  ${theme.breakpoints.up('sm')} {
    width: 6rem;
    background-size: 25rem;
  }
`;

const openCss = (theme: Theme) => css`
  ${theme.breakpoints.up('sm')} {
    width: 19rem;
    background-size: 17.5rem;
  }
`;

interface Props {
  sidebarOpen: boolean;
  className?: string;
}

const Logo: FC<Props> = ({ sidebarOpen, className }) => (
  <Link to="/">
    <div css={theme => [logo(theme), sidebarOpen && openCss(theme)]} className={className} />
  </Link>
);

export default Logo;
