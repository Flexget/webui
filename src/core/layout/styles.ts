import { css } from '@emotion/core';
import { Theme } from '@material-ui/core';

export const wrapper = css`
  display: grid;
  grid-template-columns: auto 1fr 0;
  grid-template-rows: auto 1fr 0;
  grid-template-areas:
    'sidebar header header'
    'sidebar content content'
    'sidebar content content';
  height: 100vh;
  width: 100vw;
`;

export const main = css`
  grid-area: content;
  position: relative;
`;

export const header = css`
  grid-area: header;
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
  height: 100%;

  ${theme.breakpoints.up('sm')} {
    padding: ${theme.typography.pxToRem(theme.spacing(2))};
  }
`;
