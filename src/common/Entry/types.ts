export const enum CardType {
  Default = 'default',
  Movie = 'movie',
  Series = 'series',
  Episode = 'episode',
}

export interface RawEntry {
  id: number;
  title: string;
  originalUrl: string;
  [k: string]: unknown;
}

export interface BaseEntry {
  id: number;
  title: string;
  originalUrl: string;
  type: CardType;
}

type ValueOf<T> = {
  [P in keyof T]: T[P];
}[Extract<keyof T, number>];

type Pairs<U extends string, T extends Partial<Record<U, string>>> = {
  [P in keyof T]: [P, T[P]];
}[keyof T];

export type Fields<
  U extends string,
  T extends ReadonlyArray<Partial<Record<U, string>>>,
  W extends Record<U, unknown>
> = {
  [P in Extract<Pairs<U, ValueOf<T>>[1], string>]?: W[Extract<Pairs<U, ValueOf<T>>, [any, P]>[0]];
};

