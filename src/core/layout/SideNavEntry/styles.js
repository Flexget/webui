import styled from '@emotion/styled';
import { css } from '@emotion/core';
import theme from 'theme';
import ListItem from '@material-ui/core/ListItem';

export const colorClass = css`
  color: ${theme.palette.secondary[200]};
`;

export const NavItem = styled(ListItem)`
  border-left: 3px solid transparent;
  cursor: pointer;

  &:hover {
    border-left: 3px solid ${theme.palette.primary[500]};
  }
`;
