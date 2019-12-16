import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { FetchMock } from 'jest-fetch-mock';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { RouteContainer } from 'core/routes/hooks';
import { AuthContainer } from 'core/auth/container';
import { StatusContainer } from 'core/status/hooks';
import ThemeProvider from 'core/theme/ThemeProvider';
import Layout from './Layout';

const fetchMock = fetch as FetchMock;

const renderLayout = () => (
  <ThemeProvider>
    <StatusContainer.Provider>
      <AuthContainer.Provider>
        <MemoryRouter>
          <RouteContainer.Provider>
            <Layout>
              <div />
            </Layout>
          </RouteContainer.Provider>
        </MemoryRouter>
      </AuthContainer.Provider>
    </StatusContainer.Provider>
  </ThemeProvider>
);
describe('common/layout', () => {
  beforeEach(() => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        apiVersion: '1.1.2',
        flexgetVersion: '2.10.60',
        latestVersion: '2.10.60',
      }),
    );
  });

  it('renders correctly', async () => {
    let tree: ReactTestRenderer | undefined;
    await act(async () => {
      tree = create(renderLayout());
    });
    expect(tree?.toJSON()).toMatchSnapshot();
  });
});
