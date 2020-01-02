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
import { toSeriesEntry } from '../utils';
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

  const baseRawEntry = withSeriesRawEntry(makeRawEntry());
  describe('no additional fields', () => {
    const rawEntry = baseRawEntry;
    const entry = toSeriesEntry(rawEntry);
    it('contains header', async () => {
      const { findByText } = renderWithWrapper(<Card entry={entry} />);

      expect(await findByText(entry.seriesName)).toBeInTheDocument();
    });
  });

  describe('with fields', () => {
    const rawEntry = compose(withTVDBSeriesFields, withTVMazeSeriesFields)(baseRawEntry);
    const entry = toSeriesEntry(rawEntry);
    it('contains header', async () => {
      const { findByText } = renderWithWrapper(<Card entry={entry} />);

      expect(
        await findByText(entry.seriesName, {
          selector: 'h2',
        }),
      ).toBeInTheDocument();
    });

    it('has network, contentRating, and genres', async () => {
      const { findByText } = renderWithWrapper(<Card entry={entry} />);

      expect(
        await findByText(`${entry.network}${entry.contentRating}${entry.genres?.join(' ')}`, {
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
