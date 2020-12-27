import { RawEntry, BaseEntry } from './types';
import {
  MovieEntry,
  movieFieldList,
  RawMovieEntry,
  MovieFieldNames,
  MovieGetters,
} from './fields/movies';
import {
  SeriesEntry,
  seriesFieldList,
  SeriesFieldNames,
  RawSeriesEntry,
  SeriesGetters,
} from './fields/series';
import {
  EpisodeEntry,
  RawEpisodeEntry,
  episodesFieldList,
  EpisodeFieldNames,
  EpisodeGetters,
} from './fields/episodes';

export const isMovie = (entry: RawEntry): entry is RawMovieEntry => !!entry.movieName;
export const isSeries = (entry: RawEntry): entry is RawSeriesEntry =>
  !!entry.seriesName && !entry.seriesSeason;
export const isEpisode = (entry: RawEntry): entry is RawEpisodeEntry & SeriesEntry =>
  !!(entry.seriesSeason && entry.seriesEpisode && entry.seriesName);

const getPropFn = <T, U>(mapping: ReadonlyArray<Partial<Record<keyof T, string>>>) => {
  const mapByField = mapping.reduce<Partial<Record<keyof T, string[]>>>(
    (res, item) =>
      Object.entries(item).reduce(
        (out, [k, v]) => ({
          ...out,
          [k]: [...(out[k] ?? []), v],
        }),
        res,
      ),
    {},
  );
  return (entry: U, field: keyof T) =>
    (mapByField[field] ?? ([] as string[])).reduce((res, val) => res ?? entry[val], undefined);
};

const makeGetters = <T, U>(
  names: Record<string, keyof T>,
  mapping: ReadonlyArray<Partial<Record<keyof T, string>>>,
) => {
  const getProp = getPropFn<T, U>(mapping);
  return (entry: U) =>
    Object.values(names).reduce(
      (obj, key) => ({
        ...obj,
        get [key]() {
          return getProp(entry, key);
        },
      }),
      {} as T,
    );
};

const getMovieProps = makeGetters<MovieGetters, RawMovieEntry>(MovieFieldNames, movieFieldList);
const getSeriesProps = makeGetters<SeriesGetters, RawSeriesEntry>(
  SeriesFieldNames,
  seriesFieldList,
);
const getEpisodeProps = makeGetters<EpisodeGetters, RawEpisodeEntry>(
  EpisodeFieldNames,
  episodesFieldList,
);

export const toMovieEntry = (entry: RawMovieEntry): MovieEntry => {
  return {
    ...entry,
    ...getMovieProps(entry),
  };
};

export const toSeriesEntry = (entry: RawSeriesEntry): SeriesEntry => ({
  ...entry,
  ...getSeriesProps(entry),
});

export const toEpisodeEntry = (entry: RawEpisodeEntry): EpisodeEntry => ({
  ...entry,
  ...getEpisodeProps(entry),
});

export const toDefaultEntry = (entry: BaseEntry): BaseEntry => ({
  ...entry,
});
