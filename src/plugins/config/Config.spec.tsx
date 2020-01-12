import React, { FC } from 'react';
import fetchMock from 'fetch-mock';
import { cleanup, fireEvent, wait } from '@testing-library/react';
import { renderWithWrapper } from 'utils/tests';
import AppBar from 'core/layout/AppBar';
import { Method } from 'utils/fetch';
import Config from './Config';

const TestConfig: FC = () => {
  return (
    <>
      <AppBar toggleSidebar={jest.fn()} />
      <Config />
    </>
  );
};
const config = `
web_server: yes
tasks: []
`;

describe('plugins/config/Config', () => {
  beforeEach(() => {
    fetchMock
      .get('/api/tasks', [])
      .get('/api/server/raw_config', {
        rawConfig: btoa(config),
      })
      .post('/api/server/raw_config', {
        message: 'Success',
      })
      .get('/api/variables', {})
      .get('/api/schema', {
        schemas: [],
      })
      .put('/api/variables', {})
      .catch();
  });

  afterEach(() => {
    cleanup();
    fetchMock.reset();
  });

  it('should have title Config Editor', () => {
    const { queryByText } = renderWithWrapper(<TestConfig />);

    expect(queryByText('Config Editor', { selector: 'h6' })).toBeInTheDocument();
  });

  it('should switch be in config mode ', () => {
    const { queryByText } = renderWithWrapper(<TestConfig />);

    expect(queryByText('Save Config')).toBeInTheDocument();
    expect(queryByText('Load Variables')).toBeInTheDocument();
  });

  it('clicking save config to call api', async () => {
    const { findByText } = renderWithWrapper(<TestConfig />);

    await wait(() => {
      return fetchMock.called('/api/server/rawConfig');
    });

    const buttonText = await findByText('Save Config');
    const saveButton = buttonText.closest('button');
    expect(saveButton).toBeInTheDocument();
    if (saveButton) {
      fireEvent.click(saveButton);
    }

    await wait(() =>
      expect(fetchMock.called('/api/server/raw_config', { method: Method.Post })).toBeTrue(),
    );
  });

  it('clicking load variables should switch to variables mode', async () => {
    const { getByText, findByText } = renderWithWrapper(<TestConfig />);

    await wait(() => {
      return fetchMock.called('/api/server/rawConfig');
    });

    const loadButton = getByText('Load Variables').closest('button');
    if (loadButton) {
      fireEvent.click(loadButton);
    }

    expect(await findByText('Save Variables')).toBeInTheDocument();
    expect(await findByText('Load Config')).toBeInTheDocument();
  });

  it('clicking save variables should call api', async () => {
    const { getByText, findByText } = renderWithWrapper(<TestConfig />);

    await wait(() => {
      return fetchMock.called('/api/server/rawConfig');
    });

    const loadButton = getByText('Load Variables').closest('button');
    if (loadButton) {
      fireEvent.click(loadButton);
    }

    const buttonText = await findByText('Save Variables');
    const saveButton = buttonText.closest('button');
    expect(saveButton).toBeInTheDocument();
    if (saveButton) {
      fireEvent.click(saveButton);
    }

    await wait(() => expect(fetchMock.called('/api/variables', { method: Method.Put })).toBeTrue());
  });
});
