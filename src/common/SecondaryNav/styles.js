import styled from '@emotion/styled';
import theme from 'theme';

import { Toolbar, AppBar, Tabs } from '@material-ui/core';

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