export const enum CardType {
  Default = 'default',
  Movie = 'movie',
  Series = 'series',
  Episode = 'episode',
}

export interface RawEntry {
  readonly title: string;
  readonly originalUrl: string;
  readonly quality: string;
  readonly [k: string]: any;
}

export interface BaseEntry {
  readonly title: string;
  readonly originalUrl: string;
  readonly type: CardType;
  readonly quality: string;
}

export type FieldMapping<U extends string> = Partial<Record<U, string>>;

type Pairs<U extends string, T extends FieldMapping<U>> = {
  [P in keyof T]: [P, T[P]];
}[keyof T];

type ArrayPairs<U extends string, T extends ReadonlyArray<FieldMapping<U>>> = {
  [P in keyof T]: Pairs<U, T[P]>;
}[Extract<keyof T, number>];

export type Fields<
  U extends string,
  T extends ReadonlyArray<FieldMapping<U>>,
  W extends Partial<Record<U, unknown>>
> = {
  readonly [P in Extract<ArrayPairs<U, T>[1], string>]?: W[Extract<ArrayPairs<U, T>, [any, P]>[0]];
};

export type FieldNames<T> = T extends Fields<
  infer U,
  ReadonlyArray<FieldMapping<infer U>>,
  Partial<Record<infer U, infer _>>
>
  ? U
  : never;

export type MappingType<T> = T extends Fields<any, infer U, any> ? U : never;

export type GettersType<T> = T extends Fields<
  infer _,
  ReadonlyArray<FieldMapping<infer _>>,
  infer R
>
  ? R
  : never;
