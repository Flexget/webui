import styled from '@emotion/styled';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import theme from 'theme';

export const SecondaryAppBar = styled(AppBar)`
  position: static;
`;

export const SecondaryToolbar = styled(Toolbar)`
  background-color: ${theme.palette.secondary[700]};
  min-height: 5rem;
  color: ${theme.palette.getContrastText(theme.palette.secondary[700])};
`;

export const SecondaryTabs = styled(Tabs)`
  background-color: ${theme.palette.secondary[700]};
  min-height: 5rem;
  color: ${theme.palette.getContrastText(theme.palette.secondary[700])};
`;
