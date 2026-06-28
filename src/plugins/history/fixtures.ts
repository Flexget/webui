import { faker } from '@faker-js/faker';

export const makeItem = (time: string, task: string) => ({
  time,
  task,
  title: faker.word.words(),
  url: faker.internet.url(),
  filename: faker.system.fileName(),
  details: faker.word.words(),
  id: faker.number.int(),
});
