import { css } from '@emotion/core';
import theme from 'theme';

const HEADER_HEIGHT = 5;
const MOBILE_HEADER_HEIGHT = HEADER_HEIGHT * 2;

export const wrapper = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
`;

export const main = css`
  display: flex;
  flex-direction: row;
  padding-top: ${MOBILE_HEADER_HEIGHT}rem;
  flex: 1;
  max-height: 100vh;
  ${theme.breakpoints.up('sm')} {
    padding-top: ${HEADER_HEIGHT}rem;
  }
`;

export const header = css`
  display: flex;
  min-height: ${HEADER_HEIGHT}rem;
  flex-direction: column;
  z-index: 2;
  position: fixed;
  width: 100%;
  ${theme.breakpoints.up('sm')} {
    flex-direction: row;
  }
`;

export const logoWrapper = css`
  height: ${HEADER_HEIGHT}rem;
`;

export const nav = css`
  height: ${HEADER_HEIGHT}rem;
  flex: 1;
`;

export const sidebar = css`
  overflow-y: auto;
`;

export const content = css`
  flex: 1;
  overflow-y: auto;
  padding: ${theme.typography.pxToRem(theme.spacing(2))};
  opacity: 1;
  transition: ${theme.transitions.create(['opacity', 'margin-left'])};

  ${theme.breakpoints.down('sm')} {
    margin-left: 0;
    padding: ${theme.typography.pxToRem(theme.spacing(1))};
  }
`;

export const contentWithSidebar = (open: boolean) => css`
  ${theme.breakpoints.down('sm')} {
    opacity: ${open ? 0 : 1};
    display: ${open ? 'none' : 'block'};
  }
`;
