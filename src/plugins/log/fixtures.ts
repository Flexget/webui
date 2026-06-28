import { faker } from '@faker-js/faker';
import { LogMessage, LogLevel } from './types';

export const makeLogMessage = (logLevel = LogLevel.Warning): LogMessage => ({
  timestamp: faker.date.past().toISOString(),
  message: faker.word.words(),
  task: faker.word.words(),
  logLevel,
  plugin: faker.word.words(),
});
