export const enum Direction {
  Desc = 'desc',
  Asc = 'asc',
}

export const toggleDirection = (d: Direction) =>
  d === Direction.Asc ? Direction.Desc : Direction.Asc;
