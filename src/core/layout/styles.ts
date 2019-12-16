import { css } from '@emotion/core';
import { Theme } from '@material-ui/core';

export const wrapper = (theme: Theme) => css`
  display: grid;
  grid-template-columns: auto 1fr 0;
  grid-template-rows: auto auto 1fr;
  grid-template-areas:
    'logo logo logo'
    'header header header'
    'sidebar content content';
  height: 100vh;
  width: 100vw;

  ${theme.breakpoints.up('sm')} {
    grid-template-rows: auto 1fr 0;
    grid-template-areas:
      'logo header header'
      'sidebar content content'
      'sidebar content content';
  }
`;

export const main = css`
  grid-area: content;
`;

export const header = css`
  grid-area: header;
`;

export const logoWrapper = css`
  grid-area: logo;
`;

export const sidebar = css`
  overflow-y: auto;
  grid-area: sidebar;
`;

export const enterTransition = (theme: Theme) => css`
  transition: ${theme.transitions.create(['width', 'margin', 'opacity', 'background-size'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  })};
`;

export const leavingTransition = (theme: Theme) => css`
  transition: ${theme.transitions.create(['width', 'margin', 'opacity', 'background-size'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  })};
`;

export const content = (theme: Theme) => css`
  overflow-y: auto;
  padding: ${theme.typography.pxToRem(theme.spacing(2))};
  opacity: 1;
  height: 100%;

  ${theme.breakpoints.down('sm')} {
    margin-left: 0;
    padding: ${theme.typography.pxToRem(theme.spacing(1))};
    opacity: 1;
    display: block;
  }
`;

export const contentWithSidebar = (theme: Theme) => css`
  ${theme.breakpoints.down('sm')} {
    opacity: 0;
    display: none;
  }
`;
