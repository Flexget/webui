import { random, date } from 'faker';
import { LogMessage } from './types';

export const makeLogMessage = (): LogMessage => ({
  timestamp: date.past().toUTCString(),
  message: random.words(),
  task: random.words(),
  logLevel: random.word(),
  plugin: random.words(),
});
