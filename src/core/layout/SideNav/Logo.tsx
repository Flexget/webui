import React, { FC } from 'react';
import { css } from '@emotion/core';
import { Theme } from '@material-ui/core';
import headerImage from 'images/header.png';
import { Link } from 'common/styles';

const logo = (theme: Theme) => css`
  background: ${theme.palette.secondary.main} url(${headerImage}) no-repeat center;
  background-size: 17.5rem;
  height: 100%;
  min-height: ${theme.typography.pxToRem(theme.mixins.appBar.minHeight)};

  ${theme.breakpoints.up('sm')} {
    width: ${theme.typography.pxToRem(theme.mixins.sidebar.width.closed)};
    background-size: 25rem;
  }
`;

const openCss = (theme: Theme) => css`
  width: ${theme.typography.pxToRem(theme.mixins.sidebar.width.open - 48)};
  ${theme.breakpoints.up('sm')} {
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
