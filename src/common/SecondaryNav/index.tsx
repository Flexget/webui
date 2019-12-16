import React, { FC } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { darkTheme } from 'core/theme';
import { TabsTypeMap } from '@material-ui/core/Tabs';
import { SecondaryAppBar, SecondaryToolbar, SecondaryTabs } from './styles';

type Props = TabsTypeMap['props'] & { tabs: boolean };

const SecondaryNav: FC<Props> = ({ children, tabs = false, ...tabProps }) => (
  <MuiThemeProvider theme={darkTheme}>
    <SecondaryAppBar>
      {tabs ? (
        <SecondaryTabs indicatorColor="primary" {...tabProps}>
          {children}
        </SecondaryTabs>
      ) : (
        <SecondaryToolbar>{children}</SecondaryToolbar>
      )}
    </SecondaryAppBar>
  </MuiThemeProvider>
);

export default SecondaryNav;
