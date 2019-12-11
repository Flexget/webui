import { random, internet, image, date, lorem } from 'faker';
import { RawEntry } from './types';
import { IMDBFields, TraktFields, TMDBFields, BluerayFields } from './fields/movies';
import {
  TVDBFields as TVDBEpisodeFields,
  TVMazeFields as TVMazeEpisodeFields,
  TraktFields as TraktEpisodeFields,
} from './fields/episodes';
import {
  TVDBFields as TVDBSeriesFields,
  TVMazeFields as TVMazeSeriesFields,
  TraktFields as TraktSeriesFields,
} from './fields/series';

export const makeRawEntry = (): RawEntry => ({
  id: random.number(100),
  originalUrl: internet.url(),
  title: random.words(),
});

export const withMovieRawEntry = (e: RawEntry) =>
  ({
    ...e,
    movieName: random.words(),
    movieYear: date.past().getFullYear(),
  } as const);

export const withIMDBFields = (e: RawEntry) => ({
  ...e,
  [IMDBFields.Genres]: random.words().split(' '),
  [IMDBFields.Posters]: image.imageUrl(),
  [IMDBFields.Rating]: random.number(10),
  [IMDBFields.Votes]: random.number(100),
  [IMDBFields.Description]: lorem.paragraph(),
  [IMDBFields.Url]: internet.url(),
  [IMDBFields.ID]: random.word(),
});

export const withTraktFields = (e: RawEntry) => ({
  ...e,
  [TraktFields.Genres]: random.words().split(' '),
  [TraktFields.Rating]: random.number(10),
  [TraktFields.Votes]: random.number(100),
  [TraktFields.Description]: lorem.paragraph(),
  [TraktFields.Url]: internet.url(),
  [TraktFields.ID]: random.word(),
});

export const withTMDBFields = (e: RawEntry) => ({
  ...e,
  [TMDBFields.Genres]: random.words().split(' '),
  [TMDBFields.Posters]: image.imageUrl(),
  [TMDBFields.Rating]: random.number(10),
  [TMDBFields.Votes]: random.number(100),
  [TMDBFields.Description]: lorem.paragraph(),
  [TMDBFields.Url]: internet.url(),
  [TMDBFields.ID]: random.word(),
});

export const withBluerayFields = (e: RawEntry) => ({
  ...e,
  [BluerayFields.Genres]: random.words().split(' '),
  [BluerayFields.Rating]: random.number(10),
  [BluerayFields.Url]: internet.url(),
});

export const withEpisodeRawEntry = (e: RawEntry) => ({
  ...e,
  seriesEpisode: 1,
  seriesSeason: 2,
});

export const withTraktEpisodeFields = (e: RawEntry) => ({
  ...e,
  [TraktEpisodeFields.Genres]: random.words().split(' '),
  [TraktEpisodeFields.Rating]: random.number(10),
  [TraktEpisodeFields.Votes]: random.number(100),
  [TraktEpisodeFields.Description]: lorem.paragraph(),
  [TraktEpisodeFields.ID]: random.word(),
});

export const withTVDBEpisodeFields = (e: RawEntry) => ({
  ...e,
  [TVDBEpisodeFields.Genres]: random.words().split(' '),
  [TVDBEpisodeFields.Image]: image.imageUrl(),
  [TVDBEpisodeFields.Rating]: random.number(10),
  [TVDBEpisodeFields.Description]: lorem.paragraph(),
  [TVDBEpisodeFields.ID]: random.word(),
});

export const withTVMazeEpisodeFields = (e: RawEntry) => ({
  ...e,
  [TVMazeEpisodeFields.Genres]: random.words().split(' '),
  [TVMazeEpisodeFields.Image]: image.imageUrl(),
  [TVMazeEpisodeFields.Rating]: random.number(10),
  [TVMazeEpisodeFields.Description]: lorem.paragraph(),
  [TVMazeEpisodeFields.Url]: internet.url(),
  [TVMazeEpisodeFields.ID]: random.word(),
});

export const withSeriesRawEntry = (e: RawEntry) => ({
  ...e,
  seriesName: random.word(),
});

export const withTraktSeriesFields = (e: RawEntry) => ({
  ...e,
  [TraktSeriesFields.Genres]: random.words().split(' '),
  [TraktSeriesFields.Rating]: random.number(10),
  [TraktSeriesFields.Votes]: random.number(100),
  [TraktSeriesFields.Description]: lorem.paragraph(),
  [TraktSeriesFields.ID]: random.word(),
});

export const withTVDBSeriesFields = (e: RawEntry) => ({
  ...e,
  [TVDBSeriesFields.Genres]: random.words().split(' '),
  [TVDBSeriesFields.Posters]: image.imageUrl(),
  [TVDBSeriesFields.Rating]: random.number(10),
  [TVDBSeriesFields.Description]: lorem.paragraph(),
  [TVDBSeriesFields.Url]: internet.url(),
  [TVDBSeriesFields.ID]: random.word(),
});

export const withTVMazeSeriesFields = (e: RawEntry) => ({
  ...e,
  [TVMazeSeriesFields.Genres]: random.words().split(' '),
  [TVMazeSeriesFields.Posters]: image.imageUrl(),
  [TVMazeSeriesFields.Rating]: random.number(10),
  [TVMazeSeriesFields.Description]: lorem.paragraph(),
  [TVMazeSeriesFields.Url]: internet.url(),
  [TVMazeSeriesFields.ID]: random.word(),
});
