import React from 'react';
import renderer from 'react-test-renderer';
import Layout from 'core/layout/components';
import { themed, router, provider } from 'utils/tests';
import fetchMock from 'fetch-mock';

function renderLayout() {
  return provider(router(themed(
    <Layout>
      <div />
    </Layout>
  )), { router: { location: { } }, version: {}, status: { loading: {} }, routes: {} });
}
describe('common/layout', () => {
  beforeEach(() => {
    fetchMock
      .get('/api/server/version', {});
  });

  it('renders correctly', () => {
    const tree = renderer.create(renderLayout()).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
