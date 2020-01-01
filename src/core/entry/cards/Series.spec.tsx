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
      .get('glob:/api/tvdb/series/*', 404)
      .get('glob:/api/trakt/series/?*', 404)
      .get('glob:/api/tvmaze/series/*', 404)
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
    it('contains header', async () => {
      const { findByText } = renderWithWrapper(<Card entry={entry} />);

      expect(
        await findByText(entry.seriesName, {
          selector: 'h2',
        }),
      ).toBeInTheDocument();
    });

    it('has quality, contentRating, and genres', async () => {
      const { findByText } = renderWithWrapper(<Card entry={entry} />);

      expect(
        await findByText(`${entry.quality}${entry.contentRating}${entry.genres?.join(' ')}`, {
          selector: 'span',
        }),
      ).toBeInTheDocument();
    });

    it('has description', async () => {
      const { findByText } = renderWithWrapper(<Card entry={entry} />);

      expect(
        await findByText(`${entry.description}`, {
          selector: 'p',
        }),
      ).toBeInTheDocument();
    });
  });
});
