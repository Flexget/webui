import React from 'react';
import { cleanup } from '@testing-library/react';
import fetchMock from 'fetch-mock';
import { compose } from 'utils';
import { renderWithWrapper } from 'utils/tests';
import {
  makeRawEntry,
  withSeriesRawEntry,
  withTVMazeSeriesFields,
  withTVDBSeriesFields,
} from '../fixtures';
import { toEntry } from '../utils';
import { SeriesEntry } from '../fields/series';
import Card from './index';

describe('core/entry/cards/Series', () => {
  beforeEach(() => {
    fetchMock
      .get('/api/tasks', [])
      .get('glob:/api/tmdb/movies?*', 404)
      .get('glob:/api/trakt/movies?*', 404)
      .catch();
  });

  afterEach(() => {
    fetchMock.reset();
    cleanup();
  });
  describe('no additional fields', () => {
    const rawEntry = compose(withSeriesRawEntry)(makeRawEntry());
    const entry = toEntry(rawEntry) as SeriesEntry;
    it('contains header', async () => {
      const { findByText } = renderWithWrapper(<Card entry={entry} />);

      expect(await findByText(entry.seriesName)).toBeInTheDocument();
    });

    it('contains quality', async () => {
      const { findByText } = renderWithWrapper(<Card entry={entry} />);

      expect(await findByText(entry.quality)).toBeInTheDocument();
    });
  });

  describe('with fields', () => {
    const rawEntry = compose(
      withTVDBSeriesFields,
      withTVMazeSeriesFields,
      withSeriesRawEntry,
    )(makeRawEntry());
    const entry = toEntry(rawEntry) as SeriesEntry;
    it('contains header', () => {
      const { queryByText } = renderWithWrapper(<Card entry={entry} />);

      expect(
        queryByText(entry.seriesName, {
          selector: 'h2',
        }),
      ).toBeInTheDocument();
    });

    it('has quality, contentRating, and genres', () => {
      const { queryByText } = renderWithWrapper(<Card entry={entry} />);

      expect(
        queryByText(`${entry.quality}${entry.contentRating}${entry.genres?.join(' ')}`, {
          selector: 'span',
        }),
      ).toBeInTheDocument();
    });

    it('has description', () => {
      const { queryByText } = renderWithWrapper(<Card entry={entry} />);

      expect(
        queryByText(`${entry.description}`, {
          selector: 'p',
        }),
      ).toBeInTheDocument();
    });
  });
});
