import React from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { StatusContainer } from 'core/status/hooks';
import { AuthContainer } from 'core/auth/container';
import Version from './Version';

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
      tree = create(
        <StatusContainer.Provider>
          <AuthContainer.Provider>
            <Version />
          </AuthContainer.Provider>
        </StatusContainer.Provider>,
      );
    });
    expect(tree?.toJSON()).toMatchSnapshot();
  });

  it('renders correctly without latest version', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        apiVersion: '1.1.2',
        flexgetVersion: '2.10.11',
        latestVersion: '2.10.60',
      }),
    );
    let wrapper: ReactTestRenderer | undefined;
    await act(async () => {
      wrapper = create(
        <StatusContainer.Provider>
          <AuthContainer.Provider>
            <Version />
          </AuthContainer.Provider>
        </StatusContainer.Provider>,
      );
    });
    expect(wrapper?.toJSON()).toMatchSnapshot();
  });
});
