import styled from '@emotion/styled';
import { css } from '@emotion/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import theme from 'theme';

export const menuIcon = css`padding-right: 3rem`;

export const NavAppBar = styled(AppBar)`
  position: static;
`;

export const NavToolbar = styled(Toolbar)`
  background-color: ${theme.palette.primary[800]};
  color: ${theme.palette.getContrastText(theme.palette.primary[800])};
  min-height: 5rem;
`;

export const NavIcon = styled(IconButton)`
  color: ${theme.palette.getContrastText(theme.palette.primary[800])};
`;

export const MenuIcon = styled(FontAwesomeIcon)`
  margin-right: 3rem;
  font-size: 1.6rem;
`;
