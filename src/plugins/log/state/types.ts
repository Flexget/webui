export interface LogMessage {
  timestamp: string;
  message: string;
  task: string;
  logLevel: string; // TODO: Change to enum
  plugin: string;
}
