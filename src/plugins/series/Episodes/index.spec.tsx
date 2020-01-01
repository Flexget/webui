import React, { FC, useEffect } from 'react';
import { useHistory, Route } from 'react-router-dom';
import { cleanup, fireEvent, getNodeText, wait } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { renderWithWrapper } from 'utils/tests';
import AppBar from 'core/layout/AppBar';
import Episodes from './index';

const TestEpisodes: FC = () => {
  const { push } = useHistory();
  useEffect(() => {
    push('/series/1');
  }, [push]);
  return (
    <>
      <AppBar toggleSidebar={jest.fn()} />
      <Route path="/series/:showId">
        <Episodes />
      </Route>
    </>
  );
};

describe('plugins/series/episodes', () => {
  beforeEach(() => {
    fetchMock
      .get('glob:/api/series/1/episodes?*', [])
      .get('/api/tasks', [])
      .catch();
  });

  afterEach(() => {
    cleanup();
    fetchMock.reset();
  });

  describe('Header', () => {
    it('should change order when changing the value', async () => {
      const { findAllByRole, getByLabelText } = renderWithWrapper(<TestEpisodes />);
      const dropdown = getByLabelText('Order');

      fireEvent.mouseDown(dropdown);
      const options = await findAllByRole('option');

      expect(options).toHaveLength(2);
      expect(dropdown).toHaveTextContent(getNodeText(options[0]));
      fireEvent.click(options[1]);
      expect(dropdown).toHaveTextContent(getNodeText(options[1]));
      await wait(() =>
        expect(
          fetchMock.called(
            `glob:/api/series/1/episodes?*order=${options[1].getAttribute('data-value')}*`,
          ),
        ).toBeTrue(),
      );
    });
  });
});
