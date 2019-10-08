import { random, date } from 'faker';
import { List } from './types';

export const makeList = (): List => ({
  id: random.number(),
  name: random.words(),
  addedOn: date.past().toUTCString(),
});
