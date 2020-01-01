import React from 'react';
import fetchMock from 'fetch-mock';
import { compose } from 'utils';
import { renderWithWrapper } from 'utils/tests';
import { cleanup } from '@testing-library/react';
import {
  makeRawEntry,
  withEpisodeRawEntry,
  withTraktEpisodeFields,
  withTVMazeEpisodeFields,
} from '../fixtures';
import { toEntry } from '../utils';
import { EpisodeEntry } from '../fields/episodes';
import Card from './index';

describe('core/entry/cards/Episode', () => {
  beforeEach(() => {
    fetchMock.get('/api/tasks', []).catch();
  });

  afterEach(() => {
    fetchMock.reset();
    cleanup();
  });

  describe('no additional fields', () => {
    const rawEntry = compose(
      e => ({ ...e, traktEpName: 'some name' }),
      withEpisodeRawEntry,
    )(makeRawEntry());
    const entry = toEntry(rawEntry) as EpisodeEntry;
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
      withTraktEpisodeFields,
      withTVMazeEpisodeFields,
      withEpisodeRawEntry,
    )(makeRawEntry());
    const entry = toEntry(rawEntry) as EpisodeEntry;
    it('contains header', async () => {
      const { findByText } = renderWithWrapper(<Card entry={entry} />);

      expect(
        await findByText(`${entry.seriesName} - ${entry.episodeName} - ${entry.seriesId}`, {
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
