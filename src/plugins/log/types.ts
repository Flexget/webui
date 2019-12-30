export const enum LogLevel {
  Trace = 'TRACE',
  Debug = 'DEBUG',
  Info = 'INFO',
  Success = 'SUCCESS',
  Warning = 'WARNING',
  Error = 'ERROR',
  Critical = 'CRITICAL',
}
export interface LogMessage {
  timestamp: string;
  message: string;
  task: string;
  logLevel: LogLevel;
  plugin: string;
}

export interface Options {
  lines: number;
  query: string;
}
