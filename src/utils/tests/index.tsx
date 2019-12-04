import * as React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import theme from 'theme';
import { BaseAction } from 'core/status/state/util';
import { GuardPredicate } from '@redux-saga/types'; // eslint-disable-line import/no-unresolved
import { TakeEffect } from 'redux-saga/effects';
import { AuthContainter } from 'core/auth/container';

const mockStore = configureMockStore();

export const themed = (component: React.ReactNode) => (
  <MuiThemeProvider theme={theme}>{component}</MuiThemeProvider>
);

export const router = (component: React.ReactNode) => <MemoryRouter>{component}</MemoryRouter>;

export const provider = (component: React.ReactNode, state = {}) => (
  <Provider store={mockStore(state)}>{component}</Provider>
);

export const takeRequest = <T extends BaseAction>(action: BaseAction) => (ef: TakeEffect) => {
  const fn = ef.payload.pattern as GuardPredicate<T, BaseAction>;
  expect(fn(action)).toBe(true);
};

export const authProvider = (component: React.ReactNode) => (
  <AuthContainter.Provider>{component}</AuthContainter.Provider>
);
