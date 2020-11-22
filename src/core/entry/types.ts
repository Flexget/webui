export interface BaseEntry {
  readonly title: string;
  readonly originalUrl: string;
  readonly quality: string;
}

export interface RawEntry extends BaseEntry {
  readonly [k: string]: any;
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


