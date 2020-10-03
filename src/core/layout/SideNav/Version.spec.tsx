import React from 'react';
import fetchMock from 'fetch-mock';
import { cleanup } from '@testing-library/react';
import { renderWithWrapper } from 'utils/tests';
import Version from './Version';

describe('core/layout/Version', () => {
  afterEach(() => {
    cleanup();
    fetchMock.reset();
  });

  const component = <Version />;

  it('does not show icon with latest version', async () => {
    fetchMock.get('/api/server/version', {
      apiVersion: '1.1.2',
      flexgetVersion: '2.10.60',
      latestVersion: '2.10.60',
    });
    const { findByText, queryByLabelText } = renderWithWrapper(component);
    expect(await findByText('Flexget: 2.10.60')).toBeInTheDocument();
    expect(queryByLabelText('flexget update available')).not.toBeInTheDocument();
  });

  it('does not show icon with latest dev version', async () => {
    fetchMock.get('/api/server/version', {
      apiVersion: '1.1.2',
      flexgetVersion: '2.10.61.dev',
      latestVersion: '2.10.60',
    });
    const { findByText, queryByLabelText } = renderWithWrapper(component);
    expect(await findByText('Flexget: 2.10.61.dev')).toBeInTheDocument();
    expect(queryByLabelText('flexget update available')).not.toBeInTheDocument();
  });

  it('does show icon with a previous dev version', async () => {
    fetchMock.get('/api/server/version', {
      apiVersion: '1.1.2',
      flexgetVersion: '2.10.60.dev',
      latestVersion: '2.10.60',
    });
    const { findByText, queryByLabelText } = renderWithWrapper(component);
    expect(await findByText('Flexget: 2.10.60.dev')).toBeInTheDocument();
    expect(queryByLabelText('flexget update available')).toBeInTheDocument();
  });

  it('does show the icon with an old version', async () => {
    fetchMock.get('/api/server/version', {
      apiVersion: '1.1.2',
      flexgetVersion: '2.10.11',
      latestVersion: '2.10.60',
    });
    const { findByText, queryByLabelText } = renderWithWrapper(component);
    expect(await findByText('Flexget: 2.10.11')).toBeInTheDocument();
    expect(queryByLabelText('flexget update available')).toBeInTheDocument();
  });
});
