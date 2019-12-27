import { Theme } from '@material-ui/core';
import { css } from '@emotion/core';
import { rgba } from 'polished';

export const nested = (theme: Theme) => css`
  padding-left: ${theme.spacing(0.4)}rem;
`;

export const innerDrawer = css`
  width: inherit;
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const drawerOpen = (theme: Theme) => css`
  width: ${theme.typography.pxToRem(theme.mixins.sidebar.width.open)};
  ${theme.breakpoints.up('sm')} {
    width: ${theme.typography.pxToRem(theme.mixins.sidebar.width.open)};
  }
`;

export const drawerClose = (theme: Theme) => css`
  ${theme.breakpoints.up('sm')} {
    width: ${theme.typography.pxToRem(theme.mixins.sidebar.width.closed)};
  }
`;

export const divider = (theme: Theme) => css`
  background-color: ${rgba(theme.palette.secondary.light, 0.15)};
  border-bottom-color: ${theme.palette.secondary.light};
`;

export const drawer = (theme: Theme) => css`
  background-color: ${theme.palette.secondary.main};
  width: 0;
  height: 100%;
  white-space: nowrap;

  & .MuiDrawer-paper {
    width: inherit;
    background-color: inherit;
    border-right: none !important;
    position: relative;
  }

  ${theme.breakpoints.up('sm')} {
    width: 6rem;
  }
`;

export const hideVersion = css`
  opacity: 0;
`;

export const logoWrapper = (theme: Theme) => css`
  display: flex;
  justify-content: space-between;
  color: ${theme.palette.secondary.light};
`;
