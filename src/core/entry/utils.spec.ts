import { compose } from 'utils';
import {
  makeRawEntry,
  withMovieRawEntry,
  withIMDBFields,
  withTraktFields,
  withTMDBFields,
  withSeriesRawEntry,
  withEpisodeRawEntry,
  withTVMazeEpisodeFields,
  withTVMazeSeriesFields,
  withTraktEpisodeFields,
  withTraktSeriesFields,
} from './fixtures';
import { isMovie, isSeries, isEpisode, toMovieEntry, toSeriesEntry, toEpisodeEntry } from './utils';
import { TraktFields, TMDBFields, IMDBFields } from './fields/movies';

import {
  TVMazeFields as TVMazeEpisodeFields,
  TraktFields as TraktEpisodeFields,
} from './fields/episodes';
import {
  TVMazeFields as TVMazeSeriesFields,
  TraktFields as TraktSeriesFields,
} from './fields/series';

describe('core/entry/utils', () => {
  describe('toEntry', () => {
    const rawEntry = makeRawEntry();
    describe('default', () => {
      it('should work with no additional fields', () => {
        expect(isSeries(rawEntry) || isEpisode(rawEntry) || isMovie(rawEntry)).toBeFalse();
      });
    });

    describe('movies', () => {
      it('should work with no additional fields', () => {
        const entry = compose(withMovieRawEntry)(rawEntry);
        expect.assertions(2);
        if (isMovie(entry)) {
          const movie = toMovieEntry(entry);
          expect(movie.movieName).toBeDefined();
          expect(movie.movieYear).toBeDefined();
        }
      });

      it('should work with imdb additional fields', () => {
        const entry = compose(withTMDBFields, withMovieRawEntry)(rawEntry);
        expect.assertions(2);
        if (isMovie(entry)) {
          const movie = toMovieEntry(entry);
          expect(movie.genres).toEqual(entry[TMDBFields.Genres]);
          expect(movie.posters).toEqual(entry[TMDBFields.Posters]);
        }
      });

      it('should work with multiple additional fields', () => {
        const entry = compose(withTraktFields, withIMDBFields, withMovieRawEntry)(rawEntry);
        expect.assertions(2);
        if (isMovie(entry)) {
          const movie = toMovieEntry(entry);
          expect(movie.genres).toEqual(entry[TraktFields.Genres]);
          expect(movie.posters).toEqual(entry[IMDBFields.Posters]);
        }
      });
    });

    describe('series', () => {
      it('should work with no additional fields', () => {
        const entry = compose(withSeriesRawEntry)(rawEntry);
        expect.assertions(2);
        if (isSeries(entry)) {
          const series = toSeriesEntry(entry);
          expect(series.seriesName).toBeDefined();
          expect(series.seriesYear).toBeDefined();
        }
      });

      it('should work with imdb additional fields', () => {
        const entry = compose(withTVMazeSeriesFields, withSeriesRawEntry)(rawEntry);
        expect.assertions(2);
        if (isSeries(entry)) {
          const series = toSeriesEntry(entry);
          expect(series.genres).toEqual(entry[TVMazeSeriesFields.Genres]);
          expect(series.posters).toEqual(entry[TVMazeSeriesFields.Posters]);
        }
      });

      it('should work with multiple additional fields', () => {
        const entry = compose(
          withTraktSeriesFields,
          withTVMazeSeriesFields,
          withSeriesRawEntry,
        )(rawEntry);
        expect.assertions(2);
        if (isSeries(entry)) {
          const series = toSeriesEntry(entry);
          expect(series.genres).toEqual(entry[TraktSeriesFields.Genres]);
          expect(series.posters).toEqual(entry[TVMazeSeriesFields.Posters]);
        }
      });
    });

    describe('episodes', () => {
      it('should work with no additional fields', () => {
        const entry = compose(withEpisodeRawEntry)(rawEntry);
        expect.assertions(2);
        if (isEpisode(entry)) {
          const episode = toEpisodeEntry(entry);
          expect(episode.seriesEpisode).toBeDefined();
          expect(episode.seriesSeason).toBeDefined();
        }
      });

      it('should work with imdb additional fields', () => {
        const entry = compose(withTVMazeEpisodeFields, withEpisodeRawEntry)(rawEntry);
        expect.assertions(2);
        if (isEpisode(entry)) {
          const episode = toEpisodeEntry(entry);
          expect(episode.description).toEqual(entry[TVMazeEpisodeFields.Description]);
          expect(episode.image).toEqual(entry[TVMazeEpisodeFields.Image]);
        }
      });

      it('should work with multiple additional fields', () => {
        const entry = compose(
          withTraktEpisodeFields,
          withTVMazeEpisodeFields,
          withEpisodeRawEntry,
        )(rawEntry);
        expect.assertions(2);
        if (isEpisode(entry)) {
          const episode = toEpisodeEntry(entry);
          expect(episode.description).toEqual(entry[TraktEpisodeFields.Description]);
          expect(episode.image).toEqual(entry[TVMazeEpisodeFields.Image]);
        }
      });
    });
  });
});
