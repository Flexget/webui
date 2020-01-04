export const enum Direction {
  Desc = 'desc',
  Asc = 'asc',
}

export interface DefaultOptions {
  perPage: number;
  page: number;
  order: Direction;
  sortBy: string;
}

export const toggleDirection = (d: Direction) =>
  d === Direction.Asc ? Direction.Desc : Direction.Asc;
