import { random, date } from 'faker';
import { LogMessage, LogLevel } from './types';

export const makeLogMessage = (logLevel = LogLevel.Warning): LogMessage => ({
  timestamp: date.past().toISOString(),
  message: random.words(),
  task: random.words(),
  logLevel,
  plugin: random.words(),
});
