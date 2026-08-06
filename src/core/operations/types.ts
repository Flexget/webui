import { ComponentType } from 'react';

export interface OperationDisplay {
  Icon: ComponentType;
  name: string;
}

export enum ServerOperation {
  Reload = 'reload',
  Shutdown = 'shutdown',
}

export enum DatabaseOperation {
  Cleanup = 'cleanup',
  Vacuum = 'vacuum',
  PluginReset = 'plugin_reset',
}
