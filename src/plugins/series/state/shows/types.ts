import { Direction } from 'utils/query';

export const enum LookupType {
  TVDB = 'tvdb',
}

interface Lookup {} // eslint-disable-line @typescript-eslint/no-empty-interface

export interface TVDB extends Lookup {
  banner: string;
  seriesName: string;
}

export interface Show {
  name: string;
  lookup: Partial<Record<LookupType, Lookup>>;
}

export interface GetShowOptions {
  perPage?: number;
  lookup?: string;
  order?: Direction;
  sortBy?: string;
}
