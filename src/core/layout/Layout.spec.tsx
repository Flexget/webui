import React from 'react';
import fetchMock from 'fetch-mock';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { BaseProviders } from 'utils/tests';
import Layout from './Layout';

const renderLayout = () => (
  <BaseProviders>
    <Layout>
      <div />
    </Layout>
  </BaseProviders>
);
describe('common/layout', () => {
  beforeEach(() => {
    fetchMock
      .get('/api/server/version', {
        apiVersion: '1.1.2',
        flexgetVersion: '2.10.60',
        latestVersion: '2.10.60',
      })
      .get('/api/database/plugins', ['plugin', 'another_plugin'])
      .catch();
  });

  afterEach(() => {
    fetchMock.reset();
  });

  it('renders correctly', async () => {
    let tree: ReactTestRenderer | undefined;
    await act(() => {
      tree = create(renderLayout());
      return Promise.resolve();
    });
    expect(tree?.toJSON()).toMatchSnapshot();
  });
});
