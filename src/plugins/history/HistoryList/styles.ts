import { Theme } from '@material-ui/core';
import { css } from '@emotion/core';

export const subheader = (theme: Theme) => css`
  background-color: ${theme.palette.background.paper};
`;

export const wrapper = css`
  overflow-y: scroll;
  flex: 1;
`;
