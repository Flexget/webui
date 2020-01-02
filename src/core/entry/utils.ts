import { RawEntry, FieldNames, MappingType, GettersType, BaseEntry } from './types';
import { MovieEntry, movieFieldList, RawMovieEntry, MovieFieldNames } from './fields/movies';
import { SeriesEntry, seriesFieldList, SeriesFieldNames, RawSeriesEntry } from './fields/series';
import {
  EpisodeEntry,
  RawEpisodeEntry,
  episodesFieldList,
  EpisodeFieldNames,
} from './fields/episodes';

export const isMovie = (entry: RawEntry): entry is RawMovieEntry => !!entry.movieName;
export const isSeries = (entry: RawEntry): entry is RawSeriesEntry =>
  !!entry.seriesName && !entry.seriesSeason;
export const isEpisode = (entry: RawEntry): entry is RawEpisodeEntry & SeriesEntry =>
  !!(entry.seriesSeason && entry.seriesEpisode && entry.seriesName);

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

const getMovieProps = makeGetters<RawMovieEntry>(MovieFieldNames, movieFieldList);
const getSeriesProps = makeGetters<RawSeriesEntry>(SeriesFieldNames, seriesFieldList);
const getEpisodeProps = makeGetters<RawEpisodeEntry>(EpisodeFieldNames, episodesFieldList);

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
