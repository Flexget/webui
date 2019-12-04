import React from 'react';
import { create } from 'react-test-renderer';
import { provider, router, themed, authProvider } from 'utils/tests';
import { FetchMock } from 'jest-fetch-mock';
import Login from './index';

const fetchMock = fetch as FetchMock;

describe('core/auth/Login', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  it('renders correctly when logged in', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        apiVersion: '1.1.2',
        flexgetVersion: '2.10.60',
        latestVersion: '2.10.60',
      }),
    );
    const tree = create(provider(authProvider(router(themed(<Login />)), true)));
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('renders correctly when logged out', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        apiVersion: '1.1.2',
        flexgetVersion: '2.10.60',
        latestVersion: '2.10.60',
      }),
    );
    const tree = create(provider(authProvider(router(themed(<Login />)))));
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
