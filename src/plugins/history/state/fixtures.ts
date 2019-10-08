import { random, internet, system, date } from 'faker';
import { History } from './types';

export const makeHistory = (): History => ({
  task: random.words(),
  title: random.words(),
  url: internet.url(),
  filename: system.fileName(),
  details: random.words(),
  time: date.past().toUTCString(),
  id: random.number(100),
});
