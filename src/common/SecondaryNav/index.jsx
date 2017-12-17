import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from 'material-ui/styles';
import { darkTheme } from 'theme';
import {
  SecondaryAppBar,
  SecondaryToolbar,
  SecondaryTabs,
} from './styles';

const SecondaryNav = ({ children, tabs, ...tabProps }) => (
  <MuiThemeProvider theme={darkTheme}>
    <SecondaryAppBar>
      { tabs ?
        (
          <SecondaryTabs
            indicatorColor="primary"
            {...tabProps}
          >
            {children}
          </SecondaryTabs>
        ) :
        (
          <SecondaryToolbar>
            {children}
          </SecondaryToolbar>
        )
      }
    </SecondaryAppBar>
  </MuiThemeProvider>
);

SecondaryNav.propTypes = {
  children: PropTypes.node.isRequired,
  tabs: PropTypes.bool,
};

SecondaryNav.defaultProps = {
  tabs: false,
};

export default SecondaryNav;
