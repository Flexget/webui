import React from 'react';
import { cleanup } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { compose } from 'utils';
import { normalizeMinutes } from 'utils/time';
import { renderWithWrapper } from 'utils/tests';
import { makeRawEntry, withMovieRawEntry, withTMDBFields, withTraktFields } from '../fixtures';
import { toMovieEntry } from '../utils';
import Card from './index';

describe('core/entry/cards/Movie', () => {
  beforeEach(() => {
    fetchMock
      .get('glob:/api/tmdb/movies?*', 404)
      .get('glob:/api/trakt/movies?*', 404)
      .catch();
  });

  afterEach(() => {
    fetchMock.reset();
    cleanup();
  });

  const baseRawEntry = withMovieRawEntry(makeRawEntry());
  describe('no additional fields', () => {
    const rawEntry = baseRawEntry;
    const entry = toMovieEntry(rawEntry);
    it('contains header', async () => {
      const { findByText } = renderWithWrapper(<Card entry={entry} />);

      expect(await findByText(`${entry.movieName} (${entry.movieYear})`)).toBeInTheDocument();
    });

    it('contains quality', async () => {
      const { findByText } = renderWithWrapper(<Card entry={entry} />);

      expect(await findByText(entry.quality)).toBeInTheDocument();
    });
  });

  describe('with fields', () => {
    const rawEntry = compose(withTraktFields, withTMDBFields)(baseRawEntry);
    const entry = toMovieEntry(rawEntry);
    it('contains header', async () => {
      const { findByText } = renderWithWrapper(<Card entry={entry} />);

      expect(await findByText(`${entry.movieName} (${entry.movieYear})`)).toBeInTheDocument();
    });

    it('contains quality, runtime, and genres', async () => {
      const { findByText } = renderWithWrapper(<Card entry={entry} />);

      expect(
        await findByText(
          `${entry.quality}${normalizeMinutes(entry.runtime ?? 0)}${entry.genres?.join(' ')}`,
        ),
      ).toBeInTheDocument();
    });

    it('contains description', async () => {
      const { findByText } = renderWithWrapper(<Card entry={entry} />);

      expect(await findByText(`${entry.description}`)).toBeInTheDocument();
    });
  });
});
