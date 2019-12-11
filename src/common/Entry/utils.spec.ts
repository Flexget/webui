import { compose } from 'utils';
import { CardType } from './types';
import {
  makeRawEntry,
  withMovieRawEntry,
  withIMDBFields,
  withTraktFields,
  withTMDBFields,
} from './fixtures';
import { toEntry } from './utils';
import { MovieEntry, TraktFields, TMDBFields, IMDBFields } from './fields/movies';

describe('./utils', () => {
  describe('toEntry', () => {
    const entry = makeRawEntry();
    describe('movies', () => {
      it('should work with no additional fields', () => {
        const rawMovie = compose(withMovieRawEntry)(entry);
        const movie = toEntry(rawMovie);
        expect(movie.type).toBe(CardType.Movie);
      });

      it('should work with imdb additional fields', () => {
        const rawMovie = compose(withIMDBFields, withMovieRawEntry)(entry);
        const movie = toEntry(rawMovie) as MovieEntry;
        expect(movie.type).toBe(CardType.Movie);
        expect(movie.genres).toBeDefined();
        expect(movie.genres).toEqual(rawMovie[IMDBFields.Genres]);
        expect(movie.posters).toBeDefined();
        expect(movie.posters).toEqual(rawMovie[IMDBFields.Posters]);
      });

      it('should work with multiple additional fields', () => {
        const rawMovie = compose(withTraktFields, withTMDBFields, withMovieRawEntry)(entry);
        const movie = toEntry(rawMovie) as MovieEntry;
        expect(movie.type).toBe(CardType.Movie);
        expect(movie.genres).toBeDefined();
        expect(movie.genres).toEqual(rawMovie[TraktFields.Genres]);
        expect(movie.posters).toBeDefined();
        expect(movie.posters).toEqual(rawMovie[TMDBFields.Posters]);
      });
    });
  });
});
