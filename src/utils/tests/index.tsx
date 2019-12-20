import React, { ReactNode, ReactElement, FC } from 'react';
import { GuardPredicate } from '@redux-saga/types'; // eslint-disable-line import/no-unresolved
import { render, RenderOptions } from '@testing-library/react';
import { TakeEffect } from 'redux-saga/effects';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { Formik, FormikConfig } from 'formik';
import { BaseAction } from 'core/status/state/util';
import { AuthContainer } from 'core/auth/container';
import { StatusContainer } from 'core/status/hooks';
import ThemeProvider from 'core/theme/ThemeProvider';
import { TaskContainer } from 'core/tasks/hooks';
import { RouteContainer } from 'core/routes/hooks';
import { AppBarContainer } from 'core/layout/AppBar/hooks';

const mockStore = configureMockStore();

export const themed = (component: ReactNode) => <ThemeProvider>{component}</ThemeProvider>;

export const router = (component: ReactNode) => <MemoryRouter>{component}</MemoryRouter>;

export const provider = (component: React.ReactNode, state = {}) => (
  <Provider store={mockStore(state)}>{component}</Provider>
);

export const takeRequest = <T extends BaseAction>(action: BaseAction) => (ef: TakeEffect) => {
  const fn = ef.payload.pattern as GuardPredicate<T, BaseAction>;
  expect(fn(action)).toBe(true);
};

export const authProvider = (component: React.ReactNode, initialValue = false) => (
  <AuthContainer.Provider initialState={initialValue}>{component}</AuthContainer.Provider>
);

export const formik = <T extends any>(component: React.ReactNode, props: FormikConfig<T>) => (
  <Formik {...props}>{component}</Formik>
);

export const BaseProviders: FC = ({ children }) => {
  return (
    <StatusContainer.Provider>
      <AuthContainer.Provider>
        <MemoryRouter>
          <ThemeProvider>
            <RouteContainer.Provider>
              <TaskContainer.Provider>
                <AppBarContainer.Provider>{children}</AppBarContainer.Provider>
              </TaskContainer.Provider>
            </RouteContainer.Provider>
          </ThemeProvider>
        </MemoryRouter>
      </AuthContainer.Provider>
    </StatusContainer.Provider>
  );
};

export const renderWithWrapper = (ui: ReactElement, options: Omit<RenderOptions, 'queries'> = {}) =>
  render(ui, { wrapper: BaseProviders, ...options });
