import { random, internet, image, date, lorem } from 'faker';
import { RawEntry } from './types';
import { IMDBFields, TraktFields, TMDBFields, RawMovieEntry } from './fields/movies';
import {
  TVDBFields as TVDBEpisodeFields,
  TVMazeFields as TVMazeEpisodeFields,
  TraktFields as TraktEpisodeFields,
  RawEpisodeEntry,
} from './fields/episodes';
import {
  TVDBFields as TVDBSeriesFields,
  TVMazeFields as TVMazeSeriesFields,
  TraktFields as TraktSeriesFields,
  RawSeriesEntry,
} from './fields/series';

export const makeRawEntry = (): RawEntry => ({
  originalUrl: internet.url(),
  title: random.words(),
  quality: random.words(),
});

export const withMovieRawEntry = (e: RawEntry) => ({
  ...e,
  movieName: random.words(),
  movieYear: date.past().getFullYear(),
});

export const withIMDBFields = (e: RawMovieEntry) => ({
  ...e,
  [IMDBFields.Genres]: random.words().split(' '),
  [IMDBFields.Posters]: image.imageUrl(),
  [IMDBFields.Rating]: random.number(10),
  [IMDBFields.Votes]: random.number(100),
  [IMDBFields.Description]: lorem.paragraph(),
  [IMDBFields.Url]: internet.url(),
  [IMDBFields.Runtime]: random.number(150),
  [IMDBFields.ID]: random.word(),
});

export const withTraktFields = (e: RawMovieEntry) => ({
  ...e,
  [TraktFields.Genres]: random.words().split(' '),
  [TraktFields.Rating]: random.number(10),
  [TraktFields.Votes]: random.number(100),
  [TraktFields.Description]: lorem.paragraph(),
  [TraktFields.Url]: internet.url(),
  [TraktFields.ID]: random.word(),
  [TraktFields.Runtime]: random.number(150),
});

export const withTMDBFields = (e: RawMovieEntry) => ({
  ...e,
  [TMDBFields.Genres]: random.words().split(' '),
  [TMDBFields.Posters]: image.imageUrl(),
  [TMDBFields.Backdrops]: image.imageUrl(),
  [TMDBFields.Runtime]: random.number(150),
  [TMDBFields.Rating]: random.number(10),
  [TMDBFields.Votes]: random.number(100),
  [TMDBFields.Url]: internet.url(),
  [TMDBFields.ID]: random.word(),
});

export const withEpisodeRawEntry = (e: RawEntry): RawEpisodeEntry => ({
  ...e,
  seriesEpisode: 1,
  seriesSeason: 2,
  seriesName: random.word(),
  seriesId: 'S02E01',
});

export const withTraktEpisodeFields = (e: RawEpisodeEntry) => ({
  ...e,
  [TraktEpisodeFields.Name]: random.words(),
  [TraktEpisodeFields.Description]: lorem.paragraph(),
  [TraktEpisodeFields.ID]: random.word(),
});

export const withTVDBEpisodeFields = (e: RawEpisodeEntry) => ({
  ...e,
  [TVDBEpisodeFields.Image]: image.imageUrl(),
  [TVDBEpisodeFields.Description]: lorem.paragraph(),
  [TVDBEpisodeFields.ID]: random.word(),
});

export const withTVMazeEpisodeFields = (e: RawEpisodeEntry) => ({
  ...e,
  [TVMazeEpisodeFields.Name]: random.words(),
  [TVMazeEpisodeFields.Image]: image.imageUrl(),
  [TVMazeEpisodeFields.Description]: lorem.paragraph(),
  [TVMazeEpisodeFields.Url]: internet.url(),
  [TVMazeEpisodeFields.ID]: random.word(),
});

export const withSeriesRawEntry = (e: RawEntry) => ({
  ...e,
  seriesName: random.word(),
  seriesYear: date.past().getFullYear(),
});

export const withTraktSeriesFields = (e: RawSeriesEntry) => ({
  ...e,
  [TraktSeriesFields.Genres]: random.words().split(' '),
  [TraktSeriesFields.Rating]: random.number(10),
  [TraktSeriesFields.Votes]: random.number(100),
  [TraktSeriesFields.Description]: lorem.paragraph(),
  [TraktSeriesFields.ID]: random.word(),
  [TraktSeriesFields.ContentRating]: random.words(),
  [TraktSeriesFields.Url]: internet.url(),
  [TraktSeriesFields.Network]: random.words(),
});

export const withTVDBSeriesFields = (e: RawSeriesEntry) => ({
  ...e,
  [TVDBSeriesFields.Genres]: random.words().split(' '),
  [TVDBSeriesFields.Posters]: image.imageUrl(),
  [TVDBSeriesFields.Rating]: random.number(10),
  [TVDBSeriesFields.Description]: lorem.paragraph(),
  [TVDBSeriesFields.Url]: internet.url(),
  [TVDBSeriesFields.Backdrops]: image.imageUrl(),
  [TVDBSeriesFields.ContentRating]: random.words(),
  [TVDBSeriesFields.Network]: random.words(),
  [TVDBSeriesFields.ID]: random.word(),
});

export const withTVMazeSeriesFields = (e: RawSeriesEntry) => ({
  ...e,
  [TVMazeSeriesFields.Genres]: random.words().split(' '),
  [TVMazeSeriesFields.Posters]: image.imageUrl(),
  [TVMazeSeriesFields.Rating]: random.number(10),
  [TVMazeSeriesFields.Description]: lorem.paragraph(),
  [TVMazeSeriesFields.Url]: internet.url(),
  [TVMazeSeriesFields.Network]: random.words(),
  [TVMazeSeriesFields.ID]: random.word(),
});
