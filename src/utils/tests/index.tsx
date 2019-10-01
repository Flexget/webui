import * as React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import theme from 'theme';

const mockStore = configureMockStore();

export function themed(component: React.ReactNode) {
  return <MuiThemeProvider theme={theme}>{component}</MuiThemeProvider>;
}

export function router(component: React.ReactNode) {
  return <MemoryRouter>{component}</MemoryRouter>;
}

export function provider(component: React.ReactNode, state = {}) {
  return <Provider store={mockStore(state)}>{component}</Provider>;
}

