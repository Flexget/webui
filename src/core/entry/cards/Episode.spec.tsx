import React from 'react';
import fetchMock from 'fetch-mock';
import { compose } from 'utils';
import { renderWithWrapper } from 'utils/tests';
import { cleanup } from '@testing-library/react';
import { RawEpisodeEntry } from 'core/entry/fields/episodes';
import {
  makeRawEntry,
  withEpisodeRawEntry,
  withTraktEpisodeFields,
  withTVMazeEpisodeFields,
  withTraktSeriesFields,
} from '../fixtures';
import { toEpisodeEntry, toSeriesEntry } from '../utils';
import Card from './index';

describe('core/entry/cards/Episode', () => {
  beforeEach(() => {
    fetchMock
      .get('/api/tasks', [])
      .get('glob:/api/tvdb/series/*', 404)
      .get('glob:/api/tvdb/episode/*', 404)
      .get('glob:/api/trakt/series/?*', 404)
      .get('glob:/api/tvmaze/series/*', 404)
      .get('glob:/api/tvmaze/episode/*', 404)
      .catch();
  });

  afterEach(() => {
    fetchMock.reset();
    cleanup();
  });

  const baseRawEntry = withEpisodeRawEntry(makeRawEntry());
  describe('no additional fields', () => {
    const rawEntry = {
      ...baseRawEntry,
      traktEpName: 'some name',
    };
    const entry = toEpisodeEntry(rawEntry);
    it('contains header', async () => {
      const { findByText } = renderWithWrapper(<Card entry={entry} />);

      expect(
        await findByText(`${entry.seriesName} - ${entry.episodeName} - ${entry.seriesId}`, {
          selector: 'h2',
        }),
      ).toBeInTheDocument();
    });

    it('has quality', async () => {
      const { findByText } = renderWithWrapper(<Card entry={entry} />);

      expect(await findByText(entry.quality, { selector: 'span' })).toBeInTheDocument();
    });
  });

  describe('with fields', () => {
    const rawEntry = compose(
      withTraktSeriesFields,
      withTraktEpisodeFields,
      withTVMazeEpisodeFields,
    )(baseRawEntry) as RawEpisodeEntry;
    const entry = toEpisodeEntry(rawEntry);
    const series = toSeriesEntry(rawEntry);
    it('contains header', async () => {
      const { findByText } = renderWithWrapper(<Card entry={entry} />);

      expect(
        await findByText(`${series.seriesName} - ${entry.episodeName} - ${entry.seriesId}`, {
          selector: 'h2',
        }),
      ).toBeInTheDocument();
    });

    it('has quality, contentRating, and genres', async () => {
      const { findByText } = renderWithWrapper(<Card entry={entry} />);

      expect(
        await findByText(
          `${entry.quality}${series.network}${series.contentRating}${series.genres?.join(' ')}`,
          {
            selector: 'span',
          },
        ),
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
