import { random, internet, system } from 'faker';

export const makeItem = (time: string, task: string) => ({
  time,
  task,
  title: random.words(),
  url: internet.url(),
  filename: system.fileName(),
  details: random.words(),
  id: random.number(),
});
