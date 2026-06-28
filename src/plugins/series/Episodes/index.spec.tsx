import React, { FC, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { cleanup, fireEvent, getNodeText, waitFor } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { renderWithWrapper } from 'utils/tests';
import AppBar from 'core/layout/AppBar';
import Episodes from './index';

const TestEpisodes: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/series/1');
  }, [navigate]);

  return (
    <>
      <AppBar toggleSidebar={jest.fn()} />
      <Routes>
        <Route path="/series/:showId/*" element={<Episodes />} />
      </Routes>
    </>
  );
};

describe('plugins/series/episodes', () => {
  beforeEach(() => {
    fetchMock.get('/api/series/1', {}).get('glob:/api/series/1/episodes?*', []).catch();
  });

  afterEach(() => {
    cleanup();
    fetchMock.reset();
  });

  it('should get series details', async () => {
    renderWithWrapper(<TestEpisodes />);

    await waitFor(() => expect(fetchMock.called('/api/series/1')).toBeTrue());
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
    });
  });
});
