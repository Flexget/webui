import { faker } from '@faker-js/faker';
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
  originalUrl: faker.internet.url(),
  title: faker.word.words(),
  quality: faker.word.words(),
});

export const withMovieRawEntry = (e: RawEntry) => ({
  ...e,
  movieName: faker.word.words(),
  movieYear: faker.date.past().getFullYear(),
});

export const withIMDBFields = (e: RawMovieEntry) => ({
  ...e,
  [IMDBFields.Genres]: faker.word.words().split(' '),
  [IMDBFields.Posters]: faker.image.url(),
  [IMDBFields.Rating]: faker.number.int({ max: 10 }),
  [IMDBFields.Votes]: faker.number.int({ max: 100 }),
  [IMDBFields.Description]: faker.lorem.paragraph(),
  [IMDBFields.Url]: faker.internet.url(),
  [IMDBFields.Runtime]: faker.number.int({ max: 150 }),
  [IMDBFields.ID]: faker.word.sample(),
});

export const withTraktFields = (e: RawMovieEntry) => ({
  ...e,
  [TraktFields.Genres]: faker.word.words().split(' '),
  [TraktFields.Rating]: faker.number.int({ max: 10 }),
  [TraktFields.Votes]: faker.number.int({ max: 100 }),
  [TraktFields.Description]: faker.lorem.paragraph(),
  [TraktFields.Url]: faker.internet.url(),
  [TraktFields.ID]: faker.word.sample(),
  [TraktFields.Runtime]: faker.number.int({ max: 150 }),
});

export const withTMDBFields = (e: RawMovieEntry) => ({
  ...e,
  [TMDBFields.Genres]: faker.word.words().split(' '),
  [TMDBFields.Posters]: faker.image.url(),
  [TMDBFields.Backdrops]: faker.image.url(),
  [TMDBFields.Runtime]: faker.number.int({ max: 150 }),
  [TMDBFields.Rating]: faker.number.int({ max: 10 }),
  [TMDBFields.Votes]: faker.number.int({ max: 100 }),
  [TMDBFields.Url]: faker.internet.url(),
  [TMDBFields.ID]: faker.word.sample(),
});

export const withEpisodeRawEntry = (e: RawEntry): RawEpisodeEntry => ({
  ...e,
  seriesEpisode: 1,
  seriesSeason: 2,
  seriesName: faker.word.sample(),
  seriesId: 'S02E01',
});

export const withTraktEpisodeFields = (e: RawEpisodeEntry) => ({
  ...e,
  [TraktEpisodeFields.Name]: faker.word.words(),
  [TraktEpisodeFields.Description]: faker.lorem.paragraph(),
  [TraktEpisodeFields.ID]: faker.word.sample(),
});

export const withTVDBEpisodeFields = (e: RawEpisodeEntry) => ({
  ...e,
  [TVDBEpisodeFields.Image]: faker.image.url(),
  [TVDBEpisodeFields.Description]: faker.lorem.paragraph(),
  [TVDBEpisodeFields.ID]: faker.word.sample(),
});

export const withTVMazeEpisodeFields = (e: RawEpisodeEntry) => ({
  ...e,
  [TVMazeEpisodeFields.Name]: faker.word.words(),
  [TVMazeEpisodeFields.Image]: faker.image.url(),
  [TVMazeEpisodeFields.Description]: faker.lorem.paragraph(),
  [TVMazeEpisodeFields.Url]: faker.internet.url(),
  [TVMazeEpisodeFields.ID]: faker.word.sample(),
});

export const withSeriesRawEntry = (e: RawEntry) => ({
  ...e,
  seriesName: faker.word.sample(),
  seriesYear: faker.date.past().getFullYear(),
});

export const withTraktSeriesFields = (e: RawSeriesEntry) => ({
  ...e,
  [TraktSeriesFields.Genres]: faker.word.words().split(' '),
  [TraktSeriesFields.Rating]: faker.number.int({ max: 10 }),
  [TraktSeriesFields.Votes]: faker.number.int({ max: 100 }),
  [TraktSeriesFields.Description]: faker.lorem.paragraph(),
  [TraktSeriesFields.ID]: faker.word.sample(),
  [TraktSeriesFields.ContentRating]: faker.word.words(),
  [TraktSeriesFields.Url]: faker.internet.url(),
  [TraktSeriesFields.Network]: faker.word.words(),
});

export const withTVDBSeriesFields = (e: RawSeriesEntry) => ({
  ...e,
  [TVDBSeriesFields.Genres]: faker.word.words().split(' '),
  [TVDBSeriesFields.Posters]: faker.image.url(),
  [TVDBSeriesFields.Rating]: faker.number.int({ max: 10 }),
  [TVDBSeriesFields.Description]: faker.lorem.paragraph(),
  [TVDBSeriesFields.Url]: faker.internet.url(),
  [TVDBSeriesFields.Backdrops]: faker.image.url(),
  [TVDBSeriesFields.ContentRating]: faker.word.words(),
  [TVDBSeriesFields.Network]: faker.word.words(),
  [TVDBSeriesFields.ID]: faker.word.sample(),
});

export const withTVMazeSeriesFields = (e: RawSeriesEntry) => ({
  ...e,
  [TVMazeSeriesFields.Genres]: faker.word.words().split(' '),
  [TVMazeSeriesFields.Posters]: faker.image.url(),
  [TVMazeSeriesFields.Rating]: faker.number.int({ max: 10 }),
  [TVMazeSeriesFields.Description]: faker.lorem.paragraph(),
  [TVMazeSeriesFields.Url]: faker.internet.url(),
  [TVMazeSeriesFields.Network]: faker.word.words(),
  [TVMazeSeriesFields.ID]: faker.word.sample(),
});
