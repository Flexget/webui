import React, { ReactNode, ReactElement, FC } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContainer } from 'core/auth/container';
import { StatusContainer } from 'core/status/hooks';
import ThemeProvider from 'core/theme/ThemeProvider';
import { TaskContainer } from 'core/tasks/hooks';
import { RouteContainer } from 'core/routes/hooks';
import { AppBarContainer } from 'core/layout/AppBar/hooks';

export const themed = (component: ReactNode) => <ThemeProvider>{component}</ThemeProvider>;

export const router = (component: ReactNode) => <MemoryRouter>{component}</MemoryRouter>;

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
