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

describe('common/Entry/cards/Episode', () => {
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
    it('contains header', () => {
      const { queryByText } = renderWithWrapper(<Card entry={entry} />);

      expect(
        queryByText(`${entry.seriesName} - ${entry.episodeName} - ${entry.seriesId}`, {
          selector: 'h2',
        }),
      ).toBeInTheDocument();
    });

    it('has quality', () => {
      const { queryByText } = renderWithWrapper(<Card entry={entry} />);

      expect(queryByText(entry.quality, { selector: 'span' })).toBeInTheDocument();
    });
  });

  describe('with fields', () => {
    const rawEntry = compose(
      withTraktEpisodeFields,
      withTVMazeEpisodeFields,
      withEpisodeRawEntry,
    )(makeRawEntry());
    const entry = toEntry(rawEntry) as EpisodeEntry;
    it('contains header', () => {
      const { queryByText } = renderWithWrapper(<Card entry={entry} />);

      expect(
        queryByText(`${entry.seriesName} - ${entry.episodeName} - ${entry.seriesId}`, {
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
