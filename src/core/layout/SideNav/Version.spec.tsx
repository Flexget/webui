import React from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { StatusContainer } from 'core/status/hooks';
import { AuthContainer } from 'core/auth/container';
import Version from './Version';
import { VersionContainer } from './hooks';

describe('core/layout/Version', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  const component = (
    <StatusContainer.Provider>
      <AuthContainer.Provider>
        <VersionContainer.Provider>
          <Version />
        </VersionContainer.Provider>
      </AuthContainer.Provider>
    </StatusContainer.Provider>
  );
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
      tree = create(component);
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
      wrapper = create(component);
    });
    expect(wrapper?.toJSON()).toMatchSnapshot();
  });
});
