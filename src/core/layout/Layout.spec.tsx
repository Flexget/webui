import React from 'react';
import { FetchMock } from 'jest-fetch-mock';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { themed, router, provider, authProvider, statusProvider } from 'utils/tests';
import { RouteContainer } from 'core/routes/hooks';
import Layout from './Layout';

const fetchMock = fetch as FetchMock;

function renderLayout() {
  return provider(
    statusProvider(
      authProvider(
        router(
          themed(
            <RouteContainer.Provider>
              <Layout>
                <div />
              </Layout>
            </RouteContainer.Provider>,
          ),
        ),
      ),
    ),
    {
      router: { location: {} },
      version: {},
      status: { loading: {} },
      routes: {},
    },
  );
}
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
