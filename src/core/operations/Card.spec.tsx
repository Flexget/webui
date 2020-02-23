import React from 'react';
import fetchMock from 'fetch-mock';
import { cleanup, fireEvent } from '@testing-library/react';
import { renderWithWrapper } from 'utils/tests';
import Card from './Card';

describe('core/operations/Card', () => {
  beforeEach(() => {
    fetchMock
      .post('/api/server/manage', 200)
      .get('/api/database/plugins', [])
      .catch();
  });

  afterEach(() => {
    fetchMock.reset();
    cleanup();
  });

  it('should call reload when the button is clicked', () => {
    const { getByText } = renderWithWrapper(<Card />);

    const button = getByText('Reload');

    fireEvent.click(button);

    expect(
      fetchMock.called('/api/server/manage', {
        body: {
          operation: 'reload',
        },
      }),
    ).toBeTrue();
  });

  it('should open shutdown dialog', () => {
    const { getByText, queryByRole } = renderWithWrapper(<Card />);

    const button = getByText('Shutdown');

    expect(queryByRole('dialog')).not.toBeInTheDocument();

    fireEvent.click(button);

    expect(queryByRole('dialog')).toBeInTheDocument();
  });

  it('should open database drawer', () => {
    const { getByText, queryByText } = renderWithWrapper(<Card />);

    const button = getByText('Database');

    expect(queryByText('DB Operations')).not.toBeInTheDocument();

    fireEvent.click(button);

    expect(queryByText('DB Operations')).toBeInTheDocument();
  });
});
