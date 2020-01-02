import { RawEntry } from 'core/entry/types';
import { Show, Episode } from './types';

export const showToEntry = (show: Show): RawEntry => ({
  title: show.name,
  originalUrl: '',
  quality: 'unknown',
  seriesName: show.name,
});

export const episodeToEntry = (show: Show, episode: Episode): RawEntry => ({
  title: episode.identifier,
  originalUrl: '',
  quality: 'unknown',
  seriesName: show.name,
  seriesSeason: episode.season,
  seriesEpisode: episode.number,
  seriesId: episode.identifier,
});
