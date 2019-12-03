import React from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import Version from 'core/layout/Version';
import { themed } from 'utils/tests';
import { FetchMock } from 'jest-fetch-mock';

const fetchMock = fetch as FetchMock;

describe('core/layout/Version', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  it('renders correctly with latest version', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        apiVersion: '1.1.2',
        flexgetVersion: '2.10.60',
        latestVersion: '2.10.60',
      }),
    );
    let tree: ReactTestRenderer | undefined;
    await act(async () => {
      tree = create(themed(<Version />));
    });
    expect(tree && tree.toJSON()).toMatchSnapshot();
  });

  it('renders correctly without latest version', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        apiVersion: '1.1.2',
        flexgetVersion: '2.10.11',
        latestVersion: '2.10.60',
      }),
    );
    let tree: ReactTestRenderer | undefined;
    await act(async () => {
      tree = create(themed(<Version />));
    });
    expect(tree && tree.toJSON()).toMatchSnapshot();
  });
});
