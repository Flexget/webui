import { RawEntry, CardType, FieldNames, MappingType, GettersType } from './types';
import { Entry, DefaultEntry } from './fields';
import {
  RawMovieEntry,
  MovieEntry,
  movieFieldList,
  MovieFields,
  MovieFieldNames,
} from './fields/movies';
import {
  RawSeriesEntry,
  SeriesEntry,
  seriesFieldList,
  SeriesFields,
  SeriesFieldNames,
} from './fields/series';

import {
  RawEpisodeEntry,
  EpisodeEntry,
  EpisodeFields,
  episodesFieldList,
  EpisodeFieldNames,
} from './fields/episodes';

const isMovie = (entry: RawEntry): entry is RawMovieEntry => !!entry.movieName;
const isSeries = (entry: RawEntry): entry is RawSeriesEntry =>
  !!entry.seriesName && !!entry.seriesSeason;
const isEpisode = (entry: RawEntry): entry is RawEpisodeEntry =>
  !!(entry.seriesSeason && entry.seriesEpisode);

const getPropFn = <U>(mapping: MappingType<U>) => {
  const mapByField = mapping.reduce<Partial<Record<FieldNames<U>, string[]>>>(
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
  return (entry: U, field: FieldNames<U>) =>
    (mapByField[field] ?? ([] as string[])).reduce((res, val) => res ?? entry[val], undefined);
};

const makeGetters = <T>(names: Record<string, FieldNames<T>>, mapping: MappingType<T>) => {
  const getProp = getPropFn<T>(mapping);
  return (entry: T) =>
    Object.values(names).reduce(
      (obj, key: FieldNames<T>) => ({
        ...obj,
        get [key]() {
          return getProp(entry, key);
        },
      }),
      {} as GettersType<T>,
    );
};

const getMovieProps = makeGetters<MovieFields>(MovieFieldNames, movieFieldList);
const getSeriesProps = makeGetters<SeriesFields>(SeriesFieldNames, seriesFieldList);
const getEpisodeProps = makeGetters<EpisodeFields>(EpisodeFieldNames, episodesFieldList);

const toMovieEntry = (entry: RawMovieEntry): MovieEntry => {
  return {
    ...entry,
    type: CardType.Movie,
    ...getMovieProps(entry),
  };
};

const toSeriesEntry = (entry: RawSeriesEntry): SeriesEntry => ({
  ...entry,
  type: CardType.Series,
  ...getSeriesProps(entry),
});

const toEpisodeEntry = (entry: RawEpisodeEntry): EpisodeEntry => ({
  ...entry,
  type: CardType.Episode,
  ...getEpisodeProps(entry),
});

const toDefaultEntry = (entry: RawEntry): DefaultEntry => ({
  ...entry,
  type: CardType.Default,
});

export const toEntry = (entry: RawEntry): Entry => {
  if (isMovie(entry)) {
    return toMovieEntry(entry);
  }
  if (isSeries(entry)) {
    return toSeriesEntry(entry);
  }
  if (isEpisode(entry)) {
    return toEpisodeEntry(entry);
  }
  return toDefaultEntry(entry);
};
